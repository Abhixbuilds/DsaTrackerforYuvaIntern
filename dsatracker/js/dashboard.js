/* Dashboard: stats, search and status filter over the topic list. */
let filter = 'all', query = '';
const $ = id => document.getElementById(id);

function statusOf(st) { return st.done === 0 ? 'todo' : st.done === st.total ? 'done' : 'doing'; }

function card(t, st) {
  return `<li><a class="card" href="topic.html?id=${t.id}">
    <h3>${t.title}</h3><p>${t.desc}</p>
    <div class="bar ${st.pct === 100 ? 'done' : ''}" role="progressbar" aria-label="${t.title} progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${st.pct}"><span style="width:${st.pct}%"></span></div>
    <p class="meta">${st.done} of ${st.total} solved</p></a></li>`;
}

function render(state) {
  let done = 0, total = 0, finished = 0;
  const rows = TOPICS.map(t => ({ t, st: Store.stats(t, state) }));
  rows.forEach(({ st }) => { done += st.done; total += st.total; if (st.pct === 100) finished++; });
  $('s-solved').textContent = done;
  $('s-pct').textContent = Math.round(done / total * 100) + '%';
  $('s-topics').textContent = `${finished}/${TOPICS.length}`;
  const shown = rows.filter(({ t, st }) =>
    (filter === 'all' || statusOf(st) === filter) && t.title.toLowerCase().includes(query));
  $('grid').innerHTML = shown.map(({ t, st }) => card(t, st)).join('');
  $('empty').hidden = shown.length > 0;
}

async function init() {
  const state = await Store.getState();
  render(state);
  $('search').oninput = e => { query = e.target.value.trim().toLowerCase(); render(state); };
  document.querySelectorAll('.chip').forEach(b => b.onclick = () => {
    filter = b.dataset.f;
    document.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', x === b));
    render(state);
  });
}
window.addEventListener('pageshow', init); // refresh when returning via Back
