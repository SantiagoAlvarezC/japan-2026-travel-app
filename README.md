# Viaje a Japón 2026 — Travel Companion App

A self-contained, offline-first, installable web app (PWA) for the family trip to Japan
(Santi · Geral · Nico · 28 Aug – 11 Sep 2026). Bilingual ES/EN. No build step, no backend.

## Files
- `index.html` — the whole app (CSS + render engine + all 17 screens + persistence).
- `trip.data.js` — **the only file you edit to change the trip.** All content lives here.
- `sw.js` — service worker (offline cache). Bump `CACHE` when you ship changes.
- `manifest.webmanifest` + `icons/` — makes it installable on a phone home screen.

## Screens
Inicio (countdown · route · flights) · Itinerario (15 days, hour-by-hour, your notes) ·
Lugares (map deep-links, visited toggles, your own places) · Gastos (expense split between
Santi & Geral, ¥/AUD) · Más → Comida · Hospedajes · Transporte · Maleta · Frases · Sellos
(goshuin tracker) · Documentos · Reservas · Bebé · Presupuesto · Emergencias · Respaldo.

## Run locally
```
cd app
python -m http.server 8788
```
- On this computer: http://localhost:8788/
- On your phone (same Wi-Fi): http://192.168.15.14:8788/
  (Service worker + saved data need http/https — not opening the file directly.)

## Install on a phone
1. Open the URL in the phone browser (iPhone: **Safari**).
2. Share → **Add to Home Screen**.
3. Open it once more; it now works offline. (Open it a few times before the trip — iOS can
   evict the offline cache after ~7 days unused. Use **Más → Respaldo** to export a backup.)

## Edit the trip
Open `trip.data.js`, edit the relevant array (e.g. a `days[]` entry, a `stays[]` hotel,
a `reservas[]` status `"todo"`→`"booked"`), save. Refresh the app. Your saved progress
(checklists, expenses, stamps, notes) is keyed by item `id`, so editing/reordering is safe.

## AI assistant (online)
**Más → Asistente IA** is a chat grounded in this exact itinerary — ask "what's the plan for day 6?",
get Japanese phrases, or send a photo of a menu/sign to translate. It needs a backend (the Cloudflare
Worker in `../server`); deploy that, then paste its URL into the assistant screen once. Online-only;
the rest of the app still works offline. A Telegram bot shares the same backend — see `../server/README.md`.

## Deploy as a private app (when ready)
Easiest no-account path: drag the **`app`** folder onto https://app.netlify.com/drop —
you get a private URL instantly. (Or `npx vercel` / Cloudflare Pages.) Then install that
URL on both phones. The AI assistant + Telegram bot (Phase 2) attach to the same data model.

## Data anchors
Flights JQ23/JQ24 · booking SPBPNW · KIX round-trip · 15 days / 14 nights ·
Osaka 3 · Kyoto 4 · Takayama/Alps 2 · Tokyo 5.
Currency rate is editable in **Presupuesto** (default ¥100 = A$1).
