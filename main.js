function toggleLinkDescription(btn) {
  const descId = btn.getAttribute('aria-controls');
  const desc = document.getElementById(descId);
  if (!desc) return;
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!expanded));
  if (expanded) {
    desc.setAttribute('hidden', '');
  } else {
    desc.removeAttribute('hidden');
  }
  btn.textContent = '+';
  btn.setAttribute('aria-label', `${expanded ? 'Show' : 'Hide'} note for ${btn.dataset.linkTitle}`);
}

// Expandable link descriptions in Random Links section
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.desc-toggle');
  if (!btn) return;
  toggleLinkDescription(btn);
});

function loadRandomLinks() {
  const list = document.getElementById('random-links-list');
  if (!list) return;
  const links = Array.isArray(window.randomLinks) ? window.randomLinks : [];
  if (!links.length) {
    list.innerHTML = '<li class="muted">Links failed to load. Please refresh.</li>';
    return;
  }
  list.innerHTML = '';
  links.forEach((link, index) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = link.title;
      if (link.inactive) {
        a.classList.add('inactive-link');
      }

      const btn = document.createElement('button');
      const descId = `desc-link-${index}`;
      btn.className = 'desc-toggle';
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', descId);
      btn.setAttribute('aria-label', `Show note for ${link.title}`);
      btn.dataset.linkTitle = link.title;
      btn.textContent = '+';

      const desc = document.createElement('div');
      desc.className = 'link-desc';
      desc.id = descId;
      desc.hidden = true;
      desc.textContent = link.desc || '';

      li.appendChild(btn);
      li.appendChild(a);
      li.appendChild(desc);
      list.appendChild(li);
  });
}
loadRandomLinks();

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Bump this when you change the site. Deliberately manual: showing
// today's date automatically would claim an update that never happened.
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
    form.classList.add('submitting');
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;
    statusEl.textContent = '';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data
      });
      if (res.ok) {
        statusEl.textContent = 'Message sent!';
        statusEl.className = 'status success';
        form.reset();
      } else {
        statusEl.textContent = 'Error. Try email instead.';
        statusEl.className = 'status error';
      }
    } catch (err) {
      statusEl.textContent = 'Network error. Try again.';
      statusEl.className = 'status error';
    } finally {
      form.classList.remove('submitting');
      submitBtn.textContent = 'Send';
      submitBtn.disabled = false;
      setTimeout(() => {
        statusEl.textContent = '';
        statusEl.className = 'status';
      }, 5000);
    }
  });
}
