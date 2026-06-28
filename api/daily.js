// Vercel Cron — daily Telegram brief. Runs on the schedule in vercel.json.
const { dailyBrief, getChats } = require("../_assistant-lib.js");

async function tgSend(token, chatId, text) {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text })
  });
}

module.exports = async (req, res) => {
  // Optional protection: if CRON_SECRET is set, require Vercel's cron header.
  if (process.env.CRON_SECRET) {
    const auth = req.headers["authorization"] || "";
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) return res.status(401).json({ error: "unauthorized" });
  }
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return res.status(200).json({ sent: 0, reason: "no-token" });
  let brief;
  try { brief = await dailyBrief(); } catch (e) { return res.status(502).json({ error: String(e.message || e) }); }
  if (!brief) return res.status(200).json({ sent: 0, reason: "not-a-trip-day" });
  const chats = await getChats();
  let sent = 0;
  for (const id of chats) { try { await tgSend(token, id, brief); sent++; } catch {} }
  return res.status(200).json({ sent });
};
