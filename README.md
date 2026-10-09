# Agora Growth · Lead Magnet Tools

Scripts autocontenidos que se embeben en Webflow y se sirven con jsDelivr.

| Tool | Archivo | Contenedor | Config |
| --- | --- | --- | --- |
| LM1 · Encuentra tu Starving Crowd | `lm1-starving-crowd.js` | `<div id="ag-lm1">` | `window.AG_LM1_CONFIG` |
| LM2 · Diagnóstico de Oferta (Value Equation) | `lm2-diagnostico-oferta.js` | `<div id="ag-lm2">` | `window.AG_LM2_CONFIG` |
| LM3 · Tu mezcla de Seeds, Nets y Spears | `lm3-mezcla-canales.js` | `<div id="ag-lm3">` | `window.AG_LM3_CONFIG` |
| LM1 (EN) · Find your Starving Crowd | `lm1-starving-crowd-en.js` | `<div id="ag-lm1">` | `window.AG_LM1_CONFIG` |
| LM2 (EN) · Offer Diagnostic | `lm2-offer-diagnostic-en.js` | `<div id="ag-lm2">` | `window.AG_LM2_CONFIG` |
| LM3 (EN) · Your Seeds, Nets & Spears mix | `lm3-channel-mix-en.js` | `<div id="ag-lm3">` | `window.AG_LM3_CONFIG` |

URL de cada script (versión fija por release):
`https://cdn.jsdelivr.net/gh/Agora-Growth/agora-lead-magnet-1@<tag>/<archivo>.min.js`

Los envíos llegan al Apps Script del Sheet "LMT1" (una pestaña por tool). Las versiones en inglés mandan `lang: 'en'` y caen en la misma pestaña con Idioma = Inglés.

Las versiones en inglés se generan a partir de las de español (misma lógica, solo cambian los textos).

## Workbook del Sprint Ejecutivo

Carpeta `workbook/`: app con login para participantes (llenar, autoguardado, descargar PDF) y panel de admin (cohortes, altas con PIN, avance).

| Página | Contenedor | Config |
| --- | --- | --- |
| Participantes | `<div id="ag-wb">` | `window.AG_WB_CONFIG = { mode: 'participant', endpoint }` |
| Panel de admin | `<div id="ag-wb">` | `window.AG_WB_CONFIG = { mode: 'admin', endpoint }` |

Script: `https://cdn.jsdelivr.net/gh/Agora-Growth/agora-lead-magnet-1@<tag>/workbook/workbook.min.js`. Las fuentes del PDF (`workbook/fonts`, licencia SIL OFL) se cargan desde la misma versión.

El contenido del workbook (preguntas, prompts, FAQs, glosario) y los datos viven en el Apps Script privado del Sheet del workbook, no en este repo: solo se entregan a usuarios con sesión.
