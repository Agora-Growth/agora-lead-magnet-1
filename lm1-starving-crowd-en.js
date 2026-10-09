/*! Agora Growth · Lead Magnet 1 · Find your Starving Crowd (EN) · v1.2
 *  Mounts itself inside <div id="ag-lm1"></div>.
 *  Config: define window.AG_LM1_CONFIG BEFORE loading this script (see DEFAULTS).
 */
(function () {
  'use strict';

  /* ===================== CONFIGURACIÓN ===================== */
  var DEFAULTS = {
    mountId: 'ag-lm1',
    tool: 'lm1_starving_crowd',
    // URL del Apps Script publicado como Web App (doPost). Vacío = no se envía nada.
    endpoint: '',
    privacyUrl: 'https://www.agoragrowth.com/privacy-policy',
    // Variante de naming por defecto. También se puede forzar con ?v=a|b|c en la URL (útil para ads).
    variant: 'a',
    variants: {
      a: { headline: 'Which industry should you focus on?', accent: 'Find your Starving Crowd.' },
      b: { headline: 'Stop selling to everyone.', accent: 'Find out who your real ideal customer is.' },
      c: { headline: 'The diagnostic that tells you who to chase', accent: '(and who to stop chasing).' }
    },
    sub: 'Compare up to 3 segments in 2 minutes. Find your true Starving Crowd — and why.',
    // false = sin CTA de venta (ni en pantalla ni en el PDF). Útil mientras el tool sea solo para alumnos graduados.
    showCta: true,
    sprint: {
      url: 'https://www.agoragrowth.com/',   // Landing del Sprint Ejecutivo
      waitlistUrl: '',                        // Lista de espera (si vacío, usa sprint.url)
      kickoff: null,                          // ISO de la próxima cohorte, ej. '2026-11-09T08:00:00-06:00'. null = modo lista de espera
      closeHoursBefore: 72,                   // Inscripciones cierran X horas antes del kick-off
      seatsTotal: 20,
      seatsLeft: null,                        // Número real de lugares restantes. null = no se muestra
      timeZone: 'America/Mexico_City'
    },
    libs: {
      html2canvas: 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
      jspdf: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
    },
    fontsUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=DM+Serif+Display&display=swap',
    logoWhite: 'data:image/png;base64,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'
  };

  function merge(a, b) {
    var out = {};
    Object.keys(a).forEach(function (k) { out[k] = a[k]; });
    if (!b) return out;
    Object.keys(b).forEach(function (k) {
      if (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a[k] && typeof a[k] === 'object') out[k] = merge(a[k], b[k]);
      else out[k] = b[k];
    });
    return out;
  }
  var CFG = merge(DEFAULTS, window.AG_LM1_CONFIG);
  var VERSION = '1.2';

  /* ===================== CONTENT: THE 5 CRITERIA ===================== */
  // PRIORITY order breaks ties (what weighs more when points are tied
  // and which criterion is reported as "weakest" when two share the same rating).
  var PRIORITY = ['dolor', 'pago', 'busqueda', 'acceso', 'competencia'];

  var CRITERIA = [
    {
      id: 'dolor', short: 'Pain', name: 'Urgent, costly pain',
      q: 'How urgent and costly is the problem you solve for them?',
      lo: 'It’s a “nice to have”. They’re fine without solving it.',
      hi: 'It costs them money every month and they want it solved now.',
      strong: 'urgent, costly pain', weak: 'the problem isn’t urgent for them',
      weakTitle: 'The problem isn’t urgent for them',
      explain: 'If the problem doesn’t hurt today, every sale requires convincing first. That stretches your sales cycles and lowers your close rate, however good your solution is.',
      action: 'Call 5 clients or prospects in {seg} and ask how much that problem costs them per month today. If nobody can put a number on it, it’s not urgent pain.'
    },
    {
      id: 'busqueda', short: 'Search', name: 'Actively looking for a solution',
      q: 'How actively are they already looking for a solution?',
      lo: 'We have to convince them they have the problem.',
      hi: 'They’re already getting quotes, asking around or trying alternatives.',
      strong: 'they’re already looking for a solution', weak: 'they aren’t looking for a solution',
      weakTitle: 'They aren’t looking for a solution',
      explain: 'Selling to people who aren’t looking means educating the market before you can sell. It can be done, but it’s slow and expensive, and someone else may reap what you sowed.',
      action: 'Review your last 10 opportunities in {seg}: how many came to you asking for help, and how many did you have to create yourself? That number is your real demand thermometer.'
    },
    {
      id: 'pago', short: 'Budget', name: 'Real ability to pay',
      q: 'Can they pay what your solution is worth without haggling?',
      lo: 'Minimal budget. Everything is decided on price.',
      hi: 'They have budget and pay well for results.',
      strong: 'strong ability to pay', weak: 'limited ability to pay',
      weakTitle: 'Limited ability to pay',
      explain: 'A segment with pain but no budget says yes… and then asks for a discount. You work just as hard for a much thinner margin.',
      action: 'Review your last 5 sales to {seg}: average deal size and the discount you gave. If almost all of them closed with a discount, price is doing the job value should be doing.'
    },
    {
      id: 'acceso', short: 'Access', name: 'Ease of access',
      q: 'How easy is it to reach the person who makes the buying decision?',
      lo: 'We don’t know who decides or where to find them.',
      hi: 'Easy to find: lists, events, associations, contacts.',
      strong: 'easy access to decision-makers', weak: 'decision-makers are hard to reach',
      weakTitle: 'Decision-makers are hard to reach',
      explain: 'If you can’t find and contact the person who decides, your acquisition cost skyrockets. A great market you can’t reach is, in practice, a bad market.',
      action: 'Take 30 minutes to build a list of 20 people who make the buying decision in {seg}, with name, title and how to contact them. If you can’t get to 20, that’s your bottleneck.'
    },
    {
      id: 'competencia', short: 'Competition', name: 'Little relevant competition',
      q: 'How alone are you in that market?',
      lo: 'Many sell them the same thing and everyone competes on price (Red Ocean).',
      hi: 'Almost nobody solves this well for them (Blue Ocean).',
      strong: 'little competition (Blue Ocean)', weak: 'a saturated market (Red Ocean)',
      weakTitle: 'Saturated market (Red Ocean)',
      explain: 'With many similar options, buyers compare on price. That’s no reason to drop the segment, but you need a clearly different offer to stay out of the discount war.',
      action: 'Find your 3 most common competitors in {seg} and write down in one line what each one promises. If your promise sounds the same, the problem isn’t the market: it’s your differentiation.'
    }
  ];
  var CRIT = {};
  CRITERIA.forEach(function (c) { CRIT[c.id] = c; });

  var PLACEHOLDERS = ['E.g. Law firms', 'E.g. Private clinics', 'E.g. Mid-size construction firms'];

  /* ===================== UTILIDADES ===================== */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function qs(name) {
    try { return new URLSearchParams(window.location.search).get(name); } catch (e) { return null; }
  }
  function slug(s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
  }
  function fmtDate(d, opts) {
    try { return new Intl.DateTimeFormat('en-US', merge({ timeZone: CFG.sprint.timeZone }, opts)).format(d); }
    catch (e) { return d.toLocaleDateString(); }
  }
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[data-aglm-src="' + src + '"]');
      if (existing && existing.getAttribute('data-loaded')) return resolve();
      if (existing) { // todavía cargando: esperar a que termine
        existing.addEventListener('load', function () { resolve(); });
        existing.addEventListener('error', function () { reject(new Error('Could not load ' + src)); });
        return;
      }
      var s = document.createElement('script');
      s.src = src; s.async = true; s.setAttribute('data-aglm-src', src);
      s.onload = function () { s.setAttribute('data-loaded', '1'); resolve(); };
      s.onerror = function () { if (s.parentNode) s.parentNode.removeChild(s); reject(new Error('Could not load ' + src)); };
      document.head.appendChild(s);
    });
  }

  var variantKey = (qs('v') || CFG.variant || 'a').toLowerCase();
  if (!CFG.variants[variantKey]) variantKey = 'a';
  var VARIANT = CFG.variants[variantKey];

  function utm() {
    var o = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'].forEach(function (k) {
      var v = qs(k); if (v) o[k] = v;
    });
    return o;
  }

  // Analytics: GTM/GA4 (dataLayer), gtag y Meta Pixel si existen en la página.
  function track(name, props) {
    var payload = merge({ tool: CFG.tool, variant: variantKey, lang: 'en' }, props || {});
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(merge({ event: name }, payload));
      if (typeof window.gtag === 'function') window.gtag('event', name, payload);
      if (typeof window.fbq === 'function') {
        if (name === 'ag_lm1_lead') window.fbq('track', 'Lead', { content_name: CFG.tool });
        else window.fbq('trackCustom', name, payload);
      }
    } catch (e) { /* nunca romper el tool por analytics */ }
  }

  /* ===================== CÁLCULO ===================== */
  function pick(r, mode) {
    var best = null;
    PRIORITY.forEach(function (id) {
      if (best === null) { best = id; return; }
      if (mode === 'min' ? r[id] < r[best] : r[id] > r[best]) best = id;
    });
    return best;
  }
  function band(t) {
    if (t >= 21) return { id: 'hot', label: 'Starving Crowd' };
    if (t >= 16) return { id: 'warm', label: 'Promising' };
    if (t >= 11) return { id: 'mild', label: 'Lukewarm' };
    return { id: 'cold', label: 'Cold' };
  }
  function summary(s) {
    var vals = CRITERIA.map(function (c) { return s.r[c.id]; });
    var mn = Math.min.apply(null, vals), mx = Math.max.apply(null, vals);
    if (mn >= 4) return 'Strong on all 5 criteria: no real weak spot.';
    if (mx <= 2) return 'Weak on almost every criterion: not a priority market today.';
    if (mx <= 3) return 'No clear strength; what holds it back most: ' + CRIT[s.weakest].weak + '.';
    return cap(CRIT[s.strongest].strong) + ', but ' + CRIT[s.weakest].weak + '.';
  }

  function compute() {
    var segs = S.active.map(function (name, i) {
      var r = S.ratings[i], total = 0;
      CRITERIA.forEach(function (c) { total += r[c.id]; });
      var s = { i: i, name: name, r: r, total: total, weakest: pick(r, 'min'), strongest: pick(r, 'max'), band: band(total) };
      s.deal = r.dolor <= 2 ? 'dolor' : (r.pago <= 2 ? 'pago' : null);
      s.summary = summary(s);
      return s;
    });
    var ranked = segs.slice().sort(function (a, b) {
      if (b.total !== a.total) return b.total - a.total;
      for (var k = 0; k < PRIORITY.length; k++) {
        var id = PRIORITY[k];
        if (b.r[id] !== a.r[id]) return b.r[id] - a.r[id];
      }
      return a.i - b.i;
    });
    ranked.forEach(function (s, idx) { s.rank = idx + 1; });

    var W = ranked[0], S2 = ranked[1], L = ranked[ranked.length - 1];
    var margin = W.total - S2.total;
    var v = { winner: W, second: S2, margin: margin };

    if (W.total <= 12) {
      v.type = 'none';
      v.title = 'None of them is a Starving Crowd (yet)';
      v.text = 'Your best segment, ' + W.name + ', scores ' + W.total + '/25. None of them combines enough pain, active search and ability to pay. Before doubling down on these, it’s worth evaluating new segments.';
    } else if (W.deal) {
      var dc = CRIT[W.deal];
      v.type = 'alert';
      v.title = 'Your best option today: ' + W.name + ', with a warning';
      v.text = 'It has the highest score (' + W.total + '/25), but you rated “' + dc.name.toLowerCase() + '” ' + W.r[W.deal] + '/5. Without ' + (W.deal === 'dolor' ? 'urgent pain' : 'the ability to pay') + ', a market isn’t a Starving Crowd, even if the total looks good. Validate that point before investing more in it.';
    } else if (margin <= 2) {
      v.type = 'close';
      if (margin === 0) {
        v.title = 'Technical tie: ' + W.name + ' and ' + S2.name;
        v.text = 'Both score ' + W.total + '/25. We break ties by pain, then ability to pay, and ' + W.name + ' wins by a hair. Before committing, validate each one’s weakest point this week.';
      } else {
        v.title = 'Narrow win: ' + W.name;
        v.text = 'Only ' + margin + (margin === 1 ? ' point separates ' : ' points separate ') + W.name + ' (' + W.total + '/25) from ' + S2.name + ' (' + S2.total + '/25). It’s a signal, not a verdict: validate the weakest point of both this week before committing.';
      }
    } else if (W.total >= 18) {
      v.type = 'clear';
      v.title = 'Your Starving Crowd: ' + W.name;
      v.text = 'With ' + W.total + '/25, it beats ' + S2.name + ' by ' + margin + ' points. Its biggest strength: ' + CRIT[W.strongest].strong + '. That’s where every hour of prospecting pays off most.';
    } else {
      v.type = 'moderate';
      v.title = 'Your best option: ' + W.name;
      v.text = 'It wins with ' + W.total + '/25, ' + margin + ' points ahead of ' + S2.name + ', but it’s not a full Starving Crowd yet. What holds it back: ' + CRIT[W.weakest].weak + '. Fix that and it becomes your main market.';
    }

    v.stop = (ranked.length >= 2 && L !== W && (W.total - L.total) >= 4) ? L : null;
    return { segs: segs, ranked: ranked, verdict: v };
  }

  function sprintState() {
    var sp = CFG.sprint;
    if (sp.kickoff) {
      var k = new Date(sp.kickoff);
      if (!isNaN(k)) {
        var close = new Date(k.getTime() - sp.closeHoursBefore * 3600 * 1000);
        if (Date.now() < close.getTime()) {
          var line = 'Next cohort: ' + fmtDate(k, { weekday: 'long', day: 'numeric', month: 'long' }) +
            ' · Max. ' + sp.seatsTotal + ' participants · Enrollment closes on ' +
            fmtDate(close, { weekday: 'long', day: 'numeric', month: 'long' }) + ' or earlier if it fills up.';
          if (typeof sp.seatsLeft === 'number' && sp.seatsLeft >= 0) line += ' ' + sp.seatsLeft + ' spots left.';
          return { open: true, url: sp.url, label: 'Save your spot in the Executive Sprint', line: line };
        }
      }
    }
    return {
      open: false, url: sp.waitlistUrl || sp.url, label: 'Join the waitlist for the next cohort',
      line: 'Each cohort has a maximum of ' + sp.seatsTotal + ' participants. People on the waitlist hear first when enrollment opens.'
    };
  }

  function nextText(v) {
    if (v.type === 'none') {
      return 'Before building an offer, you need a market worth pursuing. In the Executive Sprint we define it with you in Blueprint 1 (Where to Play), with data instead of gut feeling, and in the same week you build the offer and the channels for that market.';
    }
    return 'Your market has a name: ' + v.winner.name + '. Now it’s time to build an offer they can’t refuse and a system that brings you prospects from that segment every week. That’s what you build in the Executive Sprint: a growth system in 5 days that includes Blueprints 2 (Offer Packaging) and 3 (Demand Channels).';
  }

  /* ===================== ESTILOS ===================== */
  var CSS = [
    '#ag-lm1{--ag-ink:#000919;--ag-blue:#1a11f7;--ag-blue-h:#1209c9;--ag-deep:#00086d;--ag-bright:#0000f1;--ag-lime:#cbff8b;--ag-lime-soft:#dff9bf;--ag-lime-line:#b8ec7a;--ag-bg:#f3f3f3;--ag-card:#fafafa;--ag-line:#d6d6d6;--ag-muted:#5b5f6a;--ag-faint:#e3e3e6;',
    'font-family:"DM Sans",system-ui,-apple-system,"Segoe UI",sans-serif;color:var(--ag-ink);background:var(--ag-bg);border-radius:24px;padding:32px 20px 28px;max-width:680px;margin:0 auto;text-align:left;line-height:1.5;-webkit-font-smoothing:antialiased;position:relative;overflow:hidden}',
    '#ag-lm1 *,#ag-lm1 *::before,#ag-lm1 *::after{box-sizing:border-box}',
    '#ag-lm1 h1,#ag-lm1 h2,#ag-lm1 h3,#ag-lm1 p{margin:0;padding:0;letter-spacing:normal;text-transform:none}',
    '#ag-lm1 button,#ag-lm1 input,#ag-lm1 a{margin:0;font-family:inherit;letter-spacing:normal;text-transform:none;box-shadow:none}',
    '#ag-lm1 ul,#ag-lm1 li{letter-spacing:normal}',
    '#ag-lm1 .aglm-screen{animation:aglmIn .35s ease both}',
    '@keyframes aglmIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
    '@media (prefers-reduced-motion:reduce){#ag-lm1 .aglm-screen{animation:none}}',
    '#ag-lm1 .aglm-pill{display:inline-block;font:700 12px/1 "DM Sans",sans-serif;letter-spacing:.12em;text-transform:uppercase;padding:8px 14px;border-radius:999px;background:var(--ag-blue);color:#fff}',
    '#ag-lm1 .aglm-pill--lime{background:var(--ag-lime);color:var(--ag-ink)}',
    '#ag-lm1 .aglm-pill--ink{background:var(--ag-ink);color:var(--ag-lime)}',
    '#ag-lm1 .aglm-h1{font:400 40px/1.04 "DM Serif Display",Georgia,serif;margin:18px 0 0;color:var(--ag-ink)}',
    '#ag-lm1 .aglm-h1 span{display:block;color:var(--ag-blue)}',
    '#ag-lm1 .aglm-h2{font:400 28px/1.12 "DM Serif Display",Georgia,serif;color:var(--ag-ink)}',
    '#ag-lm1 .aglm-h3{font:700 18px/1.3 "DM Sans",sans-serif;color:var(--ag-ink)}',
    '#ag-lm1 .aglm-lead{font-size:17px;color:var(--ag-muted);margin-top:14px;max-width:34em}',
    '#ag-lm1 .aglm-muted{color:var(--ag-muted)}',
    '#ag-lm1 .aglm-small{font-size:13px;color:var(--ag-muted)}',
    '#ag-lm1 .aglm-checks{list-style:none;margin:22px 0 26px;padding:0;display:grid;gap:10px}',
    '#ag-lm1 .aglm-checks li{display:flex;gap:10px;align-items:center;font-size:15px;font-weight:500;margin:0}',
    '#ag-lm1 .aglm-checks li::before{content:"";flex:0 0 22px;height:22px;border-radius:7px;background:var(--ag-lime) url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23000919\' stroke-width=\'3\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M5 12.5l4.5 4.5L19 7.5\'/%3E%3C/svg%3E") center/14px no-repeat}',
    '#ag-lm1 .aglm-btn{display:flex;width:100%;align-items:center;justify-content:center;gap:10px;min-height:54px;padding:14px 24px;border:0;border-radius:999px;background:var(--ag-blue);color:#fff;font:700 16px/1.2 "DM Sans",sans-serif;cursor:pointer;text-decoration:none;transition:background .15s,transform .1s,opacity .15s;-webkit-appearance:none;appearance:none;text-align:center}',
    '#ag-lm1 .aglm-btn:hover{background:var(--ag-blue-h);color:#fff}',
    '#ag-lm1 .aglm-btn:active{transform:scale(.985)}',
    '#ag-lm1 .aglm-btn[disabled]{opacity:.35;cursor:not-allowed;transform:none}',
    '#ag-lm1 .aglm-btn--lime{background:var(--ag-lime);color:var(--ag-ink)}',
    '#ag-lm1 .aglm-btn--lime:hover{background:#b9f26d;color:var(--ag-ink)}',
    '#ag-lm1 .aglm-btn:focus-visible,#ag-lm1 .aglm-link:focus-visible,#ag-lm1 .aglm-opt:focus-visible{outline:3px solid var(--ag-blue);outline-offset:3px}',
    '#ag-lm1 .aglm-btn--lime:focus-visible{outline-color:var(--ag-lime)}',
    '#ag-lm1 .aglm-link{background:none;border:0;padding:6px 0;font:500 15px/1.3 "DM Sans",sans-serif;color:var(--ag-ink);text-decoration:underline;text-underline-offset:3px;cursor:pointer}',
    '#ag-lm1 .aglm-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px;min-height:32px}',
    '#ag-lm1 .aglm-count{font:700 12px/1 "DM Sans",sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--ag-muted)}',
    '#ag-lm1 .aglm-progress{height:6px;border-radius:99px;background:var(--ag-faint);overflow:hidden;margin-bottom:26px}',
    '#ag-lm1 .aglm-progress span{display:block;height:100%;background:var(--ag-blue);border-radius:99px;transition:width .35s ease}',
    '#ag-lm1 .aglm-field{display:block;margin-top:14px}',
    '#ag-lm1 .aglm-field-label{display:block;font:700 14px/1.2 "DM Sans",sans-serif;margin-bottom:7px;color:var(--ag-ink)}',
    '#ag-lm1 .aglm-field-label em{font-style:normal;font-weight:400;color:var(--ag-muted)}',
    '#ag-lm1 .aglm-input{display:block;width:100%;height:54px;padding:0 16px;border:1.5px solid var(--ag-line);border-radius:14px;background:#fff;font:400 16px/1.2 "DM Sans",sans-serif;color:var(--ag-ink);margin:0;box-shadow:none;-webkit-appearance:none;appearance:none}',
    '#ag-lm1 .aglm-input::placeholder{color:#9a9ca3}',
    '#ag-lm1 .aglm-input:focus{outline:none;border-color:var(--ag-blue);box-shadow:0 0 0 4px rgba(26,17,247,.14)}',
    '#ag-lm1 .aglm-input.is-error{border-color:#d93025}',
    '#ag-lm1 .aglm-err{color:#c5221f;font-size:13px;margin-top:6px;min-height:0}',
    '#ag-lm1 .aglm-actions{margin-top:26px;display:grid;gap:12px}',
    '#ag-lm1 .aglm-anchors{display:grid;gap:6px;margin:16px 0 18px;padding:12px 14px;border-radius:14px;background:#fff;border:1px solid var(--ag-line);font-size:14px;line-height:1.4}',
    '#ag-lm1 .aglm-anchors div{display:flex;gap:10px;align-items:flex-start}',
    '#ag-lm1 .aglm-anchors b{flex:0 0 26px;height:26px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;font:700 13px/1 "DM Sans",sans-serif;background:var(--ag-faint);color:var(--ag-ink)}',
    '#ag-lm1 .aglm-anchors div:last-child b{background:var(--ag-blue);color:#fff}',
    '#ag-lm1 .aglm-rows{display:grid;gap:12px}',
    '#ag-lm1 .aglm-row{background:var(--ag-card);border:1.5px solid var(--ag-line);border-radius:16px;padding:14px;transition:border-color .2s}',
    '#ag-lm1 .aglm-row.is-done{border-color:var(--ag-lime-line);background:#f6fdee}',
    '#ag-lm1 .aglm-rowname{font:700 16px/1.3 "DM Sans",sans-serif;margin-bottom:10px;word-break:break-word}',
    '#ag-lm1 .aglm-scale{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}',
    '#ag-lm1 .aglm-opt{height:50px;border-radius:12px;border:1.5px solid var(--ag-line);background:#fff;color:var(--ag-ink);font:700 18px/1 "DM Sans",sans-serif;cursor:pointer;padding:0;margin:0;-webkit-appearance:none;appearance:none;transition:background .12s,border-color .12s,color .12s}',
    '#ag-lm1 .aglm-opt:hover{border-color:var(--ag-blue)}',
    '#ag-lm1 .aglm-opt[aria-checked="true"]{background:var(--ag-blue);border-color:var(--ag-blue);color:#fff}',
    '#ag-lm1 .aglm-scale-legend{display:flex;justify-content:space-between;font-size:12px;color:var(--ag-muted);margin-top:6px}',
    /* resultado */
    '#ag-lm1 .aglm-verdict{border-radius:22px;padding:24px 22px 22px;color:#fff;background:linear-gradient(180deg,var(--ag-deep) 0%,#0000d8 100%);position:relative;overflow:hidden}',
    '#ag-lm1 .aglm-verdict .aglm-h2{color:#fff;font-size:30px;margin-top:16px;word-break:break-word}',
    '#ag-lm1 .aglm-verdict p{color:rgba(255,255,255,.86);font-size:16px;margin-top:12px}',
    '#ag-lm1 .aglm-score{display:flex;align-items:baseline;gap:6px;margin-top:18px}',
    '#ag-lm1 .aglm-score b{font:400 60px/1 "DM Serif Display",Georgia,serif;color:var(--ag-lime)}',
    '#ag-lm1 .aglm-score span{font-size:16px;color:rgba(255,255,255,.75)}',
    '#ag-lm1 .aglm-sec{margin-top:34px}',
    '#ag-lm1 .aglm-sec > .aglm-h2{margin:12px 0 16px}',
    '#ag-lm1 .aglm-seg{background:var(--ag-card);border:1.5px solid var(--ag-line);border-radius:18px;padding:18px 16px;margin-top:12px}',
    '#ag-lm1 .aglm-seg.is-win{background:var(--ag-lime-soft);border-color:var(--ag-lime-line)}',
    '#ag-lm1 .aglm-seg-head{display:flex;align-items:flex-start;gap:12px}',
    '#ag-lm1 .aglm-rank{flex:0 0 34px;height:34px;border-radius:10px;background:var(--ag-ink);color:#fff;font:400 20px/34px "DM Serif Display",Georgia,serif;text-align:center}',
    '#ag-lm1 .aglm-seg.is-win .aglm-rank{background:var(--ag-blue)}',
    '#ag-lm1 .aglm-seg-name{flex:1;min-width:0;font:700 17px/1.3 "DM Sans",sans-serif;word-break:break-word}',
    '#ag-lm1 .aglm-seg-total{font:400 26px/1 "DM Serif Display",Georgia,serif;white-space:nowrap}',
    '#ag-lm1 .aglm-seg-total small{font:400 13px "DM Sans",sans-serif;color:var(--ag-muted)}',
    '#ag-lm1 .aglm-band{display:inline-block;margin-top:6px;font:700 11px/1 "DM Sans",sans-serif;letter-spacing:.1em;text-transform:uppercase;padding:6px 10px;border-radius:99px}',
    '#ag-lm1 .aglm-band--hot{background:var(--ag-ink);color:var(--ag-lime)}',
    '#ag-lm1 .aglm-band--warm{background:var(--ag-blue);color:#fff}',
    '#ag-lm1 .aglm-band--mild{background:#fff;color:var(--ag-ink);border:1px solid var(--ag-line)}',
    '#ag-lm1 .aglm-band--cold{background:var(--ag-faint);color:var(--ag-muted)}',
    '#ag-lm1 .aglm-seg-sum{margin-top:12px;font-size:15px;font-weight:500}',
    '#ag-lm1 .aglm-bars{display:grid;gap:7px;margin-top:14px}',
    '#ag-lm1 .aglm-bar{display:grid;grid-template-columns:96px 1fr 18px;align-items:center;gap:10px;font-size:13px}',
    '#ag-lm1 .aglm-bar-label{color:var(--ag-muted);white-space:nowrap}',
    '#ag-lm1 .aglm-bar.is-weak .aglm-bar-label{color:#c5221f;font-weight:700}',
    '#ag-lm1 .aglm-pips{display:grid;grid-template-columns:repeat(5,1fr);gap:3px}',
    '#ag-lm1 .aglm-pips i{display:block;height:8px;border-radius:3px;background:var(--ag-faint)}',
    '#ag-lm1 .aglm-pips i.on{background:var(--ag-blue)}',
    '#ag-lm1 .aglm-bar.is-weak .aglm-pips i.on{background:#e8453c}',
    '#ag-lm1 .aglm-bar-n{font-weight:700;text-align:right}',
    '#ag-lm1 .aglm-card{background:#fff;border:1.5px solid var(--ag-line);border-radius:18px;padding:20px 18px}',
    '#ag-lm1 .aglm-card p{margin-top:10px;font-size:15px}',
    '#ag-lm1 .aglm-weak{font:700 12px/1.3 "DM Sans",sans-serif !important;letter-spacing:.08em;text-transform:uppercase;color:#c5221f;margin-top:6px !important}',
    '#ag-lm1 .aglm-jump{display:inline-flex;align-items:center;margin-top:18px;padding:11px 16px;border-radius:999px;border:1.5px solid rgba(203,255,139,.55);background:transparent;color:var(--ag-lime);font:700 14px/1.2 "DM Sans",sans-serif;cursor:pointer;-webkit-appearance:none;appearance:none;text-align:left}',
    '#ag-lm1 .aglm-jump:hover{background:rgba(203,255,139,.12)}',
    '#ag-lm1 .aglm-do{margin-top:14px;padding:14px 14px 14px 16px;border-radius:14px;background:var(--ag-lime-soft);border-left:4px solid var(--ag-ink);font-size:15px}',
    '#ag-lm1 .aglm-do b{display:block;font-size:12px;letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px}',
    '#ag-lm1 .aglm-stop{border-style:dashed}',
    '#ag-lm1 .aglm-pdfcard{background:#fff;border:1.5px solid var(--ag-line);border-radius:22px;padding:22px 18px}',
    '#ag-lm1 .aglm-pdfcard ul{margin:14px 0 4px;padding:0 0 0 18px;font-size:15px}',
    '#ag-lm1 .aglm-pdfcard li{margin:4px 0}',
    '#ag-lm1 .aglm-legal{font-size:12px;color:var(--ag-muted);margin-top:10px;text-align:center}',
    '#ag-lm1 .aglm-legal a{color:inherit}',
    '#ag-lm1 .aglm-ok{background:var(--ag-lime-soft);border:1.5px solid var(--ag-lime-line);border-radius:16px;padding:16px;margin-top:6px}',
    '#ag-lm1 .aglm-ok .aglm-h3{margin-bottom:6px}',
    '#ag-lm1 .aglm-cta{background:var(--ag-ink);color:#fff;border-radius:22px;padding:26px 20px 22px}',
    '#ag-lm1 .aglm-cta .aglm-h2{color:#fff;margin-top:14px}',
    '#ag-lm1 .aglm-cta p{color:rgba(255,255,255,.82);font-size:16px;margin-top:12px}',
    '#ag-lm1 .aglm-cta .aglm-urg{color:var(--ag-lime);font-size:14px;margin-top:14px}',
    '#ag-lm1 .aglm-restart{text-align:center;margin-top:22px}',
    '#ag-lm1 .aglm-spin{width:18px;height:18px;border-radius:50%;border:2.5px solid rgba(255,255,255,.4);border-top-color:#fff;animation:aglmSpin .8s linear infinite}',
    '@keyframes aglmSpin{to{transform:rotate(360deg)}}',
    '#ag-lm1 .aglm-stage{position:absolute;left:-12000px;top:0;width:794px;pointer-events:none}',
    '@media (min-width:640px){#ag-lm1{padding:48px 48px 40px}#ag-lm1 .aglm-h1{font-size:52px}#ag-lm1 .aglm-h2{font-size:32px}#ag-lm1 .aglm-verdict{padding:32px}#ag-lm1 .aglm-verdict .aglm-h2{font-size:36px}#ag-lm1 .aglm-actions .aglm-btn{width:auto;justify-self:start;padding:14px 32px}#ag-lm1 .aglm-cta,#ag-lm1 .aglm-pdfcard{padding:32px}#ag-lm1 .aglm-bar{grid-template-columns:110px 1fr 18px}}',

    /* ===== PDF (A4 a 794×1123 px) ===== */
    '#ag-lm1 .pdf-page{width:794px;height:1123px;background:#f3f3f3;position:relative;overflow:hidden;font-family:"DM Sans",sans-serif;color:#000919;line-height:1.45}',
    '#ag-lm1 .pdf-hero{background:linear-gradient(180deg,#00086d 0%,#0000ec 100%);color:#fff;padding:44px 56px 40px}',
    '#ag-lm1 .pdf-hero img{width:230px;height:auto;display:block}',
    '#ag-lm1 .pdf-hero .aglm-pill{margin-top:38px}',
    '#ag-lm1 .pdf-hero h1{font:400 40px/1.08 "DM Serif Display",Georgia,serif;color:#fff;margin-top:16px;word-break:break-word}',
    '#ag-lm1 .pdf-meta{font-size:15px;color:rgba(255,255,255,.8);margin-top:12px}',
    '#ag-lm1 .pdf-body{padding:30px 56px 0}',
    '#ag-lm1 .pdf-verdict{display:flex;gap:24px;align-items:flex-start;background:#fff;border:1.5px solid #d6d6d6;border-radius:18px;padding:20px 22px}',
    '#ag-lm1 .pdf-verdict .n{font:400 54px/1 "DM Serif Display",Georgia,serif;color:#1a11f7;white-space:nowrap}',
    '#ag-lm1 .pdf-verdict .n small{font:400 15px "DM Sans",sans-serif;color:#5b5f6a}',
    '#ag-lm1 .pdf-verdict p{font-size:15px;margin:0}',
    '#ag-lm1 .pdf-h2{font:400 28px/1.1 "DM Serif Display",Georgia,serif;margin:26px 0 12px}',
    '#ag-lm1 .pdf-seg{background:#fafafa;border:1.5px solid #d6d6d6;border-radius:16px;padding:14px 18px;margin-top:10px}',
    '#ag-lm1 .pdf-seg.is-win{background:#dff9bf;border-color:#b8ec7a}',
    '#ag-lm1 .pdf-seg-head{display:flex;align-items:center;gap:12px}',
    '#ag-lm1 .pdf-seg-head .aglm-rank{flex:0 0 30px;height:30px;line-height:30px;font-size:18px;border-radius:9px}',
    '#ag-lm1 .pdf-seg-name{flex:1;font:700 17px/1.25 "DM Sans",sans-serif;word-break:break-word}',
    '#ag-lm1 .pdf-seg-total{font:400 26px/1 "DM Serif Display",Georgia,serif;white-space:nowrap}',
    '#ag-lm1 .pdf-seg-total small{font:400 13px "DM Sans",sans-serif;color:#5b5f6a}',
    '#ag-lm1 .pdf-seg-sum{font-size:14px;font-weight:500;margin:8px 0 0}',
    '#ag-lm1 .pdf-seg-grid{display:grid;grid-template-columns:1fr 1fr;column-gap:26px;row-gap:5px;margin-top:10px}',
    '#ag-lm1 .pdf-seg-grid .aglm-bar{grid-template-columns:92px 1fr 14px;font-size:12px;gap:8px}',
    '#ag-lm1 .pdf-foot{position:absolute;left:56px;right:56px;bottom:26px;display:flex;justify-content:space-between;font-size:12px;color:#5b5f6a;border-top:1px solid #d6d6d6;padding-top:10px}',
    '#ag-lm1 .pdf-plan{background:#fff;border:1.5px solid #d6d6d6;border-radius:16px;padding:16px 20px;margin-top:10px}',
    '#ag-lm1 .pdf-plan h3{font:700 16px/1.3 "DM Sans",sans-serif;margin:0}',
    '#ag-lm1 .pdf-plan .w{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#c5221f;margin-top:6px}',
    '#ag-lm1 .pdf-plan p{font-size:13.5px;margin:6px 0 0}',
    '#ag-lm1 .pdf-plan .do{background:#dff9bf;border-left:4px solid #000919;border-radius:10px;padding:9px 12px;margin-top:9px;font-size:13.5px}',
    '#ag-lm1 .pdf-plan .do b{font-size:11px;letter-spacing:.1em;text-transform:uppercase}',
    '#ag-lm1 .pdf-crit{display:grid;grid-template-columns:150px 1fr;gap:4px 16px;font-size:12px;margin-top:8px;color:#000919}',
    '#ag-lm1 .pdf-crit b{font-weight:700}',
    '#ag-lm1 .pdf-crit span{color:#5b5f6a}',
    '#ag-lm1 .pdf-cta{position:absolute;left:0;right:0;bottom:0;background:#000919;color:#fff;padding:34px 56px 70px}',
    '#ag-lm1 .pdf-cta h2{font:400 30px/1.1 "DM Serif Display",Georgia,serif;color:#fff;margin-top:14px}',
    '#ag-lm1 .pdf-cta p{font-size:14px;color:rgba(255,255,255,.82);margin-top:10px;max-width:640px}',
    '#ag-lm1 .pdf-cta .btn{display:inline-block;margin-top:16px;background:#cbff8b;color:#000919;font:700 15px/1 "DM Sans",sans-serif;padding:14px 24px;border-radius:999px}',
    '#ag-lm1 .pdf-cta .urg{font-size:12.5px;color:#cbff8b;margin-top:12px}',
    '#ag-lm1 .pdf-cta .foot{position:absolute;left:56px;right:56px;bottom:22px;display:flex;justify-content:space-between;font-size:12px;color:rgba(255,255,255,.55);border-top:1px solid rgba(255,255,255,.15);padding-top:10px}'
  ].join('\n');

  /* ===================== ESTADO + MONTAJE ===================== */
  var S = { segments: ['', '', ''], active: [], ratings: [], crit: 0, result: null, lead: null, pdfUrl: null, busy: false, startedAt: null };
  var root, shell, stage;

  function mount() {
    root = document.getElementById(CFG.mountId);
    if (!root || root.getAttribute('data-aglm-ready')) return;
    root.setAttribute('data-aglm-ready', '1');
    root.setAttribute('lang', 'en');
    if (!document.getElementById('aglm-style')) {
      var st = document.createElement('style'); st.id = 'aglm-style'; st.textContent = CSS; document.head.appendChild(st);
    }
    if (CFG.fontsUrl && !document.querySelector('link[data-aglm-fonts]')) {
      var ln = document.createElement('link'); ln.rel = 'stylesheet'; ln.href = CFG.fontsUrl; ln.setAttribute('data-aglm-fonts', '1');
      document.head.appendChild(ln);
    }
    root.innerHTML = '<div class="aglm-shell" aria-live="polite"></div><div class="aglm-stage" aria-hidden="true"></div>';
    shell = root.querySelector('.aglm-shell');
    stage = root.querySelector('.aglm-stage');
    root.addEventListener('click', onClick);
    root.addEventListener('input', onInput);
    root.addEventListener('keydown', onKey);
    root.addEventListener('submit', onSubmit);
    renderIntro();
    track('ag_lm1_view');
  }

  function show(html, focusSel) {
    shell.innerHTML = '<div class="aglm-screen">' + html + '</div>';
    var r = root.getBoundingClientRect();
    if (r.top < 0 || r.top > window.innerHeight * 0.6) {
      try { root.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) { root.scrollIntoView(); }
    }
    if (focusSel) {
      var el = shell.querySelector(focusSel);
      if (el) { try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); } }
    }
  }

  /* ===================== PANTALLAS ===================== */
  function renderIntro() {
    show(
      '<span class="aglm-pill">' + (CFG.showCta ? 'Free diagnostic · 2 min' : 'Diagnostic · 2 min') + '</span>' +
      '<h1 class="aglm-h1">' + esc(VARIANT.headline) + '<span>' + esc(VARIANT.accent) + '</span></h1>' +
      '<p class="aglm-lead">' + esc(CFG.sub) + '</p>' +
      '<ul class="aglm-checks"><li>Compare 2 or 3 industries or customer types</li><li>5 objective criteria, not gut feeling</li><li>Instant result, no sign-up</li></ul>' +
      '<div class="aglm-actions"><button type="button" class="aglm-btn" data-act="start">Start my diagnostic</button></div>'
    );
  }

  function renderSegments() {
    var f = '';
    for (var i = 0; i < 3; i++) {
      f += '<label class="aglm-field"><span class="aglm-field-label">Segment ' + (i + 1) + (i === 2 ? ' <em>(optional)</em>' : '') + '</span>' +
        '<input class="aglm-input" type="text" maxlength="50" autocomplete="off" data-seg="' + i + '" value="' + esc(S.segments[i]) + '" placeholder="' + PLACEHOLDERS[i] + '"></label>';
    }
    show(
      '<div class="aglm-top"><button type="button" class="aglm-link" data-act="home">← Back</button><span class="aglm-count">Step 1 of 6</span></div>' +
      '<div class="aglm-progress"><span style="width:' + (100 / 6).toFixed(1) + '%"></span></div>' +
      '<h2 class="aglm-h2">Which segments are you torn between?</h2>' +
      '<p class="aglm-lead" style="margin-top:10px">Enter 2 or 3 industries or customer types you already serve or are considering.</p>' +
      f +
      '<div class="aglm-actions"><button type="button" class="aglm-btn" data-act="segments-next"' + (filled().length < 2 ? ' disabled' : '') + '>Continue</button>' +
      '<p class="aglm-small" style="text-align:center">Tip: the more specific, the better. “Dental clinics in Texas” says more than “Healthcare”.</p></div>',
      S.segments[0] ? null : 'input[data-seg="0"]'
    );
  }

  function filled() {
    return S.segments.map(function (s) { return s.trim(); }).filter(function (s) { return s.length > 0; });
  }

  function renderCriterion() {
    var c = CRITERIA[S.crit];
    var step = S.crit + 2;
    var rows = S.active.map(function (name, i) {
      var val = S.ratings[i][c.id];
      var btns = '';
      for (var n = 1; n <= 5; n++) {
        btns += '<button type="button" class="aglm-opt" role="radio" aria-checked="' + (val === n) + '" aria-label="' + n + ' of 5" data-act="rate" data-seg="' + i + '" data-val="' + n + '">' + n + '</button>';
      }
      return '<div class="aglm-row' + (val ? ' is-done' : '') + '"><div class="aglm-rowname">' + esc(name) + '</div>' +
        '<div class="aglm-scale" role="radiogroup" aria-label="' + esc(c.name + ' for ' + name) + '">' + btns + '</div></div>';
    }).join('');
    var complete = critComplete();
    show(
      '<div class="aglm-top"><button type="button" class="aglm-link" data-act="back">← Back</button><span class="aglm-count">Step ' + step + ' of 6</span></div>' +
      '<div class="aglm-progress"><span style="width:' + (step / 6 * 100).toFixed(1) + '%"></span></div>' +
      '<span class="aglm-pill aglm-pill--ink">Criterion ' + (S.crit + 1) + ' of 5 · ' + esc(c.short) + '</span>' +
      '<h2 class="aglm-h2" style="margin-top:14px">' + esc(c.q) + '</h2>' +
      '<div class="aglm-anchors"><div><b>1</b><span>' + esc(c.lo) + '</span></div><div><b>5</b><span>' + esc(c.hi) + '</span></div></div>' +
      '<div class="aglm-rows">' + rows + '</div>' +
      '<div class="aglm-actions"><button type="button" class="aglm-btn" data-act="crit-next"' + (complete ? '' : ' disabled') + '>' + (S.crit === 4 ? 'See my result' : 'Next') + '</button></div>'
    );
  }

  function critComplete() {
    var id = CRITERIA[S.crit].id;
    return S.active.every(function (_, i) { return !!S.ratings[i][id]; });
  }

  function barsHtml(s) {
    return CRITERIA.map(function (c) {
      var v = s.r[c.id], pips = '';
      for (var n = 1; n <= 5; n++) pips += '<i' + (n <= v ? ' class="on"' : '') + '></i>';
      return '<div class="aglm-bar' + (c.id === s.weakest && v <= 3 ? ' is-weak' : '') + '"><span class="aglm-bar-label">' + esc(c.short) + '</span>' +
        '<span class="aglm-pips">' + pips + '</span><span class="aglm-bar-n">' + v + '</span></div>';
    }).join('');
  }

  // Si su criterio más bajo ya es 4 o 5, no hay punto débil real: el consejo es enfocarse, no validar.
  var SOLID = {
    weakTitle: 'No real weak spot',
    explain: 'All its criteria are at 4 or 5. No more validation needed here: what’s missing is focus.',
    action: 'List the 20 highest-potential prospects in {seg} and book at least 5 conversations. Track how many turn into a proposal: that’s your baseline.'
  };
  function isSolid(s) { return s.r[s.weakest] >= 4; }
  function weakInfo(s) { return isSolid(s) ? SOLID : CRIT[s.weakest]; }
  function weakLabel(s) { var c = weakInfo(s); return isSolid(s) ? c.weakTitle : 'Weakest point: ' + c.weakTitle + ' · ' + s.r[s.weakest] + '/5'; }
  function actionFor(s) { return weakInfo(s).action.replace('{seg}', s.name); }

  function renderResult() {
    var res = S.result, v = res.verdict, W = v.winner;
    var sp = sprintState();

    var segs = res.ranked.map(function (s) {
      return '<div class="aglm-seg' + (s === W && v.type !== 'none' ? ' is-win' : '') + '">' +
        '<div class="aglm-seg-head"><div class="aglm-rank">' + s.rank + '</div>' +
        '<div class="aglm-seg-name">' + esc(s.name) + '<br><span class="aglm-band aglm-band--' + s.band.id + '">' + esc(s.band.label) + '</span></div>' +
        '<div class="aglm-seg-total">' + s.total + '<small>/25</small></div></div>' +
        '<p class="aglm-seg-sum">' + esc(s.summary) + '</p>' +
        '<div class="aglm-bars">' + barsHtml(s) + '</div></div>';
    }).join('');

    // Paso concreto: punto más débil del ganador (o de los dos si están cerca).
    var focus = [W];
    if (v.type === 'close' && v.second) focus.push(v.second);
    var steps = focus.map(function (s) {
      var c = weakInfo(s);
      return '<div class="aglm-card" style="margin-top:12px"><h3 class="aglm-h3">' + esc(s.name) + '</h3>' +
        '<p class="aglm-weak"' + (isSolid(s) ? ' style="color:#1a11f7"' : '') + '>' + esc(weakLabel(s)) + '</p>' +
        '<p class="aglm-muted">' + esc(c.explain) + '</p>' +
        '<div class="aglm-do"><b>This week</b>' + esc(actionFor(s)) + '</div></div>';
    }).join('');

    var stop = v.stop ? (
      '<div class="aglm-sec"><span class="aglm-pill aglm-pill--ink">Who to stop chasing</span>' +
      '<div class="aglm-card aglm-stop" style="margin-top:14px"><h3 class="aglm-h3">' + esc(v.stop.name) + ' · ' + v.stop.total + '/25</h3>' +
      '<p class="aglm-muted">' + esc(v.stop.summary) + ' Every hour you spend on it is an hour you don’t give to ' + esc(W.name) + '. You don’t have to close the door, but stop actively pursuing it for now.</p></div></div>'
    ) : '';

    var pdf = S.pdfUrl ? pdfDoneHtml() : (
      '<form class="aglm-pdfcard" novalidate data-form="lead">' +
      '<span class="aglm-pill">Your diagnostic as a PDF</span>' +
      '<h2 class="aglm-h2" style="margin-top:14px">Get the full diagnostic</h2>' +
      '<ul><li>The ranking with a breakdown of each segment</li><li>What the weak spot of <strong>each</strong> segment means</li><li>One concrete action per segment for this week</li></ul>' +
      '<label class="aglm-field"><span class="aglm-field-label">Your name</span><input class="aglm-input" name="name" type="text" autocomplete="given-name" maxlength="60" required></label>' +
      '<label class="aglm-field"><span class="aglm-field-label">Your email</span><input class="aglm-input" name="email" type="email" inputmode="email" autocomplete="email" maxlength="120" required></label>' +
      '<label class="aglm-field"><span class="aglm-field-label">Company <em>(optional)</em></span><input class="aglm-input" name="company" type="text" autocomplete="organization" maxlength="80"></label>' +
      '<input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">' +
      '<p class="aglm-err" data-err></p>' +
      '<div class="aglm-actions" style="margin-top:16px"><button type="submit" class="aglm-btn" data-pdf-btn>Download my diagnostic (PDF)</button></div>' +
      '<p class="aglm-legal">By downloading you agree to our <a href="' + esc(CFG.privacyUrl) + '" target="_blank" rel="noopener">privacy policy</a>. No spam.</p>' +
      '</form>'
    );

    show(
      '<div class="aglm-verdict"><span class="aglm-pill aglm-pill--lime">Your result</span>' +
      '<h2 class="aglm-h2">' + esc(v.title) + '</h2>' +
      '<div class="aglm-score"><b>' + W.total + '</b><span>/ 25 points</span></div>' +
      '<p>' + esc(v.text) + '</p>' +
      '<button type="button" class="aglm-jump" data-act="jump-pdf">Get the full diagnostic as a PDF ↓</button></div>' +

      '<div class="aglm-sec"><span class="aglm-pill">The ranking</span><h2 class="aglm-h2">How your segments ranked</h2>' + segs +
      '<p class="aglm-small" style="margin-top:10px">In red, each segment’s weakest criterion. Tiebreaker: pain, then ability to pay.</p></div>' +

      '<div class="aglm-sec"><span class="aglm-pill">Your next step</span><h2 class="aglm-h2">' + (focus.length > 1 ? 'Validate this before deciding' : (isSolid(W) ? 'Now, focus' : 'What you need to validate')) + '</h2>' + steps + '</div>' +

      stop +

      '<div class="aglm-sec" data-pdf-sec>' + pdf + '</div>' +

      (CFG.showCta ? (
      '<div class="aglm-sec"><div class="aglm-cta"><span class="aglm-pill aglm-pill--lime">What’s next</span>' +
      '<h2 class="aglm-h2">' + (v.type === 'none' ? 'Find the right market, then sell to it.' : 'You know who to chase. Now, how do you sell to them?') + '</h2>' +
      '<p>' + esc(nextText(v)) + '</p>' +
      '<div class="aglm-actions" style="margin-top:20px"><a class="aglm-btn aglm-btn--lime" href="' + esc(sp.url) + '" target="_blank" rel="noopener" data-act="cta">' + esc(sp.label) + '</a></div>' +
      '<p class="aglm-urg">' + esc(sp.line) + '</p></div></div>') : '') +

      '<div class="aglm-restart"><button type="button" class="aglm-link" data-act="restart">Evaluate other segments</button></div>'
    );
  }

  function pdfDoneHtml() {
    return '<div class="aglm-pdfcard"><div class="aglm-ok"><h3 class="aglm-h3">Done, ' + esc(S.lead.name.split(' ')[0]) + '. Your diagnostic has been downloaded.</h3>' +
      '<p class="aglm-muted" style="font-size:15px">Don’t see it? Open it here:</p></div>' +
      '<div class="aglm-actions" style="margin-top:14px"><a class="aglm-btn" href="' + S.pdfUrl + '" target="_blank" rel="noopener" download="' + esc(pdfName()) + '" data-act="pdf-open">Open my PDF</a></div></div>';
  }

  /* ===================== EVENTOS ===================== */
  function onClick(e) {
    var t = e.target.closest('[data-act]');
    if (!t || !root.contains(t)) return;
    var act = t.getAttribute('data-act');

    if (act === 'start') {
      S.startedAt = Date.now();
      track('ag_lm1_start');
      renderSegments();
    } else if (act === 'home') {
      renderIntro();
    } else if (act === 'segments-next') {
      goRate();
    } else if (act === 'rate') {
      var i = +t.getAttribute('data-seg'), val = +t.getAttribute('data-val');
      var id = CRITERIA[S.crit].id;
      var wasComplete = critComplete();
      S.ratings[i][id] = val;
      var row = t.closest('.aglm-row');
      row.classList.add('is-done');
      row.querySelectorAll('.aglm-opt').forEach(function (b) { b.setAttribute('aria-checked', String(+b.getAttribute('data-val') === val)); });
      var nowComplete = critComplete();
      shell.querySelector('[data-act="crit-next"]').disabled = !nowComplete;
      // Avance automático solo cuando se completa la última fila por primera vez.
      if (nowComplete && !wasComplete) {
        clearTimeout(S.adv);
        S.adv = setTimeout(nextCrit, 550);
      }
    } else if (act === 'crit-next') {
      clearTimeout(S.adv);
      nextCrit();
    } else if (act === 'back') {
      clearTimeout(S.adv);
      if (S.crit === 0) renderSegments();
      else { S.crit--; renderCriterion(); }
    } else if (act === 'restart') {
      S.pdfUrl = null; S.result = null; S.crit = 0;
      track('ag_lm1_restart');
      renderSegments();
    } else if (act === 'cta') {
      track('ag_lm1_cta_click', { cohort_open: sprintState().open });
    } else if (act === 'jump-pdf') {
      var sec = shell.querySelector('[data-pdf-sec]');
      if (sec) {
        try { sec.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e2) { sec.scrollIntoView(); }
        var inp = sec.querySelector('input[name="name"]');
        if (inp) setTimeout(function () { try { inp.focus({ preventScroll: true }); } catch (e3) { } }, 450);
      }
      track('ag_lm1_jump_pdf');
    } else if (act === 'pdf-open') {
      track('ag_lm1_pdf_open');
    }
  }

  function onInput(e) {
    var t = e.target;
    if (t.hasAttribute && t.hasAttribute('data-seg') && t.tagName === 'INPUT') {
      S.segments[+t.getAttribute('data-seg')] = t.value;
      var b = shell.querySelector('[data-act="segments-next"]');
      if (b) b.disabled = filled().length < 2;
    }
    if (t.classList && t.classList.contains('is-error')) t.classList.remove('is-error');
  }

  function onKey(e) {
    if (e.key !== 'Enter') return;
    var t = e.target;
    if (t.tagName === 'INPUT' && t.hasAttribute('data-seg')) {
      e.preventDefault();
      var i = +t.getAttribute('data-seg');
      var next = shell.querySelector('input[data-seg="' + (i + 1) + '"]');
      if (i < 2 && next) next.focus();
      else if (filled().length >= 2) goRate();
    }
  }

  function goRate() {
    var names = filled();
    if (names.length < 2) return;
    // Quitar duplicados exactos
    var seen = {}; names = names.filter(function (n) { var k = n.toLowerCase(); if (seen[k]) return false; seen[k] = 1; return true; });
    if (names.length < 2) {
      var inp = shell.querySelector('input[data-seg="1"]');
      if (inp) { inp.classList.add('is-error'); inp.focus(); }
      return;
    }
    var changed = names.join('|') !== S.active.join('|');
    S.active = names;
    if (changed || S.ratings.length !== names.length) {
      S.ratings = names.map(function () { return {}; });
    }
    S.crit = 0;
    track('ag_lm1_segments', { segments_count: names.length });
    renderCriterion();
  }

  function nextCrit() {
    if (!critComplete()) return;
    track('ag_lm1_step', { step: S.crit + 2, criterion: CRITERIA[S.crit].id });
    if (S.crit < 4) { S.crit++; renderCriterion(); return; }
    S.result = compute();
    S.subId = null; // nuevo resultado = nuevo envío
    S.pdfUrl = null;
    var W = S.result.verdict.winner;
    track('ag_lm1_result', {
      verdict: S.result.verdict.type, winner_score: W.total, segments_count: S.active.length,
      seconds: S.startedAt ? Math.round((Date.now() - S.startedAt) / 1000) : null
    });
    renderResult();
  }

  /* ===================== LEAD + PDF ===================== */
  function onSubmit(e) {
    var form = e.target;
    if (!form.matches || !form.matches('[data-form="lead"]')) return;
    e.preventDefault();
    if (S.busy) return;
    var F = form.elements;
    var name = F['name'].value.trim(), email = F['email'].value.trim(), company = F['company'].value.trim();
    var err = form.querySelector('[data-err]');
    err.textContent = '';
    if (!name) { F['name'].classList.add('is-error'); err.textContent = 'Enter your name to personalize the PDF.'; F['name'].focus(); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { F['email'].classList.add('is-error'); err.textContent = 'Check your email, it looks incomplete.'; F['email'].focus(); return; }

    S.lead = { name: name, email: email, company: company };
    S.bot = !!F['website'].value; // honeypot: los bots llenan este campo oculto
    if (!S.subId) S.subId = 'lm1-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    send('lead');
    track('ag_lm1_lead');

    var btn = form.querySelector('[data-pdf-btn]');
    S.busy = true;
    btn.disabled = true;
    btn.innerHTML = '<span class="aglm-spin"></span> Generating your PDF…';

    makePdf().then(function (out) {
      S.busy = false;
      S.pdfUrl = out.url;
      track('ag_lm1_pdf_download');
      var sec = shell.querySelector('[data-pdf-sec]');
      if (sec) sec.innerHTML = pdfDoneHtml();
      // Copia del PDF para Drive + notificación por correo (en segundo plano)
      blobToBase64(out.blob).then(function (b64) {
        send('pdf', { pdf_name: pdfName(), pdf_base64: b64 });
      }).catch(function (ex2) {
        send('pdf', { pdf_error: 'base64: ' + String(ex2 && ex2.message || ex2).slice(0, 120) });
      });
    }).catch(function (ex) {
      S.busy = false;
      btn.disabled = false;
      btn.textContent = 'Try again';
      err.textContent = 'We couldn’t generate the PDF in this browser. Try again or open it on a computer.';
      var msg = String(ex && ex.message || ex).slice(0, 120);
      track('ag_lm1_pdf_error', { message: msg });
      send('pdf', { pdf_error: msg }); // el equipo recibe la notificación aunque el PDF falle
      if (window.console) console.error('[AG LM1]', ex);
    });
  }

  function leadPayload() {
    var res = S.result, v = res.verdict;
    return {
      tool: CFG.tool, version: VERSION, lang: 'en', variant: variantKey, submission_id: S.subId, submitted_at: new Date().toISOString(),
      name: S.lead.name, email: S.lead.email, company: S.lead.company,
      verdict: v.type, verdict_title: v.title,
      winner: v.winner.name, winner_score: v.winner.total, winner_weakest: v.winner.weakest,
      segments: res.ranked.map(function (s) {
        return { rank: s.rank, name: s.name, total: s.total, band: s.band.label, weakest: s.weakest, strongest: s.strongest, scores: s.r };
      }),
      page: window.location.href.split('#')[0], referrer: document.referrer || '', utm: utm()
    };
  }

  // type 'lead': se manda al instante (el lead queda guardado aunque cierren la pestaña).
  // type 'pdf': mismo ID de envío + el PDF en base64; el Apps Script lo guarda en Drive y notifica por correo.
  function send(type, extra) {
    if (!CFG.endpoint || S.bot) return;
    var body = JSON.stringify(merge(merge(leadPayload(), { type: type }), extra || {}));
    try {
      // text/plain evita el preflight CORS; Apps Script lo lee en e.postData.contents.
      // keepalive solo en el lead: el navegador limita keepalive a ~64 KB y el PDF pesa más.
      fetch(CFG.endpoint, { method: 'POST', mode: 'no-cors', keepalive: type === 'lead', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: body })
        .catch(function () { });
    } catch (e) { }
  }

  function blobToBase64(blob) {
    return new Promise(function (resolve, reject) {
      var r = new FileReader();
      r.onload = function () { resolve(String(r.result).split(',')[1] || ''); };
      r.onerror = function () { reject(r.error); };
      r.readAsDataURL(blob);
    });
  }

  function pdfName() {
    return 'Starving-Crowd-Diagnostic' + (S.lead && S.lead.name ? '-' + slug(S.lead.name) : '') + '.pdf';
  }

  function pdfPagesHtml() {
    var res = S.result, v = res.verdict, W = v.winner, sp = sprintState();
    var who = esc(S.lead.name) + (S.lead.company ? ' · ' + esc(S.lead.company) : '');
    var date = fmtDate(new Date(), { day: 'numeric', month: 'long', year: 'numeric' });
    var compact = res.ranked.length === 3;

    var segs = res.ranked.map(function (s) {
      return '<div class="pdf-seg' + (s === W && v.type !== 'none' ? ' is-win' : '') + '"' + (compact ? ' style="padding:12px 18px"' : '') + '>' +
        '<div class="pdf-seg-head"><div class="aglm-rank"' + (s === W && v.type !== 'none' ? ' style="background:#1a11f7"' : '') + '>' + s.rank + '</div>' +
        '<div class="pdf-seg-name">' + esc(s.name) + ' <span class="aglm-band aglm-band--' + s.band.id + '" style="margin:0 0 0 6px;vertical-align:2px">' + esc(s.band.label) + '</span></div>' +
        '<div class="pdf-seg-total">' + s.total + '<small>/25</small></div></div>' +
        '<p class="pdf-seg-sum">' + esc(s.summary) + '</p>' +
        '<div class="pdf-seg-grid">' + barsHtml(s) + '</div></div>';
    }).join('');

    var p1 =
      '<div class="pdf-page" data-page="1">' +
      '<div class="pdf-hero"><img src="' + CFG.logoWhite + '" alt="Agora Growth">' +
      '<span class="aglm-pill aglm-pill--lime">Diagnostic · Starving Crowd</span>' +
      '<h1>' + esc(v.title) + '</h1>' +
      '<p class="pdf-meta">Prepared for ' + who + ' · ' + esc(date) + '</p></div>' +
      '<div class="pdf-body">' +
      '<div class="pdf-verdict"><div class="n">' + W.total + '<small>/25</small></div><p>' + esc(v.text) + '</p></div>' +
      '<h2 class="pdf-h2">The ranking</h2>' + segs +
      '<p style="font-size:12px;color:#5b5f6a;margin-top:10px">In red, each segment’s weakest criterion. 1–5 scale per criterion; 25 points max. Tiebreaker: pain, then ability to pay.</p>' +
      '</div>' +
      '<div class="pdf-foot"><span>Agora Growth · Rev up Revenue</span><span>agoragrowth.com · 1/2</span></div></div>';

    var plans = res.ranked.map(function (s) {
      var c = weakInfo(s);
      return '<div class="pdf-plan"><h3>' + s.rank + '. ' + esc(s.name) + ' <span style="font-weight:400;color:#5b5f6a">· ' + s.total + '/25</span></h3>' +
        '<div class="w"' + (isSolid(s) ? ' style="color:#1a11f7"' : '') + '>' + esc(weakLabel(s)) + '</div>' +
        '<p>' + esc(c.explain) + '</p>' +
        '<div class="do"><b>This week:</b> ' + esc(actionFor(s)) + '</div></div>';
    }).join('');

    var stop = v.stop ? '<p style="font-size:13.5px;margin-top:12px"><b>Who to stop chasing (for now):</b> ' + esc(v.stop.name) +
      ' (' + v.stop.total + '/25). Every hour you spend on it is an hour you don’t give to ' + esc(W.name) + '.</p>' : '';

    var crit = CRITERIA.map(function (c) {
      return '<b>' + esc(c.name) + '</b><span>1 = ' + esc(c.lo) + ' · 5 = ' + esc(c.hi) + '</span>';
    }).join('');

    var p2 =
      '<div class="pdf-page" data-page="2">' +
      '<div class="pdf-body" style="padding-top:44px">' +
      '<span class="aglm-pill">Your plan</span>' +
      '<h2 class="pdf-h2" style="margin-top:14px">What to do with this result</h2>' +
      plans + stop +
      '<h2 class="pdf-h2" style="font-size:20px;margin:20px 0 4px">How it was calculated</h2>' +
      '<div class="pdf-crit">' + crit + '</div>' +
      '</div>' +
      (CFG.showCta ? (
      '<div class="pdf-cta"><span class="aglm-pill aglm-pill--lime">What’s next</span>' +
      '<h2>' + (v.type === 'none' ? 'Find the right market, then sell to it.' : 'You know who to chase. Now, how do you sell to them?') + '</h2>' +
      '<p>' + esc(nextText(v)) + '</p>' +
      '<span class="btn" data-pdf-link>' + esc(sp.label) + ' →</span>' +
      '<p class="urg">' + esc(sp.line) + '</p>' +
      '<div class="foot"><span>Agora Growth · Rev up Revenue</span><span>agoragrowth.com · 2/2</span></div></div>')
      : '<div class="pdf-foot"><span>Agora Growth · Rev up Revenue</span><span>agoragrowth.com · 2/2</span></div>') +
      '</div>';

    return p1 + p2;
  }

  function fitPage(page) {
    // Si el contenido se desborda (nombres muy largos), lo escalamos para que quepa en la hoja.
    var body = page.querySelector('.pdf-body');
    var cta = page.querySelector('.pdf-cta');
    var limit = page.clientHeight - (cta ? cta.offsetHeight + 16 : 70);
    var h = body.offsetTop + body.scrollHeight;
    if (h > limit) {
      var k = Math.max(0.72, (limit - body.offsetTop) / body.scrollHeight);
      body.style.transformOrigin = 'top left';
      body.style.transform = 'scale(' + k + ')';
      body.style.width = (100 / k) + '%';
    }
  }

  function makePdf() {
    return Promise.all([loadScript(CFG.libs.html2canvas), loadScript(CFG.libs.jspdf)]).then(function () {
      stage.innerHTML = pdfPagesHtml();
      var pages = Array.prototype.slice.call(stage.querySelectorAll('.pdf-page'));
      pages.forEach(fitPage);
      var ready = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
      var imgs = Array.prototype.slice.call(stage.querySelectorAll('img')).map(function (im) {
        return im.complete ? Promise.resolve() : new Promise(function (r) { im.onload = im.onerror = r; });
      });
      return Promise.all([ready].concat(imgs)).then(function () {
        var jsPDF = window.jspdf && window.jspdf.jsPDF;
        if (!jsPDF || !window.html2canvas) throw new Error('PDF libraries not available');
        var pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4', compress: true });
        pdf.setProperties({ title: 'Starving Crowd Diagnostic · Agora Growth', author: 'Agora Growth', subject: 'Find your Starving Crowd', creator: 'agoragrowth.com' });
        var PW = pdf.internal.pageSize.getWidth(), PH = pdf.internal.pageSize.getHeight(), k = PW / 794;
        var scale = 2;
        var chain = Promise.resolve();
        pages.forEach(function (page, idx) {
          chain = chain.then(function () {
            return window.html2canvas(page, { scale: scale, backgroundColor: '#f3f3f3', useCORS: true, logging: false, width: 794, height: 1123, windowWidth: 1200 })
              .then(function (canvas) {
                if (idx > 0) pdf.addPage();
                pdf.addImage(canvas.toDataURL('image/jpeg', 0.86), 'JPEG', 0, 0, PW, PH, undefined, 'FAST');
                var link = page.querySelector('[data-pdf-link]');
                if (link) {
                  var pr = page.getBoundingClientRect(), lr = link.getBoundingClientRect();
                  pdf.link((lr.left - pr.left) * k, (lr.top - pr.top) * k, lr.width * k, lr.height * k, { url: sprintState().url });
                }
                pdf.link(PW - 200, PH - 32, 160, 20, { url: 'https://www.agoragrowth.com/' });
              });
          });
        });
        return chain.then(function () {
          stage.innerHTML = '';
          var blob = pdf.output('blob');
          var url = URL.createObjectURL(blob);
          try { pdf.save(pdfName()); } catch (e) { }
          return { url: url, blob: blob };
        });
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
  window.AG_LM1 = { mount: mount, version: VERSION };
})();
