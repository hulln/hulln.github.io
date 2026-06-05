const root = document.documentElement;

const btn = document.getElementById('theme-toggle');
const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');

function getSavedTheme() {
  try {
    const saved = localStorage.getItem('theme');
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch (e) {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem('theme', theme);
  } catch (e) {}
}

function getPreferredTheme() {
  return themeQuery.matches ? 'dark' : 'light';
}

let selectedTheme = getSavedTheme();
let activeTheme = selectedTheme || getPreferredTheme();

const themeIcons = {
  light: '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="theme-icon-stroke" d="M12 2.5v2M12 19.5v2M4.6 4.6l1.45 1.45M17.95 17.95l1.45 1.45M2.5 12h2M19.5 12h2M4.6 19.4l1.45-1.45M17.95 6.05l1.45-1.45"/><circle class="theme-icon-fill" cx="12" cy="12" r="4.25"/></svg>',
  dark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="theme-icon-fill" d="M19.35 15.05A7.85 7.85 0 0 1 8.95 4.65a.95.95 0 0 0-1.1-1.5A9.75 9.75 0 1 0 20.85 16.15a.95.95 0 0 0-1.5-1.1Z"/></svg>'
};

function updateTheme() {
  const isSl = document.documentElement.lang === 'sl';
  const isDark = activeTheme === 'dark';
  root.classList.toggle('dark', isDark);
  if (!btn) return;
  btn.innerHTML = isDark ? themeIcons.light : themeIcons.dark;
  btn.title = isDark ? (isSl ? 'Preklopi na svetlo temo' : 'Switch to light theme') : (isSl ? 'Preklopi na temno temo' : 'Switch to dark theme');
  btn.setAttribute('aria-label', btn.title);
}
updateTheme();

if (btn) {
  btn.addEventListener('click', () => {
    activeTheme = activeTheme === 'dark' ? 'light' : 'dark';
    selectedTheme = activeTheme;
    saveTheme(selectedTheme);
    updateTheme();
  });
}

function syncSystemTheme() {
  if (selectedTheme) return;
  activeTheme = getPreferredTheme();
  updateTheme();
}

if (themeQuery.addEventListener) {
  themeQuery.addEventListener('change', syncSystemTheme);
} else {
  themeQuery.addListener(syncSystemTheme);
}

document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(btn.dataset.copy);
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 2000);
  });
});

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

const lastUpdatedEl = document.getElementById('last-updated');
if (lastUpdatedEl) {
  const parsed = new Date(document.lastModified);
  if (!Number.isNaN(parsed.getTime())) {
    lastUpdatedEl.textContent = parsed.toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
    lastUpdatedEl.setAttribute('datetime', parsed.toISOString().slice(0, 10));
  }
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
