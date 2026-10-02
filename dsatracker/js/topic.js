/* Detail view: problem checklist, difficulty filter, notes, prev/next. */
const $ = id => document.getElementById(id);
const id = new URLSearchParams(location.search).get('id');
const idx = TOPICS.findIndex(t => t.id === id);

async function init() {
  if (idx < 0) {
    $('topic').innerHTML = '<h1>Topic not found</h1><p class="lead">That topic does not exist.</p><a class="btn" href="dashboard.html">Back to dashboard</a>';
    return;
  }
  const topic = TOPICS[idx];
  let state = await Store.getState(), level = 'all';
  document.title = `${topic.title} - DSA Log`;
  $('title').textContent = topic.title;
  $('desc').textContent = topic.desc;

  const updateProgress = () => {
    const st = Store.stats(topic, state);
    $('bar').setAttribute('aria-valuenow', st.pct);
    $('bar').classList.toggle('done', st.pct === 100);
    $('bar').firstElementChild.style.width = st.pct + '%';
    $('count').textContent = `${st.done} of ${st.total} solved`;
  };

  const renderList = () => {
    const list = topic.problems.filter(p => level === 'all' || p.level === level);
    $('plist').innerHTML = list.map(p => `<li class="prob ${state.done[p.id] ? 'is-done' : ''}">
      <input type="checkbox" id="${p.id}" ${state.done[p.id] ? 'checked' : ''}>
      <label for="${p.id}">${p.name}</label><span class="tag ${p.level}">${p.level}</span></li>`).join('')
      || '<li>No problems at this level.</li>';
  };

  $('plist').onchange = async e => {
    state = await Store.toggleProblem(e.target.id);
    e.target.closest('.prob').classList.toggle('is-done', e.target.checked);
    updateProgress();
  };
  document.querySelectorAll('.chip').forEach(b => b.onclick = () => {
    level = b.dataset.l;
    document.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', x === b));
    renderList();
  });

  const note = $('note'); let timer;
  note.value = state.notes[topic.id] || '';
  note.oninput = () => {
    $('status').textContent = 'Saving...';
    clearTimeout(timer);
    timer = setTimeout(async () => { await Store.saveNote(topic.id, note.value); $('status').textContent = 'Note saved.'; }, 500);
  };

  const prev = TOPICS[idx - 1], next = TOPICS[idx + 1];
  $('pager').innerHTML =
    (prev ? `<a class="btn alt" href="topic.html?id=${prev.id}">Previous: ${prev.title}</a>` : '<span></span>') +
    (next ? `<a class="btn" href="topic.html?id=${next.id}">Next: ${next.title}</a>` : '');
  updateProgress(); renderList();
}
init();
