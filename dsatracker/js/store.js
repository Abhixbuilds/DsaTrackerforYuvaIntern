/* Mock back-end service. Same async interface a real REST API would have,
   persisted in localStorage. Swap the bodies for fetch() calls to go live. */
const Store = (() => {
  const KEY = 'dsa-log-v1';
  const empty = () => ({ done: {}, notes: {} });
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || empty(); } catch { return empty(); } };
  const write = s => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* storage blocked: stay in memory */ } };
  const reply = v => new Promise(r => setTimeout(() => r(v), 100)); // simulate network
  return {
    getState: () => reply(read()),
    toggleProblem(id) { const s = read(); s.done[id] = !s.done[id]; write(s); return reply(s); },
    saveNote(topicId, text) { const s = read(); s.notes[topicId] = text; write(s); return reply(s); },
    stats(topic, s) {
      const done = topic.problems.filter(p => s.done[p.id]).length, total = topic.problems.length;
      return { done, total, pct: Math.round(done / total * 100) };
    }
  };
})();
