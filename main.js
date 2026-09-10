// Random Links. A definition list is exactly the right element for
// "term, then description", so no toggles and no styling are needed.
function loadRandomLinks() {
  const list = document.getElementById('random-links-list');
  if (!list) return;
  const links = Array.isArray(window.randomLinks) ? window.randomLinks : [];
  if (!links.length) {
    list.innerHTML = '<dt>Links failed to load.</dt><dd>Please refresh.</dd>';
    return;
  }
  list.innerHTML = '';
  links.forEach((link) => {
    const dt = document.createElement('dt');
    const a = document.createElement('a');
    a.href = link.url;
    a.textContent = link.title;
    if (link.inactive) {
      const s = document.createElement('s');   // struck through, no CSS needed
      s.appendChild(a);
      dt.appendChild(s);
    } else {
      dt.appendChild(a);
    }
    const dd = document.createElement('dd');
    dd.textContent = link.desc || '';
    list.appendChild(dt);
    list.appendChild(dd);
  });
}
loadRandomLinks();

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Bump this when you change the site. Deliberately manual: showing today's
// date automatically would claim an update that never happened.
const siteLastUpdated = '2026-09-10';
const lastUpdatedEl = document.getElementById('last-updated');
if (lastUpdatedEl) {
  const [year, month, day] = siteLastUpdated.split('-').map(Number);
  const updatedAt = new Date(Date.UTC(year, month - 1, day));
  const locale = document.documentElement.lang === 'sl' ? 'sl-SI' : 'en-GB';
  lastUpdatedEl.textContent = updatedAt.toLocaleDateString(locale, {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC'
  });
  lastUpdatedEl.setAttribute('datetime', siteLastUpdated);
}

const form = document.getElementById('contact-form');
if (form) {
  const statusEl = document.getElementById('status');
  const submitBtn = document.getElementById('submit-btn');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    if (data.get('company')) return;
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;
    statusEl.textContent = '';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data
      });
      statusEl.textContent = res.ok ? 'Message sent!' : 'Error. Try email instead.';
      if (res.ok) form.reset();
    } catch (err) {
      statusEl.textContent = 'Network error. Try again.';
    } finally {
      submitBtn.textContent = 'Send';
      submitBtn.disabled = false;
      setTimeout(() => { statusEl.textContent = ''; }, 5000);
    }
  });
}
