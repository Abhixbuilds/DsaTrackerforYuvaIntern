/* Landing page: live preview of the saved progress. */
(async () => {
  const s = await Store.getState();
  document.getElementById('preview').innerHTML = TOPICS.map(t => {
    const st = Store.stats(t, s);
    return `<li class="row"><b>${t.title}</b>
      <div class="bar ${st.pct === 100 ? 'done' : ''}" role="progressbar" aria-label="${t.title}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${st.pct}"><span style="width:${st.pct}%"></span></div>
      <span>${st.pct}%</span></li>`;
  }).join('');
})();
