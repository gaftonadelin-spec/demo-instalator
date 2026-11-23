/* =========================================================================
   SITE_DATA — conținut dinamic (servicii, tarife, pași, recenzii, zone).
   Structura e JSON-compatibilă: poate fi înlocuită ulterior de un răspuns
   de la CMS/API (ex. fetch('/api/content') → window.SITE_DATA = json).
   Imaginile: `image` = Unsplash, `fallback` = fișier local din ./assets.
   ========================================================================= */
window.SITE_DATA = {
  services: [
    {
      id: "urgente",
      featured: true,
      icon: "i-alert",
      title: "Urgențe 24/7",
      text: "Țeavă spartă, inundație, robinet care nu se mai închide. Închidem apa, oprim pierderea și reparăm pe loc, ziua sau noaptea.",
      points: ["Țevi sparte și fisurate", "Inundații și infiltrații", "Robineți și vane blocate"],
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=900&q=70&auto=format&fit=crop",
      fallback: "./assets/img/urgente.svg",
      alt: "Instalator cu cască și mănuși de protecție lucrând la o instalație",
    },
    {
      id: "centrale",
      icon: "i-flame",
      title: "Centrale termice",
      text: "Montaj, revizie anuală, curățare schimbător și depanare. Lucrăm cu Ariston, Vaillant, Bosch, Viessmann și Motan.",
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=900&q=70&auto=format&fit=crop",
      fallback: "./assets/img/centrale.svg",
      alt: "Țevi, vane și manometre ale unei instalații termice montate pe perete",
    },
    {
      id: "desfundare",
      icon: "i-drain",
      title: "Desfundare canalizare și coloane",
      text: "Scurgeri de chiuvetă, cadă, WC și coloane de bloc. Desfundăm mecanic, fără substanțe care distrug țevile.",
      image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=900&q=70&auto=format&fit=crop",
      fallback: "./assets/img/desfundare.svg",
      alt: "Set de scule profesionale pentru instalații",
    },
    {
      id: "bai",
      icon: "i-bath",
      title: "Instalații pentru băi",
      text: "Trasee noi de apă și scurgere, montaj cabină de duș, WC suspendat, lavoar și baterii încastrate.",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900&q=70&auto=format&fit=crop",
      fallback: "./assets/img/bai.svg",
      alt: "Baie modernă cu cabină de duș din sticlă și lavoar",
    },
    {
      id: "bucatarii",
      icon: "i-tap",
      title: "Instalații pentru bucătării",
      text: "Racorduri pentru chiuvetă, mașină de spălat vase și filtre de apă, montate curat, sub mobilier.",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=900&q=70&auto=format&fit=crop",
      fallback: "./assets/img/bucatarii.svg",
      alt: "Bucătărie luminoasă cu mobilier alb",
    },
    {
      id: "pardoseala",
      icon: "i-floor",
      title: "Încălzire în pardoseală",
      text: "Proiectare pe camere, distribuitor cu debitmetre, probă de presiune și reglaj. Căldură uniformă, fără calorifere.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=900&q=70&auto=format&fit=crop",
      fallback: "./assets/img/pardoseala.svg",
      alt: "Living luminos cu pardoseală din parchet",
    },
  ],

  /* Prețuri orientative, în RON, fără materiale. */
  pricing: [
    {
      group: "Urgențe și deplasare",
      items: [
        { name: "Deplasare și constatare în oraș", price: 100, unit: "", note: "se scade din lucrare" },
        { name: "Intervenție de urgență, zi", price: 250, unit: "" },
        { name: "Intervenție de urgență, noapte și weekend", price: 350, unit: "" },
        { name: "Reparație țeavă spartă (punct de lucru)", price: 200, unit: "" },
      ],
    },
    {
      group: "Desfundare",
      items: [
        { name: "Scurgere chiuvetă, cadă sau duș", price: 180, unit: "" },
        { name: "Desfundare WC", price: 200, unit: "" },
        { name: "Coloană de bloc", price: 450, unit: "" },
      ],
    },
    {
      group: "Termic",
      items: [
        { name: "Revizie centrală termică", price: 250, unit: "" },
        { name: "Montaj centrală termică", price: 900, unit: "" },
        { name: "Încălzire în pardoseală, montaj", price: 85, unit: "/ m²" },
      ],
    },
    {
      group: "Sanitare",
      items: [
        { name: "Montaj baterie lavoar sau chiuvetă", price: 120, unit: "" },
        { name: "Montaj WC suspendat cu cadru", price: 450, unit: "" },
        { name: "Instalație completă baie (apă + scurgere)", price: 2200, unit: "" },
      ],
    },
  ],

  steps: [
    {
      title: "Ne suni sau ne scrii pe WhatsApp",
      text: "Ne spui ce s-a întâmplat și unde ești. Dacă poți, trimite o poză: ne ajută să venim cu piesele potrivite.",
    },
    {
      title: "Diagnosticare rapidă și deviz clar",
      text: "Instalatorul verifică pe loc și îți spune exact ce trebuie făcut și cât costă, înainte să înceapă lucrarea.",
    },
    {
      title: "Execuție curată, cu garanție scrisă",
      text: "Lucrăm cu folie de protecție, strângem după noi și îți lăsăm factura și certificatul de garanție.",
    },
  ],

  reviews: [
    {
      name: "Andreea Popescu",
      area: "Complexul Studențesc",
      when: "acum 2 săptămâni",
      rating: 5,
      text: "S-a spart o țeavă la baie la 11 noaptea. Au răspuns din primul apel și în 40 de minute instalatorul era la ușă. A oprit apa, a schimbat bucata de țeavă și a lăsat totul curat.",
    },
    {
      name: "Mihai Dragomir",
      area: "Calea Șagului",
      when: "acum o lună",
      rating: 5,
      text: "Mi-au montat centrala nouă și au mutat caloriferul din dormitor. Prețul a fost exact cel din deviz, fără surprize. Recomand.",
    },
    {
      name: "Ioana Mureșan",
      area: "Fabric",
      when: "acum 2 luni",
      rating: 5,
      text: "Coloana de la bucătărie era înfundată de ani de zile. Au desfundat-o cu sârmă mecanică și mi-au arătat pe cameră ce era în ea. Oameni serioși.",
    },
    {
      name: "Cristian Ilie",
      area: "Dumbrăvița",
      when: "acum 3 luni",
      rating: 5,
      text: "Încălzire în pardoseală pe tot parterul. Au venit cu un plan pe camere, au făcut proba de presiune cu mine de față. După o iarnă, merge perfect.",
    },
  ],

  areas: [
    "Centru", "Fabric", "Iosefin", "Elisabetin", "Complexul Studențesc",
    "Calea Șagului", "Circumvalațiunii", "Dacia", "Lipovei", "Girocului",
    "Freidorf", "Mehala", "Ronaț", "Dumbrăvița", "Giroc", "Moșnița Nouă",
  ],

  /* Opțiunile din formular (value = cheie stabilă pentru backend). */
  problemTypes: [
    { value: "urgenta", label: "Urgență", hint: "țeavă spartă, inundație" },
    { value: "montaj", label: "Montaj", hint: "centrală, baie, bucătărie" },
    { value: "desfundare", label: "Desfundare", hint: "scurgere, WC, coloană" },
  ],
};
