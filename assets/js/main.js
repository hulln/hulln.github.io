const root = document.documentElement;

const btn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

function updateTheme() {
  const isSl = document.documentElement.lang === 'sl';
  if (isDark) {
    root.classList.add('dark');
    btn.textContent = isSl ? '[ SVETLO ]' : '[ LIGHT ]';
  } else {
    root.classList.remove('dark');
    btn.textContent = isSl ? '[ TEMNO ]' : '[ DARK ]';
  }
}
updateTheme();

btn.addEventListener('click', () => {
  isDark = !isDark;
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateTheme();
});

document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(btn.dataset.copy);
    btn.textContent = '[copied!]';
    setTimeout(() => btn.textContent = '[copy]', 2000);
  });
});

const introText = "Digital linguistics student at the University of Ljubljana.";
const introEl = document.getElementById('animated-intro');
let i = 0;
function typeIntro() {
  if (i < introText.length) {
    introEl.textContent += introText.charAt(i);
    i++;
    setTimeout(typeIntro, 35);
  }
}

// Expandable link descriptions in Random Links section
document.querySelectorAll('.desc-toggle').forEach(btn => {
  btn.addEventListener('click', function() {
    const descId = btn.getAttribute('aria-controls');
    const desc = document.getElementById(descId);
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    if (expanded) {
      desc.setAttribute('hidden', '');
    } else {
      desc.removeAttribute('hidden');
    }
    btn.textContent = expanded ? '[+]' : '[-]';
  });
});
typeIntro();

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('last-updated').textContent =
  new Date(document.lastModified).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

const form = document.getElementById('contact-form');
const statusEl = document.getElementById('status');
const submitBtn = document.getElementById('submit-btn');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  if (data.get('company')) return;
  form.classList.add('submitting');
  submitBtn.textContent = '[ SENDING... ]';
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
    submitBtn.textContent = '[ SEND ]';
    submitBtn.disabled = false;
    setTimeout(() => {
      statusEl.textContent = '';
      statusEl.className = 'status';
    }, 5000);
  }
});