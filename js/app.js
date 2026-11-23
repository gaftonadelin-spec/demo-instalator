/* =========================================================================
   AquaFix — logica frontend (Vanilla JS, fără dependențe).
   1. Legare SITE_CONFIG → DOM   4. Meniu mobil + header
   2. Randare SITE_DATA          5. Temă dark/light
   3. Formular + submitLeadForm  6. Animații la scroll
   ========================================================================= */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var DATA = window.SITE_DATA || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- utilitare ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function get(obj, path) {
    return path.split(".").reduce(function (o, k) { return o == null ? undefined : o[k]; }, obj);
  }
  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function formatRON(n) { return new Intl.NumberFormat("ro-RO").format(n); }
  function formatRating(n) { return Number(n).toLocaleString("ro-RO", { minimumFractionDigits: 1, maximumFractionDigits: 1 }); }
  function waLink(text) {
    var base = "https://wa.me/" + (CFG.contact && CFG.contact.whatsappNumber || "");
    return text ? base + "?text=" + encodeURIComponent(text) : base;
  }
  function imgTag(src, fallback, alt, cls) {
    return '<img class="' + (cls || "") + '" src="' + esc(src) + '" data-fallback="' + esc(fallback) + '"' +
      ' alt="' + esc(alt || "") + '" loading="lazy" decoding="async" width="900" height="600"' +
      " onerror=\"this.onerror=null;this.src=this.dataset.fallback\">";
  }
  function icon(id, cls) {
    return '<svg class="icon ' + (cls || "") + '" aria-hidden="true"><use href="#' + id + '"/></svg>';
  }

  /* ---------- 1. SITE_CONFIG → DOM ---------- */
  function bindConfig() {
    $all("[data-cfg]").forEach(function (el) {
      var val = get(CFG, el.getAttribute("data-cfg"));
      if (val == null) return;
      if (el.getAttribute("data-format") === "rating") val = formatRating(val);
      el.textContent = val;
    });

    var c = CFG.contact || {}, s = CFG.social || {};
    var hrefs = {
      tel: "tel:" + (c.phoneE164 || ""),
      whatsapp: waLink(),
      email: "mailto:" + (c.email || ""),
      facebook: s.facebook, instagram: s.instagram, googleReviews: s.googleReviews,
    };
    $all("[data-href]").forEach(function (el) {
      var key = el.getAttribute("data-href");
      var href = key === "whatsapp" && el.dataset.waText ? waLink(el.dataset.waText) : hrefs[key];
      if (href) el.setAttribute("href", href);
    });

    $all(".year").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---------- 2. SITE_DATA → DOM ---------- */
  var renderers = {
    services: function (list) {
      return list.map(function (s) {
        if (s.featured) {
          return '<article class="service-card service-featured reveal" id="serviciu-' + esc(s.id) + '">' +
            '<div class="service-featured-media">' + imgTag(s.image, s.fallback, s.alt) + "</div>" +
            '<div class="service-body">' +
              '<span class="service-icon">' + icon(s.icon) + "</span>" +
              "<h3>" + esc(s.title) + "</h3>" +
              "<p>" + esc(s.text) + "</p>" +
              (s.points ? '<ul class="service-points">' + s.points.map(function (p) {
                return "<li>" + icon("i-check") + esc(p) + "</li>";
              }).join("") + "</ul>" : "") +
              '<a class="btn btn-accent" data-href="tel" href="tel:' + esc(CFG.contact.phoneE164) + '">' + icon("i-phone") + "Sună pentru urgență</a>" +
            "</div></article>";
        }
        return '<article class="service-card reveal" id="serviciu-' + esc(s.id) + '">' +
          '<div class="service-media">' + imgTag(s.image, s.fallback, s.alt) + "</div>" +
          '<div class="service-body">' +
            '<h3><span class="service-icon service-icon-sm">' + icon(s.icon) + "</span>" + esc(s.title) + "</h3>" +
            "<p>" + esc(s.text) + "</p>" +
            '<a class="text-link" href="#contact" data-prefill="' + (s.id === "desfundare" ? "desfundare" : "montaj") + '">Cere ofertă<span class="visually-hidden"> pentru ' + esc(s.title.toLowerCase()) + "</span></a>" +
          "</div></article>";
      }).join("");
    },

    pricing: function (groups) {
      return groups.map(function (g) {
        return '<div class="quote-group">' +
          "<h4>" + esc(g.group) + "</h4>" +
          '<ul class="quote-lines">' + g.items.map(function (it) {
            return '<li class="quote-line">' +
              '<span class="quote-name">' + esc(it.name) +
                (it.note ? '<small>' + esc(it.note) + "</small>" : "") + "</span>" +
              '<span class="quote-leader" aria-hidden="true"></span>' +
              '<span class="quote-price"><small>de la</small> ' + formatRON(it.price) + " RON" +
                (it.unit ? " " + esc(it.unit) : "") + "</span>" +
              "</li>";
          }).join("") + "</ul></div>";
      }).join("");
    },

    steps: function (steps) {
      return steps.map(function (s, i) {
        return '<li class="step reveal">' +
          '<span class="step-num" aria-hidden="true">' + (i + 1) + "</span>" +
          "<h3>" + esc(s.title) + "</h3>" +
          "<p>" + esc(s.text) + "</p></li>";
      }).join("");
    },

    reviews: function (reviews) {
      var tones = ["t1", "t2", "t3", "t4"];
      return reviews.map(function (r, i) {
        var initials = r.name.split(" ").map(function (p) { return p[0]; }).slice(0, 2).join("");
        var stars = "";
        for (var k = 0; k < 5; k++) stars += icon("i-star", k < r.rating ? "on" : "off");
        return '<figure class="review reveal">' +
          '<figcaption class="review-head">' +
            '<span class="avatar ' + tones[i % tones.length] + '" aria-hidden="true">' + esc(initials) + "</span>" +
            '<span class="review-who"><strong>' + esc(r.name) + "</strong><span>" + esc(r.area) + "</span></span>" +
            '<svg class="g-mini" aria-hidden="true"><use href="#i-google"/></svg>' +
          "</figcaption>" +
          '<div class="review-meta"><span class="stars" role="img" aria-label="' + r.rating + ' din 5 stele">' + stars + "</span>" +
            "<span>" + esc(r.when) + "</span></div>" +
          "<blockquote><p>" + esc(r.text) + "</p></blockquote>" +
          "</figure>";
      }).join("");
    },

    areas: function (areas) {
      return areas.map(function (a) {
        return "<li>" + icon("i-pin") + esc(a) + "</li>";
      }).join("");
    },

    problemTypes: function (types) {
      return types.map(function (t, i) {
        return '<label class="choice">' +
          '<input type="radio" name="type" value="' + esc(t.value) + '" required' + (i === 0 ? ' aria-describedby="err-type"' : "") + ">" +
          '<span class="choice-box"><strong>' + esc(t.label) + "</strong><small>" + esc(t.hint) + "</small></span>" +
          "</label>";
      }).join("");
    },
  };

  function renderData() {
    $all("[data-render]").forEach(function (el) {
      var key = el.getAttribute("data-render");
      if (renderers[key] && DATA[key]) el.innerHTML = renderers[key](DATA[key]);
    });
  }

  /* ---------- 3. Formular ---------- */

  /**
   * Trimite o solicitare (lead). Punctul unic de integrare cu backend-ul.
   * @param {Object} data  { type, typeLabel, name, phone, address, details, consent, source, page, createdAt }
   * @returns {Promise<{ok:boolean, channel:string, waUrl?:string}>}
   *
   * Mod „demo”: deschide WhatsApp cu mesajul formatat.
   * Mod „api”:  POST JSON către SITE_CONFIG.leads.endpoint (ex. /api/contact,
   *             Formspree, webhook Make/Zapier, script PHP).
   */
  function submitLeadForm(data) {
    var leads = CFG.leads || {};

    if (leads.mode === "api" && leads.endpoint) {
      var ctrl = "AbortController" in window ? new AbortController() : null;
      var timer = ctrl && setTimeout(function () { ctrl.abort(); }, leads.timeoutMs || 12000);
      return fetch(leads.endpoint, {
        method: "POST",
        headers: leads.headers || { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: ctrl ? ctrl.signal : undefined,
      }).then(function (res) {
        if (timer) clearTimeout(timer);
        if (!res.ok) throw new Error("HTTP " + res.status);
        return { ok: true, channel: "api" };
      });
    }

    // DEMO: mesaj WhatsApp formatat
    var lines = [
      "*Solicitare intervenție – " + (CFG.company && CFG.company.shortName || "") + "*",
      "",
      "Tip problemă: " + data.typeLabel,
      "Nume: " + data.name,
      "Telefon: " + data.phone,
      "Adresă / cartier: " + data.address,
    ];
    if (data.details) lines.push("Detalii: " + data.details);
    var url = waLink(lines.join("\n"));
    var win = window.open(url, "_blank", "noopener");
    return Promise.resolve({ ok: true, channel: "whatsapp", waUrl: url, opened: !!win });
  }
  window.submitLeadForm = submitLeadForm; // expus pentru integrare/testare

  var MESSAGES = {
    type: "Alege tipul problemei, ca să trimitem instalatorul potrivit.",
    name: "Scrie-ți numele (minim 2 litere).",
    phone: "Scrie un număr de mobil valid, de forma 07xx xxx xxx.",
    address: "Scrie adresa sau măcar cartierul, ca să știm unde venim.",
    consent: "Bifează acordul, ca să te putem contacta.",
  };

  function initForm() {
    var form = $("#lead-form");
    if (!form) return;
    var success = $(".form-success");
    var summary = $(".form-error-summary", form);
    var submitBtn = $(".form-submit", form);
    var submitLabel = $(".form-submit-label", form);

    if ((CFG.leads || {}).mode === "api") {
      submitLabel.textContent = "Trimite solicitarea";
      $(".form-submit .icon use", form).setAttribute("href", "#i-check");
      var note = $(".form-note", form); if (note) note.hidden = true;
    } else {
      submitLabel.textContent = "Trimite pe WhatsApp";
    }

    function fieldError(name) {
      var el = form.elements[name];
      if (name === "type") return form.querySelector('input[name="type"]:checked') ? "" : MESSAGES.type;
      if (name === "consent") return el.checked ? "" : MESSAGES.consent;
      el.value = el.value.trim();
      return el.checkValidity() ? "" : MESSAGES[name];
    }

    function showError(name, msg) {
      var err = $("#err-" + name);
      if (!err) return;
      err.textContent = msg ? msg : "";
      err.hidden = !msg;
      var inputs = name === "type" ? $all('input[name="type"]', form) : [form.elements[name]];
      inputs.forEach(function (i) { i.setAttribute("aria-invalid", msg ? "true" : "false"); });
    }

    var fields = ["type", "name", "phone", "address", "consent"];

    // validare la blur (nu la fiecare tastă), re-validare după prima eroare
    ["name", "phone", "address"].forEach(function (n) {
      var el = form.elements[n];
      el.addEventListener("blur", function () { if (el.value.trim()) showError(n, fieldError(n)); });
      el.addEventListener("input", function () { if (el.getAttribute("aria-invalid") === "true") showError(n, fieldError(n)); });
    });
    form.addEventListener("change", function (e) {
      if (e.target.name === "type" || e.target.name === "consent") showError(e.target.name, fieldError(e.target.name));
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.elements.website.value) return; // honeypot

      var errors = [];
      fields.forEach(function (n) {
        var msg = fieldError(n);
        showError(n, msg);
        if (msg) errors.push({ name: n, msg: msg });
      });

      if (errors.length) {
        summary.innerHTML = "<p>Mai ai de completat " + (errors.length === 1 ? "un câmp" : errors.length + " câmpuri") + ":</p><ul>" +
          errors.map(function (er) {
            var target = er.name === "type" ? form.querySelector('input[name="type"]').id || "" : "f-" + er.name;
            return '<li><a href="#' + target + '" data-focus="' + er.name + '">' + esc(er.msg) + "</a></li>";
          }).join("") + "</ul>";
        summary.hidden = false;
        summary.focus();
        return;
      }
      summary.hidden = true;

      var typeInput = form.querySelector('input[name="type"]:checked');
      var typeMeta = (DATA.problemTypes || []).filter(function (t) { return t.value === typeInput.value; })[0] || {};
      var payload = {
        type: typeInput.value,
        typeLabel: typeMeta.label || typeInput.value,
        name: form.elements.name.value.trim(),
        phone: form.elements.phone.value.replace(/\s+/g, " ").trim(),
        address: form.elements.address.value.trim(),
        details: form.elements.details.value.trim(),
        consent: true,
        source: "website",
        page: location.href,
        createdAt: new Date().toISOString(),
      };

      submitBtn.disabled = true;
      submitBtn.classList.add("is-loading");

      submitLeadForm(payload).then(function (res) {
        showSuccess(payload, res);
      }).catch(function () {
        toast("Solicitarea nu a putut fi trimisă. Sună-ne direct la " + CFG.contact.phoneDisplay + " sau încearcă din nou.");
      }).then(function () {
        submitBtn.disabled = false;
        submitBtn.classList.remove("is-loading");
      });
    });

    // link-urile din sumarul de erori mută focusul pe câmp
    summary.addEventListener("click", function (e) {
      var a = e.target.closest("a[data-focus]");
      if (!a) return;
      e.preventDefault();
      var n = a.getAttribute("data-focus");
      var el = n === "type" ? form.querySelector('input[name="type"]') : form.elements[n];
      el.focus();
    });

    function showSuccess(p, res) {
      var dl = $(".success-summary", success);
      dl.innerHTML = [["Problemă", p.typeLabel], ["Nume", p.name], ["Telefon", p.phone], ["Adresă", p.address]]
        .map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("");
      var wa = $(".success-wa", success);
      if (res.channel === "whatsapp") {
        wa.href = res.waUrl; wa.hidden = false;
        $("p", success).textContent = res.opened
          ? "Am deschis WhatsApp cu mesajul completat. Apasă „Trimite” acolo și te sunăm în cel mult 15 minute."
          : "Deschide WhatsApp cu butonul de mai jos și apasă „Trimite”. Te sunăm în cel mult 15 minute.";
      } else {
        wa.hidden = true;
        $("p", success).textContent = "Am primit solicitarea. Te sunăm în cel mult 15 minute.";
      }
      form.hidden = true;
      success.hidden = false;
      success.focus();
    }

    $(".form-reset", success).addEventListener("click", function () {
      form.reset();
      fields.forEach(function (n) { showError(n, ""); });
      success.hidden = true;
      form.hidden = false;
      form.elements.name.focus();
    });

    // „Cere ofertă” din cardurile de servicii preselectează tipul
    document.addEventListener("click", function (e) {
      var a = e.target.closest("[data-prefill]");
      if (!a) return;
      var r = form.querySelector('input[name="type"][value="' + a.getAttribute("data-prefill") + '"]');
      if (r) { r.checked = true; showError("type", ""); }
    });

    // id-uri pentru radio (pentru linkurile din sumar)
    $all('input[name="type"]', form).forEach(function (r, i) { r.id = "f-type-" + i; });
  }

  var toastTimer;
  function toast(msg) {
    var t = $(".toast");
    if (!t) return;
    t.textContent = msg;
    t.hidden = false;
    requestAnimationFrame(function () { t.classList.add("is-on"); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      t.classList.remove("is-on");
      setTimeout(function () { t.hidden = true; }, 250);
    }, 5000);
  }

  /* ---------- 4. Header + meniu mobil ---------- */
  function initNav() {
    var header = $(".site-header");
    var toggle = $(".nav-toggle");
    var nav = $("#main-nav");

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Închide meniul" : "Deschide meniul");
      document.body.classList.toggle("nav-open", open);
    }
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) { setOpen(false); toggle.focus(); }
    });
    window.matchMedia("(min-width: 960px)").addEventListener("change", function (m) { if (m.matches) setOpen(false); });

    var ticking = false;
    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    onScroll();

    // link activ în meniu
    if ("IntersectionObserver" in window) {
      var links = $all('.main-nav a[href^="#"]');
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (l) {
            var on = l.getAttribute("href") === "#" + en.target.id;
            l.classList.toggle("is-active", on);
            if (on) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current");
          });
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      $all("main section[id]").forEach(function (s) { io.observe(s); });
    }
  }

  /* ---------- 5. Temă ---------- */
  function initTheme() {
    var key = (CFG.theme && CFG.theme.storageKey) || "aquafix-theme";
    var btn = $(".theme-toggle");
    var root = document.documentElement;
    function sync() {
      var dark = root.getAttribute("data-theme") === "dark";
      btn.setAttribute("aria-pressed", String(dark));
      btn.setAttribute("aria-label", dark ? "Activează tema luminoasă" : "Activează tema întunecată");
    }
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(key, next); } catch (e) { /* stocare indisponibilă */ }
      sync();
    });
    sync();
  }

  /* ---------- 6. Ceas live + animații la scroll ---------- */
  function initClock() {
    var el = $(".live-time");
    if (!el) return;
    function tick() {
      el.textContent = ", ora " + new Date().toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" });
    }
    tick();
    setInterval(tick, 30000);
  }

  function initReveal() {
    var items = $all(".reveal");
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    // întârziere în cascadă pentru elementele din aceeași grilă
    items.forEach(function (el) {
      var siblings = $all(":scope > .reveal", el.parentElement);
      var idx = siblings.indexOf(el);
      el.style.setProperty("--reveal-delay", Math.min(idx, 5) * 60 + "ms");
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- pornire ---------- */
  function init() {
    renderData();
    bindConfig();
    initTheme();
    initNav();
    initForm();
    initClock();
    initReveal();
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
