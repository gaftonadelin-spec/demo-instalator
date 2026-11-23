/* =========================================================================
   SITE_CONFIG — singurul loc de personalizat pentru un client nou.
   Schimbă datele de mai jos; tot site-ul (header, butoane, footer,
   formular, linkuri WhatsApp/telefon) se actualizează automat.
   ========================================================================= */
window.SITE_CONFIG = {
  company: {
    name: "AquaFix Instalații",
    shortName: "AquaFix",
    tagline: "Intervenții Rapide 24/7",
    legalName: "AquaFix Instalații SRL",
    cui: "RO 00000000",            // demo
    foundedYear: 2014,
    city: "Timișoara",
    county: "Timiș",
    address: "Str. Exemplu nr. 10, Timișoara",
    arrivalMinutes: 60,
  },

  contact: {
    phoneDisplay: "0722 000 000",
    phoneE164: "+40722000000",     // folosit în tel:
    whatsappNumber: "40722000000", // fără „+” și fără spații, pentru wa.me
    email: "contact@aquafix.ro",
    hours: "Non-stop, inclusiv în weekend și sărbători",
  },

  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    googleReviews: "https://www.google.com/maps",
  },

  rating: {
    value: 5.0,
    count: 214,
  },

  /* Formular: „demo” trimite pe WhatsApp; „api” face POST JSON la endpoint.
     Pentru Formspree: mode "api", endpoint "https://formspree.io/f/xxxxxx". */
  leads: {
    mode: "demo",                  // "demo" | "api"
    endpoint: "/api/contact",      // viitor backend (Node / PHP / webhook)
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    timeoutMs: 12000,
  },

  theme: {
    storageKey: "aquafix-theme",
  },
};
