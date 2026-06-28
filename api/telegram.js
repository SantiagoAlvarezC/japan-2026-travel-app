// Vercel serverless function — Telegram bot webhook (OpenAI). POST /api/telegram
const { callAssistant, addTelegramChat } = require("../_assistant-lib.js");

async function readJson(req) {
  if (req.body !== undefined && req.body !== null) return typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  let d = ""; for await (const c of req) d += c; return d ? JSON.parse(d) : {};
}
async function tgSend(token, chatId, text) {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text })
  });
}
async function tgPhotoBase64(token, fileId) {
  const meta = await (await fetch(`https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`)).json();
  const p = meta.result && meta.result.file_path;
  if (!p) return null;
  const buf = await (await fetch(`https://api.telegram.org/file/bot${token}/${p}`)).arrayBuffer();
  return Buffer.from(buf).toString("base64");
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(200).send("ok");
  const token = process.env.TELEGRAM_BOT_TOKEN;
  let update;
  try { update = await readJson(req); } catch { return res.status(200).send("ok"); }
  const msg = update.message || update.edited_message;
  if (!msg || !token) return res.status(200).send("ok");
  const chatId = msg.chat.id;
  try { await addTelegramChat(chatId); } catch {}
  try {
    const caption = msg.caption || msg.text || "";
    let payload;
    if (msg.photo && msg.photo.length) {
      const fileId = msg.photo[msg.photo.length - 1].file_id;
      const b64 = await tgPhotoBase64(token, fileId);
      payload = b64
        ? { text: caption, image: { media_type: "image/jpeg", data: b64 } }
        : { text: caption || "(no pude leer la foto)" };
    } else if (msg.text) {
      if (msg.text.startsWith("/start")) {
        await tgSend(token, chatId, "¡Hola! Soy su asistente de viaje a Japón 🗾. Pregúntame por el itinerario, traducciones, o mándame foto de un menú o cartel.");
        return res.status(200).send("ok");
      }
      payload = { text: msg.text };
    } else {
      return res.status(200).send("ok");
    }
    const reply = await callAssistant(payload);
    await tgSend(token, chatId, reply);
  } catch (e) {
    try { await tgSend(token, chatId, "Ups, tuve un problema: " + String(e.message || e)); } catch {}
  }
  return res.status(200).send("ok");
};
