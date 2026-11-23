# AquaFix Instalații – site demo

Site static (HTML + CSS + Vanilla JS), fără build, gata de urcat pe GitHub Pages.

## Structură

```
index.html          pagina (secțiuni marcate cu <!-- SECTION: ... -->)
css/tokens.css      culori, fonturi, spațiere, teme light/dark
css/base.css        reset, tipografie, focus, reduced-motion
css/layout.css      container, header, meniu mobil, footer, bara de jos
css/components.css  butoane, formular, toast, animații reveal
css/sections.css    hero, servicii, tarife, proces, recenzii, contact
js/config.js        SITE_CONFIG: firmă, telefon, WhatsApp, email, social, endpoint
js/data.js          SITE_DATA: servicii, tarife, pași, recenzii, cartiere
js/app.js           randare, temă, meniu, formular (submitLeadForm), animații
assets/             favicon + imagini locale de rezervă (fallback pentru Unsplash)
```

## Personalizare pentru alt client

1. Editează `js/config.js` (nume, telefon, WhatsApp, oraș, linkuri).
2. Editează `js/data.js` (servicii, prețuri, recenzii, cartiere).
3. Actualizează `<title>` și `<meta name="description">` din `index.html`.

## Legare la backend

În `js/config.js` schimbă:

```js
leads: { mode: "api", endpoint: "/api/contact" } // sau URL Formspree / webhook
```

`submitLeadForm(data)` trimite atunci un `POST` JSON:

```json
{ "type": "urgenta", "typeLabel": "Urgență", "name": "...", "phone": "...",
  "address": "...", "details": "...", "consent": true, "source": "website",
  "page": "https://...", "createdAt": "2026-11-23T20:00:00.000Z" }
```

Câmpul ascuns `website` este honeypot anti-spam: ignoră pe server cererile care îl au completat.

## Rulare locală

```
python -m http.server 5173
```

apoi deschide http://localhost:5173. Fișierul `index.html` merge și deschis direct din folder.

## GitHub Pages

Urcă tot conținutul folderului într-un repo, apoi Settings → Pages → Deploy from branch → `main` / root. Toate căile sunt relative (`./...`), deci merge și sub `utilizator.github.io/nume-repo/`.
