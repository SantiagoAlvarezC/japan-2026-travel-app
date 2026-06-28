// Vercel serverless function — in-app AI assistant (OpenAI). POST /api/chat
const { callAssistant } = require("../_assistant-lib.js");

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
  let body;
  try { body = await readJson(req); } catch { return res.status(400).json({ error: "bad json" }); }
  const text = (body.message || "").toString().slice(0, 4000);
  const image = body.image;
  if (!text && !image) return res.status(400).json({ error: "empty" });
  try {
    const reply = await callAssistant({ text, image, history: body.history });
    res.status(200).json({ reply });
  } catch (e) {
    res.status(502).json({ error: String(e.message || e) });
  }
};
