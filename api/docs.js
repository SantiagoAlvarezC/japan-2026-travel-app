// Vercel serverless function — password-gated signed download links for trip docs
// (Supabase Storage, private bucket "trip-docs"). POST /api/docs { id, pw }
const BUCKET = "trip-docs";

function sbBase() { return String(process.env.SUPABASE_URL || "").trim().replace(/\/+$/, "").replace(/\/rest\/v1$/, ""); }
function sbHeaders(extra) { const k = (process.env.SUPABASE_SERVICE_KEY || "").trim(); return Object.assign({ apikey: k, Authorization: "Bearer " + k }, extra || {}); }

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
}
async function readJson(req) {
  if (req.body !== undefined && req.body !== null) return typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  let d = ""; for await (const c of req) d += c; return d ? JSON.parse(d) : {};
}

module.exports = async (req, res) => {
  cors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "method" });
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) return res.status(503).json({ error: "not-configured" });

  let body; try { body = await readJson(req); } catch { return res.status(400).json({ error: "bad-json" }); }
  const id = (body && body.id) || "";
  const pw = (body && body.pw) || "";
  if (!/^[a-z0-9-]+$/.test(id)) return res.status(400).json({ error: "bad-id" });
  if (!process.env.DOCS_PASSWORD || pw !== process.env.DOCS_PASSWORD) return res.status(401).json({ error: "bad-password" });

  try {
    const r = await fetch(`${sbBase()}/storage/v1/object/sign/${BUCKET}/${id}.pdf`, {
      method: "POST",
      headers: sbHeaders({ "content-type": "application/json" }),
      body: JSON.stringify({ expiresIn: 120 }),
    });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j || !j.signedURL) return res.status(404).json({ error: "not-found" });
    return res.status(200).json({ ok: true, url: `${sbBase()}/storage/v1${j.signedURL}` });
  } catch (e) {
    return res.status(502).json({ error: String(e.message || e) });
  }
};
