/*! Agora Growth · Lead Magnet 1 · Encuentra tu Starving Crowd · v1.1
 *  Se monta solo dentro de <div id="ag-lm1"></div>.
 *  Configuración: define window.AG_LM1_CONFIG ANTES de cargar este script (ver DEFAULTS abajo).
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
      a: { headline: '¿En qué industria deberías enfocarte?', accent: 'Encuentra a tu Starving Crowd.' },
      b: { headline: 'Deja de venderle a todos.', accent: 'Descubre cuál es tu cliente ideal real.' },
      c: { headline: 'El diagnóstico que te dice a quién sí perseguir', accent: '(y a quién dejar de perseguir).' }
    },
    sub: 'Compara hasta 3 segmentos en 2 minutos. Descubre cuál es tu verdadero Starving Crowd — y por qué.',
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

  /* ===================== CONTENIDO: LOS 5 CRITERIOS ===================== */
  // El orden de PRIORITY decide desempates (qué pesa más cuando hay empate de puntos
  // y qué criterio se reporta como "más débil" cuando dos tienen la misma calificación).
  var PRIORITY = ['dolor', 'pago', 'busqueda', 'acceso', 'competencia'];

  var CRITERIA = [
    {
      id: 'dolor', short: 'Dolor', name: 'Dolor urgente y caro',
      q: '¿Qué tan urgente y caro es el problema que les resuelves?',
      lo: 'Es un “nice to have”. Viven bien sin resolverlo.',
      hi: 'Les cuesta dinero cada mes y lo quieren resolver ya.',
      strong: 'dolor urgente y caro', weak: 'el problema no les urge',
      weakTitle: 'El problema no les urge',
      explain: 'Si el problema no les duele hoy, cada venta exige convencer primero. Eso alarga los ciclos y baja tu tasa de cierre, por buena que sea tu solución.',
      action: 'Llama a 5 clientes o prospectos de {seg} y pregúntales cuánto les cuesta hoy ese problema al mes. Si nadie puede ponerle una cifra, no es un dolor urgente.'
    },
    {
      id: 'busqueda', short: 'Búsqueda', name: 'Búsqueda activa de solución',
      q: '¿Qué tanto están buscando ya una solución?',
      lo: 'Hay que convencerlos de que tienen el problema.',
      hi: 'Ya cotizan, preguntan o prueban alternativas.',
      strong: 'ya buscan una solución', weak: 'no están buscando solución',
      weakTitle: 'No están buscando solución',
      explain: 'Venderle a quien no está buscando significa educar al mercado antes de vender. Se puede, pero es lento y caro, y otro puede cosechar lo que tú sembraste.',
      action: 'Revisa tus últimas 10 oportunidades con {seg}: ¿cuántas llegaron pidiendo ayuda y cuántas tuviste que provocar tú? Ese número es tu termómetro real de demanda.'
    },
    {
      id: 'pago', short: 'Pago', name: 'Capacidad de pago real',
      q: '¿Pueden pagar lo que vale tu solución sin regatear?',
      lo: 'Presupuesto mínimo. Todo se decide por precio.',
      hi: 'Tienen presupuesto y pagan bien por resultados.',
      strong: 'alta capacidad de pago', weak: 'poca capacidad de pago',
      weakTitle: 'Poca capacidad de pago',
      explain: 'Un segmento con dolor pero sin presupuesto te dice que sí… y luego pide descuento. Trabajas igual de duro por mucho menos margen.',
      action: 'Revisa tus últimas 5 ventas a {seg}: ticket promedio y descuento que diste. Si casi todas cerraron con descuento, el precio está haciendo el trabajo que debería hacer el valor.'
    },
    {
      id: 'acceso', short: 'Acceso', name: 'Facilidad de acceso',
      q: '¿Qué tan fácil es llegar a quien decide la compra?',
      lo: 'No sabemos quién decide ni dónde encontrarlo.',
      hi: 'Lo ubicamos fácil: listas, eventos, asociaciones, contactos.',
      strong: 'fácil acceso a quien decide', weak: 'es difícil llegar a quien decide',
      weakTitle: 'Es difícil llegar a quien decide',
      explain: 'Si no puedes encontrar y contactar a quien decide, tu costo de adquisición se dispara. Un buen mercado al que no puedes llegar es, en la práctica, un mal mercado.',
      action: 'Date 30 minutos para armar una lista de 20 personas que deciden la compra en {seg}, con nombre, cargo y forma de contacto. Si no llegas a 20, ese es tu cuello de botella.'
    },
    {
      id: 'competencia', short: 'Competencia', name: 'Poca competencia relevante',
      q: '¿Qué tan solo estás en ese mercado?',
      lo: 'Muchos les venden lo mismo y se compite por precio (Red Ocean).',
      hi: 'Casi nadie les resuelve esto bien (Blue Ocean).',
      strong: 'poca competencia (Blue Ocean)', weak: 'mercado saturado (Red Ocean)',
      weakTitle: 'Mercado saturado (Red Ocean)',
      explain: 'Con muchas opciones parecidas, el cliente compara por precio. No es razón para descartar el segmento, pero necesitas una oferta claramente distinta para no entrar a la guerra de descuentos.',
      action: 'Busca a tus 3 competidores más comunes en {seg} y escribe en una línea qué promete cada uno. Si tu promesa suena igual, el problema no es el mercado: es tu diferenciación.'
    }
  ];
  var CRIT = {};
  CRITERIA.forEach(function (c) { CRIT[c.id] = c; });

  var PLACEHOLDERS = ['Ej. Despachos de abogados', 'Ej. Clínicas privadas', 'Ej. Constructoras medianas'];

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
    try { return new Intl.DateTimeFormat('es-MX', merge({ timeZone: CFG.sprint.timeZone }, opts)).format(d).replace(/^(\S+),/, '$1'); }
    catch (e) { return d.toLocaleDateString(); }
  }
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[data-aglm-src="' + src + '"]');
      if (existing && existing.getAttribute('data-loaded')) return resolve();
      var s = existing || document.createElement('script');
      s.src = src; s.async = true; s.setAttribute('data-aglm-src', src);
      s.onload = function () { s.setAttribute('data-loaded', '1'); resolve(); };
      s.onerror = function () { reject(new Error('No se pudo cargar ' + src)); };
      if (!existing) document.head.appendChild(s);
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
    var payload = merge({ tool: CFG.tool, variant: variantKey }, props || {});
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
    if (t >= 16) return { id: 'warm', label: 'Prometedor' };
    if (t >= 11) return { id: 'mild', label: 'Tibio' };
    return { id: 'cold', label: 'Frío' };
  }
  function summary(s) {
    var vals = CRITERIA.map(function (c) { return s.r[c.id]; });
    var mn = Math.min.apply(null, vals), mx = Math.max.apply(null, vals);
    if (mn >= 4) return 'Sólido en los 5 criterios: no tiene un punto débil real.';
    if (mx <= 2) return 'Débil en casi todos los criterios: hoy no es un mercado prioritario.';
    if (mx <= 3) return 'Sin un punto fuerte claro; lo que más lo frena: ' + CRIT[s.weakest].weak + '.';
    return cap(CRIT[s.strongest].strong) + ', pero ' + CRIT[s.weakest].weak + '.';
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
      v.title = 'Ninguno es un Starving Crowd (todavía)';
      v.text = 'Tu mejor segmento, ' + W.name + ', suma ' + W.total + '/25. Ninguno combina suficiente dolor, búsqueda y capacidad de pago. Antes de redoblar esfuerzos en estos, vale la pena evaluar segmentos nuevos.';
    } else if (W.deal) {
      var dc = CRIT[W.deal];
      v.type = 'alert';
      v.title = 'Tu mejor opción hoy: ' + W.name + ', con una alerta';
      v.text = 'Es el que más puntos suma (' + W.total + '/25), pero calificaste «' + dc.name.toLowerCase() + '» con ' + W.r[W.deal] + '/5. Sin ' + (W.deal === 'dolor' ? 'un dolor urgente' : 'capacidad de pago') + ', un mercado no es un Starving Crowd aunque el total se vea bien. Valida ese punto antes de invertir más en él.';
    } else if (margin <= 2) {
      v.type = 'close';
      if (margin === 0) {
        v.title = 'Empate técnico: ' + W.name + ' y ' + S2.name;
        v.text = 'Los dos suman ' + W.total + '/25. Desempatamos por dolor y capacidad de pago, y gana ' + W.name + ' por poco. Antes de comprometerte, valida esta semana el punto más débil de cada uno.';
      } else {
        v.title = 'Ganador por poco margen: ' + W.name;
        v.text = 'Solo ' + margin + (margin === 1 ? ' punto separa' : ' puntos separan') + ' a ' + W.name + ' (' + W.total + '/25) de ' + S2.name + ' (' + S2.total + '/25). Es una señal, no una sentencia: valida esta semana el punto más débil de los dos antes de comprometerte.';
      }
    } else if (W.total >= 18) {
      v.type = 'clear';
      v.title = 'Tu Starving Crowd: ' + W.name;
      v.text = 'Con ' + W.total + '/25, supera a ' + S2.name + ' por ' + margin + ' puntos. Destaca por ' + CRIT[W.strongest].strong + '. Ahí es donde cada hora de prospección te rinde más.';
    } else {
      v.type = 'moderate';
      v.title = 'Tu mejor opción: ' + W.name;
      v.text = 'Gana con ' + W.total + '/25 y le saca ' + margin + ' puntos a ' + S2.name + ', pero todavía no es un Starving Crowd pleno: lo frena que ' + CRIT[W.weakest].weak + '. Si resuelves eso, lo conviertes en tu mercado principal.';
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
          var line = 'Próxima cohorte: ' + fmtDate(k, { weekday: 'long', day: 'numeric', month: 'long' }) +
            ' · Máximo ' + sp.seatsTotal + ' participantes · Inscripciones cierran el ' +
            fmtDate(close, { weekday: 'long', day: 'numeric', month: 'long' }) + ' o antes, si se llena el cupo.';
          if (typeof sp.seatsLeft === 'number' && sp.seatsLeft >= 0) line += ' Quedan ' + sp.seatsLeft + ' lugares.';
          return { open: true, url: sp.url, label: 'Reserva tu lugar en el Sprint Ejecutivo', line: line };
        }
      }
    }
    return {
      open: false, url: sp.waitlistUrl || sp.url, label: 'Únete a la lista de la próxima cohorte',
      line: 'Cada cohorte tiene máximo ' + sp.seatsTotal + ' participantes. Quienes están en la lista se enteran primero cuando abrimos inscripciones.'
    };
  }

  function nextText(v) {
    if (v.type === 'none') {
      return 'Antes de construir una oferta necesitas un mercado que valga la pena. En el Sprint Ejecutivo lo definimos contigo en el Blueprint 1 (Dónde Jugar), con datos y no con intuición, y en la misma semana armas la oferta y los canales para ese mercado.';
    }
    return 'Tu mercado ya tiene nombre: ' + v.winner.name + '. Ahora toca armar una oferta que no puedan rechazar y un sistema que te traiga prospectos de ese segmento cada semana. Eso construyes en el Sprint Ejecutivo: un sistema de growth en 5 días que incluye los Blueprints 2 (Empaque de la Oferta) y 3 (Canales de Demanda).';
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
    root.setAttribute('lang', 'es-MX');
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
      '<span class="aglm-pill">' + (CFG.showCta ? 'Diagnóstico gratuito · 2 min' : 'Diagnóstico · 2 min') + '</span>' +
      '<h1 class="aglm-h1">' + esc(VARIANT.headline) + '<span>' + esc(VARIANT.accent) + '</span></h1>' +
      '<p class="aglm-lead">' + esc(CFG.sub) + '</p>' +
      '<ul class="aglm-checks"><li>Compara 2 o 3 industrias o tipos de cliente</li><li>5 criterios objetivos, no intuición</li><li>Resultado al instante, sin registrarte</li></ul>' +
      '<div class="aglm-actions"><button type="button" class="aglm-btn" data-act="start">Empezar mi diagnóstico</button></div>'
    );
  }

  function renderSegments() {
    var f = '';
    for (var i = 0; i < 3; i++) {
      f += '<label class="aglm-field"><span class="aglm-field-label">Segmento ' + (i + 1) + (i === 2 ? ' <em>(opcional)</em>' : '') + '</span>' +
        '<input class="aglm-input" type="text" maxlength="50" autocomplete="off" data-seg="' + i + '" value="' + esc(S.segments[i]) + '" placeholder="' + PLACEHOLDERS[i] + '"></label>';
    }
    show(
      '<div class="aglm-top"><button type="button" class="aglm-link" data-act="home">← Atrás</button><span class="aglm-count">Paso 1 de 6</span></div>' +
      '<div class="aglm-progress"><span style="width:' + (100 / 6).toFixed(1) + '%"></span></div>' +
      '<h2 class="aglm-h2">¿Entre qué segmentos estás dudando?</h2>' +
      '<p class="aglm-lead" style="margin-top:10px">Escribe 2 o 3 industrias o tipos de cliente que ya atiendes o estás considerando.</p>' +
      f +
      '<div class="aglm-actions"><button type="button" class="aglm-btn" data-act="segments-next"' + (filled().length < 2 ? ' disabled' : '') + '>Continuar</button>' +
      '<p class="aglm-small" style="text-align:center">Tip: entre más específico, mejor. «Clínicas dentales en Guadalajara» dice más que «Salud».</p></div>',
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
        btns += '<button type="button" class="aglm-opt" role="radio" aria-checked="' + (val === n) + '" aria-label="' + n + ' de 5" data-act="rate" data-seg="' + i + '" data-val="' + n + '">' + n + '</button>';
      }
      return '<div class="aglm-row' + (val ? ' is-done' : '') + '"><div class="aglm-rowname">' + esc(name) + '</div>' +
        '<div class="aglm-scale" role="radiogroup" aria-label="' + esc(c.name + ' para ' + name) + '">' + btns + '</div></div>';
    }).join('');
    var complete = critComplete();
    show(
      '<div class="aglm-top"><button type="button" class="aglm-link" data-act="back">← Atrás</button><span class="aglm-count">Paso ' + step + ' de 6</span></div>' +
      '<div class="aglm-progress"><span style="width:' + (step / 6 * 100).toFixed(1) + '%"></span></div>' +
      '<span class="aglm-pill aglm-pill--ink">Criterio ' + (S.crit + 1) + ' de 5 · ' + esc(c.short) + '</span>' +
      '<h2 class="aglm-h2" style="margin-top:14px">' + esc(c.q) + '</h2>' +
      '<div class="aglm-anchors"><div><b>1</b><span>' + esc(c.lo) + '</span></div><div><b>5</b><span>' + esc(c.hi) + '</span></div></div>' +
      '<div class="aglm-rows">' + rows + '</div>' +
      '<div class="aglm-actions"><button type="button" class="aglm-btn" data-act="crit-next"' + (complete ? '' : ' disabled') + '>' + (S.crit === 4 ? 'Ver mi resultado' : 'Siguiente') + '</button></div>'
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
    weakTitle: 'Sin punto débil real',
    explain: 'Todos sus criterios están en 4 o 5. Aquí no hace falta validar más: lo que falta es enfoque.',
    action: 'Haz una lista de los 20 prospectos de {seg} con más potencial y agenda al menos 5 conversaciones. Mide cuántas terminan en propuesta: ese es tu punto de partida.'
  };
  function isSolid(s) { return s.r[s.weakest] >= 4; }
  function weakInfo(s) { return isSolid(s) ? SOLID : CRIT[s.weakest]; }
  function weakLabel(s) { var c = weakInfo(s); return isSolid(s) ? c.weakTitle : 'Punto más débil: ' + c.weakTitle + ' · ' + s.r[s.weakest] + '/5'; }
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
        '<div class="aglm-do"><b>Esta semana</b>' + esc(actionFor(s)) + '</div></div>';
    }).join('');

    var stop = v.stop ? (
      '<div class="aglm-sec"><span class="aglm-pill aglm-pill--ink">A quién dejar de perseguir</span>' +
      '<div class="aglm-card aglm-stop" style="margin-top:14px"><h3 class="aglm-h3">' + esc(v.stop.name) + ' · ' + v.stop.total + '/25</h3>' +
      '<p class="aglm-muted">' + esc(v.stop.summary) + ' Cada hora que le dedicas es una hora que no le das a ' + esc(W.name) + '. No tienes que cerrarle la puerta, pero deja de buscarlo activamente por ahora.</p></div></div>'
    ) : '';

    var pdf = S.pdfUrl ? pdfDoneHtml() : (
      '<form class="aglm-pdfcard" novalidate data-form="lead">' +
      '<span class="aglm-pill">Tu diagnóstico en PDF</span>' +
      '<h2 class="aglm-h2" style="margin-top:14px">Llévate el diagnóstico completo</h2>' +
      '<ul><li>El ranking con el desglose de cada segmento</li><li>Qué significa el punto débil de <strong>cada</strong> segmento</li><li>Una acción concreta por segmento para esta semana</li></ul>' +
      '<label class="aglm-field"><span class="aglm-field-label">Tu nombre</span><input class="aglm-input" name="name" type="text" autocomplete="given-name" maxlength="60" required></label>' +
      '<label class="aglm-field"><span class="aglm-field-label">Tu correo</span><input class="aglm-input" name="email" type="email" inputmode="email" autocomplete="email" maxlength="120" required></label>' +
      '<label class="aglm-field"><span class="aglm-field-label">Empresa <em>(opcional)</em></span><input class="aglm-input" name="company" type="text" autocomplete="organization" maxlength="80"></label>' +
      '<input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">' +
      '<p class="aglm-err" data-err></p>' +
      '<div class="aglm-actions" style="margin-top:16px"><button type="submit" class="aglm-btn" data-pdf-btn>Descargar mi diagnóstico en PDF</button></div>' +
      '<p class="aglm-legal">Al descargar aceptas nuestro <a href="' + esc(CFG.privacyUrl) + '" target="_blank" rel="noopener">aviso de privacidad</a>. Cero spam.</p>' +
      '</form>'
    );

    show(
      '<div class="aglm-verdict"><span class="aglm-pill aglm-pill--lime">Tu resultado</span>' +
      '<h2 class="aglm-h2">' + esc(v.title) + '</h2>' +
      '<div class="aglm-score"><b>' + W.total + '</b><span>/ 25 puntos</span></div>' +
      '<p>' + esc(v.text) + '</p>' +
      '<button type="button" class="aglm-jump" data-act="jump-pdf">Recibe el diagnóstico completo en PDF ↓</button></div>' +

      '<div class="aglm-sec"><span class="aglm-pill">El ranking</span><h2 class="aglm-h2">Así quedaron tus segmentos</h2>' + segs +
      '<p class="aglm-small" style="margin-top:10px">En rojo, el criterio más débil de cada segmento. Desempate: dolor, luego capacidad de pago.</p></div>' +

      '<div class="aglm-sec"><span class="aglm-pill">Tu siguiente paso</span><h2 class="aglm-h2">' + (focus.length > 1 ? 'Valida esto antes de decidir' : (isSolid(W) ? 'Ahora, enfócate' : 'Lo que tienes que validar')) + '</h2>' + steps + '</div>' +

      stop +

      '<div class="aglm-sec" data-pdf-sec>' + pdf + '</div>' +

      (CFG.showCta ? (
      '<div class="aglm-sec"><div class="aglm-cta"><span class="aglm-pill aglm-pill--lime">Lo que sigue</span>' +
      '<h2 class="aglm-h2">' + (v.type === 'none' ? 'Encuentra el mercado correcto, y véndele.' : 'Ya sabes a quién perseguir. Ahora, ¿cómo le vendes?') + '</h2>' +
      '<p>' + esc(nextText(v)) + '</p>' +
      '<div class="aglm-actions" style="margin-top:20px"><a class="aglm-btn aglm-btn--lime" href="' + esc(sp.url) + '" target="_blank" rel="noopener" data-act="cta">' + esc(sp.label) + '</a></div>' +
      '<p class="aglm-urg">' + esc(sp.line) + '</p></div></div>') : '') +

      '<div class="aglm-restart"><button type="button" class="aglm-link" data-act="restart">Evaluar otros segmentos</button></div>'
    );
  }

  function pdfDoneHtml() {
    return '<div class="aglm-pdfcard"><div class="aglm-ok"><h3 class="aglm-h3">Listo, ' + esc(S.lead.name.split(' ')[0]) + '. Tu diagnóstico se descargó.</h3>' +
      '<p class="aglm-muted" style="font-size:15px">¿No lo ves? Ábrelo desde aquí:</p></div>' +
      '<div class="aglm-actions" style="margin-top:14px"><a class="aglm-btn" href="' + S.pdfUrl + '" target="_blank" rel="noopener" download="' + esc(pdfName()) + '" data-act="pdf-open">Abrir mi PDF</a></div></div>';
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
    if (!name) { F['name'].classList.add('is-error'); err.textContent = 'Escribe tu nombre para personalizar el PDF.'; F['name'].focus(); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { F['email'].classList.add('is-error'); err.textContent = 'Revisa tu correo, parece incompleto.'; F['email'].focus(); return; }

    S.lead = { name: name, email: email, company: company };
    if (!F['website'].value) sendLead(); // honeypot: los bots llenan este campo oculto
    track('ag_lm1_lead');

    var btn = form.querySelector('[data-pdf-btn]');
    S.busy = true;
    btn.disabled = true;
    btn.innerHTML = '<span class="aglm-spin"></span> Generando tu PDF…';

    makePdf().then(function (url) {
      S.busy = false;
      S.pdfUrl = url;
      track('ag_lm1_pdf_download');
      var sec = shell.querySelector('[data-pdf-sec]');
      if (sec) sec.innerHTML = pdfDoneHtml();
    }).catch(function (ex) {
      S.busy = false;
      btn.disabled = false;
      btn.textContent = 'Intentar de nuevo';
      err.textContent = 'No pudimos generar el PDF en este navegador. Intenta de nuevo o ábrelo desde una computadora.';
      track('ag_lm1_pdf_error', { message: String(ex && ex.message || ex).slice(0, 120) });
      if (window.console) console.error('[AG LM1]', ex);
    });
  }

  function sendLead() {
    if (!CFG.endpoint) return;
    var res = S.result, v = res.verdict;
    var payload = {
      tool: CFG.tool, variant: variantKey, submitted_at: new Date().toISOString(),
      name: S.lead.name, email: S.lead.email, company: S.lead.company,
      verdict: v.type, verdict_title: v.title,
      winner: v.winner.name, winner_score: v.winner.total, winner_weakest: v.winner.weakest,
      segments: res.ranked.map(function (s) {
        return { rank: s.rank, name: s.name, total: s.total, band: s.band.label, weakest: s.weakest, strongest: s.strongest, scores: s.r };
      }),
      page: window.location.href.split('#')[0], referrer: document.referrer || '', utm: utm()
    };
    try {
      // text/plain evita el preflight CORS; Apps Script lo lee en e.postData.contents
      fetch(CFG.endpoint, { method: 'POST', mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) })
        .catch(function () { });
    } catch (e) { }
  }

  function pdfName() {
    return 'Diagnostico-Starving-Crowd' + (S.lead && S.lead.name ? '-' + slug(S.lead.name) : '') + '.pdf';
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
      '<span class="aglm-pill aglm-pill--lime">Diagnóstico · Starving Crowd</span>' +
      '<h1>' + esc(v.title) + '</h1>' +
      '<p class="pdf-meta">Preparado para ' + who + ' · ' + esc(date) + '</p></div>' +
      '<div class="pdf-body">' +
      '<div class="pdf-verdict"><div class="n">' + W.total + '<small>/25</small></div><p>' + esc(v.text) + '</p></div>' +
      '<h2 class="pdf-h2">El ranking</h2>' + segs +
      '<p style="font-size:12px;color:#5b5f6a;margin-top:10px">En rojo, el criterio más débil de cada segmento. Escala de 1 a 5 por criterio; máximo 25 puntos. Desempate: dolor, luego capacidad de pago.</p>' +
      '</div>' +
      '<div class="pdf-foot"><span>Agora Growth · Rev up Revenue</span><span>agoragrowth.com · 1/2</span></div></div>';

    var plans = res.ranked.map(function (s) {
      var c = weakInfo(s);
      return '<div class="pdf-plan"><h3>' + s.rank + '. ' + esc(s.name) + ' <span style="font-weight:400;color:#5b5f6a">· ' + s.total + '/25</span></h3>' +
        '<div class="w"' + (isSolid(s) ? ' style="color:#1a11f7"' : '') + '>' + esc(weakLabel(s)) + '</div>' +
        '<p>' + esc(c.explain) + '</p>' +
        '<div class="do"><b>Esta semana:</b> ' + esc(actionFor(s)) + '</div></div>';
    }).join('');

    var stop = v.stop ? '<p style="font-size:13.5px;margin-top:12px"><b>A quién dejar de perseguir (por ahora):</b> ' + esc(v.stop.name) +
      ' (' + v.stop.total + '/25). Cada hora que le dedicas es una hora que no le das a ' + esc(W.name) + '.</p>' : '';

    var crit = CRITERIA.map(function (c) {
      return '<b>' + esc(c.name) + '</b><span>1 = ' + esc(c.lo) + ' · 5 = ' + esc(c.hi) + '</span>';
    }).join('');

    var p2 =
      '<div class="pdf-page" data-page="2">' +
      '<div class="pdf-body" style="padding-top:44px">' +
      '<span class="aglm-pill">Tu plan</span>' +
      '<h2 class="pdf-h2" style="margin-top:14px">Qué hacer con este resultado</h2>' +
      plans + stop +
      '<h2 class="pdf-h2" style="font-size:20px;margin:20px 0 4px">Cómo se calculó</h2>' +
      '<div class="pdf-crit">' + crit + '</div>' +
      '</div>' +
      (CFG.showCta ? (
      '<div class="pdf-cta"><span class="aglm-pill aglm-pill--lime">Lo que sigue</span>' +
      '<h2>' + (v.type === 'none' ? 'Encuentra el mercado correcto, y véndele.' : 'Ya sabes a quién perseguir. Ahora, ¿cómo le vendes?') + '</h2>' +
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
        if (!jsPDF || !window.html2canvas) throw new Error('Librerías de PDF no disponibles');
        var pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4', compress: true });
        pdf.setProperties({ title: 'Diagnóstico Starving Crowd · Agora Growth', author: 'Agora Growth', subject: 'Encuentra tu Starving Crowd', creator: 'agoragrowth.com' });
        var PW = pdf.internal.pageSize.getWidth(), PH = pdf.internal.pageSize.getHeight(), k = PW / 794;
        var scale = 2;
        var chain = Promise.resolve();
        pages.forEach(function (page, idx) {
          chain = chain.then(function () {
            return window.html2canvas(page, { scale: scale, backgroundColor: '#f3f3f3', useCORS: true, logging: false, width: 794, height: 1123, windowWidth: 1200 })
              .then(function (canvas) {
                if (idx > 0) pdf.addPage();
                pdf.addImage(canvas.toDataURL('image/jpeg', 0.9), 'JPEG', 0, 0, PW, PH, undefined, 'FAST');
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
          return url;
        });
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
  window.AG_LM1 = { mount: mount, version: '1.1' };
})();
