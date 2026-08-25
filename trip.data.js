/* ============================================================================
   TRIP DATA — Japan 2026 (Santiago · Geraldine · Nico)
   ----------------------------------------------------------------------------
   This is the ONLY file you edit to change the trip. The app shell never
   hard-codes trip facts. To plan a future trip, copy this file and swap the
   contents — same app, new journey.

   Bilingual strings use { es, en }. The app picks the language at render time.
   Japanese phrase content keeps jp + romaji regardless of language.

   Checklist-style items have a STABLE string id (pr-, pk-, bb-, dc-, st-, pl-,
   rv-). State (checks, custom items, removals) is stored by id in localStorage,
   so you can freely edit/reorder this file without losing saved progress.
   ========================================================================== */

window.TRIP = {
  meta: {
    schemaVersion: 2,
    id: "japan-2026",
    title: { es: "JAPAN", en: "JAPAN" },
    subtitle: { es: "2026 · 日本の旅", en: "2026 · The Japan Journey" },
    travelers: ["Santi", "Geral", "Nico"],
    payerColors: { "Santi": "#1f3a52", "Geral": "#c13b2f", "Nico": "#5a7d4f" },
    booking: "SPBPNW",
    startDate: "2026-08-28",   // drives the countdown (JQ23 arrives Osaka this evening)
    endDate:   "2026-09-11",   // JQ24 departs KIX 21:45, lands BNE Sat 12 Sep 07:30
    nights: 14,
    flights: [
      { no: "JQ23", date: "2026-08-28", dow: { es: "Vie", en: "Fri" }, from: "BNE", fromName: { es: "Brisbane", en: "Brisbane" }, to: "KIX", toName: { es: "Osaka · Kansai (T1)", en: "Osaka · Kansai (T1)" }, dep: "11:40", arr: "19:45", dur: "9h 05m", aircraft: "Boeing 787" },
      { no: "JQ24", date: "2026-09-11", dow: { es: "Vie", en: "Fri" }, from: "KIX", fromName: { es: "Osaka · Kansai (T1)", en: "Osaka · Kansai (T1)" }, to: "BNE", toName: { es: "Brisbane (sáb 12, 07:30)", en: "Brisbane (Sat 12, 07:30)" }, dep: "21:45", arr: "07:30", dur: "8h 45m", aircraft: "Boeing 787" }
    ],
    fareNote: { es: "Economy Starter · 7kg de mano + 20kg facturado por adulto · pagado A$1,312.34", en: "Economy Starter · 7kg carry-on + 20kg checked per adult · paid A$1,312.34" },
    currency: { code: "JPY", symbol: "¥", yenPerAud: 100 }, // editable in-app
    jetstar: "https://www.jetstar.com/au/en/manage-booking",
    palette: { washi: "#f4ecdb", indigo: "#1f3a52", vermilion: "#c13b2f", gold: "#c9a24a", green: "#5a7d4f", sumi: "#3a3128" }
  },

  // Expenses already paid, pre-loaded on first run (kept once, survives deletion).
  // amount is in `currency`; the app shows both ¥ and A$.
  seedExpenses: [
    { id: "seed-flights", concept: { es: "Vuelos JQ23/JQ24 (Jetstar)", en: "Flights JQ23/JQ24 (Jetstar)" }, amount: 1312.34, currency: "AUD", payer: "Santi" }
  ],

  // bases (3+4+2+5 = 14 nights). Himeji is a transit point on the last day.
  route: [
    { kanji: "阪", city: "Osaka",    dates: { es: "28 – 31 Ago", en: "28 – 31 Aug" }, nights: { es: "3 noches", en: "3 nights" }, color: "#c13b2f" },
    { kanji: "京", city: "Kyoto",    dates: { es: "31 Ago – 3 Sep", en: "31 Aug – 3 Sep" }, nights: { es: "3 noches", en: "3 nights" }, color: "#1f3a52" },
    { kanji: "飛", city: { es: "Takayama (día) / Gero Onsen (noches)", en: "Takayama (day) / Gero Onsen (nights)" }, dates: { es: "3 – 5 Sep", en: "3 – 5 Sep" }, nights: { es: "2 noches · ryokan con onsen (Gero)", en: "2 nights · onsen ryokan (Gero)" }, color: "#5a7d4f" },
    { kanji: "東", city: "Tokyo",    dates: { es: "5 – 11 Sep", en: "5 – 11 Sep" }, nights: { es: "6 noches", en: "6 nights" }, color: "#3a3128" }
  ],

  hubCards: [
    { kanji: "程", title: { es: "Itinerario", en: "Itinerary" }, sub: { es: "15 días", en: "15 days" }, tint: "rgba(193,59,47,0.1)", screen: "plan" },
    { kanji: "備", title: { es: "Pendientes", en: "To-do" }, sub: { es: "visa, reservas…", en: "visa, bookings…" }, tint: "rgba(201,162,74,0.18)", screen: "pendientes" },
    { kanji: "地", title: { es: "Lugares", en: "Places" }, sub: { es: "qué visitar", en: "what to see" }, tint: "rgba(31,58,82,0.1)", screen: "mapa" },
    { kanji: "円", title: { es: "Gastos", en: "Expenses" }, sub: { es: "cuentas", en: "split bills" }, tint: "rgba(90,125,79,0.12)", screen: "gastos" },
    { kanji: "食", title: { es: "Comida", en: "Food" }, sub: { es: "imperdibles", en: "must-eats" }, tint: "rgba(193,59,47,0.1)", screen: "comida" },
    { kanji: "印", title: { es: "Sellos", en: "Stamps" }, sub: { es: "eki & goshuin", en: "eki & goshuin" }, tint: "rgba(201,162,74,0.18)", screen: "sellos" },
    { kanji: "他", title: { es: "Más", en: "More" }, sub: { es: "frases, maleta…", en: "phrases, packing…" }, tint: "rgba(58,49,40,0.1)", screen: "mas" }
  ],

  /* ---------------------------------------------------------------------- */
  /*  ITINERARY — 15 days, hour by hour (from the final spreadsheet)        */
  /*  Nico's naps: always in the stroller/carrier on the move — no midday   */
  /*  returns to the hotel.                                                 */
  /* ---------------------------------------------------------------------- */
  days: [
    { n: 1, date: { es: "Vie 28 Ago", en: "Fri 28 Aug" }, dateISO: "2026-08-28", city: "OSAKA", color: "#c13b2f",
      title: { es: "Llegada a Japón", en: "Arrival in Japan" },
      acts: [
        { time: "19:45", type: "🚆", text: { es: "Llegada a KIX. Migración + equipaje", en: "Land at KIX. Immigration + baggage" }, note: { es: "~45–60 min", en: "~45–60 min" } },
        { time: "20:45", type: "🚆", text: { es: "Haruka Express KIX → hotel", en: "Haruka Express KIX → hotel" }, note: { es: "¥2,900 c/u · Nico gratis", en: "¥2,900 each · Nico free" } },
        { time: "22:00", type: "📍", text: { es: "Check-in. Combini para agua y snacks", en: "Check-in. Konbini for water & snacks" }, note: { es: "7-Eleven al lado", en: "7-Eleven next door" } },
        { time: "22:30", type: "😴", text: { es: "Dormir. Cero turismo", en: "Sleep. Zero sightseeing" }, note: { es: "Jet lag — a descansar", en: "Jet lag — rest up" } }
      ],
      note: { es: "Saquen la tarjeta IC (ICOCA) en el aeropuerto. Hay salas de lactancia en KIX.", en: "Grab an IC card (ICOCA) at the airport. KIX has nursing rooms." },
      baby: { es: "Día de jet lag: noche tranquila, dejen que Nico recupere el ritmo.", en: "Jet-lag day: quiet night, let Nico find his rhythm again." } },

    { n: 2, date: { es: "Sáb 29 Ago", en: "Sat 29 Aug" }, dateISO: "2026-08-29", city: "OSAKA", color: "#c13b2f",
      title: { es: "Corazón de Osaka", en: "Heart of Osaka" },
      acts: [
        { time: "08:00", type: "🍜", text: { es: "Desayuno. Activar IC Card ICOCA", en: "Breakfast. Top up the ICOCA card" }, note: { es: "¥5,000 de carga", en: "¥5,000 load" } },
        { time: "09:30", type: "🚶", text: { es: "Caminar hacia el Castillo de Osaka", en: "Walk to Osaka Castle" }, note: { es: "Metro ~15 min", en: "Metro ~15 min" } },
        { time: "10:00", type: "📍", text: { es: "Castillo de Osaka + jardines (exterior gratis)", en: "Osaka Castle + gardens (grounds free)" }, note: { es: "Nico corre. Cochecito OK", en: "Nico can run. Stroller OK" } },
        { time: "12:00", type: "🍜", text: { es: "Almuerzo cerca del castillo", en: "Lunch near the castle" }, note: { es: "~¥1,500 c/u", en: "~¥1,500 each" } },
        { time: "13:00", type: "😴", text: { es: "Siesta de Nico en cochecito mientras caminan", en: "Nico naps in the stroller on the move" }, note: { es: "Sin volver al hotel", en: "No hotel return" } },
        { time: "14:00", type: "📍", text: { es: "Mercado Kuromon + arcade Shinsaibashi", en: "Kuromon Market + Shinsaibashi arcade" }, note: { es: "Mercado cubierto, fresco", en: "Covered, cool market" } },
        { time: "18:30", type: "🍜", text: { es: "Dotonbori: takoyaki, Glico, Kushikatsu Daruma", en: "Dotonbori: takoyaki, Glico, Kushikatsu Daruma" }, note: { es: "Cena ~¥2,000 c/u", en: "Dinner ~¥2,000 each" } },
        { time: "21:00", type: "📍", text: { es: "Vuelta al hotel", en: "Back to the hotel" }, note: { es: "", en: "" } }
      ], note: { es: "", en: "" } },

    { n: 3, date: { es: "Dom 30 Ago", en: "Sun 30 Aug" }, dateISO: "2026-08-30", city: "OSAKA", color: "#c13b2f",
      title: { es: "Universal Studios Japan", en: "Universal Studios Japan" },
      acts: [
        { time: "07:30", type: "🍜", text: { es: "Desayuno rápido + salir con la carriola", en: "Quick breakfast + head out with the stroller" }, note: { es: "Tren JR Yumesaki (transbordo en Nishikujo) ~20-25 min", en: "JR Yumesaki line (transfer at Nishikujo) ~20-25 min" } },
        { time: "08:15", type: "🎢", text: { es: "Llegada a Universal Studios Japan", en: "Arrive at Universal Studios Japan" }, note: { es: "A veces abren hasta 30-60 min antes — bueno para fotos sin gente", en: "Sometimes opens 30-60 min early — good for people-free photos" } },
        { time: "09:00", type: "📍", text: { es: "Super Nintendo World — Reino Champiñón, Castillo de Peach", en: "Super Nintendo World — Mushroom Kingdom, Peach's Castle" }, note: { es: "Pidan el Timed-Entry gratis en la app de USJ al entrar", en: "Grab the free Timed-Entry ticket in the USJ app on entry" } },
        { time: "11:00", type: "📍", text: { es: "Wizarding World — Hogsmeade + Castillo de Hogwarts", en: "Wizarding World — Hogsmeade + Hogwarts Castle" }, note: { es: "Fotos, Ollivander's, tienda de dulces", en: "Photos, Ollivander's, sweet shop" } },
        { time: "12:30", type: "🍜", text: { es: "Almuerzo dentro del parque", en: "Lunch inside the park" }, note: { es: "Food trucks temáticos", en: "Themed food trucks" } },
        { time: "13:30", type: "📍", text: { es: "Universal Wonderland — Minion Park + zona de juegos de Nico", en: "Universal Wonderland — Minion Park + Nico's play area" }, note: { es: "Sala de lactancia/cambiador junto a Guest Services", en: "Nursing/changing room by Guest Services" } },
        { time: "15:30", type: "📍", text: { es: "Hollywood Area — desfile/personajes si hay horario ese día", en: "Hollywood Area — parade/characters if scheduled that day" }, note: { es: "Revisar horario en la app al llegar", en: "Check the day's schedule in the app on arrival" } },
        { time: "17:00", type: "😊", text: { es: "Tiempo libre sin afán — recorrer y fotos, sin filas largas", en: "Unhurried free time — walk around and take photos, skip long queues" }, note: { es: "Prioridad es conocer, no montarse en todo", en: "Priority is seeing it, not riding everything" } },
        { time: "19:00", type: "🍜", text: { es: "Cena en Universal CityWalk (fuera del parque)", en: "Dinner at Universal CityWalk (outside the park)" }, note: { es: "", en: "" } },
        { time: "20:30", type: "🚆", text: { es: "Vuelta al hotel", en: "Back to the hotel" }, note: { es: "", en: "" } }
      ], note: { es: "Boleto 1-Day Studio Pass ~¥8,900 adulto (precio dinámico, domingo = más caro). Nico entra GRATIS por ser menor de 3 años. Como el plan es conocer y no hacer fila para montar, no compramos Express Pass — el Timed-Entry gratis por la app alcanza para entrar a Nintendo World.", en: "1-Day Studio Pass ~¥8,900 adult (dynamic pricing, Sunday = pricier). Nico gets in FREE (under 3). Since the plan is to see the park rather than queue for rides, skipping the paid Express Pass — the free app Timed-Entry ticket is enough to get into Nintendo World." },
      baby: { es: "Llevan su propia carriola desde BNE — no hace falta rentar en el parque. Universal Wonderland tiene sala de lactancia, cambiador y agua caliente para biberón.", en: "Bringing your own stroller from BNE — no need to rent one at the park. Universal Wonderland has a nursing room, changing table and hot water for bottles." } },

    { n: 4, date: { es: "Lun 31 Ago", en: "Mon 31 Aug" }, dateISO: "2026-08-31", city: { es: "OSAKA → NARA → KYOTO", en: "OSAKA → NARA → KYOTO" }, color: "#1f3a52",
      title: { es: "Vía Nara hacia Kyoto", en: "Via Nara to Kyoto" },
      acts: [
        { time: "08:00", type: "🍜", text: { es: "Desayuno + check-out Osaka", en: "Breakfast + check out of Osaka" }, note: { es: "Mochilas puestas", en: "Backpacks on" } },
        { time: "08:45", type: "🚆", text: { es: "Kintetsu Namba → Nara", en: "Kintetsu Namba → Nara" }, note: { es: "35 min · ¥680 · Nico gratis", en: "35 min · ¥680 · Nico free" } },
        { time: "10:00", type: "📍", text: { es: "Lockers. Parque de los ciervos de Nara", en: "Lockers. Nara Deer Park" }, note: { es: "Llegar antes de 10am por lockers", en: "Arrive before 10am for lockers" } },
        { time: "11:00", type: "📍", text: { es: "Todai-ji (Gran Buda) + sello goshuin", en: "Todai-ji (Great Buddha) + goshuin stamp" }, note: { es: "Cochecito hasta la puerta", en: "Stroller up to the gate" } },
        { time: "12:30", type: "🍜", text: { es: "Almuerzo en Naramachi", en: "Lunch in Naramachi" }, note: { es: "Calles con sombra. Nico siesta en cochecito", en: "Shady lanes. Nico naps in stroller" } },
        { time: "13:30", type: "📍", text: { es: "Kasuga Taisha — santuario de linternas + sello", en: "Kasuga Taisha — lantern shrine + stamp" }, note: { es: "Sendero entre ciervos y bosque", en: "Path through the deer and forest" } },
        { time: "15:30", type: "🚆", text: { es: "Recoger mochilas. Tren directo Nara → Kyoto", en: "Grab bags. Direct train Nara → Kyoto" }, note: { es: "~45 min · andén 3-4", en: "~45 min · platform 3-4" } },
        { time: "16:30", type: "📍", text: { es: "Check-in Kyoto (zona Estación)", en: "Check-in Kyoto (Station area)" }, note: { es: "", en: "" } },
        { time: "18:00", type: "📍", text: { es: "Gion + Santuario Yasaka + cena en Pontocho", en: "Gion + Yasaka Shrine + dinner in Pontocho" }, note: { es: "Barrio de geishas + río Kamo", en: "Geisha district + Kamo river" } }
      ], note: { es: "De camino, no ir-y-volver: lockers o mochilas puestas en Nara.", en: "On the way — don't backtrack: lockers or bags-on in Nara." } },

    { n: 5, date: { es: "Mar 1 Sep", en: "Tue 1 Sep" }, dateISO: "2026-09-01", city: { es: "KYOTO (este)", en: "KYOTO (east)" }, color: "#1f3a52",
      title: { es: "Kyoto Este: Fushimi y Higashiyama", en: "East Kyoto: Fushimi & Higashiyama" },
      acts: [
        { time: "06:30", type: "🍜", text: { es: "Desayuno MUY temprano", en: "VERY early breakfast" }, note: { es: "Fushimi Inari sin gente", en: "Fushimi Inari before the crowds" } },
        { time: "07:00", type: "🚆", text: { es: "Tren a Fushimi Inari", en: "Train to Fushimi Inari" }, note: { es: "~5 min", en: "~5 min" } },
        { time: "07:30", type: "📍", text: { es: "Fushimi Inari — mil torii + sello", en: "Fushimi Inari — thousand torii + stamp" }, note: { es: "Primeros tramos con cochecito", en: "Lower stretches stroller-friendly" } },
        { time: "11:00", type: "📍", text: { es: "Kiyomizu-dera + Sannenzaka/Ninenzaka + sello", en: "Kiyomizu-dera + Sannenzaka/Ninenzaka + stamp" }, note: { es: "Calles antiguas. Kimono opcional", en: "Old lanes. Kimono optional" } },
        { time: "13:00", type: "🍜", text: { es: "Almuerzo en Higashiyama", en: "Lunch in Higashiyama" }, note: { es: "Nico siesta en cochecito", en: "Nico naps in stroller" } },
        { time: "15:00", type: "📍", text: { es: "Ginkaku-ji + Camino del Filósofo + Nanzen-ji", en: "Ginkaku-ji + Philosopher's Path + Nanzen-ji" }, note: { es: "Opcional, todo en el este. Sellos", en: "Optional, all in the east. Stamps" } },
        { time: "19:00", type: "🍜", text: { es: "Cena en izakaya céntrico", en: "Dinner at a central izakaya" }, note: { es: "~¥2,000 c/u", en: "~¥2,000 each" } }
      ], note: { es: "Todo el día en el este de Kyoto: menos tren, más templos.", en: "Whole day in east Kyoto: less train, more temples." } },

    { n: 6, date: { es: "Mié 2 Sep", en: "Wed 2 Sep" }, dateISO: "2026-09-02", city: { es: "KYOTO (oeste)", en: "KYOTO (west)" }, color: "#1f3a52",
      title: { es: "Kyoto Oeste: Arashiyama y el Dorado", en: "West Kyoto: Arashiyama & the Golden Pavilion" },
      acts: [
        { time: "08:00", type: "🚆", text: { es: "Tren Sagano a Arashiyama (temprano)", en: "Sagano line to Arashiyama (early)" }, note: { es: "~20 min", en: "~20 min" } },
        { time: "08:30", type: "📍", text: { es: "Bosque de bambú + puente Togetsukyo", en: "Bamboo Grove + Togetsukyo Bridge" }, note: { es: "Luz mágica temprano", en: "Magic light at dawn" } },
        { time: "10:00", type: "📍", text: { es: "Jardín Tenryu-ji + sello", en: "Tenryu-ji garden + stamp" }, note: { es: "Cochecito OK", en: "Stroller OK" } },
        { time: "12:00", type: "🍜", text: { es: "Almuerzo tofu kaiseki en Arashiyama", en: "Tofu kaiseki lunch in Arashiyama" }, note: { es: "Nico siesta en cochecito de regreso", en: "Nico naps in stroller on the way back" } },
        { time: "14:30", type: "📍", text: { es: "Kinkaku-ji (Templo Dorado) + Ryoan-ji + sellos", en: "Kinkaku-ji (Golden Pavilion) + Ryoan-ji + stamps" }, note: { es: "¥500 c/u", en: "¥500 each" } },
        { time: "16:30", type: "📍", text: { es: "Castillo Nijo (suelos ruiseñor) + sello", en: "Nijo Castle (nightingale floors) + stamp" }, note: { es: "Opcional, de camino al centro", en: "Optional, on the way to the centre" } },
        { time: "18:00", type: "📍", text: { es: "Mercado Nishiki / compras", en: "Nishiki Market / shopping" }, note: { es: "Última tarde en Kyoto", en: "Last afternoon in Kyoto" } },
        { time: "19:30", type: "🍜", text: { es: "Cena especial — última noche en Kyoto", en: "Special dinner — last night in Kyoto" }, note: { es: "Reservar. Empacar para Takayama", en: "Book ahead. Pack for Takayama" } }
      ], note: { es: "Oeste/noroeste de Kyoto en un barrido. Mañana, los Alpes.", en: "West/northwest Kyoto in one sweep. Tomorrow, the Alps." } },

    { n: 7, date: { es: "Jue 3 Sep", en: "Thu 3 Sep" }, dateISO: "2026-09-03", city: { es: "KYOTO → TAKAYAMA", en: "KYOTO → TAKAYAMA" }, color: "#5a7d4f",
      title: { es: "A los Alpes Japoneses", en: "Into the Japanese Alps" },
      acts: [
        { time: "07:15", type: "🍜", text: { es: "Desayuno + check-out", en: "Breakfast + check-out" }, note: { es: "Mochilas listas", en: "Bags ready" } },
        { time: "08:31", type: "🚆", text: { es: "Hida directo Kyoto → Takayama", en: "Hida limited express Kyoto → Takayama" }, note: { es: "3h40 · ¥11,260 · llega 12:14", en: "3h40 · ¥11,260 · arrives 12:14" } },
        { time: "12:30", type: "🍜", text: { es: "Almuerzo en Takayama (¡Hida beef!)", en: "Lunch in Takayama (Hida beef!)" }, note: { es: "Guardar mochilas en lockers de la estación", en: "Stash bags in station lockers" } },
        { time: "14:00", type: "📍", text: { es: "Sanmachi Suji — casco antiguo Edo (+ Takayama Jinya opcional)", en: "Sanmachi Suji — old Edo quarter (+ Takayama Jinya optional)" }, note: { es: "Casas de madera, sake", en: "Wooden houses, sake" } },
        { time: "16:00", type: "🚆", text: { es: "Recoger mochilas. Tren Takayama → Gero", en: "Grab bags. Train Takayama → Gero" }, note: { es: "Hida/local, ~45 min", en: "Hida/local, ~45 min" } },
        { time: "17:00", type: "♨️", text: { es: "Check-in RYOKAN con onsen (en GERO, no Takayama)", en: "Check-in ONSEN RYOKAN (in GERO, not Takayama)" }, note: { es: "9 min a pie desde la estación de Gero", en: "9 min walk from Gero station" } },
        { time: "18:00", type: "♨️", text: { es: "Onsen del ryokan", en: "Ryokan onsen" }, note: { es: "Japón de antaño", en: "Old Japan" } },
        { time: "19:30", type: "🍜", text: { es: "Cena kaiseki en el ryokan (Hida beef)", en: "Kaiseki dinner at the ryokan (Hida beef)" }, note: { es: "Incluida", en: "Included" } },
        { time: "21:30", type: "😴", text: { es: "Dormir en futón sobre tatami", en: "Sleep on a futon over tatami" }, note: { es: "", en: "" } }
      ],
      note: { es: "El tren Hida sale pocas veces al día — reservar asiento. Entre Takayama y Gero también hay trenes locales de la misma línea, con más margen de horario.", en: "The Hida runs only a few times a day — reserve seats. Local trains on the same line also run between Takayama and Gero, giving more scheduling flexibility." },
      baby: { es: "Reserven habitación con onsen privado (kashikiri) para bañarse con Nico.", en: "Book a room with a private onsen (kashikiri) to bathe with Nico." } },

    { n: 8, date: { es: "Vie 4 Sep", en: "Fri 4 Sep" }, dateISO: "2026-09-04", city: { es: "SHIRAKAWA-GO", en: "SHIRAKAWA-GO" }, color: "#5a7d4f",
      title: { es: "Aldea Patrimonio UNESCO", en: "UNESCO heritage village" },
      acts: [
        { time: "06:45", type: "🍜", text: { es: "Desayuno en el ryokan (Gero, incluido)", en: "Breakfast at the ryokan (Gero, included)" }, note: { es: "", en: "" } },
        { time: "07:15", type: "🚆", text: { es: "Tren Gero → Takayama", en: "Train Gero → Takayama" }, note: { es: "Hida/local, ~45 min", en: "Hida/local, ~45 min" } },
        { time: "08:00", type: "🍜", text: { es: "Mercado matutino de Takayama (opcional)", en: "Takayama morning market (optional)" }, note: { es: "Miyagawa, junto al río", en: "Miyagawa, by the river" } },
        { time: "08:50", type: "🚌", text: { es: "Bus Takayama → Shirakawa-go", en: "Bus Takayama → Shirakawa-go" }, note: { es: "50 min · reservar bus", en: "50 min · reserve the bus" } },
        { time: "09:45", type: "📍", text: { es: "Shirakawa-go — casas gassho-zukuri", en: "Shirakawa-go — gassho-zukuri houses" }, note: { es: "Verde en sep. Mirador Shiroyama", en: "Green in Sep. Shiroyama viewpoint" } },
        { time: "12:30", type: "🍜", text: { es: "Almuerzo (soba, gohei mochi)", en: "Lunch (soba, gohei mochi)" }, note: { es: "Nico siesta en cochecito, pasean el pueblo", en: "Nico naps in stroller, stroll the village" } },
        { time: "15:00", type: "🚌", text: { es: "Bus de vuelta a Takayama", en: "Bus back to Takayama" }, note: { es: "50 min", en: "50 min" } },
        { time: "16:00", type: "🚆", text: { es: "Tren Takayama → Gero", en: "Train Takayama → Gero" }, note: { es: "Hida/local, ~45 min", en: "Hida/local, ~45 min" } },
        { time: "17:00", type: "♨️", text: { es: "Onsen + descanso en el ryokan (Gero)", en: "Onsen + rest at the ryokan (Gero)" }, note: { es: "", en: "" } },
        { time: "19:00", type: "🍜", text: { es: "Cena kaiseki en el ryokan (incluida)", en: "Kaiseki dinner at the ryokan (included)" }, note: { es: "Sin salir de nuevo — ya se comió Hida beef ayer", en: "No need to go out again — had Hida beef yesterday" } }
      ], note: { es: "Última noche en los Alpes (durmiendo en Gero). Mañana, sábado: a Tokio + Daikoku, saliendo directo desde Gero.", en: "Last night in the Alps (sleeping in Gero). Tomorrow, Saturday: to Tokyo + Daikoku, departing straight from Gero." } },

    { n: 9, date: { es: "Sáb 5 Sep", en: "Sat 5 Sep" }, dateISO: "2026-09-05", city: { es: "TAKAYAMA → TOKYO", en: "TAKAYAMA → TOKYO" }, color: "#3a3128",
      title: { es: "A Tokio + Daikoku PA (sábado)", en: "To Tokyo + Daikoku PA (Saturday)" },
      acts: [
        { time: "07:00", type: "🍜", text: { es: "Desayuno + check-out del ryokan (Gero)", en: "Breakfast + check out of the ryokan (Gero)" }, note: { es: "Salir temprano", en: "Leave early" } },
        { time: "08:30", type: "🚆", text: { es: "Hida directo Gero → Nagoya", en: "Hida direct Gero → Nagoya" }, note: { es: "~1h35 · se aborda en Gero, no hace falta volver a Takayama · confirmar horario exacto al reservar", en: "~1h35 · board at Gero, no need to backtrack to Takayama · confirm exact time when booking" } },
        { time: "11:15", type: "🚄", text: { es: "Shinkansen Nagoya → Tokio", en: "Shinkansen Nagoya → Tokyo" }, note: { es: "~1h40 · llega ~13:00 · ekiben · más margen que antes gracias al tren directo desde Gero", en: "~1h40 · arrives ~13:00 · ekiben · extra buffer now thanks to boarding direct from Gero" } },
        { time: "13:45", type: "📍", text: { es: "Check-in Asakusa (APA Kaminarimon), dejar maletas, descanso", en: "Check-in Asakusa (APA Kaminarimon), drop bags, rest" }, note: { es: "", en: "" } },
        { time: "16:30", type: "🏎", text: { es: "SANTIAGO: pickup en hotel → Daikoku PA", en: "SANTIAGO: hotel pickup → Daikoku PA" }, note: { es: "~A$300 · confirmar hora con el operador", en: "~A$300 · confirm time with operator" } },
        { time: "21:00", type: "🏎", text: { es: "Daikoku PA — encuentro JDM (sábado = más gente)", en: "Daikoku PA — JDM meet (Saturday = more cars)" }, note: { es: "GTR, Supra, RX-7. Tu noche", en: "GTR, Supra, RX-7. Your night" } }
      ],
      note: { es: "Daikoku en sábado, como querías. Toma el Hida de la mañana para llegar con margen.", en: "Daikoku on a Saturday, as wanted. Take the morning Hida to arrive with margin." },
      baby: { es: "Geral y Nico: tarde tranquila en Asakusa y cena temprana mientras Santiago sale.", en: "Geral and Nico: easy afternoon in Asakusa and early dinner while Santiago heads out." } },

    { n: 10, date: { es: "Dom 6 Sep", en: "Sun 6 Sep" }, dateISO: "2026-09-06", city: "TOKYO", color: "#3a3128",
      title: { es: "Asakusa, Harajuku y Shibuya", en: "Asakusa, Harajuku & Shibuya" },
      acts: [
        { time: "08:45", type: "🚆", text: { es: "Metro a Asakusa", en: "Metro to Asakusa" }, note: { es: "~30 min", en: "~30 min" } },
        { time: "09:15", type: "📍", text: { es: "Senso-ji + calle Nakamise + sello", en: "Senso-ji + Nakamise Street + stamp" }, note: { es: "Templo más antiguo de Tokio", en: "Tokyo's oldest temple" } },
        { time: "11:30", type: "🚆", text: { es: "Metro a Harajuku", en: "Metro to Harajuku" }, note: { es: "~35 min", en: "~35 min" } },
        { time: "12:30", type: "🍜", text: { es: "Almuerzo + crepes en Takeshita St", en: "Lunch + crepes on Takeshita St" }, note: { es: "Cultura pop", en: "Pop culture" } },
        { time: "14:30", type: "📍", text: { es: "Meiji Jingu + Parque Yoyogi + sello", en: "Meiji Jingu + Yoyogi Park + stamp" }, note: { es: "Nico siesta en cochecito acá. Sombra", en: "Nico naps in stroller here. Shade" } },
        { time: "17:00", type: "📍", text: { es: "Cruce de Shibuya + estatua de Hachiko", en: "Shibuya Crossing + Hachiko statue" }, note: { es: "Luz de tarde", en: "Evening light" } },
        { time: "17:30", type: "🏎️", text: { es: "Check-in Street Kart Shibuya — traje + briefing", en: "Street Kart Shibuya check-in — costume + briefing" }, note: { es: "Santiago maneja (IDP obligatorio). Geral y Nico ven/graban", en: "Santiago drives (IDP required). Geral & Nico watch/film" } },
        { time: "18:00", type: "🏎️", text: { es: "Tour en kart por Shibuya/Harajuku (~1h)", en: "Kart tour through Shibuya/Harajuku (~1h)" }, note: { es: "~AUD $150 + seguro opcional ~AUD $9", en: "~AUD $150 + optional insurance ~AUD $9" } },
        { time: "20:00", type: "🍜", text: { es: "Ichiran Ramen en Shinjuku", en: "Ichiran Ramen in Shinjuku" }, note: { es: "La experiencia ramen", en: "The ramen experience" } }
      ], note: { es: "Santiago necesita su IDP (RACQ, AUD $55) sacado en Australia ANTES de viajar — no se puede tramitar en Japón.", en: "Santiago needs his IDP (RACQ, AUD $55) obtained in Australia BEFORE travel — cannot be issued in Japan." } },

    { n: 11, date: { es: "Lun 7 Sep", en: "Mon 7 Sep" }, dateISO: "2026-09-07", city: { es: "TOKYO + HAKONE", en: "TOKYO + HAKONE" }, color: "#3a3128",
      title: { es: "Fuji y el torii flotante", en: "Fuji & the floating torii" },
      acts: [
        { time: "07:30", type: "🍜", text: { es: "Desayuno temprano", en: "Early breakfast" }, note: { es: "Día a Hakone (entre semana, menos gente)", en: "Day trip to Hakone (weekday, fewer crowds)" } },
        { time: "08:00", type: "🚆", text: { es: "Odakyu Romance Car → Hakone", en: "Odakyu Romance Car → Hakone" }, note: { es: "85 min · ¥3,370 · reservado", en: "85 min · ¥3,370 · reserved" } },
        { time: "10:00", type: "📍", text: { es: "Museo al Aire Libre de Hakone", en: "Hakone Open Air Museum" }, note: { es: "Esculturas, cochecito OK", en: "Sculptures, stroller OK" } },
        { time: "12:30", type: "🍜", text: { es: "Almuerzo en Gora", en: "Lunch in Gora" }, note: { es: "", en: "" } },
        { time: "14:00", type: "🚠", text: { es: "Teleférico Owakudani (huevos negros)", en: "Owakudani ropeway (black eggs)" }, note: { es: "Vistas volcánicas", en: "Volcanic views" } },
        { time: "15:30", type: "📍", text: { es: "Lago Ashi: TORII FLOTANTE + Fuji + sello", en: "Lake Ashi: FLOATING TORII + Fuji + stamp" }, note: { es: "¡Tu torii sobre el agua! En barco", en: "Your torii on the water! By boat" } },
        { time: "17:30", type: "🚆", text: { es: "Romance Car de vuelta", en: "Romance Car back" }, note: { es: "85 min", en: "85 min" } },
        { time: "19:30", type: "🍜", text: { es: "Cena en Omoide Yokocho, Shinjuku", en: "Dinner at Omoide Yokocho, Shinjuku" }, note: { es: "Yakitori en callejón", en: "Yakitori alley" } }
      ], note: { es: "NO Nikko (escaleras, sin acceso para cochecito).", en: "Not Nikko (stairs, no stroller access)." } },

    { n: 12, date: { es: "Mar 8 Sep", en: "Tue 8 Sep" }, dateISO: "2026-09-08", city: "TOKYO", color: "#3a3128",
      title: { es: "Odaiba, teamLab y Skytree", en: "Odaiba, teamLab & Skytree" },
      acts: [
        { time: "09:30", type: "🚆", text: { es: "Rinkai Line a Odaiba", en: "Rinkai Line to Odaiba" }, note: { es: "", en: "" } },
        { time: "10:00", type: "📍", text: { es: "Gundam Unicorn gigante + Rainbow Bridge", en: "Giant Unicorn Gundam + Rainbow Bridge" }, note: { es: "Gratis. Foto obligatoria", en: "Free. Photo a must" } },
        { time: "12:30", type: "🍜", text: { es: "Almuerzo en Odaiba", en: "Lunch in Odaiba" }, note: { es: "Nico siesta en cochecito hacia teamLab", en: "Nico naps in stroller toward teamLab" } },
        { time: "14:30", type: "📍", text: { es: "teamLab Planets, Toyosu (RESERVADO)", en: "teamLab Planets, Toyosu (BOOKED)" }, note: { es: "Inmersivo, descalzo. Nico gratis/reducido", en: "Immersive, barefoot. Nico free/reduced" } },
        { time: "17:30", type: "📍", text: { es: "Tokyo Skytree mirador + Solamachi", en: "Tokyo Skytree deck + Solamachi" }, note: { es: "Vistas nocturnas", en: "Night views" } },
        { time: "19:30", type: "🍜", text: { es: "Cena en Solamachi", en: "Dinner in Solamachi" }, note: { es: "", en: "" } }
      ], note: { es: "teamLab se agota — reservar con semanas de anticipación.", en: "teamLab sells out — book weeks ahead." } },

    { n: 13, date: { es: "Mié 9 Sep", en: "Wed 9 Sep" }, dateISO: "2026-09-09", city: "TOKYO", color: "#3a3128",
      title: { es: "Tsukiji, Ueno y Yanaka", en: "Tsukiji, Ueno & Yanaka" },
      acts: [
        { time: "08:30", type: "🍜", text: { es: "Tsukiji Outer Market — comida callejera", en: "Tsukiji Outer Market — street food" }, note: { es: "Sushi fresco", en: "Fresh sushi" } },
        { time: "11:00", type: "📍", text: { es: "Ueno: Museo Nacional de Tokio + Toshogu + sello", en: "Ueno: Tokyo National Museum + Toshogu + stamp" }, note: { es: "El mejor museo de cultura japonesa", en: "Japan's top cultural museum" } },
        { time: "13:00", type: "🍜", text: { es: "Almuerzo. Nico siesta en cochecito", en: "Lunch. Nico naps in stroller" }, note: { es: "", en: "" } },
        { time: "14:30", type: "📍", text: { es: "Barrio viejo de Yanaka (Yanaka Ginza)", en: "Old-town Yanaka (Yanaka Ginza)" }, note: { es: "Tokio auténtico: callejuelas y gatos", en: "Authentic old Tokyo: alleys and cats" } },
        { time: "16:30", type: "📍", text: { es: "Akihabara — anime, gaming, electrónica", en: "Akihabara — anime, gaming, electronics" }, note: { es: "Contraste pop. Nico en cochecito", en: "Pop contrast. Nico in stroller" } },
        { time: "19:00", type: "🍜", text: { es: "Cena por la zona", en: "Dinner nearby" }, note: { es: "", en: "" } }
      ], note: { es: "Cultura (museo + barrio viejo) con el contraste otaku de Akihabara.", en: "Culture (museum + old town) with Akihabara's otaku contrast." } },

    { n: 14, date: { es: "Jue 10 Sep", en: "Thu 10 Sep" }, dateISO: "2026-09-10", city: "TOKYO", color: "#3a3128",
      title: { es: "Último día completo (libre)", en: "Last full day (free)" },
      acts: [
        { time: "09:00", type: "🍜", text: { es: "Desayuno sin prisa", en: "Unhurried breakfast" }, note: { es: "El día colchón", en: "The buffer day" } },
        { time: "10:30", type: "📍", text: { es: "Lo que falte o repetir favorito", en: "Whatever's left, or a repeat favourite" }, note: { es: "Ginza, Ueno, Shimokitazawa, compras…", en: "Ginza, Ueno, Shimokitazawa, shopping…" } },
        { time: "13:00", type: "🍜", text: { es: "Almuerzo tranquilo", en: "Relaxed lunch" }, note: { es: "Nico siesta en cochecito", en: "Nico naps in stroller" } },
        { time: "16:00", type: "📍", text: { es: "Compras de souvenirs / última vuelta", en: "Souvenir shopping / last stroll" }, note: { es: "Kit-Kats, regalos", en: "Kit-Kats, gifts" } },
        { time: "19:00", type: "🍜", text: { es: "Cena especial — última en Tokio", en: "Special dinner — last in Tokyo" }, note: { es: "Date un gusto", en: "Treat yourselves" } },
        { time: "21:00", type: "🎒", text: { es: "Empacar — mañana traslado + Himeji", en: "Pack — transfer + Himeji tomorrow" }, note: { es: "Última noche en Tokio", en: "Last night in Tokyo" } }
      ], note: { es: "", en: "" } },

    { n: 15, date: { es: "Vie 11 Sep", en: "Fri 11 Sep" }, dateISO: "2026-09-11", city: { es: "TOKYO → HIMEJI → KIX", en: "TOKYO → HIMEJI → KIX" }, color: "#6b5f4c",
      title: { es: "Himeji y sayonara", en: "Himeji & sayonara" },
      acts: [
        { time: "07:30", type: "🍜", text: { es: "Desayuno + check-out temprano", en: "Breakfast + early check-out" }, note: { es: "Vuelo 21:45 — hay tiempo", en: "Flight 21:45 — time to spare" } },
        { time: "08:00", type: "🚄", text: { es: "Shinkansen Tokyo → Himeji", en: "Shinkansen Tokyo → Himeji" }, note: { es: "~3h05 · vía Shin-Osaka", en: "~3h05 · via Shin-Osaka" } },
        { time: "10:45", type: "📍", text: { es: "Lockers en estación de Himeji", en: "Lockers at Himeji Station" }, note: { es: "15 min a pie al castillo", en: "15 min walk to the castle" } },
        { time: "11:15", type: "📍", text: { es: "Castillo de Himeji — el más bello de Japón + sello", en: "Himeji Castle — Japan's most beautiful + stamp" }, note: { es: "~2h. Espectacular", en: "~2h. Spectacular" } },
        { time: "13:15", type: "📍", text: { es: "Jardín Koko-en (opcional, junto al castillo)", en: "Koko-en garden (optional, next to the castle)" }, note: { es: "9 jardines estilo Edo · ~45 min", en: "9 Edo-style gardens · ~45 min" } },
        { time: "14:30", type: "🚆", text: { es: "Himeji → KIX (JR + Haruka)", en: "Himeji → KIX (JR + Haruka)" }, note: { es: "~2h", en: "~2h" } },
        { time: "17:00", type: "📍", text: { es: "Check-in KIX", en: "Check-in KIX" }, note: { es: "Área de juegos para Nico", en: "Play area for Nico" } },
        { time: "18:30", type: "🍜", text: { es: "Última cena + compras en KIX", en: "Last dinner + shopping at KIX" }, note: { es: "Kit-Kats, souvenirs", en: "Kit-Kats, souvenirs" } },
        { time: "21:45", type: "✈️", text: { es: "Vuelo JQ24 → Brisbane", en: "Flight JQ24 → Brisbane" }, note: { es: "Llega sáb 7:30 AM", en: "Arrives Sat 7:30 AM" } }
      ], note: { es: "またね — ¡hasta la próxima, Japón!", en: "またね — until next time, Japan!" } }
  ],

  /* ---------------------------------------------------------------------- */
  /*  PLACES (Mapa / Lugares) — visited toggles. maps = Google Maps query.  */
  /* ---------------------------------------------------------------------- */
  placeGroups: [
    { city: "Osaka", kanji: "阪", color: "#c13b2f", places: [
      { id: "pl-os1", name: "Dotonbori", desc: { es: "Luces, Glico y street food", en: "Lights, Glico & street food" }, tag: { es: "Noche", en: "Night" }, maps: "Dotonbori, Osaka", lat: 34.6687, lng: 135.5013 },
      { id: "pl-os2", name: { es: "Castillo de Osaka", en: "Osaka Castle" }, desc: { es: "Fortaleza histórica y jardines", en: "Historic fortress & gardens" }, tag: { es: "Historia", en: "History" }, maps: "Osaka Castle", lat: 34.6873, lng: 135.5259 },
      { id: "pl-os3", name: { es: "Mercado Kuromon", en: "Kuromon Market" }, desc: { es: "Mariscos y frutas frescas", en: "Fresh seafood & fruit" }, tag: { es: "Comida", en: "Food" }, maps: "Kuromon Ichiba Market", lat: 34.6655, lng: 135.5061 },
      { id: "pl-os7", name: "Universal Studios Japan", desc: { es: "Super Nintendo World + Wizarding World", en: "Super Nintendo World + Wizarding World" }, tag: { es: "Parque", en: "Theme park" }, maps: "Universal Studios Japan", lat: 34.6654, lng: 135.4323 }
    ]},
    { city: { es: "Kyoto y Nara", en: "Kyoto & Nara" }, kanji: "京", color: "#1f3a52", places: [
      { id: "pl-ky1", name: "Fushimi Inari", desc: { es: "Miles de toriis rojos", en: "Thousands of red torii" }, tag: { es: "Icono", en: "Icon" }, maps: "Fushimi Inari Taisha", lat: 34.9671, lng: 135.7727 },
      { id: "pl-ky2", name: { es: "Bosque de Bambú", en: "Bamboo Grove" }, desc: { es: "Arashiyama", en: "Arashiyama" }, tag: { es: "Naturaleza", en: "Nature" }, maps: "Arashiyama Bamboo Grove", lat: 35.0170, lng: 135.6716 },
      { id: "pl-ky3", name: "Kinkaku-ji", desc: { es: "Pabellón Dorado", en: "Golden Pavilion" }, tag: { es: "Templo", en: "Temple" }, maps: "Kinkaku-ji", lat: 35.0394, lng: 135.7292 },
      { id: "pl-ky4", name: "Kiyomizu-dera", desc: { es: "Terraza con vistas", en: "Terrace with views" }, tag: { es: "Templo", en: "Temple" }, maps: "Kiyomizu-dera", lat: 34.9949, lng: 135.7850 },
      { id: "pl-ky5", name: "Gion", desc: { es: "Barrio de geishas", en: "Geisha district" }, tag: { es: "Cultura", en: "Culture" }, maps: "Gion, Kyoto", lat: 35.0037, lng: 135.7752 },
      { id: "pl-ky7", name: { es: "Ginkaku-ji + Camino del Filósofo", en: "Ginkaku-ji + Philosopher's Path" }, desc: { es: "Pabellón de Plata", en: "Silver Pavilion" }, tag: { es: "Templo", en: "Temple" }, maps: "Ginkaku-ji", lat: 35.0270, lng: 135.7982 },
      { id: "pl-ky8", name: { es: "Castillo Nijo", en: "Nijo Castle" }, desc: { es: "Suelos ruiseñor (UNESCO)", en: "Nightingale floors (UNESCO)" }, tag: { es: "Historia", en: "History" }, maps: "Nijo Castle Kyoto", lat: 35.0142, lng: 135.7481 },
      { id: "pl-ky6", name: { es: "Nara · Todai-ji + Kasuga", en: "Nara · Todai-ji + Kasuga" }, desc: { es: "Gran Buda, ciervos y linternas", en: "Great Buddha, deer & lanterns" }, tag: { es: "Excursión", en: "Day trip" }, maps: "Todai-ji, Nara", lat: 34.6890, lng: 135.8398 }
    ]},
    { city: { es: "Takayama / Alpes", en: "Takayama / Alps" }, kanji: "飛", color: "#5a7d4f", places: [
      { id: "pl-tk_a1", name: "Sanmachi Suji", desc: { es: "Casco antiguo de Takayama", en: "Old town of Takayama" }, tag: { es: "Edo", en: "Edo" }, maps: "Sanmachi Suji, Takayama", lat: 36.1408, lng: 137.2580 },
      { id: "pl-tk_a2", name: "Shirakawa-go", desc: { es: "Aldea gassho-zukuri (UNESCO)", en: "Gassho-zukuri village (UNESCO)" }, tag: { es: "UNESCO", en: "UNESCO" }, maps: "Shirakawa-go", lat: 36.2575, lng: 136.9066 },
      { id: "pl-tk_a3", name: { es: "Onsen del ryokan (Gero, no Takayama)", en: "Ryokan onsen (Gero, not Takayama)" }, desc: { es: "Ooedo Onsen Monogatari Gero Bekkan — aguas termales y kaiseki, ~45 min en tren desde Takayama", en: "Ooedo Onsen Monogatari Gero Bekkan — hot springs & kaiseki, ~45 min by train from Takayama" }, tag: { es: "♨ Onsen", en: "♨ Onsen" }, maps: "Ooedo Onsen Monogatari Gero Bekkan", lat: 35.81025, lng: 137.240717 }
    ]},
    { city: { es: "Tokyo y alrededores", en: "Tokyo & around" }, kanji: "東", color: "#3a3128", places: [
      { id: "pl-tk1", name: "Senso-ji", desc: { es: "Templo más antiguo, Asakusa", en: "Oldest temple, Asakusa" }, tag: { es: "Templo", en: "Temple" }, maps: "Senso-ji", lat: 35.7148, lng: 139.7967 },
      { id: "pl-tk2", name: { es: "Cruce de Shibuya", en: "Shibuya Crossing" }, desc: { es: "El cruce más famoso", en: "The most famous crossing" }, tag: { es: "Icono", en: "Icon" }, maps: "Shibuya Crossing", lat: 35.6595, lng: 139.7004 },
      { id: "pl-tk10", name: "Street Kart Shibuya", desc: { es: "Kart real-life por las calles (Santiago maneja)", en: "Real-life street kart (Santiago drives)" }, tag: { es: "Aventura", en: "Adventure" }, maps: "Street Kart Shibuya", lat: 35.6598, lng: 139.7016 },
      { id: "pl-tk3", name: "teamLab", desc: { es: "Arte digital inmersivo", en: "Immersive digital art" }, tag: { es: "Arte", en: "Art" }, maps: "teamLab Planets Tokyo", lat: 35.6498, lng: 139.7905 },
      { id: "pl-tk4", name: { es: "Santuario Meiji", en: "Meiji Shrine" }, desc: { es: "Bosque en plena ciudad", en: "Forest in the city" }, tag: { es: "Calma", en: "Calm" }, maps: "Meiji Jingu", lat: 35.6764, lng: 139.6993 },
      { id: "pl-tk5", name: "Akihabara", desc: { es: "Anime, manga y tecnología", en: "Anime, manga & tech" }, tag: { es: "Friki", en: "Geek" }, maps: "Akihabara", lat: 35.6984, lng: 139.7731 },
      { id: "pl-tk8", name: { es: "Ueno · Museo Nacional", en: "Ueno · National Museum" }, desc: { es: "Parque, museos y Toshogu", en: "Park, museums & Toshogu" }, tag: { es: "Cultura", en: "Culture" }, maps: "Tokyo National Museum", lat: 35.7188, lng: 139.7765 },
      { id: "pl-tk9", name: "Yanaka", desc: { es: "Barrio viejo, callejuelas", en: "Old town, alleys" }, tag: { es: "Cultura", en: "Culture" }, maps: "Yanaka Ginza Tokyo", lat: 35.7276, lng: 139.7660 },
      { id: "pl-tk6", name: { es: "Hakone · torii del Lago Ashi", en: "Hakone · Lake Ashi torii" }, desc: { es: "Torii flotante + Fuji", en: "Floating torii + Fuji" }, tag: { es: "Excursión", en: "Day trip" }, maps: "Hakone Shrine Lake Ashi torii", lat: 35.2044, lng: 139.0257 },
      { id: "pl-tk7", name: { es: "Castillo de Himeji", en: "Himeji Castle" }, desc: { es: "El más bello de Japón", en: "Japan's most beautiful" }, tag: { es: "Último día", en: "Last day" }, maps: "Himeji Castle", lat: 34.8394, lng: 134.6939 }
    ]}
  ],

  /* ---------------------------------------------------------------------- */
  /*  FOOD                                                                  */
  /* ---------------------------------------------------------------------- */
  foods: [
    { name: "Takoyaki", jp: "たこ焼き", desc: { es: "Bolitas de pulpo, alma de Osaka.", en: "Octopus balls, the soul of Osaka." }, where: { es: "Dotonbori, Osaka", en: "Dotonbori, Osaka" } },
    { name: "Okonomiyaki", jp: "お好み焼き", desc: { es: "Tortilla salada a tu gusto.", en: "Savory pancake, your way." }, where: { es: "Osaka", en: "Osaka" } },
    { name: "Ramen", jp: "ラーメン", desc: { es: "Caldo y fideos, mil estilos.", en: "Broth and noodles, endless styles." }, where: { es: "En todo Japón", en: "All over Japan" } },
    { name: { es: "Sushi y Sashimi", en: "Sushi & Sashimi" }, jp: "寿司", desc: { es: "Fresco del mercado.", en: "Fresh from the market." }, where: { es: "Mercados Kuromon / Tsukiji", en: "Kuromon / Tsukiji markets" } },
    { name: "Hida Wagyu", jp: "飛騨牛", desc: { es: "La estrella de Takayama.", en: "The star of Takayama." }, where: { es: "Takayama", en: "Takayama" } },
    { name: "Kaiseki", jp: "懐石", desc: { es: "Cena tradicional de varios platos.", en: "Traditional multi-course dinner." }, where: { es: "Ryokan con onsen en Gero", en: "Onsen ryokan in Gero" } },
    { name: { es: "Matcha y Wagashi", en: "Matcha & Wagashi" }, jp: "抹茶", desc: { es: "Té y dulces japoneses.", en: "Japanese tea and sweets." }, where: { es: "Kyoto", en: "Kyoto" } },
    { name: { es: "Taiyaki y Mochi", en: "Taiyaki & Mochi" }, jp: "たい焼き", desc: { es: "Antojos dulces de calle.", en: "Sweet street treats." }, where: { es: "Harajuku, Tokyo", en: "Harajuku, Tokyo" } }
  ],

  /* ---------------------------------------------------------------------- */
  /*  STAYS (Hospedaje) — status: todo | booked                             */
  /* ---------------------------------------------------------------------- */
  stays: [
    { id: "stay-os", city: "OSAKA", dates: { es: "28–31 Ago", en: "28–31 Aug" }, name: "Hearton Hotel Shinsaibashi", color: "#c13b2f", note: { es: "Conf: WG53TXK5RLC6 · Sur Shinsaibashi, cerca de Dotonbori. Tarifa cancelable.", en: "Conf: WG53TXK5RLC6 · South Shinsaibashi, near Dotonbori. Refundable rate." }, tags: [{ es: "3 noches", en: "3 nights" }, { es: "Shinsaibashi", en: "Shinsaibashi" }], maps: "Hearton Hotel Shinsaibashi Osaka", status: "booked",
      checkIn: { es: "vie 28 ago, 15:00", en: "Fri 28 Aug, 3:00pm" }, checkOut: { es: "lun 31 ago, 12:00", en: "Mon 31 Aug, 12:00pm" }, phone: "+81-6-6251-3711",
      address: { es: "1-5-24 Nishi Shinsaibashi, Chuo-ku, Osaka", en: "1-5-24 Nishi Shinsaibashi, Chuo-ku, Osaka" } },
    { id: "stay-ky", city: "KYOTO", dates: { es: "31 Ago–3 Sep", en: "31 Aug–3 Sep" }, name: "APA Hotel Kyoto Ekimae Chuoguchi", color: "#1f3a52", note: { es: "Conf: 3VP6FTDP2BPV · Frente a la Estación de Kyoto. Tarifa cancelable.", en: "Conf: 3VP6FTDP2BPV · Opposite Kyoto Station. Refundable rate." }, tags: [{ es: "3 noches", en: "3 nights" }, { es: "Estación", en: "Station" }], maps: "APA Hotel Kyoto Ekimae Chuoguchi", status: "booked",
      checkIn: { es: "lun 31 ago, 15:00", en: "Mon 31 Aug, 3:00pm" }, checkOut: { es: "jue 3 sep, 10:00", en: "Thu 3 Sep, 10:00am" }, phone: "+81-75-341-8111",
      address: { es: "533 Shiokoji-cho, Shichijosagaru, Higashinotoin-dori, Shimogyo-ku, Kyoto", en: "533 Shiokoji-cho, Shichijosagaru, Higashinotoin-dori, Shimogyo-ku, Kyoto" } },
    { id: "stay-ta", city: { es: "GERO (Onsen)", en: "GERO (Onsen)" }, dates: { es: "3–5 Sep", en: "3–5 Sep" }, name: "Ooedo Onsen Monogatari Gero Bekkan", color: "#5a7d4f", note: { es: "Conf: 5179.228.979 · PIN 7623 · Ryokan con onsen en Gero, ~1h sur de Takayama. Desayuno + cena kaiseki incluidos. Tarifa cancelable hasta el 26 ago.", en: "Conf: 5179.228.979 · PIN 7623 · Onsen ryokan in Gero, ~1h south of Takayama. Breakfast + kaiseki dinner included. Refundable until 26 Aug." }, tags: [{ es: "2 noches", en: "2 nights" }, { es: "Onsen", en: "Onsen" }, { es: "Kaiseki", en: "Kaiseki" }], maps: "Ooedo Onsen Monogatari Gero Bekkan", status: "booked",
      checkIn: { es: "jue 3 sep, 15:00–19:00", en: "Thu 3 Sep, 3:00–7:00pm" }, checkOut: { es: "sáb 5 sep, hasta 11:00", en: "Sat 5 Sep, until 11:00am" }, phone: "+81-50-3615-3456",
      address: { es: "Yunoshima 535, Gero 509-2207, Gifu", en: "Yunoshima 535, Gero 509-2207, Gifu" } },
    { id: "stay-tk", city: "TOKYO", dates: { es: "5–11 Sep", en: "5–11 Sep" }, name: "APA Hotel Asakusa Kaminarimon Minami", color: "#3a3128", note: { es: "Conf: 5203.022.412 · Asakusa, junto a la Puerta del Trueno. Tarifa cancelable.", en: "Conf: 5203.022.412 · Asakusa, by the Thunder Gate. Refundable rate." }, tags: [{ es: "6 noches", en: "6 nights" }, { es: "Asakusa", en: "Asakusa" }], maps: "APA Hotel Asakusa Kaminarimon Minami", status: "booked",
      checkIn: { es: "sáb 5 sep, 15:00–24:00", en: "Sat 5 Sep, 3:00pm–midnight" }, checkOut: { es: "vie 11 sep, hasta 10:00", en: "Fri 11 Sep, until 10:00am" }, phone: "+81-3-5830-9711",
      address: { es: "Kaminarimon 2-9-1, Taito-ku, Tokyo 111-0034", en: "Kaminarimon 2-9-1, Taito-ku, Tokyo 111-0034" } }
  ],

  /* ---------------------------------------------------------------------- */
  /*  TRANSPORT                                                             */
  /* ---------------------------------------------------------------------- */
  transportNote: { es: "NO comprar JR Pass nacional — no se amortiza para esta ruta. Tarjeta IC (ICOCA/Suica) para todo lo local + boleto suelto para los 3 tramos largos. Nico viaja gratis (menor de 6, en falda).", en: "Don't buy the nationwide JR Pass — not worth it for this route. IC card (ICOCA/Suica) for everything local + single tickets for the 3 long legs. Nico travels free (under 6, on lap)." },
  routes: [
    { from: "KIX", to: { es: "Osaka centro", en: "Osaka centre" }, mode: "Haruka Express", time: "~75 min", cost: "¥2,900" },
    { from: "Osaka", to: "Nara", mode: "Kintetsu", time: "~35 min", cost: "¥680" },
    { from: "Nara", to: "Kyoto", mode: { es: "Kintetsu directo", en: "Kintetsu direct" }, time: "~45 min", cost: { es: "andén 3-4", en: "platform 3-4" } },
    { from: "Kyoto", to: "Takayama", mode: { es: "Hida (directo)", en: "Hida (direct)" }, time: "3h40", cost: "¥11,260" },
    { from: "Takayama", to: "Gero", mode: { es: "Hida / tren local", en: "Hida / local train" }, time: "~45 min", cost: { es: "ida y vuelta, 2 veces (noches 3 y 4 sep)", en: "round trip, twice (nights 3 & 4 sep)" } },
    { from: "Gero", to: "Tokyo", mode: { es: "Hida + Shinkansen", en: "Hida + Shinkansen" }, time: "~3h35", cost: { es: "vía Nagoya · se aborda en Gero, no en Takayama", en: "via Nagoya · board at Gero, not Takayama" } },
    { from: { es: "Tokyo local", en: "Tokyo local" }, to: "(4 días)", mode: "Metro / Yamanote", time: { es: "~¥1,500/día", en: "~¥1,500/day" }, cost: "IC" },
    { from: "Tokyo", to: "Hakone", mode: "Odakyu Romance Car", time: "85 min", cost: "¥3,370" },
    { from: "Tokyo", to: "Himeji", mode: { es: "Shinkansen Hikari", en: "Shinkansen Hikari" }, time: "3h05", cost: { es: "vía Shin-Osaka", en: "via Shin-Osaka" } },
    { from: "Himeji", to: "KIX", mode: "JR + Haruka", time: "~2h", cost: { es: "al aeropuerto", en: "to the airport" } }
  ],

  transportTips: [
    { t: { es: "IC Card (Suica/Icoca) por iPhone", en: "IC Card (Suica/Icoca) via iPhone" },
      d: { es: "Se agrega directo en Apple Wallet con tarjeta de crédito apenas lleguen — no hace falta comprarla físicamente ni buscar máquina.", en: "Add it straight into Apple Wallet with a credit card as soon as you land — no need to buy a physical card or find a machine." } },
    { t: { es: "Takkyubin (envío de equipaje)", en: "Takkyubin (luggage forwarding)" },
      d: { es: "Dejas la maleta en la recepción del hotel al salir y llega al SIGUIENTE hotel al día siguiente (no el mismo día — solo sirve con una noche de colchón en medio). ¥1,600–2,300 por maleta grande. Útil para el tramo Gero/Takayama→Tokyo, así viajan livianos ese día de trenes largos.", en: "Drop the suitcase at hotel reception when checking out and it arrives at the NEXT hotel the following day (not same-day — only works with a buffer night). ¥1,600–2,300 per large bag. Handy for the Gero/Takayama→Tokyo leg so you travel light on that long train day." } }
  ],
  connectivity: [
    { provider: "Sakura Mobile", price: { es: "~US$4 (1GB/7d) · US$24 (ilimitado/7d)", en: "~US$4 (1GB/7d) · US$24 (unlimited/7d)" }, network: { es: "Docomo o au 5G/4G", en: "Docomo or au 5G/4G" } },
    { provider: "Airalo", price: { es: "US$4.50 (1GB/7d) · US$26 (20GB/30d)", en: "US$4.50 (1GB/7d) · US$26 (20GB/30d)" }, network: { es: "Solo 4G LTE, sin número japonés", en: "4G LTE only, no Japanese number" } },
    { provider: "Ubigi", price: { es: "~US$66 ilimitado/mes", en: "~US$66 unlimited/month" }, network: { es: "Docomo — buena cobertura en montaña", en: "Docomo — good mountain coverage" } }
  ],
  connectivityRec: { es: "Recomendado: Sakura Mobile ilimitado 7 días (~US$24 c/u) o Airalo 20GB/30 días (~US$26) — Sakura tiene mejor cobertura en zonas de montaña como Gero/Takayama; Airalo es más simple de activar.", en: "Recommended: Sakura Mobile unlimited 7-day (~US$24 each) or Airalo 20GB/30 days (~US$26) — Sakura has better coverage in mountain areas like Gero/Takayama; Airalo is simpler to activate." },

  /* ---------------------------------------------------------------------- */
  /*  PHRASES                                                               */
  /* ---------------------------------------------------------------------- */
  phrases: [
    { es: "Hola", en: "Hello", jp: "こんにちは", romaji: "Konnichiwa" },
    { es: "Gracias", en: "Thank you", jp: "ありがとう", romaji: "Arigatō" },
    { es: "Por favor", en: "Please", jp: "お願いします", romaji: "Onegaishimasu" },
    { es: "Disculpe / Perdón", en: "Excuse me / Sorry", jp: "すみません", romaji: "Sumimasen" },
    { es: "¿Cuánto cuesta?", en: "How much is it?", jp: "いくらですか", romaji: "Ikura desu ka?" },
    { es: "Estaba delicioso", en: "It was delicious", jp: "ごちそうさま", romaji: "Gochisōsama" },
    { es: "¿Dónde está el baño?", en: "Where is the toilet?", jp: "トイレはどこですか", romaji: "Toire wa doko desu ka?" },
    { es: "No entiendo", en: "I don't understand", jp: "わかりません", romaji: "Wakarimasen" },
    { es: "Sí / No", en: "Yes / No", jp: "はい / いいえ", romaji: "Hai / Iie" },
    { es: "Adiós", en: "Goodbye", jp: "さようなら", romaji: "Sayōnara" }
  ],

  /* ---------------------------------------------------------------------- */
  /*  STAMPS (eki & goshuin) — collectible toggles                          */
  /* ---------------------------------------------------------------------- */
  stamps: [
    { id: "st-1", name: { es: "Estación de Osaka", en: "Osaka Station" }, type: "Eki 駅", city: "Osaka", glyph: "駅", day: 2, where: { es: "kiosco de la estación (JR Osaka/Tennoji)", en: "station kiosk (JR Osaka/Tennoji)" } },
    { id: "st-2", name: "Todai-ji", type: "Goshuin 御朱印", city: "Nara", glyph: "印", day: 4, where: { es: "junto al Gran Buda", en: "by the Great Buddha" } },
    { id: "st-13", name: "Kasuga Taisha", type: "Goshuin 御朱印", city: "Nara", glyph: "印", day: 4, where: { es: "oficina del santuario", en: "shrine office" } },
    { id: "st-14", name: { es: "Santuario Yasaka", en: "Yasaka Shrine" }, type: "Goshuin 御朱印", city: "Kyoto", glyph: "印", day: 4, where: { es: "oficina del santuario (Gion)", en: "shrine office (Gion)" } },
    { id: "st-4", name: { es: "Estación de Kyoto", en: "Kyoto Station" }, type: "Eki 駅", city: "Kyoto", glyph: "駅", day: 4, where: { es: "kiosco de la estación JR Kyoto", en: "JR Kyoto station kiosk" } },
    { id: "st-3", name: "Fushimi Inari", type: "Goshuin 御朱印", city: "Kyoto", glyph: "印", day: 5, where: { es: "oficina junto al salón principal", en: "office by the main hall" } },
    { id: "st-5", name: "Kiyomizu-dera", type: "Goshuin 御朱印", city: "Kyoto", glyph: "印", day: 5, where: { es: "dentro del templo principal", en: "inside the main hall" } },
    { id: "st-15", name: "Ginkaku-ji", type: "Goshuin 御朱印", city: "Kyoto", glyph: "印", day: 5, where: { es: "puesto a la entrada", en: "stand at the entrance" } },
    { id: "st-16", name: "Tenryu-ji", type: "Goshuin 御朱印", city: "Kyoto", glyph: "印", day: 6, where: { es: "recepción del templo (Arashiyama)", en: "temple reception (Arashiyama)" } },
    { id: "st-17", name: "Kinkaku-ji", type: "Goshuin 御朱印", city: "Kyoto", glyph: "印", day: 6, where: { es: "puesto de goshuin a la salida", en: "goshuin stand at the exit" } },
    { id: "st-18", name: { es: "Castillo Nijo", en: "Nijo Castle" }, type: "Sello 記念", city: "Kyoto", glyph: "城", day: 6, where: { es: "junto a la taquilla", en: "by the ticket gate" } },
    { id: "st-6", name: { es: "Estación de Takayama", en: "Takayama Station" }, type: "Eki 駅", city: "Takayama", glyph: "駅", day: 7, where: { es: "kiosco de la estación JR", en: "JR station kiosk" } },
    { id: "st-19", name: "Shirakawa-go", type: "Sello 記念", city: "Shirakawa-go", glyph: "印", day: 8, where: { es: "centro de información del pueblo", en: "village information center" } },
    { id: "st-20", name: { es: "Shibuya · Hachiko", en: "Shibuya · Hachiko" }, type: "Eki 駅", city: "Tokyo", glyph: "駅", day: 10, where: { es: "estación de Shibuya (salida Hachiko)", en: "Shibuya station (Hachiko exit)" } },
    { id: "st-7", name: "Senso-ji", type: "Goshuin 御朱印", city: "Tokyo", glyph: "印", day: 10, where: { es: "oficina junto al salón principal (Asakusa)", en: "office by the main hall (Asakusa)" } },
    { id: "st-8", name: { es: "Santuario Meiji", en: "Meiji Shrine" }, type: "Goshuin 御朱印", city: "Tokyo", glyph: "印", day: 10, where: { es: "oficina del santuario (Harajuku)", en: "shrine office (Harajuku)" } },
    { id: "st-21", name: { es: "Hakone-jinja (torii)", en: "Hakone Shrine (torii)" }, type: "Goshuin 御朱印", city: "Hakone", glyph: "印", day: 11, where: { es: "oficina junto al torii del lago Ashi", en: "office by the Lake Ashi torii" } },
    { id: "st-22", name: "Ueno Toshogu", type: "Goshuin 御朱印", city: "Tokyo", glyph: "印", day: 13, where: { es: "oficina del santuario (parque Ueno)", en: "shrine office (Ueno Park)" } },
    { id: "st-9", name: { es: "Estación de Tokio", en: "Tokyo Station" }, type: "Eki 駅", city: "Tokyo", glyph: "駅", day: 13, where: { es: "kiosco de la estación JR (Marunouchi)", en: "JR station kiosk (Marunouchi)" } },
    { id: "st-10", name: { es: "Castillo de Himeji", en: "Himeji Castle" }, type: "Sello 記念", city: "Himeji", glyph: "城", day: 15, where: { es: "junto a la taquilla del castillo", en: "by the castle ticket gate" } }
  ],

  /* ---------------------------------------------------------------------- */
  /*  DOCUMENTS (checklist with hints)                                      */
  /* ---------------------------------------------------------------------- */
  docs: [
    { id: "dc-1", label: { es: "Pasaportes (vigencia 6+ meses)", en: "Passports (valid 6+ months)" }, hint: { es: "Santi, Geral y Nico", en: "Santi, Geral & Nico" } },
    { id: "dc-2", label: { es: "eVISA Japón aprobada", en: "Japan eVISA approved" }, hint: { es: "evisa.mofa.go.jp · los 3 en una solicitud", en: "evisa.mofa.go.jp · all 3 in one application" } },
    { id: "dc-3", label: { es: "Vuelos ida y vuelta (JQ23/JQ24)", en: "Return flights (JQ23/JQ24)" }, hint: { es: "ref SPBPNW · PDF offline", en: "ref SPBPNW · offline PDF" },
      files: [{ id: "flight-itinerary", label: { es: "Itinerario Jetstar", en: "Jetstar itinerary" } }] },
    { id: "dc-4", label: { es: "Reservas de hospedaje", en: "Accommodation bookings" }, hint: { es: "las 4 ciudades", en: "all 4 cities" },
      files: [
        { id: "hotel-osaka", label: { es: "Osaka", en: "Osaka" } },
        { id: "hotel-kyoto", label: { es: "Kyoto", en: "Kyoto" } },
        { id: "hotel-gero-takayama", label: { es: "Gero/Takayama", en: "Gero/Takayama" } },
        { id: "hotel-tokyo", label: { es: "Tokyo", en: "Tokyo" } }
      ] },
    { id: "dc-5", label: { es: "Seguro de viaje", en: "Travel insurance" }, hint: { es: "activado · CommBank Smart Awards · póliza 726100871283", en: "activated · CommBank Smart Awards · policy 726100871283" },
      files: [{ id: "insurance-certificate", label: { es: "Certificado de seguro", en: "Insurance certificate" } }] },
    { id: "dc-6", label: { es: "Visit Japan Web", en: "Visit Japan Web" }, hint: { es: "migración y aduana", en: "immigration & customs" } },
    { id: "dc-7", label: { es: "Prueba de residencia QLD", en: "QLD residency proof" }, hint: { es: "para la eVISA", en: "for the eVISA" } },
    { id: "dc-8", label: { es: "Extracto bancario 3 meses", en: "3-month bank statement" }, hint: { es: "para la eVISA", en: "for the eVISA" } },
    { id: "dc-9", label: { es: "Copia de todo en la nube", en: "Cloud copy of everything" }, hint: { es: "por si acaso", en: "just in case" } },
    { id: "dc-10", label: { es: "Copias de pasaporte", en: "Passport copies" }, hint: { es: "Santi, Geral y Nico · respaldo físico", en: "Santi, Geral & Nico · physical backup" },
      files: [
        { id: "passport-santiago", label: { es: "Santiago", en: "Santiago" } },
        { id: "passport-geraldine", label: { es: "Geral", en: "Geral" } },
        { id: "passport-nico", label: { es: "Nico", en: "Nico" } }
      ] },
    { id: "dc-11", label: { es: "Partida de nacimiento de Nico", en: "Nico's birth certificate" }, hint: { es: "por si inmigración la pide", en: "in case immigration asks for it" },
      files: [{ id: "birth-certificate-nico", label: { es: "Ver documento", en: "View document" } }] }
  ],

  /* ---------------------------------------------------------------------- */
  /*  RESERVATIONS — code/status; jp = address for taxis                    */
  /* ---------------------------------------------------------------------- */
  reservas: [
    { id: "rv-1", type: { es: "✈ Vuelo de ida", en: "✈ Outbound flight" }, color: "#3a3128", title: "JQ23 · BNE → KIX", sub: { es: "28 Ago · 11:40 → 19:45", en: "28 Aug · 11:40 → 19:45" }, code: "SPBPNW", status: "booked" },
    { id: "rv-2", type: "🏨 Osaka", color: "#c13b2f", title: "Hearton Hotel Shinsaibashi", sub: { es: "28–31 Ago · 3 noches", en: "28–31 Aug · 3 nights" }, code: "WG53TXK5RLC6", jp: "大阪府大阪市中央区南船場4-4-3", status: "booked" },
    { id: "rv-3", type: "🏨 Kyoto", color: "#1f3a52", title: "APA Hotel Kyoto Ekimae Chuoguchi", sub: { es: "31 Ago–3 Sep · 3 noches", en: "31 Aug–3 Sep · 3 nights" }, code: "3VP6FTDP2BPV", jp: "京都府京都市下京区西洞院通七条上ル", status: "booked" },
    { id: "rv-4", type: "♨ Gero", color: "#5a7d4f", title: "Ooedo Onsen Monogatari Gero Bekkan", sub: { es: "3–5 Sep · 2 noches · onsen incl.", en: "3–5 Sep · 2 nights · onsen incl." }, code: "5179.228.979", jp: "岐阜県下呂市森2554-3", status: "booked" },
    { id: "rv-5", type: "🏨 Tokyo", color: "#3a3128", title: "APA Hotel Asakusa Kaminarimon Minami", sub: { es: "5–11 Sep · 6 noches · Asakusa", en: "5–11 Sep · 6 nights · Asakusa" }, code: "5203.022.412", jp: "東京都台東区雷門2-1-16", status: "booked" },
    { id: "rv-6", type: "🎟 teamLab", color: "#1f3a52", title: { es: "teamLab (día 12)", en: "teamLab (day 12)" }, sub: { es: "reservar con semanas", en: "book weeks ahead" }, code: "—", status: "todo" },
    { id: "rv-7", type: "🚆 Hida", color: "#5a7d4f", title: { es: "Kyoto → Takayama (día 7)", en: "Kyoto → Takayama (day 7)" }, sub: { es: "asiento reservado, 1 mes antes", en: "reserved seat, 1 month ahead" }, code: "—", status: "todo" },
    { id: "rv-8", type: "🚄 Shinkansen", color: "#3a3128", title: { es: "Gero→Tokyo (día 9) y Tokyo→Himeji (día 15)", en: "Gero→Tokyo (day 9) & Tokyo→Himeji (day 15)" }, sub: { es: "el Hida del día 9 se aborda en Gero, no en Takayama · asiento pasillo para Nico", en: "day 9's Hida is boarded at Gero, not Takayama · aisle seat for Nico" }, code: "—", status: "todo" },
    { id: "rv-9", type: "🏎 Daikoku PA", color: "#c13b2f", title: { es: "Tour JDM (Santiago, día 9 · sábado)", en: "JDM tour (Santiago, day 9 · Saturday)" }, sub: { es: "~A$300 · confirmar hora de pickup vía amiga", en: "~A$300 · confirm pickup time via friend" }, code: "—", status: "todo" },
    { id: "rv-10", type: "🚌 Bus", color: "#5a7d4f", title: { es: "Takayama → Shirakawa-go (día 8)", en: "Takayama → Shirakawa-go (day 8)" }, sub: { es: "se llena en temporada", en: "fills up in season" }, code: "—", status: "todo" },
    { id: "rv-11", type: "🚆 Romance Car", color: "#3a3128", title: { es: "Hakone ida y vuelta (día 11)", en: "Hakone return (day 11)" }, sub: { es: "Odakyu · reservar", en: "Odakyu · reserve" }, code: "—", status: "todo" },
    { id: "rv-12", type: { es: "✈ Vuelo de regreso", en: "✈ Return flight" }, color: "#3a3128", title: "JQ24 · KIX → BNE", sub: { es: "11 Sep · 21:45 → sáb 07:30", en: "11 Sep · 21:45 → Sat 07:30" }, code: "SPBPNW", status: "booked" }
  ],

  /* ---------------------------------------------------------------------- */
  /*  PREP / TO-BOOK checklist (priority: red | yellow | green)             */
  /* ---------------------------------------------------------------------- */
  prepItems: [
    { id: "pr-1", priority: "red", label: { es: "Aplicar eVISA (los 3, una cuenta)", en: "Apply for eVISA (all 3, one account)" } },
    { id: "pr-2", priority: "green", label: { es: "Hotel Osaka: Hearton Shinsaibashi ✓ WG53TXK5RLC6", en: "Osaka hotel: Hearton Shinsaibashi ✓ WG53TXK5RLC6" } },
    { id: "pr-3", priority: "green", label: { es: "Hotel Kyoto: APA Ekimae Chuoguchi ✓ 3VP6FTDP2BPV", en: "Kyoto hotel: APA Ekimae Chuoguchi ✓ 3VP6FTDP2BPV" } },
    { id: "pr-4", priority: "green", label: { es: "Ryokan Gero: Ooedo Onsen Monogatari ✓ 5179.228.979", en: "Gero ryokan: Ooedo Onsen Monogatari ✓ 5179.228.979" } },
    { id: "pr-5", priority: "green", label: { es: "Hotel Tokyo: APA Asakusa Kaminarimon ✓ 5203.022.412", en: "Tokyo hotel: APA Asakusa Kaminarimon ✓ 5203.022.412" } },
    { id: "pr-6", priority: "red", label: { es: "Reservar teamLab (se agota)", en: "Book teamLab (sells out)" } },
    { id: "pr-7", priority: "yellow", label: { es: "Reservar tren Hida a Takayama", en: "Reserve Hida train to Takayama" } },
    { id: "pr-8", priority: "yellow", label: { es: "Reservar Shinkansen Takayama→Tokyo y Tokyo→Himeji", en: "Reserve Shinkansen Takayama→Tokyo & Tokyo→Himeji" } },
    { id: "pr-9", priority: "yellow", label: { es: "Confirmar Daikoku PA con amiga", en: "Confirm Daikoku PA via friend" } },
    { id: "pr-10", priority: "yellow", label: { es: "eSIM (app Airalo)", en: "eSIM (Airalo app)" } },
    { id: "pr-11", priority: "red", label: { es: "Activar seguro de viaje CommBank Smart Awards (antes del 28 ago)", en: "Activate CommBank Smart Awards travel insurance (before 28 Aug)" } },
    { id: "pr-12", priority: "green", label: { es: "Romance Car Hakone (día 11)", en: "Hakone Romance Car (day 11)" } },
    { id: "pr-13", priority: "green", label: { es: "Reservar bus Takayama→Shirakawa-go", en: "Reserve Takayama→Shirakawa-go bus" } },
    { id: "pr-14", priority: "green", label: { es: "Goshuin-cho (libreta de sellos)", en: "Goshuin-cho (stamp book)" } },
    { id: "pr-15", priority: "green", label: { es: "Ventilador USB + ropa ligera para Nico", en: "USB fan + light clothes for Nico" } },
    { id: "pr-16", priority: "green", label: { es: "Google Maps offline + traductor", en: "Offline Google Maps + translator" } },
    { id: "pr-17", priority: "red", label: { es: "IDP de Santiago en RACQ para el kart de Shibuya (¡antes de salir, no se saca en Japón!)", en: "Santiago's IDP at RACQ for the Shibuya kart tour (before departure — can't get it in Japan!)" } }
  ],

  /* ---------------------------------------------------------------------- */
  /*  PACKING                                                               */
  /* ---------------------------------------------------------------------- */
  packGroups: [
    { title: { es: "Esenciales", en: "Essentials" }, items: [
      { id: "pk-1", label: { es: "Pasaportes + copia", en: "Passports + copy" } },
      { id: "pk-2", label: { es: "Tarjetas y efectivo (¥60-80k al inicio)", en: "Cards & cash (¥60-80k to start)" } },
      { id: "pk-3", label: { es: "Adaptador de corriente (tipo A)", en: "Power adapter (type A)" } },
      { id: "pk-4", label: { es: "Powerbank", en: "Power bank" } },
      { id: "pk-5", label: { es: "eSIM / WiFi pocket", en: "eSIM / pocket WiFi" } }
    ]},
    { title: { es: "Ropa (calor 30-35°)", en: "Clothes (heat 30-35°)" }, items: [
      { id: "pk-6", label: { es: "Ropa ligera de verano", en: "Light summer clothes" } },
      { id: "pk-7", label: { es: "Calzado MUY cómodo", en: "VERY comfy shoes" } },
      { id: "pk-8", label: { es: "Chaqueta ligera / impermeable (tifón)", en: "Light jacket / rain shell (typhoon)" } },
      { id: "pk-9", label: { es: "Calcetines extra (¡se descalza en templos!)", en: "Extra socks (shoes off at temples!)" } }
    ]},
    { title: { es: "Equipaje (sin maletas con ruedas)", en: "Luggage (no wheeled bags)" }, items: [
      { id: "pk-10", label: { es: "2 backpacks grandes", en: "2 large backpacks" } },
      { id: "pk-11", label: { es: "Cargador de pecho para Nico", en: "Chest carrier for Nico" } },
      { id: "pk-12", label: { es: "Cochecito plegable ligero", en: "Light folding stroller" } }
    ]},
    { title: { es: "Salud y varios", en: "Health & misc" }, items: [
      { id: "pk-13", label: { es: "Medicinas personales", en: "Personal meds" } },
      { id: "pk-14", label: { es: "Protector solar + gorras", en: "Sunscreen + hats" } },
      { id: "pk-15", label: { es: "Botella de agua", en: "Water bottle" } },
      { id: "pk-16", label: { es: "Goshuin-cho (libro de sellos)", en: "Goshuin-cho (stamp book)" } },
      { id: "pk-17", label: { es: "Bolsa plegable para compras", en: "Foldable shopping bag" } }
    ]}
  ],

  /* ---------------------------------------------------------------------- */
  /*  BABY (Nico, ~14 meses)                                                */
  /* ---------------------------------------------------------------------- */
  babyItems: [
    { id: "bb-1", label: { es: "Pasaporte de Nico vigente", en: "Nico's passport valid" } },
    { id: "bb-2", label: { es: "Pañales primeros 2-3 días", en: "Diapers for first 2-3 days" } },
    { id: "bb-3", label: { es: "Toallitas húmedas", en: "Wet wipes" } },
    { id: "bb-4", label: { es: "Cargador de pecho ergonómico", en: "Ergonomic chest carrier" } },
    { id: "bb-5", label: { es: "Cochecito ligero y plegable", en: "Light folding stroller" } },
    { id: "bb-6", label: { es: "Leche/snacks conocidos", en: "Familiar milk/snacks" } },
    { id: "bb-7", label: { es: "Termo para agua caliente", en: "Thermos for hot water" } },
    { id: "bb-8", label: { es: "Mudas de ropa extra", en: "Extra changes of clothes" } },
    { id: "bb-9", label: { es: "Medicinas de Nico + termómetro", en: "Nico's meds + thermometer" } },
    { id: "bb-10", label: { es: "Protector solar y gorrito", en: "Sunscreen and hat" } },
    { id: "bb-11", label: { es: "Juguetes para avión y trenes", en: "Toys for plane and trains" } },
    { id: "bb-12", label: { es: "Cambiador portátil", en: "Portable changing mat" } }
  ],
  babyTips: [
    { t: { es: "Japón es muy baby-friendly", en: "Japan is very baby-friendly" }, d: { es: "Estaciones y centros comerciales tienen salas de lactancia (授乳室) y cambiadores. Busquen el ícono de bebé.", en: "Stations and malls have nursing rooms (授乳室) and changing tables. Look for the baby icon." } },
    { t: { es: "Cargador > cochecito en multitudes", en: "Carrier > stroller in crowds" }, d: { es: "Templos de Kyoto/Nara tienen escaleras y grava — ahí el cargador tipo Ergobaby es mejor. Su propia carriola (la que llevan desde BNE) rinde más en Tokyo/Osaka/Universal (planas, con ascensor en el metro).", en: "Kyoto/Nara temples have stairs and gravel — an Ergobaby-style carrier works better there. Your own stroller (brought from BNE) is more useful in Tokyo/Osaka/Universal (flat, with metro elevators)." } },
    { t: { es: "Pañales y comida allá", en: "Diapers & food there" }, d: { es: "Konbini y farmacias venden pañales (Moony, Merries), papillas y leche. Solo lleven lo justo para empezar.", en: "Konbini and pharmacies sell diapers (Moony, Merries), baby food and milk. Bring just enough to start." } },
    { t: { es: "Eviten horas pico en tren", en: "Avoid rush hour trains" }, d: { es: "De 7-9am y 5-7pm los trenes van llenísimos. Viajen a media mañana o tarde con Nico.", en: "7-9am and 5-7pm trains are packed. Travel mid-morning or afternoon with Nico." } },
    { t: { es: "Siesta sobre la marcha", en: "Naps on the move" }, d: { es: "Nico siempre duerme en cochecito/cargador mientras caminan. Sin vueltas al hotel al mediodía.", en: "Nico always naps in the stroller/carrier on the move. No midday hotel returns." } },
    { t: { es: "Onsen con bebé", en: "Onsen with a baby" }, d: { es: "En el ryokan de Gero reserven onsen privado (kashikiri / habitación con baño termal) para bañarse en familia.", en: "At the ryokan in Gero book a private onsen (kashikiri / room with thermal bath) to bathe as a family." } },
    { t: { es: "Trenes gratis", en: "Free trains" }, d: { es: "Los menores de 6 años viajan gratis en tren (sin asiento propio).", en: "Under-6s travel free on trains (no own seat)." } },
    { t: { es: "Calor y tifones", en: "Heat & typhoons" }, d: { es: "Fin de agosto y septiembre son calurosos y húmedos, con riesgo de tifón. Hidratación, sombra y plan B techado.", en: "Late August and September are hot and humid, with typhoon risk. Hydration, shade and an indoor plan B." } }
  ],

  /* ---------------------------------------------------------------------- */
  /*  EMERGENCY                                                             */
  /* ---------------------------------------------------------------------- */
  emergencyNums: [
    { n: "119", label: { es: "Ambulancia y bomberos", en: "Ambulance & fire" }, icon: "🚑" },
    { n: "110", label: { es: "Policía", en: "Police" }, icon: "🚓" },
    { n: "03-5774-0033", label: { es: "Asistencia turística (japonés/inglés)", en: "Tourist assistance (JP/EN)" }, icon: "ℹ️" }
  ],
  healthInfo: [
    { city: "Osaka", kanji: "阪", color: "#c13b2f", note: { es: "Hospital municipal con urgencias pediátricas. Farmacias (薬局) en cada esquina.", en: "City hospital with pediatric ER. Pharmacies (薬局) on every corner." } },
    { city: "Kyoto", kanji: "京", color: "#1f3a52", note: { es: "Kyoto University Hospital. Clínicas pediátricas (小児科) cerca del centro.", en: "Kyoto University Hospital. Pediatric clinics (小児科) near the centre." } },
    { city: { es: "Takayama / Gero", en: "Takayama / Gero" }, kanji: "飛", color: "#5a7d4f", note: { es: "Zona rural: duermen en Gero, no en Takayama — el ryokan ayuda a contactar la clínica más cercana en Gero.", en: "Rural area: you sleep in Gero, not Takayama — the ryokan helps contact the nearest clinic in Gero." } },
    { city: "Tokyo", kanji: "東", color: "#3a3128", note: { es: "Hospitales con servicio en inglés (St. Luke's, Tokyo Medical). Línea multilingüe AMDA.", en: "Hospitals with English service (St. Luke's, Tokyo Medical). AMDA multilingual line." } }
  ],
  emergencyPhrases: [
    { es: "Ayuda / Emergencia", en: "Help / Emergency", jp: "助けて / 緊急です", romaji: "Tasukete / Kinkyū desu" },
    { es: "Mi bebé está enfermo", en: "My baby is sick", jp: "赤ちゃんが病気です", romaji: "Akachan ga byōki desu" },
    { es: "¿Dónde hay un hospital?", en: "Where is a hospital?", jp: "病院はどこですか", romaji: "Byōin wa doko desu ka?" },
    { es: "Llame a una ambulancia", en: "Call an ambulance", jp: "救急車を呼んでください", romaji: "Kyūkyūsha o yonde kudasai" },
    { es: "Soy alérgico/a a…", en: "I'm allergic to…", jp: "…にアレルギーがあります", romaji: "…ni arerugī ga arimasu" }
  ],

  /* ---------------------------------------------------------------------- */
  /*  BUDGET — defaults in ¥ (editable in-app, split 2 adults)              */
  /* ---------------------------------------------------------------------- */
  budgetCats: [
    { key: "flights",    kanji: "✈", label: { es: "Vuelos", en: "Flights" }, color: "#3a3128" },
    { key: "stay",       kanji: "宿", label: { es: "Hospedaje", en: "Stays" }, color: "#1f3a52" },
    { key: "food",       kanji: "食", label: { es: "Comida", en: "Food" }, color: "#c13b2f" },
    { key: "transport",  kanji: "鉄", label: { es: "Transporte", en: "Transport" }, color: "#5a7d4f" },
    { key: "activities", kanji: "遊", label: { es: "Actividades", en: "Activities" }, color: "#c9a24a" },
    { key: "shopping",   kanji: "買", label: { es: "Compras", en: "Shopping" }, color: "#1f3a52" },
    { key: "other",      kanji: "他", label: { es: "Otros", en: "Other" }, color: "#3a3128" }
  ],
  budgetDefaults: { flights: 127000, stay: 180000, food: 100000, transport: 80000, activities: 70000, shopping: 60000, other: 40000 },

  /* ---------------------------------------------------------------------- */
  /*  ACTIVITY GUIDE — tap an itinerary activity to see this.               */
  /*  `keys` are matched (lowercase) against the activity text (es+en).     */
  /*  `wiki` = English Wikipedia title, used to lazy-load a reference photo.*/
  /* ---------------------------------------------------------------------- */
  activityGuide: [
    { keys: ["castillo de osaka", "osaka castle"], name: "Osaka Castle 大阪城", wiki: "Osaka_Castle", maps: "Osaka Castle",
      desc: { es: "Castillo del s. XVI rodeado de un foso y un parque enorme. El exterior y los jardines son gratis; el interior es museo.", en: "16th-century castle ringed by a moat and a huge park. Grounds and gardens are free; the keep is a museum." },
      tips: { es: "Vayan temprano por el calor. Nico puede correr por el parque; el cochecito entra sin problema.", en: "Go early to beat the heat. Nico can run in the park; stroller-friendly." } },
    { keys: ["dotonbori"], name: "Dotonbori 道頓堀", wiki: "Dōtonbori", maps: "Dotonbori, Osaka",
      desc: { es: "Canal con neones, el cartel Glico y la meca del street food de Osaka: takoyaki, okonomiyaki, kushikatsu.", en: "Neon canal with the Glico sign — Osaka's street-food mecca: takoyaki, okonomiyaki, kushikatsu." },
      tips: { es: "Mejor de noche con las luces. Lleven efectivo; muchos puestos no aceptan tarjeta.", en: "Best at night with the lights. Bring cash; many stalls are cash-only." } },
    { keys: ["super nintendo world", "nintendo world"], name: "Super Nintendo World", wiki: "Super_Nintendo_World", maps: "Super Nintendo World, Universal Studios Japan",
      desc: { es: "Zona temática del Reino Champiñón: Castillo de Peach, Castillo de Bowser y Mine Cart Madness.", en: "Mushroom Kingdom themed area: Peach's Castle, Bowser's Castle and Mine Cart Madness." },
      tips: { es: "Se necesita un Timed-Entry (gratis por la app de USJ al entrar, o incluido en el Express Pass). Fotos espectaculares aunque no monten nada.", en: "Needs a Timed-Entry ticket (free via the USJ app on entry, or included with Express Pass). Great photos even without riding anything." } },
    { keys: ["wizarding world", "hogwarts", "hogsmeade"], name: "Wizarding World of Harry Potter", wiki: "The_Wizarding_World_of_Harry_Potter", maps: "Wizarding World of Harry Potter, Universal Studios Japan",
      desc: { es: "Recreación de Hogsmeade y el Castillo de Hogwarts, con tiendas como Ollivander's y Honeydukes.", en: "Recreation of Hogsmeade village and Hogwarts Castle, with shops like Ollivander's and Honeydukes." },
      tips: { es: "Entrada libre para caminar y tomar fotos, sin timed-entry. El castillo de noche está iluminado.", en: "Free to walk in and take photos, no timed-entry needed. The castle is lit up at night." } },
    { keys: ["universal wonderland", "minion park"], name: "Universal Wonderland", wiki: "Universal_Studios_Japan", maps: "Universal Wonderland, Universal Studios Japan",
      desc: { es: "Zona familiar con Minion Park y juegos suaves para niños pequeños.", en: "Family zone with Minion Park and gentle rides for young kids." },
      tips: { es: "Sala de lactancia, cambiador y agua caliente para biberón junto a Guest Services — ideal para Nico.", en: "Nursing room, changing table and hot water for bottles by Guest Services — great for Nico." } },
    { keys: ["universal studios", "usj"], name: "Universal Studios Japan", wiki: "Universal_Studios_Japan", maps: "Universal Studios Japan",
      desc: { es: "Parque temático en Osaka; 2026 es su 25 aniversario (\"Discover U!\"), el año más concurrido en una década.", en: "Osaka theme park; 2026 is its 25th anniversary (\"Discover U!\"), the busiest year in a decade." },
      tips: { es: "1-Day Studio Pass ~¥8,900 adulto (precio dinámico). Nico gratis (menor de 3). Lleven su propia carriola.", en: "1-Day Studio Pass ~¥8,900 adult (dynamic pricing). Nico free (under 3). Bring your own stroller." } },
    { keys: ["street kart"], name: "Street Kart Shibuya", wiki: "Street_Kart", maps: "Street Kart Shibuya",
      desc: { es: "Kart real-life por las calles de Shibuya/Harajuku, con disfraces incluidos. Ruta de ~1 hora.", en: "Real-life kart tour through the streets of Shibuya/Harajuku, costumes included. ~1 hour route." },
      tips: { es: "Requiere IDP (Permiso Internacional de Conducción) sacado ANTES de viajar — no se emite en Japón. ~AUD $150 por conductor + ~AUD $9 de seguro opcional.", en: "Requires an IDP (International Driving Permit) obtained BEFORE travel — cannot be issued in Japan. ~AUD $150 per driver + ~AUD $9 optional insurance." } },
    { keys: ["kasuga"], name: "Kasuga Taisha 春日大社", wiki: "Kasuga-taisha", maps: "Kasuga Taisha Nara",
      desc: { es: "Santuario sintoísta famoso por cientos de linternas de bronce y piedra, en un bosque sagrado lleno de ciervos.", en: "Shinto shrine famed for hundreds of bronze and stone lanterns, in a sacred deer-filled forest." },
      tips: { es: "Sendero con sombra desde Todai-ji entre los ciervos. Goshuin en la oficina del santuario.", en: "Shaded path from Todai-ji through the deer. Goshuin at the shrine office." } },
    { keys: ["nara", "todai-ji", "ciervos", "deer"], name: "Nara · Todai-ji + ciervos 奈良", wiki: "Tōdai-ji", maps: "Todai-ji, Nara",
      desc: { es: "El Gran Buda de bronce (15 m) en el templo Todai-ji, y cientos de ciervos sika sueltos que se inclinan por galletas.", en: "The bronze Great Buddha (15 m) at Todai-ji, plus hundreds of free-roaming sika deer that bow for crackers." },
      tips: { es: "Compren shika-senbei (galletas) a los vendedores. Los ciervos empujan; cuidado con Nico y la comida.", en: "Buy shika-senbei (crackers) from vendors. Deer nudge — mind Nico and any food." } },
    { keys: ["fushimi inari"], name: "Fushimi Inari 伏見稲荷", wiki: "Fushimi_Inari-taisha", maps: "Fushimi Inari Taisha",
      desc: { es: "Santuario con miles de torii bermellón que suben la montaña. La imagen icónica de Kyoto.", en: "Shrine with thousands of vermilion torii climbing the mountain. Kyoto's iconic image." },
      tips: { es: "Lleguen al amanecer para fotos sin gente. Los primeros tramos son aptos para cochecito; arriba hay escalones.", en: "Arrive at dawn for crowd-free photos. Lower stretches are stroller-OK; it gets steep higher up." } },
    { keys: ["kinkaku-ji", "templo dorado", "golden pavilion"], name: "Kinkaku-ji 金閣寺", wiki: "Kinkaku-ji", maps: "Kinkaku-ji",
      desc: { es: "El Pabellón Dorado: un templo zen cubierto de pan de oro que se refleja en un estanque.", en: "The Golden Pavilion: a Zen temple covered in gold leaf, mirrored in its pond." },
      tips: { es: "Recorrido corto y de un solo sentido. Combínalo con Ryoan-ji, muy cerca.", en: "Short one-way path. Pair it with nearby Ryoan-ji." } },
    { keys: ["arashiyama", "bambú", "bamboo"], name: "Arashiyama 嵐山", wiki: "Arashiyama", maps: "Arashiyama Bamboo Grove",
      desc: { es: "Bosque de bambú, el puente Togetsukyo y el jardín de Tenryu-ji. Naturaleza al oeste de Kyoto.", en: "Bamboo grove, the Togetsukyo bridge and Tenryu-ji's garden. Nature west of Kyoto." },
      tips: { es: "El bosque de bambú a primera hora es mágico y vacío. Hay parque de monos para más tarde.", en: "The bamboo grove is magical and empty first thing. A monkey park is nearby for later." } },
    { keys: ["kiyomizu-dera", "sannenzaka"], name: "Kiyomizu-dera 清水寺", wiki: "Kiyomizu-dera", maps: "Kiyomizu-dera",
      desc: { es: "Templo de madera sobre una terraza con vistas a Kyoto, en lo alto de las calles antiguas de Higashiyama.", en: "Wooden temple on a hillside terrace overlooking Kyoto, atop the old Higashiyama lanes." },
      tips: { es: "Las cuestas Sannenzaka/Ninenzaka son preciosas pero empedradas: mejor cargar a Nico.", en: "The Sannenzaka/Ninenzaka slopes are gorgeous but cobbled — carry Nico." } },
    { keys: ["gion"], name: "Gion 祇園", wiki: "Gion", maps: "Gion, Kyoto",
      desc: { es: "El barrio de geishas: machiya de madera, callejones y, con suerte, una geiko o maiko al atardecer.", en: "The geisha district: wooden machiya, lantern-lit lanes and, if lucky, a geiko or maiko at dusk." },
      tips: { es: "Está prohibido fotografiar geishas en las calles privadas. Cena en Pontocho, al lado del río.", en: "Photographing geisha on private lanes is banned. Dine in Pontocho by the river." } },
    { keys: ["takayama", "sanmachi"], name: "Takayama · Sanmachi 高山", wiki: "Takayama,_Gifu", maps: "Sanmachi Suji, Takayama",
      desc: { es: "Pueblo de montaña con un casco antiguo Edo perfectamente conservado: casas de madera, sake y Hida beef.", en: "Mountain town with a perfectly preserved Edo old quarter: wooden houses, sake breweries and Hida beef." },
      tips: { es: "Prueben el Hida beef (nigiri o brocheta). Mercados matutinos junto al río.", en: "Try Hida beef (nigiri or skewer). Morning markets line the river." } },
    { keys: ["shirakawa"], name: "Shirakawa-go 白川郷", wiki: "Shirakawa-gō", maps: "Shirakawa-go",
      desc: { es: "Aldea Patrimonio UNESCO de casas gassho-zukuri con techos de paja inclinados. En septiembre, verde intenso.", en: "UNESCO village of steep thatched gassho-zukuri farmhouses. Lush green in September." },
      tips: { es: "Suban al mirador Shiroyama para la foto clásica. Reserven el bus desde Takayama.", en: "Climb to the Shiroyama viewpoint for the classic shot. Reserve the bus from Takayama." } },
    { keys: ["shibuya", "hachiko"], name: "Shibuya Crossing 渋谷", wiki: "Shibuya_Crossing", maps: "Shibuya Crossing",
      desc: { es: "El cruce peatonal más famoso del mundo y la estatua del perro Hachiko. Energía pura de Tokio.", en: "The world's busiest pedestrian scramble and the Hachiko dog statue. Pure Tokyo energy." },
      tips: { es: "Vista aérea gratis desde la estación o desde el Starbucks de la esquina.", en: "Free overhead view from the station or the corner Starbucks." } },
    { keys: ["senso-ji", "asakusa", "nakamise"], name: "Senso-ji 浅草寺", wiki: "Sensō-ji", maps: "Senso-ji",
      desc: { es: "El templo más antiguo de Tokio, con la puerta Kaminarimon y la calle de puestos Nakamise.", en: "Tokyo's oldest temple, with the Kaminarimon gate and the Nakamise shopping street." },
      tips: { es: "Prueben el omikuji (suerte) y comida de calle en Nakamise. Muy concurrido a media mañana.", en: "Try an omikuji (fortune) and street snacks on Nakamise. Busy by mid-morning." } },
    { keys: ["teamlab"], name: "teamLab", wiki: "TeamLab_Planets", maps: "teamLab Planets Tokyo",
      desc: { es: "Museo de arte digital inmersivo: salas de luces, espejos infinitos y agua. Una experiencia sensorial.", en: "Immersive digital-art museum: rooms of light, infinite mirrors and water. A sensory experience." },
      tips: { es: "RESERVAR con semanas de antelación. Se anda descalzo y hay agua: lleven a Nico en portabebé.", en: "BOOK weeks ahead. It's barefoot with water sections — carry Nico." } },
    { keys: ["skytree"], name: "Tokyo Skytree", wiki: "Tokyo_Skytree", maps: "Tokyo Skytree",
      desc: { es: "La torre más alta de Japón (634 m) con miradores y el centro comercial Solamachi en la base.", en: "Japan's tallest tower (634 m) with observation decks and the Solamachi mall at its base." },
      tips: { es: "Las vistas nocturnas son las mejores. Tickets online para evitar fila.", en: "Night views are best. Buy tickets online to skip the line." } },
    { keys: ["hakone", "lago ashi", "lake ashi", "torii flotante", "floating torii", "owakudani"], name: "Hakone · Lago Ashi 箱根", wiki: "Lake_Ashi", maps: "Hakone Shrine Lake Ashi torii",
      desc: { es: "Zona de onsen y lago con vistas al Monte Fuji, el torii rojo flotante del santuario y los huevos negros de Owakudani.", en: "Onsen-and-lake area with Mt. Fuji views, the shrine's red floating torii, and Owakudani's black eggs." },
      tips: { es: "El Hakone Free Pass cubre barco, teleférico y trenes. Día largo: salgan temprano.", en: "The Hakone Free Pass covers the boat, ropeway and trains. Long day — leave early." } },
    { keys: ["meiji"], name: "Meiji Jingu 明治神宮", wiki: "Meiji_Shrine", maps: "Meiji Jingu",
      desc: { es: "Santuario sintoísta rodeado de un bosque tranquilo en plena ciudad, junto a Harajuku.", en: "Shinto shrine wrapped in a calm forest in the middle of the city, next to Harajuku." },
      tips: { es: "Sombra y calma para la siesta de Nico. A veces hay bodas tradicionales.", en: "Shade and calm for Nico's nap. You may catch a traditional wedding." } },
    { keys: ["akihabara"], name: "Akihabara 秋葉原", wiki: "Akihabara", maps: "Akihabara",
      desc: { es: "El barrio del anime, manga, videojuegos y electrónica. Tiendas de varias plantas y maid cafés.", en: "The anime, manga, gaming and electronics district. Multi-floor shops and maid cafés." },
      tips: { es: "Super Potato (retro gaming) y Yodobashi (electrónica gigante) son imperdibles.", en: "Super Potato (retro gaming) and Yodobashi (giant electronics) are must-sees." } },
    { keys: ["himeji"], name: "Himeji Castle 姫路城", wiki: "Himeji_Castle", maps: "Himeji Castle",
      desc: { es: "El castillo más bello de Japón, blanco como una garza, original y Patrimonio UNESCO. A 15 min a pie de la estación.", en: "Japan's most beautiful castle — white as a heron, original, and a UNESCO site. 15 min on foot from the station." },
      tips: { es: "Usen lockers en la estación. La subida tiene escaleras empinadas: turnaos con Nico.", en: "Use station lockers. The climb has steep stairs — take turns with Nico." } },
    { keys: ["ginkaku-ji", "nanzen", "camino del filósofo", "philosopher"], name: "Ginkaku-ji y Nanzen-ji 銀閣寺", wiki: "Ginkaku-ji", maps: "Ginkaku-ji",
      desc: { es: "El Pabellón de Plata y su jardín de musgo y arena; el Camino del Filósofo lleva hasta Nanzen-ji, con su gran puerta y el acueducto de ladrillo.", en: "The Silver Pavilion with its moss-and-sand garden; the Philosopher's Path leads to Nanzen-ji, with its great gate and brick aqueduct." },
      tips: { es: "Paseo tranquilo al este, todo enlazado a pie. El acueducto de Nanzen-ji es gratis y precioso.", en: "Calm walk in the east, all linked on foot. Nanzen-ji's aqueduct is free and lovely." } },
    { keys: ["nijo"], name: "Castillo Nijo 二条城", wiki: "Nijō_Castle", maps: "Nijo Castle Kyoto",
      desc: { es: "Residencia del shogun Tokugawa, Patrimonio UNESCO, famoso por sus 'suelos ruiseñor' que chirrían para detectar intrusos.", en: "Tokugawa shogun residence, a UNESCO site, famous for its 'nightingale floors' that chirp to detect intruders." },
      tips: { es: "Cochecito OK en el recinto; descálzate en el palacio Ninomaru. Sello en la entrada.", en: "Stroller OK on grounds; shoes off in Ninomaru palace. Stamp at the entrance." } },
    { keys: ["ueno", "museo nacional", "national museum", "toshogu"], name: "Ueno · Museo Nacional 上野", wiki: "Tokyo_National_Museum", maps: "Tokyo National Museum",
      desc: { es: "El parque de Ueno reúne el Museo Nacional de Tokio (la mejor colección de arte japonés), varios museos más y el santuario Ueno Toshogu.", en: "Ueno Park gathers the Tokyo National Museum (Japan's best art collection), several more museums, and Ueno Toshogu shrine." },
      tips: { es: "Ideal para amantes de la cultura y con calor (museos con aire). Goshuin en Toshogu.", en: "Great for culture lovers and hot days (air-conditioned museums). Goshuin at Toshogu." } },
    { keys: ["yanaka"], name: "Yanaka 谷中", wiki: "Yanaka,_Tokyo", maps: "Yanaka Ginza Tokyo",
      desc: { es: "Uno de los pocos barrios que sobrevivió a guerras y terremotos: calles antiguas, templos, tiendas tradicionales y gatos. El Tokio de antes.", en: "One of the few neighborhoods that survived wars and quakes: old streets, temples, traditional shops and cats. Old Tokyo." },
      tips: { es: "Yanaka Ginza al atardecer, con croquetas y dulces. Muy a pie y tranquilo con cochecito.", en: "Yanaka Ginza at dusk, with croquettes and sweets. Very walkable and calm with a stroller." } },
    { keys: ["koko-en", "koko en", "kokoen"], name: "Jardín Koko-en 好古園", wiki: "Kōko-en", maps: "Koko-en Himeji",
      desc: { es: "Nueve jardines de estilo Edo junto al castillo de Himeji, con estanques, arroyos y una casa de té.", en: "Nine Edo-style gardens beside Himeji Castle, with ponds, streams and a tea house." },
      tips: { es: "Entrada combinada con el castillo. ~45 min, perfecto antes del tren a KIX.", en: "Combined ticket with the castle. ~45 min, perfect before the train to KIX." } }
  ],

  /* ---------------------------------------------------------------------- */
  /*  VISA                                                                  */
  /* ---------------------------------------------------------------------- */
  visa: {
    url: "https://evisa.mofa.go.jp",
    category: { es: "Temporary Visitor", en: "Temporary Visitor" },
    processingNote: { es: "Procesamiento ≥2 semanas (más en temporada alta). Solicitar cuanto antes.", en: "Processing ≥2 weeks (longer in peak season). Apply as soon as possible." },
    warning: { es: "⚠️ En embarque: mostrar el QR abierto EN VIVO en evisa.mofa.go.jp. NUNCA captura o PDF.", en: "⚠️ At boarding: show QR live on evisa.mofa.go.jp. NEVER a screenshot or PDF." },
    persons: [
      { id: "vi-santi", name: "Santiago", role: { es: "Titular + Garante financiero", en: "Applicant + Financial guarantor" }, color: "#1f3a52",
        docs: [
          { id: "vd-s1", label: { es: "Pasaporte colombiano vigente", en: "Valid Colombian passport" } },
          { id: "vd-s2", label: { es: "Foto facial fondo blanco", en: "White-background facial photo" } },
          { id: "vd-s3", label: { es: "Extractos bancarios 3 meses (ahorros, no tarjeta)", en: "3-month bank statements (savings, not credit card)" } },
          { id: "vd-s4", label: { es: "VEVO — prueba visa 482 Australia", en: "VEVO — Australian 482 visa proof" } },
          { id: "vd-s5", label: { es: "Confirmación vuelos JQ23/JQ24 (ref SPBPNW)", en: "Flight confirmation JQ23/JQ24 (ref SPBPNW)" } },
          { id: "vd-s6", label: { es: "Schedule of Stay (itinerario completo con hoteles)", en: "Schedule of Stay (full itinerary with hotels)" } }
        ]
      },
      { id: "vi-geral", name: "Geral", role: { es: "Titular (apoderado: Santiago)", en: "Applicant (proxy: Santiago)" }, color: "#c13b2f",
        docs: [
          { id: "vd-g1", label: { es: "Pasaporte colombiano vigente", en: "Valid Colombian passport" } },
          { id: "vd-g2", label: { es: "Foto facial fondo blanco", en: "White-background facial photo" } },
          { id: "vd-g3", label: { es: "VEVO — prueba visa 482 Australia", en: "VEVO — Australian 482 visa proof" } },
          { id: "vd-g4", label: { es: "Acta de matrimonio", en: "Marriage certificate" } },
          { id: "vd-g5", label: { es: "Pasaporte del garante (Santiago)", en: "Guarantor's passport (Santiago)" } },
          { id: "vd-g6", label: { es: "Letter of Authorization (original firmada a mano)", en: "Letter of Authorization (original hand-signed)" } },
          { id: "vd-g7", label: { es: "Schedule of Stay", en: "Schedule of Stay" } }
        ]
      },
      { id: "vi-nico", name: "Nico", role: { es: "Menor de edad (aplica un padre)", en: "Minor (parent applies)" }, color: "#5a7d4f",
        docs: [
          { id: "vd-n1", label: { es: "Pasaporte colombiano vigente", en: "Valid Colombian passport" } },
          { id: "vd-n2", label: { es: "Foto facial fondo blanco", en: "White-background facial photo" } },
          { id: "vd-n3", label: { es: "Registro de nacimiento + traducción al inglés", en: "Birth certificate + English translation" } },
          { id: "vd-n4", label: { es: "VEVO — prueba visa 482 Australia", en: "VEVO — Australian 482 visa proof" } },
          { id: "vd-n5", label: { es: "Letter of Authorization (confirmar firma bebé con consulado)", en: "Letter of Authorization (confirm baby signature with consulate)" } },
          { id: "vd-n6", label: { es: "Schedule of Stay", en: "Schedule of Stay" } }
        ]
      }
    ],
    reminders: [
      { icon: "🕐", text: { es: "Solicitar pronto — procesamiento ≥2 semanas en temporada alta", en: "Apply soon — ≥2 weeks processing in peak season" } },
      { icon: "🚫", text: { es: "NUNCA escribir \"sightseeing\" en el itinerario — actividades concretas", en: "NEVER write \"sightseeing\" in the itinerary — specific activities" } },
      { icon: "📱", text: { es: "QR en aeropuerto: ABRIR EN VIVO en el sitio. No captura. No PDF.", en: "QR at airport: OPEN LIVE on the website. No screenshot. No PDF." } },
      { icon: "🏦", text: { es: "Extractos: cuenta de ahorros. Tarjetas de crédito NO son válidas.", en: "Statements: savings account. Credit cards are NOT valid." } },
      { icon: "🇦🇺", text: { es: "Permanecer en Australia hasta tener la visa aprobada", en: "Stay in Australia until the visa is approved" } },
      { icon: "📬", text: { es: "Consultas: visasection@bb.mofa.go.jp (caso de Nico, firma bebé)", en: "Queries: visasection@bb.mofa.go.jp (Nico's case, baby signature)" } }
    ]
  },

  /* ---------------------------------------------------------------------- */
  /*  MORE MENU + BOTTOM NAV                                                */
  /* ---------------------------------------------------------------------- */
  moreItems: [
    { kanji: "記", title: { es: "Diario de viaje", en: "Travel diary" }, sub: { es: "recuerdos y fotos por día", en: "memories & photos by day" }, color: "#5a7d4f", screen: "diario" },
    { kanji: "備", title: { es: "Pendientes", en: "To-do" }, sub: { es: "visa, hoteles, reservas", en: "visa, hotels, bookings" }, color: "#c9a24a", screen: "pendientes" },
    { kanji: "査", title: { es: "Visa Japón", en: "Japan Visa" }, sub: { es: "eVISA · documentos · estado", en: "eVISA · documents · status" }, color: "#1f3a52", screen: "visa" },
    { kanji: "翻", title: { es: "Asistente IA", en: "AI Assistant" }, sub: { es: "chat · traduce menús y carteles", en: "chat · translate menus & signs" }, color: "#c13b2f", screen: "asistente" },
    { kanji: "食", title: { es: "Comida", en: "Food" }, sub: { es: "platos imperdibles", en: "must-eat dishes" }, color: "#c13b2f", screen: "comida" },
    { kanji: "宿", title: { es: "Hospedajes", en: "Stays" }, sub: { es: "dónde dormimos", en: "where we sleep" }, color: "#1f3a52", screen: "hotel" },
    { kanji: "鉄", title: { es: "Transporte", en: "Transport" }, sub: { es: "trenes e IC card", en: "trains & IC card" }, color: "#3a3128", screen: "tren" },
    { kanji: "鞄", title: { es: "Maleta", en: "Packing" }, sub: { es: "lista de empaque", en: "packing list" }, color: "#5a7d4f", screen: "maleta" },
    { kanji: "語", title: { es: "Frases", en: "Phrases" }, sub: { es: "japonés básico", en: "basic Japanese" }, color: "#1f3a52", screen: "frases" },
    { kanji: "印", title: { es: "Sellos", en: "Stamps" }, sub: { es: "eki & goshuin", en: "eki & goshuin" }, color: "#c9a24a", screen: "sellos" },
    { kanji: "証", title: { es: "Documentos", en: "Documents" }, sub: { es: "pasaportes, visa", en: "passports, visa" }, color: "#3a3128", screen: "docs" },
    { kanji: "予", title: { es: "Reservas", en: "Bookings" }, sub: { es: "vuelos, hoteles, tours", en: "flights, hotels, tours" }, color: "#1f3a52", screen: "reservas" },
    { kanji: "子", title: { es: "Bebé", en: "Baby" }, sub: { es: "tips y checklist (Nico)", en: "tips & checklist (Nico)" }, color: "#c13b2f", screen: "bebe" },
    { kanji: "算", title: { es: "Presupuesto", en: "Budget" }, sub: { es: "estimado por categoría", en: "estimate by category" }, color: "#5a7d4f", screen: "presupuesto" },
    { kanji: "急", title: { es: "Emergencias", en: "Emergency" }, sub: { es: "números, salud", en: "numbers, health" }, color: "#c13b2f", screen: "emergencias" },
    { kanji: "医", title: { es: "Tarjeta médica de Nico", en: "Nico's medical card" }, sub: { es: "alergias, sangre, seguro", en: "allergies, blood, insurance" }, color: "#c13b2f", screen: "medica" },
    { kanji: "保", title: { es: "Respaldo", en: "Backup" }, sub: { es: "exportar / importar datos", en: "export / import data" }, color: "#3a3128", screen: "backup" }
  ],
  navItems: [
    { kanji: "旅", label: { es: "Inicio", en: "Home" }, key: "inicio" },
    { kanji: "程", label: { es: "Plan", en: "Plan" }, key: "plan" },
    { kanji: "地", label: { es: "Lugares", en: "Places" }, key: "mapa" },
    { kanji: "円", label: { es: "Gastos", en: "Expenses" }, key: "gastos" },
    { kanji: "他", label: { es: "Más", en: "More" }, key: "mas" }
  ]
};
