/* ============================================================================
   Assistant logic — OpenAI chat + (optional) Supabase-backed editing/sync.
   Used by api/chat.js, api/telegram.js, api/state.js.
   Degrades gracefully: with no SUPABASE_* env vars, tools are off and chat
   still works (no persistence). TRIP lives in _trip-data.js (generated).
   ========================================================================== */
const TRIP = require("./_trip-data.js");

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_MODEL = "gpt-4o";
const STATE_ID = "japan-2026";
function L(x) { return x && typeof x === "object" && ("es" in x || "en" in x) ? (x.es || x.en) : x; }
function rid() { return Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36); }

/* ---- Supabase (PostgREST over fetch — no SDK needed) ---------------------- */
function sbReady() { return !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY); }
function sbBase() { return String(process.env.SUPABASE_URL || "").trim().replace(/\/+$/, "").replace(/\/rest\/v1$/, ""); }
function sbHeaders() { const k = (process.env.SUPABASE_SERVICE_KEY || "").trim(); return { apikey: k, Authorization: "Bearer " + k }; }
async function getState() {
  if (!sbReady()) return {};
  try {
    const r = await fetch(`${sbBase()}/rest/v1/trip_state?id=eq.${STATE_ID}&select=data`, { headers: sbHeaders() });
    if (!r.ok) return {};
    const rows = await r.json();
    return (rows[0] && rows[0].data) || {};
  } catch { return {}; }
}
async function saveState(data) {
  if (!sbReady()) return { ok: false, error: "no-supabase" };
  const r = await fetch(`${sbBase()}/rest/v1/trip_state`, {
    method: "POST",
    headers: { ...sbHeaders(), "content-type": "application/json", Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify([{ id: STATE_ID, data, updated_at: new Date().toISOString() }])
  });
  if (r.ok) return { ok: true };
  let body = ""; try { body = (await r.text()).slice(0, 400); } catch {}
  return { ok: false, status: r.status, error: body };
}
function ensureShape(s) {
  s = s || {};
  s.checks = s.checks || {}; s.expenses = s.expenses || []; s.dayNotes = s.dayNotes || {};
  s.custom = Object.assign({ prep: [], pack: [], docs: [], places: [], baby: [] }, s.custom || {});
  s.overrides = Object.assign({ stays: {}, reservas: {}, addActs: {}, editActs: {}, hideActs: [] }, s.overrides || {});
  s.overrides.stays = s.overrides.stays || {}; s.overrides.reservas = s.overrides.reservas || {};
  s.overrides.addActs = s.overrides.addActs || {}; s.overrides.editActs = s.overrides.editActs || {}; s.overrides.hideActs = s.overrides.hideActs || [];
  return s;
}

/* ---- Telegram chat registry (separate row so app sync never wipes it) ----- */
const CHATS_ID = "telegram-chats";
async function getChats() {
  if (!sbReady()) return [];
  try {
    const r = await fetch(`${sbBase()}/rest/v1/trip_state?id=eq.${CHATS_ID}&select=data`, { headers: sbHeaders() });
    if (!r.ok) return [];
    const rows = await r.json();
    return (rows[0] && rows[0].data && rows[0].data.ids) || [];
  } catch { return []; }
}
async function addTelegramChat(id) {
  if (!sbReady() || id == null) return;
  const ids = await getChats();
  if (ids.indexOf(id) >= 0) return;
  ids.push(id);
  try {
    await fetch(`${sbBase()}/rest/v1/trip_state`, {
      method: "POST",
      headers: { ...sbHeaders(), "content-type": "application/json", Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify([{ id: CHATS_ID, data: { ids }, updated_at: new Date().toISOString() }])
    });
  } catch {}
}

/* ---- daily brief (for the Telegram cron) ---------------------------------- */
function jstToday() { return new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10); }
function effActsServer(d, state) {
  state = ensureShape(state);
  const o = state.overrides, hide = o.hideActs || [], edits = o.editActs || {}, adds = o.addActs || {};
  const tmin = t => { const m = /(\d{1,2}):(\d{2})/.exec(t || ""); return m ? +m[1] * 60 + +m[2] : 9999; };
  let list = d.acts.map(a => ({ time: a.time, text: a.text, key: d.n + "@" + a.time }))
    .filter(x => hide.indexOf(x.key) < 0)
    .map(x => { const e = edits[x.key]; return e ? { time: e.time || x.time, text: e.text != null ? e.text : x.text } : x; });
  (adds[d.n] || []).forEach(a => list.push({ time: a.time, text: a.text }));
  list.sort((p, q) => tmin(p.time) - tmin(q.time));
  return list;
}
async function dailyBrief() {
  const today = jstToday();
  const d = TRIP.days.find(x => x.dateISO === today);
  if (!d) return null;
  const state = await getState();
  const acts = effActsServer(d, state).map(a => `${a.time}  ${L(a.text)}`).join("\n");
  const note = state.dayNotes && state.dayNotes["day-" + d.n];
  const tip = L(TRIP.babyTips[(d.n - 1) % TRIP.babyTips.length].t);
  return `☀️ Día ${d.n} · ${L(d.date)} · ${L(d.city)}\n${L(d.title)}\n\n${acts}` +
    (note ? `\n\n📝 ${note}` : "") + (L(d.note) ? `\n\n💡 ${L(d.note)}` : "") + `\n\n👶 ${tip}`;
}

/* ---- grounding digest (reflects current bookings/todos in `state`) -------- */
function tripDigest(state) {
  state = ensureShape(state);
  const m = TRIP.meta, lines = [];
  lines.push(`VIAJE: ${L(m.title)} — ${m.travelers.join(", ")}.`);
  lines.push(`Fechas: ${m.startDate} a ${m.endDate} (15 días / ${m.nights} noches). Reserva ${m.booking}.`);
  m.flights.forEach(f => lines.push(`Vuelo ${f.no}: ${f.from}→${f.to} ${f.date} ${f.dep}→${f.arr} (${f.dur}).`));
  lines.push(`Cambio aprox: ¥${m.currency.yenPerAud} = A$1.`);
  lines.push(`\nRUTA: ` + TRIP.route.map(r => `${L(r.city)} ${L(r.dates)} (${L(r.nights)})`).join(" → "));
  lines.push(`\nITINERARIO:`);
  TRIP.days.forEach(d => {
    const acts = d.acts.map(a => `${a.time} ${L(a.text)}`).join("; ");
    const note = state.dayNotes["day-" + d.n];
    lines.push(`Día ${d.n} · ${L(d.date)} · ${L(d.city)} — ${L(d.title)}: ${acts}.` + (L(d.note) ? ` (${L(d.note)})` : "") + (note ? ` NOTA: ${note}` : ""));
  });
  lines.push(`\nHOSPEDAJE (id · estado):`);
  TRIP.stays.forEach(s => { const o = state.overrides.stays[s.id] || {}; lines.push(`- ${s.id}: ${L(s.city)} ${L(s.dates)} — ${o.name || L(s.name)} [${o.status || s.status}${o.code ? " · " + o.code : ""}${o.note ? " · " + o.note : ""}]`); });
  lines.push(`\nRESERVAS (id · estado):`);
  TRIP.reservas.forEach(r => { const o = state.overrides.reservas[r.id] || {}; lines.push(`- ${r.id}: ${L(r.type)} ${L(r.title)} [${o.status || r.status}${o.code && o.code !== "—" ? " · " + o.code : ""}${o.note ? " · " + o.note : ""}]`); });
  const todos = TRIP.prepItems.filter(p => !state.checks[p.id]).map(p => L(p.label)).concat((state.custom.prep || []).map(c => c.label));
  lines.push(`\nPENDIENTES sin hacer: ` + (todos.join("; ") || "ninguno"));
  lines.push(`\nLUGARES: ` + TRIP.placeGroups.map(g => `${L(g.city)}: ` + g.places.map(p => L(p.name)).join(", ")).join(" | "));
  lines.push(`\nTRANSPORTE: ${L(TRIP.transportNote)} ` + TRIP.routes.map(r => `${L(r.from)}→${L(r.to)} ${L(r.mode)} ${L(r.time)}`).join("; "));
  lines.push(`\nFRASES: ` + TRIP.phrases.map(p => `${p.es}=${p.jp} (${p.romaji})`).join("; "));
  return lines.join("\n");
}
function systemPrompt(state) {
  const canEdit = sbReady();
  return `Eres el asistente de viaje personal de la familia (Santiago, Geraldine y su bebé Nico) para su viaje a Japón en 2026. Tienes su itinerario real abajo, con el estado ACTUAL de reservas y pendientes.

REGLAS:
- Responde SIEMPRE en el idioma del usuario (español o inglés). Conciso, cálido, práctico.
- Apóyate en el itinerario real ("¿qué hacemos el día 6?", "¿cómo voy de Kyoto a Takayama?").
- Traducciones (menús, carteles): da japonés + romaji + significado. Si mandan foto, tradúcela y explica.
- Viajan con un bebé de ~14 meses (cochecito, siestas, baby-friendly, calor de fin de verano).
${canEdit
  ? `- PUEDES EDITAR el viaje con las herramientas: reservas -> registrar_reserva (usa el id EXACTO de las listas); pendientes -> agregar_pendiente; nota de día -> agregar_nota_dia; gastos -> agregar_gasto. Y el HORARIO: "agrega cena a las 20h el día 11" -> agregar_actividad; "mueve teamLab al día 13 a las 15:00" o "cambia la actividad de las 15:00 del día 5" -> editar_actividad (identifica por dia + hora ACTUAL); "quita la actividad de las 18:00 del día 2" -> quitar_actividad. Para mover/editar, mira el horario abajo y usa la hora actual de la actividad. Confirma en una frase lo que hiciste.`
  : `- (Edición no disponible aún: responde y aconseja, pero no guardas cambios.)`}
- Para hoteles: sugiere zonas/tipo y qué priorizar (cancelable, cerca de estación, apto cochecito). No inventes precios ni disponibilidad exactos.

=== ITINERARIO Y ESTADO ACTUAL ===
${tripDigest(state)}`;
}

/* ---- editing tools (OpenAI function calling) ------------------------------ */
const TOOLS = [
  { type: "function", function: { name: "registrar_reserva", description: "Marca un hospedaje (id stay-*) o reserva (id rv-*) como reservado o pendiente y guarda detalles.", parameters: { type: "object", properties: { id: { type: "string" }, estado: { type: "string", enum: ["booked", "todo"] }, nombre: { type: "string" }, nota: { type: "string" }, codigo: { type: "string" } }, required: ["id", "estado"] } } },
  { type: "function", function: { name: "agregar_pendiente", description: "Agrega un pendiente/tarea a la lista.", parameters: { type: "object", properties: { texto: { type: "string" }, prioridad: { type: "string", enum: ["red", "yellow", "green"] } }, required: ["texto"] } } },
  { type: "function", function: { name: "agregar_nota_dia", description: "Pone o reemplaza la nota de un día (1 a 15).", parameters: { type: "object", properties: { dia: { type: "integer" }, texto: { type: "string" } }, required: ["dia", "texto"] } } },
  { type: "function", function: { name: "agregar_gasto", description: "Registra un gasto en yenes (JPY) o dólares australianos (AUD).", parameters: { type: "object", properties: { concepto: { type: "string" }, monto: { type: "number" }, moneda: { type: "string", enum: ["JPY", "AUD"] }, quien: { type: "string", enum: ["Santi", "Geral"] } }, required: ["concepto", "monto"] } } },
  { type: "function", function: { name: "agregar_actividad", description: "Agrega una actividad nueva al horario de un día (1-15).", parameters: { type: "object", properties: { dia: { type: "integer" }, hora: { type: "string", description: "HH:MM" }, texto: { type: "string" }, nota: { type: "string" } }, required: ["dia", "hora", "texto"] } } },
  { type: "function", function: { name: "editar_actividad", description: "Edita o MUEVE una actividad existente del horario. Identifica la actividad por dia + hora ACTUAL. Para moverla, pon nueva_hora.", parameters: { type: "object", properties: { dia: { type: "integer" }, hora: { type: "string", description: "hora actual HH:MM de la actividad a editar" }, nuevo_texto: { type: "string" }, nueva_hora: { type: "string" }, nueva_nota: { type: "string" } }, required: ["dia", "hora"] } } },
  { type: "function", function: { name: "quitar_actividad", description: "Quita/oculta una actividad del horario de un día, por dia + hora.", parameters: { type: "object", properties: { dia: { type: "integer" }, hora: { type: "string" } }, required: ["dia", "hora"] } } }
];
function applyTool(name, a, state) {
  state = ensureShape(state);
  if (name === "registrar_reserva") {
    const bucket = String(a.id || "").indexOf("rv-") === 0 ? "reservas" : "stays";
    const o = state.overrides[bucket][a.id] || {};
    o.status = a.estado; if (a.nombre) o.name = a.nombre; if (a.nota) o.note = a.nota; if (a.codigo) o.code = a.codigo;
    state.overrides[bucket][a.id] = o;
    return `Reserva ${a.id} -> ${a.estado}${a.nombre ? " (" + a.nombre + ")" : ""}.`;
  }
  if (name === "agregar_pendiente") {
    state.custom.prep = state.custom.prep || [];
    state.custom.prep.push({ id: "c-prep-" + rid(), label: a.texto, priority: a.prioridad || "yellow" });
    return `Pendiente agregado: ${a.texto}.`;
  }
  if (name === "agregar_nota_dia") {
    state.dayNotes["day-" + a.dia] = a.texto;
    return `Nota del día ${a.dia} guardada.`;
  }
  if (name === "agregar_gasto") {
    state.expenses.unshift({ id: "e" + rid(), concept: a.concepto, amount: Number(a.monto) || 0, currency: a.moneda || "JPY", payer: a.quien || "Santi" });
    return `Gasto registrado: ${a.concepto} ${a.monto} ${a.moneda || "JPY"}.`;
  }
  if (name === "agregar_actividad") {
    state.overrides.addActs[a.dia] = state.overrides.addActs[a.dia] || [];
    state.overrides.addActs[a.dia].push({ id: "a" + rid(), time: a.hora, type: "📍", text: a.texto, note: a.nota || "" });
    return `Actividad agregada al día ${a.dia} (${a.hora}): ${a.texto}.`;
  }
  if (name === "editar_actividad") {
    const k = a.dia + "@" + a.hora;
    const e = state.overrides.editActs[k] || {};
    if (a.nuevo_texto != null) e.text = a.nuevo_texto;
    if (a.nueva_hora != null) e.time = a.nueva_hora;
    if (a.nueva_nota != null) e.note = a.nueva_nota;
    state.overrides.editActs[k] = e;
    return `Actividad del día ${a.dia} (${a.hora}) actualizada${a.nueva_hora ? " → " + a.nueva_hora : ""}.`;
  }
  if (name === "quitar_actividad") {
    const k = a.dia + "@" + a.hora;
    if (state.overrides.hideActs.indexOf(k) < 0) state.overrides.hideActs.push(k);
    return `Actividad del día ${a.dia} (${a.hora}) quitada.`;
  }
  return "ok";
}

async function callAssistant(opts) {
  const key = process.env.OPENAI_API_KEY || process.env.OPENIA_API_KEY;
  if (!key) throw new Error("Falta OPENAI_API_KEY en el servidor.");
  const text = (opts.text || "").toString();
  const image = opts.image;
  const state = await getState();
  const messages = [{ role: "system", content: systemPrompt(state) }];
  (opts.history || []).forEach(h => { if (h && (h.role === "user" || h.role === "assistant") && h.content) messages.push({ role: h.role, content: String(h.content) }); });
  if (image && image.data) {
    messages.push({ role: "user", content: [
      { type: "text", text: text || "¿Qué dice esto? Tradúcelo y explícalo." },
      { type: "image_url", image_url: { url: "data:" + (image.media_type || "image/jpeg") + ";base64," + image.data } }
    ]});
  } else {
    messages.push({ role: "user", content: text });
  }
  let changed = false;
  for (let i = 0; i < 5; i++) {
    const body = { model: process.env.MODEL || DEFAULT_MODEL, max_tokens: 1500, messages };
    if (sbReady()) body.tools = TOOLS;
    const res = await fetch(OPENAI_URL, { method: "POST", headers: { "content-type": "application/json", authorization: "Bearer " + key }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
    const data = await res.json();
    const msg = data.choices && data.choices[0] && data.choices[0].message;
    if (!msg) break;
    messages.push(msg);
    if (msg.tool_calls && msg.tool_calls.length) {
      for (const tc of msg.tool_calls) {
        let args = {}; try { args = JSON.parse(tc.function.arguments || "{}"); } catch {}
        const result = applyTool(tc.function.name, args, state); changed = true;
        messages.push({ role: "tool", tool_call_id: tc.id, content: result });
      }
      continue;
    }
    if (changed) await saveState(state);
    return (msg.content || "…").trim();
  }
  if (changed) await saveState(state);
  return "Listo.";
}

module.exports = { TRIP, systemPrompt, callAssistant, getState, saveState, ensureShape, sbReady, getChats, addTelegramChat, dailyBrief };
