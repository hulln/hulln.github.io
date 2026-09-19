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

// Show the page's actual Last-Modified date. On GitHub Pages this is
// refreshed when the deployed page changes; the HTML value remains a fallback.
const lastUpdatedEl = document.getElementById('last-updated');
if (lastUpdatedEl) {
  const updatedAt = new Date(document.lastModified);
  if (!Number.isNaN(updatedAt.getTime())) {
    const locale = document.documentElement.lang === 'sl' ? 'sl-SI' : 'en-GB';
    lastUpdatedEl.textContent = updatedAt.toLocaleDateString(locale, {
      day: 'numeric', month: 'short', year: 'numeric'
    });
    lastUpdatedEl.setAttribute('datetime', [
      updatedAt.getFullYear(),
      String(updatedAt.getMonth() + 1).padStart(2, '0'),
      String(updatedAt.getDate()).padStart(2, '0')
    ].join('-'));
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

// Latest public posts from the nhull.eu Bluesky account.
// The DID is stable even if the account handle changes.
async function loadBlueskyFeed() {
  const container = document.getElementById('bluesky-feed');
  if (!container) return;

  const did = 'did:plc:qpzcef5ittvv3bw45fmfjlkc';
  const endpoint = `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${encodeURIComponent(did)}&limit=12&filter=posts_no_replies`;

  container.setAttribute('aria-busy', 'true');
  container.innerHTML = '<p class="small-note">Loading latest posts...</p>';

  try {
    const res = await fetch(endpoint, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Bluesky returned ${res.status}`);

    const data = await res.json();
    const posts = (Array.isArray(data.feed) ? data.feed : [])
      .filter((entry) => entry?.post && !entry.reply && !entry.reason)
      .slice(0, 3);

    container.innerHTML = '';

    if (!posts.length) {
      const note = document.createElement('p');
      note.className = 'small-note';
      note.textContent = 'No recent posts to show.';
      container.appendChild(note);
      return;
    }

    posts.forEach((entry) => {
      const post = entry.post;
      const record = post.record || {};
      const rkey = typeof post.uri === 'string' ? post.uri.split('/').pop() : '';
      const handle = post.author?.handle || 'nhull.eu';
      const postUrl = rkey
        ? `https://bsky.app/profile/${encodeURIComponent(handle)}/post/${encodeURIComponent(rkey)}`
        : `https://bsky.app/profile/${encodeURIComponent(handle)}`;

      const article = document.createElement('article');
      article.className = 'bluesky-post';

      const textEl = document.createElement('p');
      textEl.className = 'bluesky-text';
      textEl.textContent = typeof record.text === 'string' && record.text.trim()
        ? record.text
        : 'Post on Bluesky';

      const meta = document.createElement('p');
      meta.className = 'bluesky-meta';

      const createdAt = new Date(record.createdAt || post.indexedAt);
      if (!Number.isNaN(createdAt.getTime())) {
        const dateFormatter = new Intl.DateTimeFormat('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          timeZone: 'Europe/Ljubljana'
        });
        const dateParts = new Intl.DateTimeFormat('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          timeZone: 'Europe/Ljubljana'
        }).formatToParts(createdAt);
        const dateValues = Object.fromEntries(
          dateParts
            .filter((part) => ['day', 'month', 'year'].includes(part.type))
            .map((part) => [part.type, part.value])
        );

        const timeEl = document.createElement('time');
        timeEl.dateTime = `${dateValues.year}-${dateValues.month}-${dateValues.day}`;
        timeEl.textContent = dateFormatter.format(createdAt);
        meta.appendChild(timeEl);
        meta.appendChild(document.createTextNode(' · '));
      }

      const link = document.createElement('a');
      link.href = postUrl;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = 'View on Bluesky';
      meta.appendChild(link);

      article.appendChild(textEl);
      article.appendChild(meta);
      container.appendChild(article);
    });
  } catch (err) {
    container.innerHTML = '';
    const note = document.createElement('p');
    note.className = 'small-note';
    note.textContent = 'Latest posts could not be loaded right now.';
    container.appendChild(note);
  } finally {
    container.setAttribute('aria-busy', 'false');
  }
}

loadBlueskyFeed();

