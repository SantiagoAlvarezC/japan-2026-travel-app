// Vercel serverless function — shared trip state (Supabase). GET/POST /api/state
const { getState, saveState, sbReady } = require("../_assistant-lib.js");

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
}
async function readJson(req) {
  if (req.body !== undefined && req.body !== null) return typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  let d = ""; for await (const c of req) d += c; return d ? JSON.parse(d) : {};
}

module.exports = async (req, res) => {
  cors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (!sbReady()) return res.status(200).json({ enabled: false, data: {} });
  if (req.method === "GET") {
    try { return res.status(200).json({ enabled: true, data: await getState() }); }
    catch (e) { return res.status(502).json({ enabled: true, error: String(e.message || e) }); }
  }
  if (req.method === "POST") {
    let body; try { body = await readJson(req); } catch { return res.status(400).json({ error: "bad json" }); }
    try { const r = await saveState(body.data || {}); return res.status(200).json(r); }
    catch (e) { return res.status(502).json({ error: String(e.message || e) }); }
  }
  return res.status(405).json({ error: "method" });
};
