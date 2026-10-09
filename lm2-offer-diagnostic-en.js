/*! Agora Growth · Lead Magnet 2 · Offer Diagnostic (Value Equation Score) (EN) · v1.0
 *  Mounts itself inside <div id="ag-lm2"></div>.
 *  Config: define window.AG_LM2_CONFIG BEFORE loading this script (see DEFAULTS).
 */
(function () {
  'use strict';

  /* ===================== CONFIGURACIÓN ===================== */
  var DEFAULTS = {
    mountId: 'ag-lm2',
    tool: 'lm2_diagnostico_oferta',
    // URL del Apps Script publicado como Web App (doPost). Vacío = no se envía nada.
    endpoint: '',
    privacyUrl: 'https://www.agoragrowth.com/privacy-policy',
    // Variante de naming por defecto. También se puede forzar con ?v=a|b|c en la URL.
    variant: 'a',
    variants: {
      a: { headline: 'Does your offer make saying no', accent: 'feel stupid?' },
      b: { headline: 'Your offer’s Value Equation Score', accent: '(find out in 2 minutes).' },
      c: { headline: '8 questions that reveal', accent: 'why your prospects hesitate to say yes.' }
    },
    sub: 'Based on Alex Hormozi’s Value Equation. Your score + your exact weak spots.',
    // false = sin CTA de venta (ni en pantalla ni en el PDF). Útil mientras el tool sea solo para alumnos graduados.
    showCta: true,
    sprint: {
      url: 'https://www.agoragrowth.com/',
      waitlistUrl: '',
      kickoff: null,
      closeHoursBefore: 72,
      seatsTotal: 20,
      seatsLeft: null,
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
  var CFG = merge(DEFAULTS, window.AG_LM2_CONFIG);
  var VERSION = '1.0';
  var EV = 'ag_lm2_'; // prefijo de eventos de analytics

  /* ===================== CONTENT ===================== */
  // Value Equation (Hormozi): Value = (Dream Outcome × Perceived Likelihood) / (Time Delay × Effort & Sacrifice)
  // + 2 market variables: Differentiation and Pricing Power. In all of them, more points = better.
  // PRIORITY order breaks ties when picking the weak spots (highest leverage first).
  var PRIORITY = ['probabilidad', 'resultado', 'diferenciacion', 'tiempo', 'esfuerzo', 'precio'];

  var CATS = {
    resultado: {
      name: 'Dream Outcome', short: 'Outcome', side: 'top',
      weakTitle: 'Your outcome isn’t visible',
      why: 'People don’t buy services: they buy a destination. If prospects can’t picture the outcome, there’s nothing to want, and without desire everything becomes a price conversation.'
    },
    probabilidad: {
      name: 'Perceived Likelihood of Success', short: 'Likelihood', side: 'top',
      weakTitle: 'Your prospects don’t believe you (yet)',
      why: 'Prospects don’t doubt the outcome is good; they doubt it will happen for them. Every doubt you don’t resolve with proof or a guarantee costs you a discount or an “I’ll think about it”.'
    },
    tiempo: {
      name: 'Time to Results', short: 'Time', side: 'bottom',
      weakTitle: 'You take too long to show value',
      why: 'The longer the first result takes, the heavier the risk feels to the client. A fast result, even a small one, buys patience for the big one.'
    },
    esfuerzo: {
      name: 'Effort & Sacrifice', short: 'Effort', side: 'bottom',
      weakTitle: 'Your offer asks for too much',
      why: 'Every hour and every step you ask of the client adds to your price. If your offer demands a lot of work or friction to get started, you’re competing against “I’ll do it myself later”.'
    },
    diferenciacion: {
      name: 'Differentiation', short: 'Differentiation', side: 'market',
      weakTitle: 'You look just like your competitors',
      why: 'If prospects see no difference, price is the only thing left to decide on. Your market isn’t cheap: all the options just look the same to them.'
    },
    precio: {
      name: 'Pricing Power', short: 'Price', side: 'market',
      weakTitle: 'You compete on price',
      why: 'Constant haggling is a symptom, not the disease: it shows up when perceived value doesn’t justify the price. Cutting your price treats the symptom and leaves the cause untouched.'
    }
  };
  var CAT_ORDER = ['resultado', 'probabilidad', 'tiempo', 'esfuerzo', 'diferenciacion', 'precio'];

  // 8 questions. Likelihood (proof + guarantee) and Effort (client work + ease of getting started) get 2 each.
  // Each option: points (0-3) by position, text, and "fix" = how to fix it given THAT answer. Last option = strength.
  var QUESTIONS = [
    {
      id: 'q1', cat: 'resultado',
      q: 'When a prospect reads your offer, how clear is the outcome they’ll get?',
      strong: 'You promise a measurable outcome your clients want.',
      opts: [
        { t: 'It describes what we do (services, deliverables), not the outcome.', fix: 'Rewrite your offer starting with the outcome, not the service: “We help you [measurable outcome] in [timeframe]”. Deliverables come after, as the how.' },
        { t: 'It mentions a general benefit: “grow”, “optimize”, “save”.', fix: 'Swap the generic benefit for one with a number: instead of “grow your sales”, say “add X new clients a month” or “cut your sales cycle from 90 to 45 days”.' },
        { t: 'It promises a concrete outcome, but with no number or timeframe.', fix: 'Put a number and a timeframe on the outcome you already promise. Take the typical result from your 3 best cases and use it as your core promise.' },
        { t: 'It promises a measurable outcome (number and timeframe) the client wants.' }
      ]
    },
    {
      id: 'q2', cat: 'probabilidad',
      q: 'What proof do you show that your solution works?',
      strong: 'You have case studies with numbers from clients similar to your prospects.',
      opts: [
        { t: 'None yet, or just “we’re experts”.', fix: 'This week, ask 3 happy clients for one concrete data point about their result (before and after) and permission to share it. One case with a number beats ten logos.' },
        { t: 'Client logos or generic testimonials (“great service”).', fix: 'Turn your testimonials into case studies: for each one, add the starting point, the result with a number and how long it took.' },
        { t: 'Success stories with results, but no numbers.', fix: 'Add numbers to your case studies and sort them by industry, so every prospect sees someone like them.' },
        { t: 'Case studies with concrete numbers from clients similar to the prospect.' }
      ]
    },
    {
      id: 'q3', cat: 'probabilidad',
      q: 'If the client doesn’t get the outcome, what happens?',
      strong: 'Your guarantee takes the risk of saying yes off the client.',
      opts: [
        { t: 'Nothing: the risk is 100% on the client.', fix: 'Design a conditional guarantee: “If you do X and don’t achieve Y in Z days, [we keep working at no cost until you do / we refund N]”. Start with something you can deliver 95% of the time.' },
        { t: 'We offer a “satisfaction” guarantee or “we’ll talk it through”.', fix: 'Swap the satisfaction guarantee for an outcome guarantee: tied to something measurable the client can verify on their own.' },
        { t: 'There’s a guarantee tied to an outcome, but we rarely mention it.', fix: 'Make your guarantee visible: put it in the proposal and say it on the first call, not in the contract’s fine print.' },
        { t: 'A strong, explicit guarantee tied to the outcome, present in every sale.' }
      ]
    },
    {
      id: 'q4', cat: 'tiempo',
      q: 'How long does a new client take to see their first tangible result?',
      strong: 'Your clients see concrete progress in the first week.',
      opts: [
        { t: 'More than 3 months.', fix: 'Design a “quick win” for the first 7 to 14 days: a small deliverable the client can see and measure before the big result.' },
        { t: 'Between 1 and 3 months.', fix: 'Break your process into milestones and present the first one as a result in itself, with a date: “by week 2 you’ll have X”.' },
        { t: 'Between 2 and 4 weeks.', fix: 'Move the first result up to week one and announce it during the sale: “in 7 days you’ll have X”.' },
        { t: 'They see concrete progress in the first week.' }
      ]
    },
    {
      id: 'q5', cat: 'esfuerzo',
      q: 'How much work does the client have to put in to get the outcome?',
      strong: 'Your clients barely have to work to get the outcome.',
      opts: [
        { t: 'A lot: we give them the methodology and they execute it.', fix: 'Identify the 2 tasks clients struggle with most and offer them done-for-you, even as a premium version of your offer.' },
        { t: 'Quite a bit: they need to assign someone from their team.', fix: 'Reduce what you ask of the client’s team: ready-made templates, guided sessions, or have your team do the first run with them.' },
        { t: 'Little: we do most of it, they approve and provide information.', fix: 'Summarize the little the client has to do in a one-page checklist, so it feels even easier.' },
        { t: 'Almost nothing: we do it for them.' }
      ]
    },
    {
      id: 'q6', cat: 'esfuerzo',
      q: 'How easy is it to start working with you?',
      strong: 'Getting started with you is simple and immediate.',
      opts: [
        { t: 'Complex: several meetings, a long proposal and weeks before kickoff.', fix: 'Create a standard one-page proposal and a 3-step onboarding. Every extra meeting before signing is a chance for the prospect to go cold.' },
        { t: 'Moderate: 2 or 3 meetings and a custom contract.', fix: 'Standardize the contract and promise a dated kickoff: “kickoff within 5 business days of signing”.' },
        { t: 'Fast: one call, a standard proposal and we start within days.', fix: 'Add a way to say yes on the same call: e-signature or a payment link, with no extra back-and-forth by email.' },
        { t: 'Immediate: they can say yes and start that same week.' }
      ]
    },
    {
      id: 'q7', cat: 'diferenciacion',
      q: 'If a prospect compares you with your 3 closest competitors, can they explain in one sentence why you’re different?',
      strong: 'You have something unique, with a name, that sets you apart.',
      opts: [
        { t: 'No: we offer practically the same thing.', fix: 'Pick one thing you can be the only one at: a niche, a named method or a guarantee no one else offers. Write it in one sentence and use it in every conversation.' },
        { t: 'They’d say we’re “better” or “more professional”.', fix: 'Replace “we’re better” with something provable: “we’re the only ones who [X]” or “the only method that [Y]”.' },
        { t: 'Yes, for something concrete, but we don’t always communicate it.', fix: 'Name what already makes you different and repeat it in all your materials: proposal, website, first call.' },
        { t: 'Yes: we have something unique and named that we repeat in every sale.' }
      ]
    },
    {
      id: 'q8', cat: 'precio',
      q: 'How often are you asked for a discount or told it’s “too expensive”?',
      strong: 'Price is rarely an issue in your sales.',
      opts: [
        { t: 'Almost always: price is the main objection.', fix: 'Don’t lower your price yet: raise perceived value first. Review your outcome, your proof and your guarantee; that’s almost always where the haggling comes from.' },
        { t: 'Often: we close, but frequently with a discount.', fix: 'Stop giving discounts without getting something in return (upfront payment, a longer contract, a case study). A free discount tells the client your price was negotiable.' },
        { t: 'Sometimes: some ask, but we close at full price.', fix: 'Present the price against the cost of the problem: show how much it costs the client not to solve it before you say your price.' },
        { t: 'Almost never: price is rarely an issue.' }
      ]
    }
  ];
  var LETTERS = ['A', 'B', 'C', 'D'];

  var BANDS = [
    { min: 80, id: 'hot', key: 'irresistible', label: 'Irresistible offer' },
    { min: 60, id: 'warm', key: 'solida', label: 'Solid, with leaks' },
    { min: 40, id: 'mild', key: 'empujones', label: 'Sells only with a push' },
    { min: 0, id: 'cold', key: 'commodity', label: 'Commodity offer' }
  ];

  /* ===================== UTILIDADES ===================== */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }
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
      if (existing) {
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

  function track(name, props) {
    var payload = merge({ tool: CFG.tool, variant: variantKey, lang: 'en' }, props || {});
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(merge({ event: name }, payload));
      if (typeof window.gtag === 'function') window.gtag('event', name, payload);
      if (typeof window.fbq === 'function') {
        if (name === EV + 'lead') window.fbq('track', 'Lead', { content_name: CFG.tool });
        else window.fbq('trackCustom', name, payload);
      }
    } catch (e) { /* nunca romper el tool por analytics */ }
  }

  /* ===================== CÁLCULO ===================== */
  function bandFor(score) {
    for (var i = 0; i < BANDS.length; i++) if (score >= BANDS[i].min) return BANDS[i];
    return BANDS[BANDS.length - 1];
  }
  function level(score) { return score >= 67 ? 'hi' : (score >= 34 ? 'mid' : 'lo'); }

  function compute() {
    var cats = {};
    CAT_ORDER.forEach(function (c) { cats[c] = { id: c, pts: [], qs: [] }; });
    QUESTIONS.forEach(function (q, i) {
      var a = S.answers[i];
      cats[q.cat].pts.push(a);
      cats[q.cat].qs.push({ q: q, idx: i, pts: a, opt: q.opts[a] });
    });
    var sum = 0;
    CAT_ORDER.forEach(function (c) {
      var o = cats[c], avg = o.pts.reduce(function (x, y) { return x + y; }, 0) / o.pts.length;
      o.score = Math.round(avg / 3 * 100);
      o.qs.sort(function (a, b) { return a.pts - b.pts; }); // la respuesta más débil primero
      sum += o.score;
    });
    var score = Math.round(sum / CAT_ORDER.length);
    var band = bandFor(score);

    var sorted = CAT_ORDER.slice().sort(function (a, b) {
      if (cats[a].score !== cats[b].score) return cats[a].score - cats[b].score;
      return PRIORITY.indexOf(a) - PRIORITY.indexOf(b);
    });
    var weak = sorted.filter(function (c) { return cats[c].score < 67; }).slice(0, 3);
    var allStrong = weak.length === 0;
    if (weak.length < 2) {
      sorted.forEach(function (c) { if (weak.length < 2 && weak.indexOf(c) < 0 && cats[c].score < 100) weak.push(c); });
    }
    var strengths = [];
    QUESTIONS.forEach(function (q, i) { if (S.answers[i] === 3) strengths.push(q.strong); });

    var C = function (id) { return cats[id].score; };
    var pattern = null;
    if (C('precio') <= 33 && C('diferenciacion') <= 33) {
      pattern = { id: 'precio_dif', title: 'Price is the symptom; differentiation is the cause', text: 'You get asked for discounts because prospects don’t see why you and not someone else. Before touching your price, work on what makes you different: as soon as prospects see a difference, they stop comparing on price alone.' };
    } else if (C('resultado') >= 67 && C('probabilidad') <= 33) {
      pattern = { id: 'promesa_sin_prueba', title: 'You promise something attractive, but don’t back it up', text: 'Your outcome is desirable, and that’s exactly why prospects are skeptical: the bigger the promise, the more proof it needs. Case studies with numbers and a guarantee make your promise believable.' };
    } else if (C('probabilidad') >= 67 && C('resultado') <= 33) {
      pattern = { id: 'prueba_sin_promesa', title: 'You have proof, but of an unclear outcome', text: 'You already have what it takes to show you deliver; what’s missing is stating clearly what the client gets. Use the result from your best cases as your main promise.' };
    } else if (C('tiempo') <= 33 && C('esfuerzo') <= 50) {
      pattern = { id: 'lento_y_pesado', title: 'Your offer asks a lot and takes a long time', text: 'For the client, the bottom half of the equation is heavy: lots of work on their side and distant results. A quick win in the first week and doing the heavy lifting yourself change perception more than any discount.' };
    } else if (C('precio') <= 33 && C('diferenciacion') >= 67) {
      pattern = { id: 'dif_no_comunicada', title: 'You’re different, but prospects aren’t feeling it', text: 'You say you have something unique and you still get haggled. That usually means the difference isn’t tied to an outcome the client values. Connect what makes you unique to the result they get.' };
    } else if (score >= 80) {
      pattern = { id: 'oferta_fuerte', title: 'Your offer doesn’t seem to be the bottleneck', text: 'With an offer this strong, if sales aren’t coming in, the problem is most likely how many people see it: demand generation, not packaging.' };
    }

    return { cats: cats, score: score, band: band, weak: weak, allStrong: allStrong, strengths: strengths, pattern: pattern, verdict: verdictText(score, band, weak, cats) };
  }

  function verdictText(score, band, weak, cats) {
    var names = weak.slice(0, 2).map(function (c) { return CATS[c].short.toLowerCase(); });
    var list = names.length === 2 ? names[0] + ' and ' + names[1] : (names[0] || '');
    switch (band.key) {
      case 'irresistible':
        return 'Your offer already makes saying no feel hard.' + (list ? ' What’s left is polishing ' + list + ' so saying yes is even easier.' : ' We didn’t find any weak variable.');
      case 'solida':
        return 'Your offer works, but it leaks. Right now ' + list + ' drag down its perceived value, and that shows up as long sales cycles, “I’ll think about it” and discounts.';
      case 'empujones':
        return 'Your offer sells, but only with a push: it depends heavily on your ability to persuade. The variables holding it back most are ' + list + '.';
      default:
        return 'Right now your offer is seen as just one more option. Without a clear outcome, proof and differentiation, prospects have only one way left to decide: price.';
    }
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
  var NEXT_TITLE = 'You know what’s weak. Now, how do you fix it?';
  var NEXT_TEXT = 'The next question is how to rewrite your promise, build your proof, design your guarantee and package it all into an offer they can’t refuse. That’s what you build in Blueprint 2 (Offer Packaging) of the Executive Sprint: a growth system in 5 days.';

  /* ===================== ESTILOS ===================== */
  var CSS = [
    '#ag-lm2{--ag-ink:#000919;--ag-blue:#1a11f7;--ag-blue-h:#1209c9;--ag-deep:#00086d;--ag-bright:#0000f1;--ag-lime:#cbff8b;--ag-lime-soft:#dff9bf;--ag-lime-line:#b8ec7a;--ag-bg:#f3f3f3;--ag-card:#fafafa;--ag-line:#d6d6d6;--ag-muted:#5b5f6a;--ag-faint:#e3e3e6;',
    'font-family:"DM Sans",system-ui,-apple-system,"Segoe UI",sans-serif;color:var(--ag-ink);background:var(--ag-bg);border-radius:24px;padding:32px 20px 28px;max-width:680px;margin:0 auto;text-align:left;line-height:1.5;-webkit-font-smoothing:antialiased;position:relative;overflow:hidden}',
    '#ag-lm2 *,#ag-lm2 *::before,#ag-lm2 *::after{box-sizing:border-box}',
    '#ag-lm2 h1,#ag-lm2 h2,#ag-lm2 h3,#ag-lm2 p{margin:0;padding:0;letter-spacing:normal;text-transform:none}',
    '#ag-lm2 button,#ag-lm2 input,#ag-lm2 a{margin:0;font-family:inherit;letter-spacing:normal;text-transform:none;box-shadow:none}',
    '#ag-lm2 ul,#ag-lm2 li{letter-spacing:normal}',
    '#ag-lm2 .aglm-screen{animation:aglmIn .35s ease both}',
    '@keyframes aglmIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
    '@media (prefers-reduced-motion:reduce){#ag-lm2 .aglm-screen{animation:none}}',
    '#ag-lm2 .aglm-pill{display:inline-block;font:700 12px/1 "DM Sans",sans-serif;letter-spacing:.12em;text-transform:uppercase;padding:8px 14px;border-radius:999px;background:var(--ag-blue);color:#fff}',
    '#ag-lm2 .aglm-pill--lime{background:var(--ag-lime);color:var(--ag-ink)}',
    '#ag-lm2 .aglm-pill--ink{background:var(--ag-ink);color:var(--ag-lime)}',
    '#ag-lm2 .aglm-h1{font:400 40px/1.04 "DM Serif Display",Georgia,serif;margin:18px 0 0;color:var(--ag-ink)}',
    '#ag-lm2 .aglm-h1 span{display:block;color:var(--ag-blue)}',
    '#ag-lm2 .aglm-h2{font:400 28px/1.12 "DM Serif Display",Georgia,serif;color:var(--ag-ink)}',
    '#ag-lm2 .aglm-h3{font:700 18px/1.3 "DM Sans",sans-serif;color:var(--ag-ink)}',
    '#ag-lm2 .aglm-lead{font-size:17px;color:var(--ag-muted);margin-top:14px;max-width:34em}',
    '#ag-lm2 .aglm-muted{color:var(--ag-muted)}',
    '#ag-lm2 .aglm-small{font-size:13px;color:var(--ag-muted)}',
    '#ag-lm2 .aglm-checks{list-style:none;margin:22px 0 26px;padding:0;display:grid;gap:10px}',
    '#ag-lm2 .aglm-checks li{display:flex;gap:10px;align-items:center;font-size:15px;font-weight:500;margin:0}',
    '#ag-lm2 .aglm-checks li::before{content:"";flex:0 0 22px;height:22px;border-radius:7px;background:var(--ag-lime) url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23000919\' stroke-width=\'3\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M5 12.5l4.5 4.5L19 7.5\'/%3E%3C/svg%3E") center/14px no-repeat}',
    '#ag-lm2 .aglm-btn{display:flex;width:100%;align-items:center;justify-content:center;gap:10px;min-height:54px;padding:14px 24px;border:0;border-radius:999px;background:var(--ag-blue);color:#fff;font:700 16px/1.2 "DM Sans",sans-serif;cursor:pointer;text-decoration:none;transition:background .15s,transform .1s,opacity .15s;-webkit-appearance:none;appearance:none;text-align:center}',
    '#ag-lm2 .aglm-btn:hover{background:var(--ag-blue-h);color:#fff}',
    '#ag-lm2 .aglm-btn:active{transform:scale(.985)}',
    '#ag-lm2 .aglm-btn[disabled]{opacity:.35;cursor:not-allowed;transform:none}',
    '#ag-lm2 .aglm-btn--lime{background:var(--ag-lime);color:var(--ag-ink)}',
    '#ag-lm2 .aglm-btn--lime:hover{background:#b9f26d;color:var(--ag-ink)}',
    '#ag-lm2 .aglm-btn:focus-visible,#ag-lm2 .aglm-link:focus-visible,#ag-lm2 .aglm-opt:focus-visible{outline:3px solid var(--ag-blue);outline-offset:3px}',
    '#ag-lm2 .aglm-btn--lime:focus-visible{outline-color:var(--ag-lime)}',
    '#ag-lm2 .aglm-link{background:none;border:0;padding:6px 0;font:500 15px/1.3 "DM Sans",sans-serif;color:var(--ag-ink);text-decoration:underline;text-underline-offset:3px;cursor:pointer}',
    '#ag-lm2 .aglm-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px;min-height:32px}',
    '#ag-lm2 .aglm-count{font:700 12px/1 "DM Sans",sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--ag-muted)}',
    '#ag-lm2 .aglm-progress{height:6px;border-radius:99px;background:var(--ag-faint);overflow:hidden;margin-bottom:26px}',
    '#ag-lm2 .aglm-progress span{display:block;height:100%;background:var(--ag-blue);border-radius:99px;transition:width .35s ease}',
    '#ag-lm2 .aglm-field{display:block;margin-top:14px}',
    '#ag-lm2 .aglm-field-label{display:block;font:700 14px/1.2 "DM Sans",sans-serif;margin-bottom:7px;color:var(--ag-ink)}',
    '#ag-lm2 .aglm-field-label em{font-style:normal;font-weight:400;color:var(--ag-muted)}',
    '#ag-lm2 .aglm-input{display:block;width:100%;height:54px;padding:0 16px;border:1.5px solid var(--ag-line);border-radius:14px;background:#fff;font:400 16px/1.2 "DM Sans",sans-serif;color:var(--ag-ink);margin:0;box-shadow:none;-webkit-appearance:none;appearance:none}',
    '#ag-lm2 .aglm-input::placeholder{color:#9a9ca3}',
    '#ag-lm2 .aglm-input:focus{outline:none;border-color:var(--ag-blue);box-shadow:0 0 0 4px rgba(26,17,247,.14)}',
    '#ag-lm2 .aglm-input.is-error{border-color:#d93025}',
    '#ag-lm2 .aglm-err{color:#c5221f;font-size:13px;margin-top:6px;min-height:0}',
    '#ag-lm2 .aglm-actions{margin-top:26px;display:grid;gap:12px}',
    '#ag-lm2 .aglm-anchors{display:grid;gap:6px;margin:16px 0 18px;padding:12px 14px;border-radius:14px;background:#fff;border:1px solid var(--ag-line);font-size:14px;line-height:1.4}',
    '#ag-lm2 .aglm-anchors div{display:flex;gap:10px;align-items:flex-start}',
    '#ag-lm2 .aglm-anchors b{flex:0 0 26px;height:26px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;font:700 13px/1 "DM Sans",sans-serif;background:var(--ag-faint);color:var(--ag-ink)}',
    '#ag-lm2 .aglm-anchors div:last-child b{background:var(--ag-blue);color:#fff}',
    '#ag-lm2 .aglm-rows{display:grid;gap:12px}',
    '#ag-lm2 .aglm-row{background:var(--ag-card);border:1.5px solid var(--ag-line);border-radius:16px;padding:14px;transition:border-color .2s}',
    '#ag-lm2 .aglm-row.is-done{border-color:var(--ag-lime-line);background:#f6fdee}',
    '#ag-lm2 .aglm-rowname{font:700 16px/1.3 "DM Sans",sans-serif;margin-bottom:10px;word-break:break-word}',
    '#ag-lm2 .aglm-scale{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}',
    '#ag-lm2 .aglm-opt{height:50px;border-radius:12px;border:1.5px solid var(--ag-line);background:#fff;color:var(--ag-ink);font:700 18px/1 "DM Sans",sans-serif;cursor:pointer;padding:0;margin:0;-webkit-appearance:none;appearance:none;transition:background .12s,border-color .12s,color .12s}',
    '#ag-lm2 .aglm-opt:hover{border-color:var(--ag-blue)}',
    '#ag-lm2 .aglm-opt[aria-checked="true"]{background:var(--ag-blue);border-color:var(--ag-blue);color:#fff}',
    '#ag-lm2 .aglm-scale-legend{display:flex;justify-content:space-between;font-size:12px;color:var(--ag-muted);margin-top:6px}',
    /* resultado */
    '#ag-lm2 .aglm-verdict{border-radius:22px;padding:24px 22px 22px;color:#fff;background:linear-gradient(180deg,var(--ag-deep) 0%,#0000d8 100%);position:relative;overflow:hidden}',
    '#ag-lm2 .aglm-verdict .aglm-h2{color:#fff;font-size:30px;margin-top:16px;word-break:break-word}',
    '#ag-lm2 .aglm-verdict p{color:rgba(255,255,255,.86);font-size:16px;margin-top:12px}',
    '#ag-lm2 .aglm-score{display:flex;align-items:baseline;gap:6px;margin-top:18px}',
    '#ag-lm2 .aglm-score b{font:400 60px/1 "DM Serif Display",Georgia,serif;color:var(--ag-lime)}',
    '#ag-lm2 .aglm-score span{font-size:16px;color:rgba(255,255,255,.75)}',
    '#ag-lm2 .aglm-sec{margin-top:34px}',
    '#ag-lm2 .aglm-sec > .aglm-h2{margin:12px 0 16px}',
    '#ag-lm2 .aglm-seg{background:var(--ag-card);border:1.5px solid var(--ag-line);border-radius:18px;padding:18px 16px;margin-top:12px}',
    '#ag-lm2 .aglm-seg.is-win{background:var(--ag-lime-soft);border-color:var(--ag-lime-line)}',
    '#ag-lm2 .aglm-seg-head{display:flex;align-items:flex-start;gap:12px}',
    '#ag-lm2 .aglm-rank{flex:0 0 34px;height:34px;border-radius:10px;background:var(--ag-ink);color:#fff;font:400 20px/34px "DM Serif Display",Georgia,serif;text-align:center}',
    '#ag-lm2 .aglm-seg.is-win .aglm-rank{background:var(--ag-blue)}',
    '#ag-lm2 .aglm-seg-name{flex:1;min-width:0;font:700 17px/1.3 "DM Sans",sans-serif;word-break:break-word}',
    '#ag-lm2 .aglm-seg-total{font:400 26px/1 "DM Serif Display",Georgia,serif;white-space:nowrap}',
    '#ag-lm2 .aglm-seg-total small{font:400 13px "DM Sans",sans-serif;color:var(--ag-muted)}',
    '#ag-lm2 .aglm-band{display:inline-block;margin-top:6px;font:700 11px/1 "DM Sans",sans-serif;letter-spacing:.1em;text-transform:uppercase;padding:6px 10px;border-radius:99px}',
    '#ag-lm2 .aglm-band--hot{background:var(--ag-ink);color:var(--ag-lime)}',
    '#ag-lm2 .aglm-band--warm{background:var(--ag-blue);color:#fff}',
    '#ag-lm2 .aglm-band--mild{background:#fff;color:var(--ag-ink);border:1px solid var(--ag-line)}',
    '#ag-lm2 .aglm-band--cold{background:var(--ag-faint);color:var(--ag-muted)}',
    '#ag-lm2 .aglm-seg-sum{margin-top:12px;font-size:15px;font-weight:500}',
    '#ag-lm2 .aglm-bars{display:grid;gap:7px;margin-top:14px}',
    '#ag-lm2 .aglm-bar{display:grid;grid-template-columns:96px 1fr 18px;align-items:center;gap:10px;font-size:13px}',
    '#ag-lm2 .aglm-bar-label{color:var(--ag-muted);white-space:nowrap}',
    '#ag-lm2 .aglm-bar.is-weak .aglm-bar-label{color:#c5221f;font-weight:700}',
    '#ag-lm2 .aglm-pips{display:grid;grid-template-columns:repeat(5,1fr);gap:3px}',
    '#ag-lm2 .aglm-pips i{display:block;height:8px;border-radius:3px;background:var(--ag-faint)}',
    '#ag-lm2 .aglm-pips i.on{background:var(--ag-blue)}',
    '#ag-lm2 .aglm-bar.is-weak .aglm-pips i.on{background:#e8453c}',
    '#ag-lm2 .aglm-bar-n{font-weight:700;text-align:right}',
    '#ag-lm2 .aglm-card{background:#fff;border:1.5px solid var(--ag-line);border-radius:18px;padding:20px 18px}',
    '#ag-lm2 .aglm-card p{margin-top:10px;font-size:15px}',
    '#ag-lm2 .aglm-weak{font:700 12px/1.3 "DM Sans",sans-serif !important;letter-spacing:.08em;text-transform:uppercase;color:#c5221f;margin-top:6px !important}',
    '#ag-lm2 .aglm-jump{display:inline-flex;align-items:center;margin-top:18px;padding:11px 16px;border-radius:999px;border:1.5px solid rgba(203,255,139,.55);background:transparent;color:var(--ag-lime);font:700 14px/1.2 "DM Sans",sans-serif;cursor:pointer;-webkit-appearance:none;appearance:none;text-align:left}',
    '#ag-lm2 .aglm-jump:hover{background:rgba(203,255,139,.12)}',
    '#ag-lm2 .aglm-do{margin-top:14px;padding:14px 14px 14px 16px;border-radius:14px;background:var(--ag-lime-soft);border-left:4px solid var(--ag-ink);font-size:15px}',
    '#ag-lm2 .aglm-do b{display:block;font-size:12px;letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px}',
    '#ag-lm2 .aglm-stop{border-style:dashed}',
    '#ag-lm2 .aglm-pdfcard{background:#fff;border:1.5px solid var(--ag-line);border-radius:22px;padding:22px 18px}',
    '#ag-lm2 .aglm-pdfcard ul{margin:14px 0 4px;padding:0 0 0 18px;font-size:15px}',
    '#ag-lm2 .aglm-pdfcard li{margin:4px 0}',
    '#ag-lm2 .aglm-legal{font-size:12px;color:var(--ag-muted);margin-top:10px;text-align:center}',
    '#ag-lm2 .aglm-legal a{color:inherit}',
    '#ag-lm2 .aglm-ok{background:var(--ag-lime-soft);border:1.5px solid var(--ag-lime-line);border-radius:16px;padding:16px;margin-top:6px}',
    '#ag-lm2 .aglm-ok .aglm-h3{margin-bottom:6px}',
    '#ag-lm2 .aglm-cta{background:var(--ag-ink);color:#fff;border-radius:22px;padding:26px 20px 22px}',
    '#ag-lm2 .aglm-cta .aglm-h2{color:#fff;margin-top:14px}',
    '#ag-lm2 .aglm-cta p{color:rgba(255,255,255,.82);font-size:16px;margin-top:12px}',
    '#ag-lm2 .aglm-cta .aglm-urg{color:var(--ag-lime);font-size:14px;margin-top:14px}',
    '#ag-lm2 .aglm-restart{text-align:center;margin-top:22px}',
    '#ag-lm2 .aglm-spin{width:18px;height:18px;border-radius:50%;border:2.5px solid rgba(255,255,255,.4);border-top-color:#fff;animation:aglmSpin .8s linear infinite}',
    '@keyframes aglmSpin{to{transform:rotate(360deg)}}',
    '#ag-lm2 .aglm-stage{position:absolute;left:-12000px;top:0;width:794px;pointer-events:none}',
    '@media (min-width:640px){#ag-lm2{padding:48px 48px 40px}#ag-lm2 .aglm-h1{font-size:52px}#ag-lm2 .aglm-h2{font-size:32px}#ag-lm2 .aglm-verdict{padding:32px}#ag-lm2 .aglm-verdict .aglm-h2{font-size:36px}#ag-lm2 .aglm-actions .aglm-btn{width:auto;justify-self:start;padding:14px 32px}#ag-lm2 .aglm-cta,#ag-lm2 .aglm-pdfcard{padding:32px}#ag-lm2 .aglm-bar{grid-template-columns:110px 1fr 18px}}',

    /* ===== PDF (A4 a 794×1123 px) ===== */
    '#ag-lm2 .pdf-page{width:794px;height:1123px;background:#f3f3f3;position:relative;overflow:hidden;font-family:"DM Sans",sans-serif;color:#000919;line-height:1.45}',
    '#ag-lm2 .pdf-hero{background:linear-gradient(180deg,#00086d 0%,#0000ec 100%);color:#fff;padding:44px 56px 40px}',
    '#ag-lm2 .pdf-hero img{width:230px;height:auto;display:block}',
    '#ag-lm2 .pdf-hero .aglm-pill{margin-top:38px}',
    '#ag-lm2 .pdf-hero h1{font:400 40px/1.08 "DM Serif Display",Georgia,serif;color:#fff;margin-top:16px;word-break:break-word}',
    '#ag-lm2 .pdf-meta{font-size:15px;color:rgba(255,255,255,.8);margin-top:12px}',
    '#ag-lm2 .pdf-body{padding:30px 56px 0}',
    '#ag-lm2 .pdf-verdict{display:flex;gap:24px;align-items:flex-start;background:#fff;border:1.5px solid #d6d6d6;border-radius:18px;padding:20px 22px}',
    '#ag-lm2 .pdf-verdict .n{font:400 54px/1 "DM Serif Display",Georgia,serif;color:#1a11f7;white-space:nowrap}',
    '#ag-lm2 .pdf-verdict .n small{font:400 15px "DM Sans",sans-serif;color:#5b5f6a}',
    '#ag-lm2 .pdf-verdict p{font-size:15px;margin:0}',
    '#ag-lm2 .pdf-h2{font:400 28px/1.1 "DM Serif Display",Georgia,serif;margin:26px 0 12px}',
    '#ag-lm2 .pdf-seg{background:#fafafa;border:1.5px solid #d6d6d6;border-radius:16px;padding:14px 18px;margin-top:10px}',
    '#ag-lm2 .pdf-seg.is-win{background:#dff9bf;border-color:#b8ec7a}',
    '#ag-lm2 .pdf-seg-head{display:flex;align-items:center;gap:12px}',
    '#ag-lm2 .pdf-seg-head .aglm-rank{flex:0 0 30px;height:30px;line-height:30px;font-size:18px;border-radius:9px}',
    '#ag-lm2 .pdf-seg-name{flex:1;font:700 17px/1.25 "DM Sans",sans-serif;word-break:break-word}',
    '#ag-lm2 .pdf-seg-total{font:400 26px/1 "DM Serif Display",Georgia,serif;white-space:nowrap}',
    '#ag-lm2 .pdf-seg-total small{font:400 13px "DM Sans",sans-serif;color:#5b5f6a}',
    '#ag-lm2 .pdf-seg-sum{font-size:14px;font-weight:500;margin:8px 0 0}',
    '#ag-lm2 .pdf-seg-grid{display:grid;grid-template-columns:1fr 1fr;column-gap:26px;row-gap:5px;margin-top:10px}',
    '#ag-lm2 .pdf-seg-grid .aglm-bar{grid-template-columns:92px 1fr 14px;font-size:12px;gap:8px}',
    '#ag-lm2 .pdf-foot{position:absolute;left:56px;right:56px;bottom:26px;display:flex;justify-content:space-between;font-size:12px;color:#5b5f6a;border-top:1px solid #d6d6d6;padding-top:10px}',
    '#ag-lm2 .pdf-plan{background:#fff;border:1.5px solid #d6d6d6;border-radius:16px;padding:16px 20px;margin-top:10px}',
    '#ag-lm2 .pdf-plan h3{font:700 16px/1.3 "DM Sans",sans-serif;margin:0}',
    '#ag-lm2 .pdf-plan .w{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#c5221f;margin-top:6px}',
    '#ag-lm2 .pdf-plan p{font-size:13.5px;margin:6px 0 0}',
    '#ag-lm2 .pdf-plan .do{background:#dff9bf;border-left:4px solid #000919;border-radius:10px;padding:9px 12px;margin-top:9px;font-size:13.5px}',
    '#ag-lm2 .pdf-plan .do b{font-size:11px;letter-spacing:.1em;text-transform:uppercase}',
    '#ag-lm2 .pdf-crit{display:grid;grid-template-columns:150px 1fr;gap:4px 16px;font-size:12px;margin-top:8px;color:#000919}',
    '#ag-lm2 .pdf-crit b{font-weight:700}',
    '#ag-lm2 .pdf-crit span{color:#5b5f6a}',
    '#ag-lm2 .pdf-cta{position:absolute;left:0;right:0;bottom:0;background:#000919;color:#fff;padding:34px 56px 70px}',
    '#ag-lm2 .pdf-cta h2{font:400 30px/1.1 "DM Serif Display",Georgia,serif;color:#fff;margin-top:14px}',
    '#ag-lm2 .pdf-cta p{font-size:14px;color:rgba(255,255,255,.82);margin-top:10px;max-width:640px}',
    '#ag-lm2 .pdf-cta .btn{display:inline-block;margin-top:16px;background:#cbff8b;color:#000919;font:700 15px/1 "DM Sans",sans-serif;padding:14px 24px;border-radius:999px}',
    '#ag-lm2 .pdf-cta .urg{font-size:12.5px;color:#cbff8b;margin-top:12px}',
    '#ag-lm2 .pdf-cta .foot{position:absolute;left:56px;right:56px;bottom:22px;display:flex;justify-content:space-between;font-size:12px;color:rgba(255,255,255,.55);border-top:1px solid rgba(255,255,255,.15);padding-top:10px}',
    /* ===== LM2 ===== */
    '#ag-lm2 .aglm-opts{display:grid;gap:10px;margin-top:20px}',
    '#ag-lm2 .aglm-choice{display:flex;align-items:flex-start;gap:12px;width:100%;text-align:left;padding:15px 14px;border-radius:16px;border:1.5px solid var(--ag-line);background:#fff;color:var(--ag-ink);font:500 16px/1.4 "DM Sans",sans-serif;cursor:pointer;-webkit-appearance:none;appearance:none;transition:border-color .15s,background .15s}',
    '#ag-lm2 .aglm-choice:hover{border-color:var(--ag-blue)}',
    '#ag-lm2 .aglm-choice:focus-visible{outline:3px solid var(--ag-blue);outline-offset:3px}',
    '#ag-lm2 .aglm-choice b{flex:0 0 28px;height:28px;border-radius:9px;display:inline-flex;align-items:center;justify-content:center;font:700 13px/1 "DM Sans",sans-serif;background:var(--ag-faint);color:var(--ag-ink);margin-top:-2px}',
    '#ag-lm2 .aglm-choice[aria-checked="true"]{border-color:var(--ag-blue);background:#f1f0ff}',
    '#ag-lm2 .aglm-choice[aria-checked="true"] b{background:var(--ag-blue);color:#fff}',
    '#ag-lm2 .aglm-eq{margin-top:18px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);border-radius:16px;padding:14px 12px;color:#fff}',
    '#ag-lm2 .aglm-eq-cap{font:700 11px/1 "DM Sans",sans-serif;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.7);text-align:center}',
    '#ag-lm2 .aglm-eq-row{display:flex;justify-content:center;align-items:center;gap:8px;flex-wrap:wrap;margin-top:10px}',
    '#ag-lm2 .aglm-eq-x{color:rgba(255,255,255,.6);font-size:15px}',
    '#ag-lm2 .aglm-eq-line{height:2px;background:rgba(255,255,255,.55);margin:10px 8% 0;border-radius:2px}',
    '#ag-lm2 .aglm-chip{display:inline-flex;align-items:baseline;gap:6px;padding:7px 11px;border-radius:999px;font:500 13px/1 "DM Sans",sans-serif;background:#fff;color:var(--ag-ink);white-space:nowrap}',
    '#ag-lm2 .aglm-chip strong{font:700 13px/1 "DM Sans",sans-serif}',
    '#ag-lm2 .aglm-chip--hi{background:var(--ag-lime);color:var(--ag-ink)}',
    '#ag-lm2 .aglm-chip--lo{background:#ffd9d6;color:#8c1d16}',
    '#ag-lm2 .aglm-eq-note{font-size:12px;line-height:1.4;color:rgba(255,255,255,.7);text-align:center;margin-top:10px}',
    '#ag-lm2 .aglm-vbars{display:grid;gap:12px;background:var(--ag-card);border:1.5px solid var(--ag-line);border-radius:18px;padding:18px 16px}',
    '#ag-lm2 .aglm-vbar-top{display:flex;justify-content:space-between;gap:10px;font-size:14px}',
    '#ag-lm2 .aglm-vbar-top span{font-weight:500}',
    '#ag-lm2 .aglm-vbar-top b{font-weight:700}',
    '#ag-lm2 .aglm-track{height:10px;border-radius:99px;background:var(--ag-faint);overflow:hidden;margin-top:6px}',
    '#ag-lm2 .aglm-track i{display:block;height:100%;border-radius:99px;background:var(--ag-blue)}',
    '#ag-lm2 .aglm-vbar.is-lo .aglm-track i{background:#e8453c}',
    '#ag-lm2 .aglm-vbar.is-lo .aglm-vbar-top b{color:#c5221f}',
    '#ag-lm2 .aglm-said{margin-top:12px;padding:10px 12px;border-radius:12px;background:var(--ag-bg);font-size:14px;color:var(--ag-ink)}',
    '#ag-lm2 .aglm-said em{font-style:normal;color:var(--ag-muted);display:block;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:3px}',
    '#ag-lm2 .aglm-weak-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}',
    '#ag-lm2 .aglm-weak-head .aglm-h3{flex:1}',
    '#ag-lm2 .aglm-score-chip{flex:0 0 auto;font:700 13px/1 "DM Sans",sans-serif;padding:7px 10px;border-radius:999px;background:#ffd9d6;color:#8c1d16}',
    '#ag-lm2 .aglm-score-chip.is-mid{background:var(--ag-faint);color:var(--ag-ink)}',
    '#ag-lm2 .aglm-insight{background:var(--ag-lime-soft);border:1.5px solid var(--ag-lime-line);border-radius:18px;padding:18px}',
    '#ag-lm2 .aglm-insight p{margin-top:8px;font-size:15px}',
    '#ag-lm2 .aglm-strengths{list-style:none;margin:14px 0 0;padding:0;display:grid;gap:8px}',
    '#ag-lm2 .aglm-strengths li{display:flex;gap:10px;font-size:15px;margin:0}',
    '#ag-lm2 .aglm-strengths li::before{content:"";flex:0 0 20px;height:20px;border-radius:6px;margin-top:1px;background:var(--ag-lime) url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23000919\' stroke-width=\'3\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M5 12.5l4.5 4.5L19 7.5\'/%3E%3C/svg%3E") center/13px no-repeat}',
    '@media (min-width:640px){#ag-lm2 .aglm-choice{padding:16px 18px}}',
    /* PDF LM2 */
    '#ag-lm2 .pdf-score{display:flex;gap:26px;align-items:center;background:#fff;border:1.5px solid #d6d6d6;border-radius:18px;padding:20px 24px}',
    '#ag-lm2 .pdf-score .n{font:400 64px/1 "DM Serif Display",Georgia,serif;color:#1a11f7;white-space:nowrap}',
    '#ag-lm2 .pdf-score .n small{font:400 16px "DM Sans",sans-serif;color:#5b5f6a}',
    '#ag-lm2 .pdf-score p{font-size:15px;margin:8px 0 0}',
    '#ag-lm2 .pdf-eq{margin-top:14px;background:#00086d;border-radius:18px;padding:16px 20px;color:#fff}',
    '#ag-lm2 .pdf-eq .aglm-eq-row{margin-top:8px}',
    '#ag-lm2 .pdf-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px 28px;margin-top:6px}',
    '#ag-lm2 .pdf-grid .aglm-vbar-top{font-size:13px}',
    '#ag-lm2 .pdf-grid .aglm-track{height:9px}',
    '#ag-lm2 .pdf-weak{background:#fff;border:1.5px solid #d6d6d6;border-radius:16px;padding:14px 18px;margin-top:10px}',
    '#ag-lm2 .pdf-weak h3{font:700 16px/1.3 "DM Sans",sans-serif;margin:0;display:flex;justify-content:space-between;gap:12px}',
    '#ag-lm2 .pdf-weak h3 span{font-size:13px;color:#c5221f;white-space:nowrap}',
    '#ag-lm2 .pdf-weak .why{font-size:13px;color:#5b5f6a;margin:6px 0 0}',
    '#ag-lm2 .pdf-weak .ans{font-size:13px;margin:8px 0 0}',
    '#ag-lm2 .pdf-weak .ans b{font-weight:700}',
    '#ag-lm2 .pdf-weak .do{background:#dff9bf;border-left:4px solid #000919;border-radius:10px;padding:8px 12px;margin-top:6px;font-size:13px}',
    '#ag-lm2 .pdf-weak .do b{font-size:11px;letter-spacing:.1em;text-transform:uppercase}',
    '#ag-lm2 .pdf-two{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:12px}',
    '#ag-lm2 .pdf-box{background:#fff;border:1.5px solid #d6d6d6;border-radius:16px;padding:14px 16px;font-size:13px}',
    '#ag-lm2 .pdf-box h3{font:400 18px/1.2 "DM Serif Display",Georgia,serif;margin:0 0 6px}',
    '#ag-lm2 .pdf-box ul{margin:0;padding:0 0 0 16px}',
    '#ag-lm2 .pdf-box li{margin:3px 0}',
    '#ag-lm2 .pdf-answers{display:grid;grid-template-columns:1fr;gap:4px;font-size:12px;margin-top:6px}',
    '#ag-lm2 .pdf-answers div{display:grid;grid-template-columns:22px 1fr;gap:6px}',
    '#ag-lm2 .pdf-answers b{color:#1a11f7}'
  ].join('\n');

  /* ===================== ESTADO + MONTAJE ===================== */
  var S = { q: 0, answers: [], result: null, lead: null, pdfUrl: null, busy: false, startedAt: null, subId: null, bot: false };
  var root, shell, stage;

  function mount() {
    root = document.getElementById(CFG.mountId);
    if (!root || root.getAttribute('data-aglm-ready')) return;
    root.setAttribute('data-aglm-ready', '1');
    root.setAttribute('lang', 'en');
    if (!document.getElementById('aglm2-style')) {
      var st = document.createElement('style'); st.id = 'aglm2-style'; st.textContent = CSS; document.head.appendChild(st);
    }
    if (CFG.fontsUrl && !document.querySelector('link[data-aglm-fonts]')) {
      var ln = document.createElement('link'); ln.rel = 'stylesheet'; ln.href = CFG.fontsUrl; ln.setAttribute('data-aglm-fonts', '1');
      document.head.appendChild(ln);
    }
    root.innerHTML = '<div class="aglm-shell" aria-live="polite"></div><div class="aglm-stage" aria-hidden="true"></div>';
    shell = root.querySelector('.aglm-shell');
    stage = root.querySelector('.aglm-stage');
    root.addEventListener('click', onClick);
    root.addEventListener('input', function (e) { if (e.target.classList && e.target.classList.contains('is-error')) e.target.classList.remove('is-error'); });
    root.addEventListener('submit', onSubmit);
    renderIntro();
    track(EV + 'view');
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
      '<ul class="aglm-checks"><li>8 multiple-choice questions</li><li>Your 0–100 score across 6 value variables</li><li>Your weak spots and how to fix them, no sign-up</li></ul>' +
      '<div class="aglm-actions"><button type="button" class="aglm-btn" data-act="start">Start my diagnostic</button></div>'
    );
  }

  function renderQuestion() {
    var q = QUESTIONS[S.q], n = S.q + 1, total = QUESTIONS.length, sel = S.answers[S.q];
    var opts = q.opts.map(function (o, i) {
      return '<button type="button" class="aglm-choice" role="radio" aria-checked="' + (sel === i) + '" data-act="answer" data-val="' + i + '"><b>' + LETTERS[i] + '</b><span>' + esc(o.t) + '</span></button>';
    }).join('');
    show(
      '<div class="aglm-top">' + (S.q > 0 ? '<button type="button" class="aglm-link" data-act="back">← Back</button>' : '<button type="button" class="aglm-link" data-act="home">← Start</button>') +
      '<span class="aglm-count">Question ' + n + ' of ' + total + '</span></div>' +
      '<div class="aglm-progress"><span style="width:' + (n / total * 100).toFixed(1) + '%"></span></div>' +
      '<span class="aglm-pill aglm-pill--ink">' + esc(CATS[q.cat].name) + '</span>' +
      '<h2 class="aglm-h2" style="margin-top:14px">' + esc(q.q) + '</h2>' +
      '<div class="aglm-opts" role="radiogroup" aria-label="' + esc(q.q) + '">' + opts + '</div>' +
      (typeof sel === 'number' ? '<div class="aglm-actions"><button type="button" class="aglm-btn" data-act="next">' + (n === total ? 'See my result' : 'Next') + '</button></div>' : '')
    );
  }

  function chip(id, score) {
    var lv = level(score);
    return '<span class="aglm-chip' + (lv === 'hi' ? ' aglm-chip--hi' : (lv === 'lo' ? ' aglm-chip--lo' : '')) + '">' + esc(CATS[id].short) + ' <strong>' + score + '</strong></span>';
  }
  function equationHtml(cats) {
    return '<div class="aglm-eq-cap">Your Value Equation</div>' +
      '<div class="aglm-eq-row">' + chip('resultado', cats.resultado.score) + '<span class="aglm-eq-x">×</span>' + chip('probabilidad', cats.probabilidad.score) + '</div>' +
      '<div class="aglm-eq-line"></div>' +
      '<div class="aglm-eq-row">' + chip('tiempo', cats.tiempo.score) + '<span class="aglm-eq-x">×</span>' + chip('esfuerzo', cats.esfuerzo.score) + '</div>' +
      '<div class="aglm-eq-row" style="margin-top:12px"><span class="aglm-eq-x">+</span>' + chip('diferenciacion', cats.diferenciacion.score) + chip('precio', cats.precio.score) + '</div>' +
      '<p class="aglm-eq-note">Top: what the client gains. Bottom: what it costs them. In every variable, more points = better for you.</p>';
  }
  function vbarsHtml(cats) {
    return CAT_ORDER.map(function (c) {
      var s = cats[c].score;
      return '<div class="aglm-vbar' + (level(s) === 'lo' ? ' is-lo' : '') + '"><div class="aglm-vbar-top"><span>' + esc(CATS[c].name) + '</span><b>' + s + '</b></div>' +
        '<div class="aglm-track"><i style="width:' + Math.max(3, s) + '%"></i></div></div>';
    }).join('');
  }

  function renderResult() {
    var R = S.result, sp = sprintState();

    var weakCards = R.weak.map(function (c) {
      var cat = R.cats[c], first = cat.qs[0], lv = level(cat.score);
      var fix = first.opt.fix || (cat.qs[1] && cat.qs[1].opt.fix) || '';
      return '<div class="aglm-card" style="margin-top:12px">' +
        '<div class="aglm-weak-head"><h3 class="aglm-h3">' + esc(R.allStrong ? 'Room to improve: ' + CATS[c].name.toLowerCase() : CATS[c].weakTitle) + '</h3>' +
        '<span class="aglm-score-chip' + (lv !== 'lo' ? ' is-mid' : '') + '">' + cat.score + '/100</span></div>' +
        '<div class="aglm-said"><em>You answered</em>' + esc(first.opt.t) + '</div>' +
        '<p class="aglm-muted">' + esc(CATS[c].why) + '</p>' +
        (fix ? '<div class="aglm-do"><b>How to fix it</b>' + esc(fix) + '</div>' : '') +
        '</div>';
    }).join('');

    if (!R.weak.length) weakCards = '<div class="aglm-card" style="margin-top:12px"><p style="margin:0">You answered everything at the top level. Your offer has no weak variables: the next step is getting more people to see it.</p></div>';

    var insight = R.pattern ? (
      '<div class="aglm-sec"><div class="aglm-insight"><span class="aglm-pill aglm-pill--ink">What we see in your answers</span>' +
      '<h3 class="aglm-h3" style="margin-top:12px">' + esc(R.pattern.title) + '</h3><p>' + esc(R.pattern.text) + '</p></div></div>'
    ) : '';

    var strengths = R.strengths.length ? (
      '<div class="aglm-sec"><span class="aglm-pill">What you already do well</span><ul class="aglm-strengths">' +
      R.strengths.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></div>'
    ) : '';

    var pdf = S.pdfUrl ? pdfDoneHtml() : (
      '<form class="aglm-pdfcard" novalidate data-form="lead">' +
      '<span class="aglm-pill">Your diagnostic as a PDF</span>' +
      '<h2 class="aglm-h2" style="margin-top:14px">Get the full diagnostic</h2>' +
      '<ul><li>Your score and your 6 variables on one page</li><li>How to fix <strong>each</strong> weak answer, not just the main one</li><li>Your 8 answers to review with your team</li></ul>' +
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
      '<div class="aglm-verdict"><span class="aglm-pill aglm-pill--lime">Your Value Equation Score</span>' +
      '<div class="aglm-score"><b>' + R.score + '</b><span>/ 100</span></div>' +
      '<h2 class="aglm-h2" style="margin-top:8px">' + esc(R.band.label) + '</h2>' +
      '<p>' + esc(R.verdict) + '</p>' +
      '<div class="aglm-eq">' + equationHtml(R.cats) + '</div>' +
      '<button type="button" class="aglm-jump" data-act="jump-pdf">Get the full diagnostic as a PDF ↓</button></div>' +

      '<div class="aglm-sec"><span class="aglm-pill">Your 6 variables</span><h2 class="aglm-h2">Where your offer gains and loses value</h2>' +
      '<div class="aglm-vbars">' + vbarsHtml(R.cats) + '</div></div>' +

      '<div class="aglm-sec"><span class="aglm-pill">' + (R.allStrong ? 'To polish' : 'Your weak spots') + '</span>' +
      '<h2 class="aglm-h2">' + (R.allStrong ? 'What you can still raise' : 'What’s holding back your sales') + '</h2>' + weakCards + '</div>' +

      insight + strengths +

      '<div class="aglm-sec" data-pdf-sec>' + pdf + '</div>' +

      (CFG.showCta ? (
        '<div class="aglm-sec"><div class="aglm-cta"><span class="aglm-pill aglm-pill--lime">What’s next</span>' +
        '<h2 class="aglm-h2">' + esc(NEXT_TITLE) + '</h2><p>' + esc(NEXT_TEXT) + '</p>' +
        '<div class="aglm-actions" style="margin-top:20px"><a class="aglm-btn aglm-btn--lime" href="' + esc(sp.url) + '" target="_blank" rel="noopener" data-act="cta">' + esc(sp.label) + '</a></div>' +
        '<p class="aglm-urg">' + esc(sp.line) + '</p></div></div>'
      ) : '') +

      '<div class="aglm-restart"><button type="button" class="aglm-link" data-act="restart">Retake the diagnostic</button></div>'
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
      S.startedAt = Date.now(); S.q = 0;
      track(EV + 'start');
      renderQuestion();
    } else if (act === 'home') {
      clearTimeout(S.adv);
      renderIntro();
    } else if (act === 'answer') {
      var val = +t.getAttribute('data-val');
      var first = typeof S.answers[S.q] !== 'number';
      S.answers[S.q] = val;
      shell.querySelectorAll('.aglm-choice').forEach(function (b) { b.setAttribute('aria-checked', String(+b.getAttribute('data-val') === val)); });
      clearTimeout(S.adv);
      // Avance automático (también al cambiar de opinión en una pregunta ya contestada)
      S.adv = setTimeout(next, first ? 320 : 380);
    } else if (act === 'next') {
      clearTimeout(S.adv);
      next();
    } else if (act === 'back') {
      clearTimeout(S.adv);
      if (S.q > 0) { S.q--; renderQuestion(); }
    } else if (act === 'restart') {
      S.pdfUrl = null; S.result = null; S.q = 0; S.answers = []; S.subId = null;
      track(EV + 'restart');
      renderQuestion();
    } else if (act === 'jump-pdf') {
      var sec = shell.querySelector('[data-pdf-sec]');
      if (sec) {
        try { sec.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e2) { sec.scrollIntoView(); }
        var inp = sec.querySelector('input[name="name"]');
        if (inp) setTimeout(function () { try { inp.focus({ preventScroll: true }); } catch (e3) { } }, 450);
      }
      track(EV + 'jump_pdf');
    } else if (act === 'cta') {
      track(EV + 'cta_click', { cohort_open: sprintState().open });
    } else if (act === 'pdf-open') {
      track(EV + 'pdf_open');
    }
  }

  function next() {
    if (typeof S.answers[S.q] !== 'number') return;
    track(EV + 'step', { step: S.q + 1, question: QUESTIONS[S.q].id, answer: LETTERS[S.answers[S.q]] });
    if (S.q < QUESTIONS.length - 1) { S.q++; renderQuestion(); return; }
    S.result = compute();
    S.pdfUrl = null; S.subId = null;
    track(EV + 'result', {
      score: S.result.score, band: S.result.band.key, weakest: S.result.weak.join(','),
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
    S.bot = !!F['website'].value; // honeypot
    if (!S.subId) S.subId = 'lm2-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    send('lead');
    track(EV + 'lead');

    var btn = form.querySelector('[data-pdf-btn]');
    S.busy = true;
    btn.disabled = true;
    btn.innerHTML = '<span class="aglm-spin"></span> Generating your PDF…';

    makePdf().then(function (out) {
      S.busy = false;
      S.pdfUrl = out.url;
      track(EV + 'pdf_download');
      var sec = shell.querySelector('[data-pdf-sec]');
      if (sec) sec.innerHTML = pdfDoneHtml();
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
      track(EV + 'pdf_error', { message: msg });
      send('pdf', { pdf_error: msg });
      if (window.console) console.error('[AG LM2]', ex);
    });
  }

  function leadPayload() {
    var R = S.result, scores = {};
    CAT_ORDER.forEach(function (c) { scores[c] = R.cats[c].score; });
    return {
      tool: CFG.tool, version: VERSION, lang: 'en', variant: variantKey, submission_id: S.subId, submitted_at: new Date().toISOString(),
      name: S.lead.name, email: S.lead.email, company: S.lead.company,
      score: R.score, band: R.band.label, band_key: R.band.key,
      weak: R.weak, weak_titles: R.weak.map(function (c) { return CATS[c].weakTitle; }),
      categories: scores,
      pattern: R.pattern ? R.pattern.title : '', pattern_id: R.pattern ? R.pattern.id : '',
      answers: QUESTIONS.map(function (q, i) { return { q: q.id, cat: q.cat, letter: LETTERS[S.answers[i]], pts: S.answers[i], text: q.opts[S.answers[i]].t }; }),
      page: window.location.href.split('#')[0], referrer: document.referrer || '', utm: utm()
    };
  }

  function send(type, extra) {
    if (!CFG.endpoint || S.bot) return;
    var body = JSON.stringify(merge(merge(leadPayload(), { type: type }), extra || {}));
    try {
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
    return 'Offer-Diagnostic' + (S.lead && S.lead.name ? '-' + slug(S.lead.name) : '') + '.pdf';
  }

  function pdfPagesHtml() {
    var R = S.result, sp = sprintState();
    var who = esc(S.lead.name) + (S.lead.company ? ' · ' + esc(S.lead.company) : '');
    var date = fmtDate(new Date(), { day: 'numeric', month: 'long', year: 'numeric' });

    var p1 =
      '<div class="pdf-page" data-page="1">' +
      '<div class="pdf-hero"><img src="' + CFG.logoWhite + '" alt="Agora Growth">' +
      '<span class="aglm-pill aglm-pill--lime">Offer Diagnostic · Value Equation</span>' +
      '<h1>' + esc(R.band.label) + ': ' + R.score + '/100</h1>' +
      '<p class="pdf-meta">Prepared for ' + who + ' · ' + esc(date) + '</p></div>' +
      '<div class="pdf-body">' +
      '<div class="pdf-score"><div class="n">' + R.score + '<small>/100</small></div><div><b style="font-size:17px">' + esc(R.band.label) + '</b><p>' + esc(R.verdict) + '</p></div></div>' +
      '<div class="pdf-eq">' + equationHtml(R.cats) + '</div>' +
      '<h2 class="pdf-h2">Your 6 variables</h2>' +
      '<div class="pdf-grid">' + vbarsHtml(R.cats) + '</div>' +
      (R.pattern ? '<div class="aglm-insight" style="margin-top:20px;padding:14px 18px"><b style="font-size:15px">' + esc(R.pattern.title) + '</b><p style="font-size:13.5px;margin-top:6px">' + esc(R.pattern.text) + '</p></div>' : '') +
      '</div>' +
      '<div class="pdf-foot"><span>Agora Growth · Rev up Revenue</span><span>agoragrowth.com · 1/2</span></div></div>';

    // Página 2: plan por cada punto débil (todas sus respuestas débiles, no solo la principal)
    var plans = R.weak.map(function (c) {
      var cat = R.cats[c];
      var items = cat.qs.filter(function (x) { return x.pts < 3; }).map(function (x) {
        return '<p class="ans"><b>You answered:</b> ' + esc(x.opt.t) + '</p>' +
          '<div class="do"><b>How to fix it:</b> ' + esc(x.opt.fix) + '</div>';
      }).join('');
      return '<div class="pdf-weak"><h3>' + esc(R.allStrong ? 'Room to improve: ' + CATS[c].name : CATS[c].weakTitle) + '<span>' + esc(CATS[c].name) + ' · ' + cat.score + '/100</span></h3>' +
        '<p class="why">' + esc(CATS[c].why) + '</p>' + items + '</div>';
    }).join('');

    if (!R.weak.length) plans = '<div class="pdf-weak"><p class="why" style="margin:0">You answered everything at the top level: your offer has no weak variables. The next step is getting more people to see it.</p></div>';

    var strengths = R.strengths.length
      ? '<ul>' + R.strengths.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>'
      : '<p style="margin:0;color:#5b5f6a">No variable is at its maximum yet. Start with the weak spots above.</p>';

    var answers = QUESTIONS.map(function (q, i) {
      return '<div><b>' + (i + 1) + '.</b><span>' + esc(q.opts[S.answers[i]].t) + ' <span style="color:#5b5f6a">(' + esc(CATS[q.cat].short) + ')</span></span></div>';
    }).join('');

    var p2 =
      '<div class="pdf-page" data-page="2">' +
      '<div class="pdf-body" style="padding-top:44px">' +
      '<span class="aglm-pill">Your plan</span>' +
      '<h2 class="pdf-h2" style="margin-top:14px">' + (R.allStrong ? 'What you can still raise' : 'How to fix your weak spots') + '</h2>' +
      plans +
      '<div class="pdf-two"><div class="pdf-box"><h3>What you already do well</h3>' + strengths + '</div>' +
      '<div class="pdf-box"><h3>Your 8 answers</h3><div class="pdf-answers">' + answers + '</div></div></div>' +
      '<p style="font-size:11.5px;color:#5b5f6a;margin-top:12px">How it’s calculated: each answer is worth 0 to 3 points; each variable is expressed from 0 to 100 and the score is the average of the 6. Based on Alex Hormozi’s Value Equation: Value = (Dream Outcome × Perceived Likelihood) / (Time Delay × Effort & Sacrifice).</p>' +
      '</div>' +
      (CFG.showCta ? (
        '<div class="pdf-cta"><span class="aglm-pill aglm-pill--lime">What’s next</span>' +
        '<h2>' + esc(NEXT_TITLE) + '</h2><p>' + esc(NEXT_TEXT) + '</p>' +
        '<span class="btn" data-pdf-link>' + esc(sp.label) + ' →</span>' +
        '<p class="urg">' + esc(sp.line) + '</p>' +
        '<div class="foot"><span>Agora Growth · Rev up Revenue</span><span>agoragrowth.com · 2/2</span></div></div>')
        : '<div class="pdf-foot"><span>Agora Growth · Rev up Revenue</span><span>agoragrowth.com · 2/2</span></div>') +
      '</div>';

    return p1 + p2;
  }

  function fitPage(page) {
    var body = page.querySelector('.pdf-body');
    var cta = page.querySelector('.pdf-cta');
    var limit = page.clientHeight - (cta ? cta.offsetHeight + 16 : 70);
    var h = body.offsetTop + body.scrollHeight;
    if (h > limit) {
      var k = Math.max(0.7, (limit - body.offsetTop) / body.scrollHeight);
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
        pdf.setProperties({ title: 'Offer Diagnostic · Agora Growth', author: 'Agora Growth', subject: 'Value Equation Score', creator: 'agoragrowth.com' });
        var PW = pdf.internal.pageSize.getWidth(), PH = pdf.internal.pageSize.getHeight(), k = PW / 794;
        var chain = Promise.resolve();
        pages.forEach(function (page, idx) {
          chain = chain.then(function () {
            return window.html2canvas(page, { scale: 2, backgroundColor: '#f3f3f3', useCORS: true, logging: false, width: 794, height: 1123, windowWidth: 1200 })
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
  window.AG_LM2 = { mount: mount, version: VERSION };
})();
