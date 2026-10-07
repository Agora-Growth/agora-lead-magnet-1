/*! Agora Growth · Lead Magnet 3 · Tu mezcla de Seeds, Nets y Spears · v1.0
 *  Se monta solo dentro de <div id="ag-lm3"></div>.
 *  Configuración: define window.AG_LM3_CONFIG ANTES de cargar este script (ver DEFAULTS abajo).
 */
(function () {
  'use strict';

  /* ===================== CONFIGURACIÓN ===================== */
  var DEFAULTS = {
    mountId: 'ag-lm3',
    tool: 'lm3_mezcla_canales',
    // URL del Apps Script publicado como Web App (doPost). Vacío = no se envía nada.
    endpoint: '',
    privacyUrl: 'https://www.agoragrowth.com/privacy-policy',
    // Variante de naming por defecto. También se puede forzar con ?v=a|b|c en la URL.
    variant: 'a',
    variants: {
      a: { headline: '¿Cuál es tu mezcla ideal de', accent: 'Seeds, Nets y Spears?' },
      b: { headline: 'Deja de copiar la estrategia de leads de otra empresa.', accent: 'Descubre la tuya.' },
      c: { headline: 'El diagnóstico de 5 preguntas que te dice', accent: 'dónde enfocar tu tiempo esta semana.' }
    },
    sub: 'Basado en el framework de Predictable Revenue de Aaron Ross, adaptado a tu etapa.',
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
  var CFG = merge(DEFAULTS, window.AG_LM3_CONFIG);
  var VERSION = '1.0';
  var EV = 'ag_lm3_'; // prefijo de eventos de analytics

  /* ===================== CONTENIDO ===================== */
  // Canales de Predictable Revenue (Aaron Ross). Los porcentajes por etapa son el marco de Agora Growth.
  var CH = {
    seeds: { name: 'Seeds', es: 'Referidos y red', desc: 'Clientes actuales, referidos, tu red de contactos y alianzas.', color: '#cbff8b', ink: '#000919' },
    nets: { name: 'Nets', es: 'Inbound', desc: 'Contenido, lead magnets, anuncios y eventos que atraen a muchos a la vez.', color: '#1a11f7', ink: '#ffffff' },
    spears: { name: 'Spears', es: 'Outbound', desc: 'Prospección directa a cuentas que tú eliges: mensajes, llamadas y correos.', color: '#000919', ink: '#ffffff' }
  };
  var CH_ORDER = ['seeds', 'nets', 'spears'];
  var MAIN_PRIORITY = ['seeds', 'spears', 'nets']; // desempate del canal principal

  // Punto de partida por etapa (orden Seeds / Spears / Nets): 60/30/10 → 40/40/20 → 30/40/30.
  var STAGES = {
    temprana: { label: 'Etapa temprana', short: 'temprana', base: { seeds: 60, spears: 30, nets: 10 },
      next: 'Cuando tengas más de 20 clientes activos o tu proceso de venta ya no dependa solo de tu red, pasa a la mezcla de crecimiento: Seeds 40% · Spears 40% · Nets 20%.' },
    crecimiento: { label: 'Etapa de crecimiento', short: 'de crecimiento', base: { seeds: 40, spears: 40, nets: 20 },
      next: 'Cuando tengas a alguien dedicado a prospectar y contenido constante funcionando, pasa a la mezcla de escala: Seeds 30% · Spears 40% · Nets 30%.' },
    escala: { label: 'Etapa de escala', short: 'de escala', base: { seeds: 30, spears: 40, nets: 30 },
      next: 'Ya estás en la mezcla de escala. El siguiente paso no es cambiar los porcentajes sino medir cada canal: costo por lead y tasa de cierre por canal, cada mes.' }
  };
  var STAGE_BY_CLIENTS = ['temprana', 'crecimiento', 'crecimiento', 'escala'];
  var HOURS = [2, 4, 8, 12];

  // 5 preguntas. Cada opción ajusta la mezcla base (d = puntos porcentuales) y explica por qué (r).
  var QUESTIONS = [
    {
      id: 'q1', key: 'clientes', label: 'Clientes activos',
      q: '¿Cuántos clientes activos tienes hoy?',
      opts: [
        { t: 'Entre 0 y 5.', d: {} },
        { t: 'Entre 6 y 20.', d: {} },
        { t: 'Entre 21 y 50.', d: {} },
        { t: 'Más de 50.', d: {} }
      ]
    },
    {
      id: 'q2', key: 'marketing', label: 'Capacidad de marketing',
      q: '¿Qué capacidad tienes hoy para hacer contenido o marketing?',
      opts: [
        { t: 'Ninguna: no publicamos nada.', d: { nets: -10 }, r: 'Hoy no tienes quién haga contenido: el inbound tardaría meses en dar frutos, así que pesa menos.' },
        { t: 'Publico de vez en cuando, sin constancia.', d: { nets: -5 }, r: 'Publicas sin constancia: el inbound todavía no puede cargar con tu demanda.' },
        { t: 'Publicamos con constancia (cada semana), sin presupuesto de anuncios.', d: { nets: 5 }, r: 'Ya publicas con constancia: vale la pena convertir ese contenido en leads.' },
        { t: 'Tenemos a alguien (o agencia) y presupuesto para contenido y anuncios.', d: { nets: 10 }, r: 'Tienes capacidad y presupuesto de marketing: el inbound puede pesar más.' }
      ]
    },
    {
      id: 'q3', key: 'red', label: 'Red de contactos',
      q: '¿Qué tan fuerte es tu red de contactos en tu mercado?',
      opts: [
        { t: 'Pequeña: casi no tengo contactos en mi industria.', d: { seeds: -25, spears: 20 }, r: 'Tu red es pequeña: todavía no puedes depender de referidos, así que la prospección directa tiene que cargar con más peso.' },
        { t: 'Tengo algunos contactos, pero poco cultivados.', d: { seeds: -5 }, r: 'Tu red existe, pero está fría: hay que reactivarla antes de que rinda.' },
        { t: 'Buena: decenas de personas en mi industria confían en mí.', d: { seeds: 5 }, r: 'Tienes una buena red: es tu canal más barato y más rápido de activar.' },
        { t: 'Muy fuerte: clientes, aliados y contactos ya me refieren.', d: { seeds: 10 }, r: 'Tu red y tus clientes ya te refieren: es tu mejor activo comercial.' }
      ]
    },
    {
      id: 'q4', key: 'venta', label: 'Tipo de venta',
      q: '¿Cómo es tu venta típica?',
      opts: [
        { t: 'Muchos clientes de ticket bajo (venta rápida, por volumen).', d: { nets: 10, spears: -10 }, r: 'Vendes volumen a ticket bajo: el outbound uno a uno no da los números; el inbound sí escala.' },
        { t: 'Ticket medio, con ciclos de venta de algunas semanas.', d: {} },
        { t: 'Ticket alto, pocas cuentas, ciclos de meses.', d: { spears: 5, nets: -5 }, r: 'Vendes ticket alto a pocas cuentas: elegir a quién perseguir rinde más que esperar a que lleguen.' },
        { t: 'Cuentas grandes muy específicas (hay pocas decenas en todo el mercado).', d: { spears: 10, nets: -10 }, r: 'Le vendes a pocas cuentas muy específicas: el outbound dirigido, cuenta por cuenta, es tu canal natural.' }
      ]
    },
    {
      id: 'q5', key: 'tiempo', label: 'Tiempo para prospectar',
      q: '¿Cuánto tiempo a la semana puedes dedicar tú (o tu equipo) a conseguir clientes nuevos?',
      opts: [
        { t: 'Menos de 2 horas.', d: { spears: -10, seeds: 5 }, r: 'Tienes muy poco tiempo para prospectar: el outbound necesita constancia, así que pesa menos hasta que liberes agenda.' },
        { t: 'Entre 2 y 5 horas.', d: { spears: -5 }, r: 'Tu tiempo para prospectar es limitado: el outbound se mantiene, pero acotado.' },
        { t: 'Entre 5 y 10 horas.', d: { spears: 5 }, r: 'Tienes tiempo real para prospectar: el outbound puede pesar más.' },
        { t: 'Más de 10 horas, o tengo a alguien dedicado a prospectar.', d: { spears: 10 }, r: 'Tienes tiempo o a alguien dedicado: el outbound puede ser un motor constante.' }
      ]
    }
  ];
  var LETTERS = ['A', 'B', 'C', 'D'];
  var CLIENTS_TXT = ['entre 0 y 5', 'entre 6 y 20', 'entre 21 y 50', 'más de 50'];

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
    try { return new Intl.DateTimeFormat('es-MX', merge({ timeZone: CFG.sprint.timeZone }, opts)).format(d).replace(/^(\S+),/, '$1'); }
    catch (e) { return d.toLocaleDateString(); }
  }
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[data-aglm-src="' + src + '"]');
      if (existing && existing.getAttribute('data-loaded')) return resolve();
      if (existing) {
        existing.addEventListener('load', function () { resolve(); });
        existing.addEventListener('error', function () { reject(new Error('No se pudo cargar ' + src)); });
        return;
      }
      var s = document.createElement('script');
      s.src = src; s.async = true; s.setAttribute('data-aglm-src', src);
      s.onload = function () { s.setAttribute('data-loaded', '1'); resolve(); };
      s.onerror = function () { if (s.parentNode) s.parentNode.removeChild(s); reject(new Error('No se pudo cargar ' + src)); };
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
    var payload = merge({ tool: CFG.tool, variant: variantKey }, props || {});
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
  function round5(x) { return Math.round(x / 5) * 5; }

  function compute() {
    var A = S.answers;
    var stageKey = STAGE_BY_CLIENTS[A[0]], stage = STAGES[stageKey];
    var raw = { seeds: stage.base.seeds, nets: stage.base.nets, spears: stage.base.spears };
    var reasons = ['Con ' + CLIENTS_TXT[A[0]] + ' clientes activos estás en la ' + stage.label.toLowerCase() + ': el punto de partida es Seeds ' +
      stage.base.seeds + '% · Spears ' + stage.base.spears + '% · Nets ' + stage.base.nets + '%.'];
    for (var i = 1; i < QUESTIONS.length; i++) {
      var o = QUESTIONS[i].opts[A[i]];
      Object.keys(o.d).forEach(function (k) { raw[k] += o.d[k]; });
      if (o.r) reasons.push(o.r);
    }
    // Mínimo 5% por canal, normalizado a 100 y redondeado a múltiplos de 5.
    var total = 0;
    CH_ORDER.forEach(function (k) { raw[k] = Math.max(5, raw[k]); total += raw[k]; });
    var mix = {}, sum = 0;
    CH_ORDER.forEach(function (k) { mix[k] = Math.max(5, round5(raw[k] / total * 100)); sum += mix[k]; });
    var main = MAIN_PRIORITY.slice().sort(function (a, b) { return mix[b] - mix[a] || MAIN_PRIORITY.indexOf(a) - MAIN_PRIORITY.indexOf(b); })[0];
    mix[main] += 100 - sum; // el redondeo lo absorbe el canal principal

    var hours = HOURS[A[4]];
    var hrs = {};
    CH_ORDER.forEach(function (k) { var h = hours * mix[k] / 100; hrs[k] = h < 0.75 ? h : Math.round(h * 2) / 2; });

    var ranked = CH_ORDER.slice().sort(function (a, b) { return mix[b] - mix[a] || MAIN_PRIORITY.indexOf(a) - MAIN_PRIORITY.indexOf(b); });
    return { stageKey: stageKey, stage: stage, mix: mix, main: main, ranked: ranked, hours: hours, hrs: hrs, reasons: reasons, actions: actions(A), summary: summaryFor(main, mix) };
  }

  function summaryFor(main, mix) {
    var lead = {
      seeds: 'La mayor parte de tus próximos clientes va a salir de gente que ya te conoce: clientes, referidos y tu red.',
      spears: 'La mayor parte de tus próximos clientes va a salir de buscarlos tú: prospección directa a cuentas que elijas.',
      nets: 'La mayor parte de tus próximos clientes va a llegar atraída por tu contenido, tus lead magnets y tus anuncios.'
    }[main];
    return lead + ' Eso no significa abandonar los otros canales, sino darles el tiempo que les toca.';
  }

  // Una acción concreta por canal para esta semana, según sus respuestas.
  function actions(A) {
    var clients = A[0], mkt = A[1], red = A[2], venta = A[3], time = A[4];
    var seeds;
    if (red === 0) seeds = 'Elige 3 posibles aliados que ya le venden a tu cliente ideal (contadores, consultores, proveedores complementarios) y propón a cada uno una llamada para referirse clientes mutuamente.';
    else if (clients >= 1) seeds = 'Contacta a tus 5 clientes más satisfechos y pídeles 1 referido a cada uno, con una pregunta concreta: «¿A quién conoces que tenga el mismo problema que resolvimos contigo?».';
    else seeds = 'Haz una lista de 30 personas de tu red que conozcan a tu cliente ideal y escríbele personalmente a 10 esta semana: qué haces, para quién y a quién te podrían presentar.';

    var nets;
    if (mkt <= 1) nets = 'Publica esta semana 1 caso o aprendizaje concreto de un cliente en LinkedIn: el problema, lo que hiciste y el resultado. Un post útil a la semana vale más que diez genéricos.';
    else if (mkt === 2) nets = 'Convierte tu mejor contenido en un lead magnet (checklist o diagnóstico) que pida el correo, para que tu contenido empiece a generar leads y no solo likes.';
    else nets = 'Revisa de dónde vinieron tus últimos 10 leads de inbound y mueve el presupuesto al canal que más oportunidades reales generó, no al que más clics trajo.';

    var spears;
    if (time === 0) spears = 'Bloquea en tu agenda 2 espacios de 45 minutos esta semana para prospectar: elige 20 cuentas ideales y mándales 20 mensajes personalizados. Si no está en tu calendario, no va a pasar.';
    else if (venta >= 2) spears = 'Elige 10 cuentas objetivo, identifica quién decide la compra en cada una y escríbele un mensaje de 3 líneas que mencione un problema específico de su empresa.';
    else if (time === 3) spears = 'Define una meta semanal de actividad (por ejemplo, 100 contactos y 10 conversaciones) y mídela cada viernes: el outbound funciona por volumen sostenido, no por rachas.';
    else spears = 'Arma una lista de 50 prospectos de tu cliente ideal y contacta a 10 por día durante 5 días, con un mensaje corto y un seguimiento a los 3 días.';
    return { seeds: seeds, nets: nets, spears: spears };
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
  var NEXT_TITLE = 'Ya sabes tu mezcla. Ahora, ¿cómo ejecutas cada canal?';
  var NEXT_TEXT = 'La siguiente pregunta es cómo convertir cada porcentaje en un sistema que funcione cada semana: tu motor de referidos, tus lead getters y tu estrategia de arranque en frío. Eso es lo que construyes en el Blueprint 3 (Canales de Demanda) del Sprint Ejecutivo: un sistema de growth en 5 días.';

  /* ===================== ESTILOS ===================== */
  var CSS = [
    '#ag-lm3{--ag-ink:#000919;--ag-blue:#1a11f7;--ag-blue-h:#1209c9;--ag-deep:#00086d;--ag-bright:#0000f1;--ag-lime:#cbff8b;--ag-lime-soft:#dff9bf;--ag-lime-line:#b8ec7a;--ag-bg:#f3f3f3;--ag-card:#fafafa;--ag-line:#d6d6d6;--ag-muted:#5b5f6a;--ag-faint:#e3e3e6;',
    'font-family:"DM Sans",system-ui,-apple-system,"Segoe UI",sans-serif;color:var(--ag-ink);background:var(--ag-bg);border-radius:24px;padding:32px 20px 28px;max-width:680px;margin:0 auto;text-align:left;line-height:1.5;-webkit-font-smoothing:antialiased;position:relative;overflow:hidden}',
    '#ag-lm3 *,#ag-lm3 *::before,#ag-lm3 *::after{box-sizing:border-box}',
    '#ag-lm3 h1,#ag-lm3 h2,#ag-lm3 h3,#ag-lm3 p{margin:0;padding:0;letter-spacing:normal;text-transform:none}',
    '#ag-lm3 button,#ag-lm3 input,#ag-lm3 a{margin:0;font-family:inherit;letter-spacing:normal;text-transform:none;box-shadow:none}',
    '#ag-lm3 ul,#ag-lm3 li{letter-spacing:normal}',
    '#ag-lm3 .aglm-screen{animation:aglmIn .35s ease both}',
    '@keyframes aglmIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
    '@media (prefers-reduced-motion:reduce){#ag-lm3 .aglm-screen{animation:none}}',
    '#ag-lm3 .aglm-pill{display:inline-block;font:700 12px/1 "DM Sans",sans-serif;letter-spacing:.12em;text-transform:uppercase;padding:8px 14px;border-radius:999px;background:var(--ag-blue);color:#fff}',
    '#ag-lm3 .aglm-pill--lime{background:var(--ag-lime);color:var(--ag-ink)}',
    '#ag-lm3 .aglm-pill--ink{background:var(--ag-ink);color:var(--ag-lime)}',
    '#ag-lm3 .aglm-h1{font:400 40px/1.04 "DM Serif Display",Georgia,serif;margin:18px 0 0;color:var(--ag-ink)}',
    '#ag-lm3 .aglm-h1 span{display:block;color:var(--ag-blue)}',
    '#ag-lm3 .aglm-h2{font:400 28px/1.12 "DM Serif Display",Georgia,serif;color:var(--ag-ink)}',
    '#ag-lm3 .aglm-h3{font:700 18px/1.3 "DM Sans",sans-serif;color:var(--ag-ink)}',
    '#ag-lm3 .aglm-lead{font-size:17px;color:var(--ag-muted);margin-top:14px;max-width:34em}',
    '#ag-lm3 .aglm-muted{color:var(--ag-muted)}',
    '#ag-lm3 .aglm-small{font-size:13px;color:var(--ag-muted)}',
    '#ag-lm3 .aglm-checks{list-style:none;margin:22px 0 26px;padding:0;display:grid;gap:10px}',
    '#ag-lm3 .aglm-checks li{display:flex;gap:10px;align-items:center;font-size:15px;font-weight:500;margin:0}',
    '#ag-lm3 .aglm-checks li::before{content:"";flex:0 0 22px;height:22px;border-radius:7px;background:var(--ag-lime) url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23000919\' stroke-width=\'3\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M5 12.5l4.5 4.5L19 7.5\'/%3E%3C/svg%3E") center/14px no-repeat}',
    '#ag-lm3 .aglm-btn{display:flex;width:100%;align-items:center;justify-content:center;gap:10px;min-height:54px;padding:14px 24px;border:0;border-radius:999px;background:var(--ag-blue);color:#fff;font:700 16px/1.2 "DM Sans",sans-serif;cursor:pointer;text-decoration:none;transition:background .15s,transform .1s,opacity .15s;-webkit-appearance:none;appearance:none;text-align:center}',
    '#ag-lm3 .aglm-btn:hover{background:var(--ag-blue-h);color:#fff}',
    '#ag-lm3 .aglm-btn:active{transform:scale(.985)}',
    '#ag-lm3 .aglm-btn[disabled]{opacity:.35;cursor:not-allowed;transform:none}',
    '#ag-lm3 .aglm-btn--lime{background:var(--ag-lime);color:var(--ag-ink)}',
    '#ag-lm3 .aglm-btn--lime:hover{background:#b9f26d;color:var(--ag-ink)}',
    '#ag-lm3 .aglm-btn:focus-visible,#ag-lm3 .aglm-link:focus-visible,#ag-lm3 .aglm-opt:focus-visible{outline:3px solid var(--ag-blue);outline-offset:3px}',
    '#ag-lm3 .aglm-btn--lime:focus-visible{outline-color:var(--ag-lime)}',
    '#ag-lm3 .aglm-link{background:none;border:0;padding:6px 0;font:500 15px/1.3 "DM Sans",sans-serif;color:var(--ag-ink);text-decoration:underline;text-underline-offset:3px;cursor:pointer}',
    '#ag-lm3 .aglm-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px;min-height:32px}',
    '#ag-lm3 .aglm-count{font:700 12px/1 "DM Sans",sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--ag-muted)}',
    '#ag-lm3 .aglm-progress{height:6px;border-radius:99px;background:var(--ag-faint);overflow:hidden;margin-bottom:26px}',
    '#ag-lm3 .aglm-progress span{display:block;height:100%;background:var(--ag-blue);border-radius:99px;transition:width .35s ease}',
    '#ag-lm3 .aglm-field{display:block;margin-top:14px}',
    '#ag-lm3 .aglm-field-label{display:block;font:700 14px/1.2 "DM Sans",sans-serif;margin-bottom:7px;color:var(--ag-ink)}',
    '#ag-lm3 .aglm-field-label em{font-style:normal;font-weight:400;color:var(--ag-muted)}',
    '#ag-lm3 .aglm-input{display:block;width:100%;height:54px;padding:0 16px;border:1.5px solid var(--ag-line);border-radius:14px;background:#fff;font:400 16px/1.2 "DM Sans",sans-serif;color:var(--ag-ink);margin:0;box-shadow:none;-webkit-appearance:none;appearance:none}',
    '#ag-lm3 .aglm-input::placeholder{color:#9a9ca3}',
    '#ag-lm3 .aglm-input:focus{outline:none;border-color:var(--ag-blue);box-shadow:0 0 0 4px rgba(26,17,247,.14)}',
    '#ag-lm3 .aglm-input.is-error{border-color:#d93025}',
    '#ag-lm3 .aglm-err{color:#c5221f;font-size:13px;margin-top:6px;min-height:0}',
    '#ag-lm3 .aglm-actions{margin-top:26px;display:grid;gap:12px}',
    '#ag-lm3 .aglm-anchors{display:grid;gap:6px;margin:16px 0 18px;padding:12px 14px;border-radius:14px;background:#fff;border:1px solid var(--ag-line);font-size:14px;line-height:1.4}',
    '#ag-lm3 .aglm-anchors div{display:flex;gap:10px;align-items:flex-start}',
    '#ag-lm3 .aglm-anchors b{flex:0 0 26px;height:26px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;font:700 13px/1 "DM Sans",sans-serif;background:var(--ag-faint);color:var(--ag-ink)}',
    '#ag-lm3 .aglm-anchors div:last-child b{background:var(--ag-blue);color:#fff}',
    '#ag-lm3 .aglm-rows{display:grid;gap:12px}',
    '#ag-lm3 .aglm-row{background:var(--ag-card);border:1.5px solid var(--ag-line);border-radius:16px;padding:14px;transition:border-color .2s}',
    '#ag-lm3 .aglm-row.is-done{border-color:var(--ag-lime-line);background:#f6fdee}',
    '#ag-lm3 .aglm-rowname{font:700 16px/1.3 "DM Sans",sans-serif;margin-bottom:10px;word-break:break-word}',
    '#ag-lm3 .aglm-scale{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}',
    '#ag-lm3 .aglm-opt{height:50px;border-radius:12px;border:1.5px solid var(--ag-line);background:#fff;color:var(--ag-ink);font:700 18px/1 "DM Sans",sans-serif;cursor:pointer;padding:0;margin:0;-webkit-appearance:none;appearance:none;transition:background .12s,border-color .12s,color .12s}',
    '#ag-lm3 .aglm-opt:hover{border-color:var(--ag-blue)}',
    '#ag-lm3 .aglm-opt[aria-checked="true"]{background:var(--ag-blue);border-color:var(--ag-blue);color:#fff}',
    '#ag-lm3 .aglm-scale-legend{display:flex;justify-content:space-between;font-size:12px;color:var(--ag-muted);margin-top:6px}',
    /* resultado */
    '#ag-lm3 .aglm-verdict{border-radius:22px;padding:24px 22px 22px;color:#fff;background:linear-gradient(180deg,var(--ag-deep) 0%,#0000d8 100%);position:relative;overflow:hidden}',
    '#ag-lm3 .aglm-verdict .aglm-h2{color:#fff;font-size:30px;margin-top:16px;word-break:break-word}',
    '#ag-lm3 .aglm-verdict p{color:rgba(255,255,255,.86);font-size:16px;margin-top:12px}',
    '#ag-lm3 .aglm-score{display:flex;align-items:baseline;gap:6px;margin-top:18px}',
    '#ag-lm3 .aglm-score b{font:400 60px/1 "DM Serif Display",Georgia,serif;color:var(--ag-lime)}',
    '#ag-lm3 .aglm-score span{font-size:16px;color:rgba(255,255,255,.75)}',
    '#ag-lm3 .aglm-sec{margin-top:34px}',
    '#ag-lm3 .aglm-sec > .aglm-h2{margin:12px 0 16px}',
    '#ag-lm3 .aglm-seg{background:var(--ag-card);border:1.5px solid var(--ag-line);border-radius:18px;padding:18px 16px;margin-top:12px}',
    '#ag-lm3 .aglm-seg.is-win{background:var(--ag-lime-soft);border-color:var(--ag-lime-line)}',
    '#ag-lm3 .aglm-seg-head{display:flex;align-items:flex-start;gap:12px}',
    '#ag-lm3 .aglm-rank{flex:0 0 34px;height:34px;border-radius:10px;background:var(--ag-ink);color:#fff;font:400 20px/34px "DM Serif Display",Georgia,serif;text-align:center}',
    '#ag-lm3 .aglm-seg.is-win .aglm-rank{background:var(--ag-blue)}',
    '#ag-lm3 .aglm-seg-name{flex:1;min-width:0;font:700 17px/1.3 "DM Sans",sans-serif;word-break:break-word}',
    '#ag-lm3 .aglm-seg-total{font:400 26px/1 "DM Serif Display",Georgia,serif;white-space:nowrap}',
    '#ag-lm3 .aglm-seg-total small{font:400 13px "DM Sans",sans-serif;color:var(--ag-muted)}',
    '#ag-lm3 .aglm-band{display:inline-block;margin-top:6px;font:700 11px/1 "DM Sans",sans-serif;letter-spacing:.1em;text-transform:uppercase;padding:6px 10px;border-radius:99px}',
    '#ag-lm3 .aglm-band--hot{background:var(--ag-ink);color:var(--ag-lime)}',
    '#ag-lm3 .aglm-band--warm{background:var(--ag-blue);color:#fff}',
    '#ag-lm3 .aglm-band--mild{background:#fff;color:var(--ag-ink);border:1px solid var(--ag-line)}',
    '#ag-lm3 .aglm-band--cold{background:var(--ag-faint);color:var(--ag-muted)}',
    '#ag-lm3 .aglm-seg-sum{margin-top:12px;font-size:15px;font-weight:500}',
    '#ag-lm3 .aglm-bars{display:grid;gap:7px;margin-top:14px}',
    '#ag-lm3 .aglm-bar{display:grid;grid-template-columns:96px 1fr 18px;align-items:center;gap:10px;font-size:13px}',
    '#ag-lm3 .aglm-bar-label{color:var(--ag-muted);white-space:nowrap}',
    '#ag-lm3 .aglm-bar.is-weak .aglm-bar-label{color:#c5221f;font-weight:700}',
    '#ag-lm3 .aglm-pips{display:grid;grid-template-columns:repeat(5,1fr);gap:3px}',
    '#ag-lm3 .aglm-pips i{display:block;height:8px;border-radius:3px;background:var(--ag-faint)}',
    '#ag-lm3 .aglm-pips i.on{background:var(--ag-blue)}',
    '#ag-lm3 .aglm-bar.is-weak .aglm-pips i.on{background:#e8453c}',
    '#ag-lm3 .aglm-bar-n{font-weight:700;text-align:right}',
    '#ag-lm3 .aglm-card{background:#fff;border:1.5px solid var(--ag-line);border-radius:18px;padding:20px 18px}',
    '#ag-lm3 .aglm-card p{margin-top:10px;font-size:15px}',
    '#ag-lm3 .aglm-weak{font:700 12px/1.3 "DM Sans",sans-serif !important;letter-spacing:.08em;text-transform:uppercase;color:#c5221f;margin-top:6px !important}',
    '#ag-lm3 .aglm-jump{display:inline-flex;align-items:center;margin-top:18px;padding:11px 16px;border-radius:999px;border:1.5px solid rgba(203,255,139,.55);background:transparent;color:var(--ag-lime);font:700 14px/1.2 "DM Sans",sans-serif;cursor:pointer;-webkit-appearance:none;appearance:none;text-align:left}',
    '#ag-lm3 .aglm-jump:hover{background:rgba(203,255,139,.12)}',
    '#ag-lm3 .aglm-do{margin-top:14px;padding:14px 14px 14px 16px;border-radius:14px;background:var(--ag-lime-soft);border-left:4px solid var(--ag-ink);font-size:15px}',
    '#ag-lm3 .aglm-do b{display:block;font-size:12px;letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px}',
    '#ag-lm3 .aglm-stop{border-style:dashed}',
    '#ag-lm3 .aglm-pdfcard{background:#fff;border:1.5px solid var(--ag-line);border-radius:22px;padding:22px 18px}',
    '#ag-lm3 .aglm-pdfcard ul{margin:14px 0 4px;padding:0 0 0 18px;font-size:15px}',
    '#ag-lm3 .aglm-pdfcard li{margin:4px 0}',
    '#ag-lm3 .aglm-legal{font-size:12px;color:var(--ag-muted);margin-top:10px;text-align:center}',
    '#ag-lm3 .aglm-legal a{color:inherit}',
    '#ag-lm3 .aglm-ok{background:var(--ag-lime-soft);border:1.5px solid var(--ag-lime-line);border-radius:16px;padding:16px;margin-top:6px}',
    '#ag-lm3 .aglm-ok .aglm-h3{margin-bottom:6px}',
    '#ag-lm3 .aglm-cta{background:var(--ag-ink);color:#fff;border-radius:22px;padding:26px 20px 22px}',
    '#ag-lm3 .aglm-cta .aglm-h2{color:#fff;margin-top:14px}',
    '#ag-lm3 .aglm-cta p{color:rgba(255,255,255,.82);font-size:16px;margin-top:12px}',
    '#ag-lm3 .aglm-cta .aglm-urg{color:var(--ag-lime);font-size:14px;margin-top:14px}',
    '#ag-lm3 .aglm-restart{text-align:center;margin-top:22px}',
    '#ag-lm3 .aglm-spin{width:18px;height:18px;border-radius:50%;border:2.5px solid rgba(255,255,255,.4);border-top-color:#fff;animation:aglmSpin .8s linear infinite}',
    '@keyframes aglmSpin{to{transform:rotate(360deg)}}',
    '#ag-lm3 .aglm-stage{position:absolute;left:-12000px;top:0;width:794px;pointer-events:none}',
    '@media (min-width:640px){#ag-lm3{padding:48px 48px 40px}#ag-lm3 .aglm-h1{font-size:52px}#ag-lm3 .aglm-h2{font-size:32px}#ag-lm3 .aglm-verdict{padding:32px}#ag-lm3 .aglm-verdict .aglm-h2{font-size:36px}#ag-lm3 .aglm-actions .aglm-btn{width:auto;justify-self:start;padding:14px 32px}#ag-lm3 .aglm-cta,#ag-lm3 .aglm-pdfcard{padding:32px}#ag-lm3 .aglm-bar{grid-template-columns:110px 1fr 18px}}',

    /* ===== PDF (A4 a 794×1123 px) ===== */
    '#ag-lm3 .pdf-page{width:794px;height:1123px;background:#f3f3f3;position:relative;overflow:hidden;font-family:"DM Sans",sans-serif;color:#000919;line-height:1.45}',
    '#ag-lm3 .pdf-hero{background:linear-gradient(180deg,#00086d 0%,#0000ec 100%);color:#fff;padding:44px 56px 40px}',
    '#ag-lm3 .pdf-hero img{width:230px;height:auto;display:block}',
    '#ag-lm3 .pdf-hero .aglm-pill{margin-top:38px}',
    '#ag-lm3 .pdf-hero h1{font:400 40px/1.08 "DM Serif Display",Georgia,serif;color:#fff;margin-top:16px;word-break:break-word}',
    '#ag-lm3 .pdf-meta{font-size:15px;color:rgba(255,255,255,.8);margin-top:12px}',
    '#ag-lm3 .pdf-body{padding:30px 56px 0}',
    '#ag-lm3 .pdf-verdict{display:flex;gap:24px;align-items:flex-start;background:#fff;border:1.5px solid #d6d6d6;border-radius:18px;padding:20px 22px}',
    '#ag-lm3 .pdf-verdict .n{font:400 54px/1 "DM Serif Display",Georgia,serif;color:#1a11f7;white-space:nowrap}',
    '#ag-lm3 .pdf-verdict .n small{font:400 15px "DM Sans",sans-serif;color:#5b5f6a}',
    '#ag-lm3 .pdf-verdict p{font-size:15px;margin:0}',
    '#ag-lm3 .pdf-h2{font:400 28px/1.1 "DM Serif Display",Georgia,serif;margin:26px 0 12px}',
    '#ag-lm3 .pdf-seg{background:#fafafa;border:1.5px solid #d6d6d6;border-radius:16px;padding:14px 18px;margin-top:10px}',
    '#ag-lm3 .pdf-seg.is-win{background:#dff9bf;border-color:#b8ec7a}',
    '#ag-lm3 .pdf-seg-head{display:flex;align-items:center;gap:12px}',
    '#ag-lm3 .pdf-seg-head .aglm-rank{flex:0 0 30px;height:30px;line-height:30px;font-size:18px;border-radius:9px}',
    '#ag-lm3 .pdf-seg-name{flex:1;font:700 17px/1.25 "DM Sans",sans-serif;word-break:break-word}',
    '#ag-lm3 .pdf-seg-total{font:400 26px/1 "DM Serif Display",Georgia,serif;white-space:nowrap}',
    '#ag-lm3 .pdf-seg-total small{font:400 13px "DM Sans",sans-serif;color:#5b5f6a}',
    '#ag-lm3 .pdf-seg-sum{font-size:14px;font-weight:500;margin:8px 0 0}',
    '#ag-lm3 .pdf-seg-grid{display:grid;grid-template-columns:1fr 1fr;column-gap:26px;row-gap:5px;margin-top:10px}',
    '#ag-lm3 .pdf-seg-grid .aglm-bar{grid-template-columns:92px 1fr 14px;font-size:12px;gap:8px}',
    '#ag-lm3 .pdf-foot{position:absolute;left:56px;right:56px;bottom:26px;display:flex;justify-content:space-between;font-size:12px;color:#5b5f6a;border-top:1px solid #d6d6d6;padding-top:10px}',
    '#ag-lm3 .pdf-plan{background:#fff;border:1.5px solid #d6d6d6;border-radius:16px;padding:16px 20px;margin-top:10px}',
    '#ag-lm3 .pdf-plan h3{font:700 16px/1.3 "DM Sans",sans-serif;margin:0}',
    '#ag-lm3 .pdf-plan .w{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#c5221f;margin-top:6px}',
    '#ag-lm3 .pdf-plan p{font-size:13.5px;margin:6px 0 0}',
    '#ag-lm3 .pdf-plan .do{background:#dff9bf;border-left:4px solid #000919;border-radius:10px;padding:9px 12px;margin-top:9px;font-size:13.5px}',
    '#ag-lm3 .pdf-plan .do b{font-size:11px;letter-spacing:.1em;text-transform:uppercase}',
    '#ag-lm3 .pdf-crit{display:grid;grid-template-columns:150px 1fr;gap:4px 16px;font-size:12px;margin-top:8px;color:#000919}',
    '#ag-lm3 .pdf-crit b{font-weight:700}',
    '#ag-lm3 .pdf-crit span{color:#5b5f6a}',
    '#ag-lm3 .pdf-cta{position:absolute;left:0;right:0;bottom:0;background:#000919;color:#fff;padding:34px 56px 70px}',
    '#ag-lm3 .pdf-cta h2{font:400 30px/1.1 "DM Serif Display",Georgia,serif;color:#fff;margin-top:14px}',
    '#ag-lm3 .pdf-cta p{font-size:14px;color:rgba(255,255,255,.82);margin-top:10px;max-width:640px}',
    '#ag-lm3 .pdf-cta .btn{display:inline-block;margin-top:16px;background:#cbff8b;color:#000919;font:700 15px/1 "DM Sans",sans-serif;padding:14px 24px;border-radius:999px}',
    '#ag-lm3 .pdf-cta .urg{font-size:12.5px;color:#cbff8b;margin-top:12px}',
    '#ag-lm3 .pdf-cta .foot{position:absolute;left:56px;right:56px;bottom:22px;display:flex;justify-content:space-between;font-size:12px;color:rgba(255,255,255,.55);border-top:1px solid rgba(255,255,255,.15);padding-top:10px}',
    /* ===== LM3 ===== */
    '#ag-lm3 .aglm-opts{display:grid;gap:10px;margin-top:20px}',
    '#ag-lm3 .aglm-choice{display:flex;align-items:flex-start;gap:12px;width:100%;text-align:left;padding:15px 14px;border-radius:16px;border:1.5px solid var(--ag-line);background:#fff;color:var(--ag-ink);font:500 16px/1.4 "DM Sans",sans-serif;cursor:pointer;-webkit-appearance:none;appearance:none;transition:border-color .15s,background .15s}',
    '#ag-lm3 .aglm-choice:hover{border-color:var(--ag-blue)}',
    '#ag-lm3 .aglm-choice:focus-visible{outline:3px solid var(--ag-blue);outline-offset:3px}',
    '#ag-lm3 .aglm-choice b{flex:0 0 28px;height:28px;border-radius:9px;display:inline-flex;align-items:center;justify-content:center;font:700 13px/1 "DM Sans",sans-serif;background:var(--ag-faint);color:var(--ag-ink);margin-top:-2px}',
    '#ag-lm3 .aglm-choice[aria-checked="true"]{border-color:var(--ag-blue);background:#f1f0ff}',
    '#ag-lm3 .aglm-choice[aria-checked="true"] b{background:var(--ag-blue);color:#fff}',
    '#ag-lm3 .aglm-chans{display:grid;gap:8px;margin:20px 0 4px}',
    '#ag-lm3 .aglm-chan{display:flex;gap:12px;align-items:flex-start;background:#fff;border:1px solid var(--ag-line);border-radius:14px;padding:12px 14px;font-size:14px;line-height:1.4}',
    '#ag-lm3 .aglm-dot{flex:0 0 14px;height:14px;border-radius:5px;margin-top:3px}',
    '#ag-lm3 .aglm-chan strong{display:block;font-size:15px}',
    '#ag-lm3 .aglm-mixbar{display:flex;height:46px;border-radius:14px;overflow:hidden;margin-top:18px;background:rgba(255,255,255,.15)}',
    '#ag-lm3 .aglm-mixbar span{display:flex;align-items:center;justify-content:center;font:700 14px/1 "DM Sans",sans-serif;white-space:nowrap;overflow:hidden;min-width:0}',
    '#ag-lm3 .aglm-legend{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}',
    '#ag-lm3 .aglm-legend div{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);border-radius:12px;padding:10px;color:#fff}',
    '#ag-lm3 .aglm-legend b{display:block;font:400 28px/1 "DM Serif Display",Georgia,serif}',
    '#ag-lm3 .aglm-legend small{display:block;font-size:12px;color:rgba(255,255,255,.75);margin-top:4px;line-height:1.3}',
    '#ag-lm3 .aglm-reasons{list-style:none;margin:0;padding:0;display:grid;gap:10px}',
    '#ag-lm3 .aglm-reasons li{display:flex;gap:10px;font-size:15px;margin:0;background:var(--ag-card);border:1.5px solid var(--ag-line);border-radius:14px;padding:12px 14px}',
    '#ag-lm3 .aglm-reasons li::before{content:"";flex:0 0 8px;height:8px;border-radius:50%;background:var(--ag-blue);margin-top:8px}',
    '#ag-lm3 .aglm-chcard{background:#fff;border:1.5px solid var(--ag-line);border-radius:18px;padding:18px 16px;margin-top:12px}',
    '#ag-lm3 .aglm-chcard-head{display:flex;align-items:center;gap:12px}',
    '#ag-lm3 .aglm-chcard-pct{flex:0 0 auto;min-width:64px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font:400 22px/1 "DM Serif Display",Georgia,serif;padding:0 10px}',
    '#ag-lm3 .aglm-chcard-name{flex:1;min-width:0}',
    '#ag-lm3 .aglm-chcard-name strong{display:block;font:700 17px/1.2 "DM Sans",sans-serif}',
    '#ag-lm3 .aglm-chcard-name span{font-size:13px;color:var(--ag-muted)}',
    '@media (min-width:640px){#ag-lm3 .aglm-choice{padding:16px 18px}#ag-lm3 .aglm-chans{grid-template-columns:repeat(3,1fr)}#ag-lm3 .aglm-chan{flex-direction:column}}',
    /* PDF LM3 */
    '#ag-lm3 .pdf-mix{margin-top:0;background:#00086d;border-radius:18px;padding:18px 22px;color:#fff}',
    '#ag-lm3 .pdf-mix .aglm-mixbar{margin-top:10px;height:50px}',
    '#ag-lm3 .pdf-chs{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:14px}',
    '#ag-lm3 .pdf-ch{background:#fff;border:1.5px solid #d6d6d6;border-radius:16px;padding:14px 16px;font-size:13px}',
    '#ag-lm3 .pdf-ch .p{font:400 34px/1 "DM Serif Display",Georgia,serif}',
    '#ag-lm3 .pdf-ch b{display:block;font-size:15px;margin-top:6px}',
    '#ag-lm3 .pdf-ch span{color:#5b5f6a;display:block;margin-top:4px}',
    '#ag-lm3 .pdf-why{list-style:none;margin:8px 0 0;padding:0;display:grid;gap:6px;font-size:13.5px}',
    '#ag-lm3 .pdf-why li{background:#fff;border:1px solid #d6d6d6;border-radius:10px;padding:8px 12px;margin:0}',
    '#ag-lm3 .pdf-act{background:#fff;border:1.5px solid #d6d6d6;border-radius:16px;padding:14px 18px;margin-top:10px;display:flex;gap:14px;align-items:flex-start}',
    '#ag-lm3 .pdf-act .tag{flex:0 0 74px;border-radius:10px;text-align:center;padding:8px 4px;font:700 12px/1.2 "DM Sans",sans-serif}',
    '#ag-lm3 .pdf-act .tag b{display:block;font:400 22px/1 "DM Serif Display",Georgia,serif;margin-top:4px}',
    '#ag-lm3 .pdf-act p{margin:0;font-size:13.5px}',
    '#ag-lm3 .pdf-act p.h{font-weight:700;font-size:14.5px;margin-bottom:4px}',
    '#ag-lm3 .pdf-box{background:#fff;border:1.5px solid #d6d6d6;border-radius:16px;padding:14px 16px;font-size:13px;margin-top:12px}',
    '#ag-lm3 .pdf-box h3{font:400 18px/1.2 "DM Serif Display",Georgia,serif;margin:0 0 6px}',
    '#ag-lm3 .pdf-answers{display:grid;gap:4px;font-size:12.5px}',
    '#ag-lm3 .pdf-answers div{display:grid;grid-template-columns:150px 1fr;gap:8px}',
    '#ag-lm3 .pdf-answers b{color:#1a11f7}'
  ].join('\n');

  /* ===================== ESTADO + MONTAJE ===================== */
  var S = { q: 0, answers: [], result: null, lead: null, pdfUrl: null, busy: false, startedAt: null, subId: null, bot: false };
  var root, shell, stage;

  function mount() {
    root = document.getElementById(CFG.mountId);
    if (!root || root.getAttribute('data-aglm-ready')) return;
    root.setAttribute('data-aglm-ready', '1');
    root.setAttribute('lang', 'es-MX');
    if (!document.getElementById('aglm3-style')) {
      var st = document.createElement('style'); st.id = 'aglm3-style'; st.textContent = CSS; document.head.appendChild(st);
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
  function chanList() {
    return '<div class="aglm-chans">' + CH_ORDER.map(function (k) {
      return '<div class="aglm-chan"><span class="aglm-dot" style="background:' + CH[k].color + ';' + (k === 'seeds' ? 'border:1px solid #b8ec7a' : '') + '"></span>' +
        '<div><strong>' + CH[k].name + ' · ' + CH[k].es + '</strong>' + esc(CH[k].desc) + '</div></div>';
    }).join('') + '</div>';
  }

  function renderIntro() {
    show(
      '<span class="aglm-pill">' + (CFG.showCta ? 'Diagnóstico gratuito · 2 min' : 'Diagnóstico · 2 min') + '</span>' +
      '<h1 class="aglm-h1">' + esc(VARIANT.headline) + '<span>' + esc(VARIANT.accent) + '</span></h1>' +
      '<p class="aglm-lead">' + esc(CFG.sub) + '</p>' +
      chanList() +
      '<ul class="aglm-checks"><li>Solo 5 preguntas de opción múltiple</li><li>Tu mezcla en porcentaje y en horas por semana</li><li>Una acción concreta por canal para esta semana</li></ul>' +
      '<div class="aglm-actions"><button type="button" class="aglm-btn" data-act="start">Descubrir mi mezcla</button></div>'
    );
  }

  function renderQuestion() {
    var q = QUESTIONS[S.q], n = S.q + 1, total = QUESTIONS.length, sel = S.answers[S.q];
    var opts = q.opts.map(function (o, i) {
      return '<button type="button" class="aglm-choice" role="radio" aria-checked="' + (sel === i) + '" data-act="answer" data-val="' + i + '"><b>' + LETTERS[i] + '</b><span>' + esc(o.t) + '</span></button>';
    }).join('');
    show(
      '<div class="aglm-top">' + (S.q > 0 ? '<button type="button" class="aglm-link" data-act="back">← Atrás</button>' : '<button type="button" class="aglm-link" data-act="home">← Inicio</button>') +
      '<span class="aglm-count">Pregunta ' + n + ' de ' + total + '</span></div>' +
      '<div class="aglm-progress"><span style="width:' + (n / total * 100).toFixed(1) + '%"></span></div>' +
      '<span class="aglm-pill aglm-pill--ink">' + esc(q.label) + '</span>' +
      '<h2 class="aglm-h2" style="margin-top:14px">' + esc(q.q) + '</h2>' +
      '<div class="aglm-opts" role="radiogroup" aria-label="' + esc(q.q) + '">' + opts + '</div>' +
      (typeof sel === 'number' ? '<div class="aglm-actions"><button type="button" class="aglm-btn" data-act="next">' + (n === total ? 'Ver mi mezcla' : 'Siguiente') + '</button></div>' : '')
    );
  }

  function mixBar(mix) {
    return '<div class="aglm-mixbar">' + CH_ORDER.map(function (k) {
      var lbl = mix[k] >= 35 ? CH[k].name + ' ' + mix[k] + '%' : (mix[k] >= 15 ? mix[k] + '%' : '');
      return '<span style="flex:0 0 ' + mix[k] + '%;background:' + CH[k].color + ';color:' + CH[k].ink + '">' + lbl + '</span>';
    }).join('') + '</div>';
  }
  function hrsTxt(h) { return h < 1 ? 'menos de 1 h' : (h % 1 ? String(h).replace('.', ',') : h) + ' h'; }

  function renderResult() {
    var R = S.result, sp = sprintState(), M = CH[R.main];
    var legend = '<div class="aglm-legend">' + CH_ORDER.map(function (k) {
      return '<div><b>' + R.mix[k] + '%</b><small><strong style="color:#fff">' + CH[k].name + '</strong><br>' + (R.hrs[k] < 1 ? '&lt; 1 h' : '≈ ' + hrsTxt(R.hrs[k])) + '/sem</small></div>';
    }).join('') + '</div>';

    var cards = R.ranked.map(function (k) {
      return '<div class="aglm-chcard"><div class="aglm-chcard-head">' +
        '<div class="aglm-chcard-pct" style="background:' + CH[k].color + ';color:' + CH[k].ink + '">' + R.mix[k] + '%</div>' +
        '<div class="aglm-chcard-name"><strong>' + CH[k].name + ' · ' + CH[k].es + '</strong><span>≈ ' + hrsTxt(R.hrs[k]) + ' de tus ' + R.hours + ' h semanales</span></div></div>' +
        '<div class="aglm-do"><b>Esta semana</b>' + esc(R.actions[k]) + '</div></div>';
    }).join('');

    var pdf = S.pdfUrl ? pdfDoneHtml() : (
      '<form class="aglm-pdfcard" novalidate data-form="lead">' +
      '<span class="aglm-pill">Tu plan en PDF</span>' +
      '<h2 class="aglm-h2" style="margin-top:14px">Llévate tu mezcla y tu plan</h2>' +
      '<ul><li>Tu mezcla en porcentaje y en horas por semana</li><li>La acción de esta semana para cada canal</li><li>Cuándo cambiar tu mezcla y a cuál pasar</li></ul>' +
      '<label class="aglm-field"><span class="aglm-field-label">Tu nombre</span><input class="aglm-input" name="name" type="text" autocomplete="given-name" maxlength="60" required></label>' +
      '<label class="aglm-field"><span class="aglm-field-label">Tu correo</span><input class="aglm-input" name="email" type="email" inputmode="email" autocomplete="email" maxlength="120" required></label>' +
      '<label class="aglm-field"><span class="aglm-field-label">Empresa <em>(opcional)</em></span><input class="aglm-input" name="company" type="text" autocomplete="organization" maxlength="80"></label>' +
      '<input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">' +
      '<p class="aglm-err" data-err></p>' +
      '<div class="aglm-actions" style="margin-top:16px"><button type="submit" class="aglm-btn" data-pdf-btn>Descargar mi plan en PDF</button></div>' +
      '<p class="aglm-legal">Al descargar aceptas nuestro <a href="' + esc(CFG.privacyUrl) + '" target="_blank" rel="noopener">aviso de privacidad</a>. Cero spam.</p>' +
      '</form>'
    );

    show(
      '<div class="aglm-verdict"><span class="aglm-pill aglm-pill--lime">' + esc(R.stage.label) + '</span>' +
      '<h2 class="aglm-h2">Enfócate en ' + M.name + ' (' + M.es.toLowerCase() + '): ' + R.mix[R.main] + '% de tu esfuerzo</h2>' +
      mixBar(R.mix) + legend +
      '<p>' + esc(R.summary) + '</p>' +
      '<button type="button" class="aglm-jump" data-act="jump-pdf">Recibe tu plan completo en PDF ↓</button></div>' +

      '<div class="aglm-sec"><span class="aglm-pill">Tu semana</span><h2 class="aglm-h2">Una acción por canal, empezando por el principal</h2>' + cards + '</div>' +

      '<div class="aglm-sec"><span class="aglm-pill">Por qué esta mezcla</span><h2 class="aglm-h2">Cómo llegamos a estos porcentajes</h2>' +
      '<ul class="aglm-reasons">' + R.reasons.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul></div>' +

      '<div class="aglm-sec" data-pdf-sec>' + pdf + '</div>' +

      (CFG.showCta ? (
        '<div class="aglm-sec"><div class="aglm-cta"><span class="aglm-pill aglm-pill--lime">Lo que sigue</span>' +
        '<h2 class="aglm-h2">' + esc(NEXT_TITLE) + '</h2><p>' + esc(NEXT_TEXT) + '</p>' +
        '<div class="aglm-actions" style="margin-top:20px"><a class="aglm-btn aglm-btn--lime" href="' + esc(sp.url) + '" target="_blank" rel="noopener" data-act="cta">' + esc(sp.label) + '</a></div>' +
        '<p class="aglm-urg">' + esc(sp.line) + '</p></div></div>'
      ) : '') +

      '<div class="aglm-restart"><button type="button" class="aglm-link" data-act="restart">Volver a hacer el diagnóstico</button></div>'
    );
  }

  function pdfDoneHtml() {
    return '<div class="aglm-pdfcard"><div class="aglm-ok"><h3 class="aglm-h3">Listo, ' + esc(S.lead.name.split(' ')[0]) + '. Tu plan se descargó.</h3>' +
      '<p class="aglm-muted" style="font-size:15px">¿No lo ves? Ábrelo desde aquí:</p></div>' +
      '<div class="aglm-actions" style="margin-top:14px"><a class="aglm-btn" href="' + S.pdfUrl + '" target="_blank" rel="noopener" download="' + esc(pdfName()) + '" data-act="pdf-open">Abrir mi PDF</a></div></div>';
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
      stage: S.result.stageKey, main: S.result.main, mix: S.result.mix.seeds + '/' + S.result.mix.nets + '/' + S.result.mix.spears,
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
    S.bot = !!F['website'].value; // honeypot
    if (!S.subId) S.subId = 'lm3-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    send('lead');
    track(EV + 'lead');

    var btn = form.querySelector('[data-pdf-btn]');
    S.busy = true;
    btn.disabled = true;
    btn.innerHTML = '<span class="aglm-spin"></span> Generando tu PDF…';

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
      btn.textContent = 'Intentar de nuevo';
      err.textContent = 'No pudimos generar el PDF en este navegador. Intenta de nuevo o ábrelo desde una computadora.';
      var msg = String(ex && ex.message || ex).slice(0, 120);
      track(EV + 'pdf_error', { message: msg });
      send('pdf', { pdf_error: msg });
      if (window.console) console.error('[AG LM3]', ex);
    });
  }

  function leadPayload() {
    var R = S.result;
    return {
      tool: CFG.tool, version: VERSION, variant: variantKey, submission_id: S.subId, submitted_at: new Date().toISOString(),
      name: S.lead.name, email: S.lead.email, company: S.lead.company,
      stage: R.stageKey, stage_label: R.stage.label,
      mix: R.mix, main: R.main, main_label: CH[R.main].name + ' · ' + CH[R.main].es,
      hours: R.hours, hours_by_channel: R.hrs,
      reasons: R.reasons, actions: R.actions,
      answers: QUESTIONS.map(function (q, i) { return { q: q.id, key: q.key, letter: LETTERS[S.answers[i]], text: q.opts[S.answers[i]].t }; }),
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
    return 'Mezcla-Seeds-Nets-Spears' + (S.lead && S.lead.name ? '-' + slug(S.lead.name) : '') + '.pdf';
  }

  function pdfPagesHtml() {
    var R = S.result, sp = sprintState();
    var who = esc(S.lead.name) + (S.lead.company ? ' · ' + esc(S.lead.company) : '');
    var date = fmtDate(new Date(), { day: 'numeric', month: 'long', year: 'numeric' });
    var mixTxt = CH_ORDER.map(function (k) { return CH[k].name + ' ' + R.mix[k] + '%'; }).join(' · ');

    var chs = CH_ORDER.map(function (k) {
      return '<div class="pdf-ch"><div class="p" style="color:' + (k === 'seeds' ? '#2f6b00' : CH[k].color) + '">' + R.mix[k] + '%</div>' +
        '<b>' + CH[k].name + ' · ' + CH[k].es + '</b><span>≈ ' + hrsTxt(R.hrs[k]) + ' por semana</span><span>' + esc(CH[k].desc) + '</span></div>';
    }).join('');

    var p1 =
      '<div class="pdf-page" data-page="1">' +
      '<div class="pdf-hero"><img src="' + CFG.logoWhite + '" alt="Agora Growth">' +
      '<span class="aglm-pill aglm-pill--lime">Tu mezcla de Seeds, Nets y Spears</span>' +
      '<h1>Enfócate en ' + CH[R.main].name + ': ' + R.mix[R.main] + '% de tu esfuerzo</h1>' +
      '<p class="pdf-meta">Preparado para ' + who + ' · ' + esc(date) + '</p></div>' +
      '<div class="pdf-body">' +
      '<div class="pdf-mix"><div class="aglm-eq-cap" style="font:700 11px/1 \'DM Sans\',sans-serif;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.75)">' + esc(R.stage.label) + ' · ' + esc(mixTxt) + ' · ' + R.hours + ' h por semana</div>' +
      mixBar(R.mix) + '</div>' +
      '<div class="pdf-chs">' + chs + '</div>' +
      '<p style="font-size:14px;margin-top:14px">' + esc(R.summary) + '</p>' +
      '<h2 class="pdf-h2">Por qué esta mezcla</h2>' +
      '<ul class="pdf-why">' + R.reasons.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>' +
      '</div>' +
      '<div class="pdf-foot"><span>Agora Growth · Rev up Revenue</span><span>agoragrowth.com · 1/2</span></div></div>';

    var acts = R.ranked.map(function (k) {
      return '<div class="pdf-act"><div class="tag" style="background:' + CH[k].color + ';color:' + CH[k].ink + '">' + CH[k].name + '<b>' + R.mix[k] + '%</b></div>' +
        '<div><p class="h">' + CH[k].es + ' · ≈ ' + hrsTxt(R.hrs[k]) + ' esta semana</p><p>' + esc(R.actions[k]) + '</p></div></div>';
    }).join('');

    var answers = QUESTIONS.map(function (q, i) {
      return '<div><b>' + esc(q.label) + '</b><span>' + esc(q.opts[S.answers[i]].t) + '</span></div>';
    }).join('');

    var p2 =
      '<div class="pdf-page" data-page="2">' +
      '<div class="pdf-body" style="padding-top:44px">' +
      '<span class="aglm-pill">Tu plan de esta semana</span>' +
      '<h2 class="pdf-h2" style="margin-top:14px">Una acción por canal</h2>' + acts +
      '<div class="pdf-box"><h3>Cuándo cambiar tu mezcla</h3><p style="margin:0">' + esc(R.stage.next) + '</p></div>' +
      '<div class="pdf-box"><h3>Tus 5 respuestas</h3><div class="pdf-answers">' + answers + '</div></div>' +
      '<p style="font-size:11.5px;color:#5b5f6a;margin-top:12px">Cómo se calcula: tu número de clientes define la etapa y su mezcla base (temprana 60/30/10, crecimiento 40/40/20, escala 30/40/30, en orden Seeds/Spears/Nets); tus otras 4 respuestas la ajustan. Mínimo 5% por canal, redondeado a múltiplos de 5. Canales Seeds, Nets y Spears de Predictable Revenue (Aaron Ross); los porcentajes por etapa son el marco de Agora Growth.</p>' +
      '</div>' +
      (CFG.showCta ? (
        '<div class="pdf-cta"><span class="aglm-pill aglm-pill--lime">Lo que sigue</span>' +
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
        if (!jsPDF || !window.html2canvas) throw new Error('Librerías de PDF no disponibles');
        var pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4', compress: true });
        pdf.setProperties({ title: 'Tu mezcla de Seeds, Nets y Spears · Agora Growth', author: 'Agora Growth', subject: 'Mezcla de canales de demanda', creator: 'agoragrowth.com' });
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
  window.AG_LM3 = { mount: mount, version: VERSION };
})();
