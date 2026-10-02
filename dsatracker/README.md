`# DSA Log - Front-End Application (YuvaIntern Week 2)

A responsive, three-page web app for tracking Data Structures & Algorithms practice topic by topic.
Built with plain HTML, CSS and JavaScript (no framework, no build step).

## Pages
| Page | File | Purpose |
|------|------|---------|
| Landing | `index.html` | Intro and a live preview of saved progress |
| Dashboard | `dashboard.html` | Overall stats, search, status filter, topic cards |
| Detail view | `topic.html?id=arrays` | Problem checklist, difficulty filter, notes, previous/next navigation |

## Run locally
1. Unzip the folder.
2. Double-click `index.html` (or run `python -m http.server 8000` in the folder and open http://localhost:8000).
3. Use the Dashboard link, open a topic, tick problems. Progress is saved in your browser.

## Development process
1. **Setup:** folder structure (`css/`, `js/`) and a shared stylesheet with design tokens (CSS variables).
2. **Wireframes:** three screens (landing, dashboard grid, detail list), mobile layout first, one breakpoint at 720px.
3. **Implementation:** data layer, then the mock service, then each page's script.
4. **Testing:** manual checklist below.

## Structure and design patterns
- `js/data.js` - static topic catalogue (data only).
- `js/store.js` - mock back-end service (module pattern / IIFE). It exposes an async API (`getState`, `toggleProblem`, `saveNote`) backed by `localStorage`, so it can be replaced with real `fetch()` calls without touching the pages.
- `js/landing.js`, `js/dashboard.js`, `js/topic.js` - one view script per page; render functions are separate from event handling.
- Separation of concerns: data, service, and view code never mix.
- Libraries: none. Only a Google Fonts link (Bricolage Grotesque) with system-font fallback.

## Accessibility and responsiveness
- Semantic landmarks, skip link, one `h1` per page, labelled form controls.
- Progress bars use `role="progressbar"` with `aria-valuenow`; dynamic counts use `aria-live`.
- Filter buttons use `aria-pressed`; visible keyboard focus; colour contrast checked for text.
- Fluid grid (`auto-fill` / `minmax`), tested at phone, tablet and desktop widths; `prefers-reduced-motion` respected.

## Manual test checklist
- [x] Navigate Landing > Dashboard > Topic > Next topic > Back.
- [x] Tick/untick problems; progress bar and dashboard stats update; state survives refresh.
- [x] Search "arr" and each status filter; empty-state message appears for no matches.
- [x] Difficulty filter on the detail view; notes autosave.
- [x] Invalid topic id (`topic.html?id=xyz`) shows a friendly message.
- [x] Keyboard-only use and 360px-wide layout.

## Limitations / future work
- No real server: the mock service stores data in the browser only.
- Possible next steps: user accounts, more topics, charts, and a real REST/Node back end.
