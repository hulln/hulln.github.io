# nhull.eu

My personal site: clean, minimal, with a bit of character. No build step and no
framework: just HTML, CSS, and a little vanilla JavaScript. Every page shares one
stylesheet and one masthead, so they all look the same.

Hosted on GitHub Pages (`hulln.github.io`) behind the custom domain
[nhull.eu](https://nhull.eu).

## Structure

```
index.html              Home (About, Work, Advocacy, Now, Skills)
blog/index.html         Blog: lists posts from nhull.pckt.blog
links/index.html        Random Links
contact/index.html      Contact form + email
privacy.html            Privacy notice
sl/index.html           Slovenian page (placeholder for now)
robots.txt              Crawler rules (site is intentionally not indexed)
CNAME                   Custom domain for GitHub Pages
assets/
  css/style.css         All styles (design tokens + components)
  js/main.js            Theme toggle, copy buttons, contact form, list rendering
  data/random-links.js  "Random Links" content (window.randomLinks)
  data/blog.js          Blog posts (window.blogPosts), auto-generated, don't edit
  img/                  Favicons
  other/                CV (PDF)
scripts/sync_blog.py    Fetches the blog RSS feed → assets/data/blog.js
.github/workflows/      sync-blog.yml runs the script on a daily schedule
```

Data is loaded as plain `<script>` globals (not `fetch`), so the site works the
same whether opened from a local file (`file://`) or served over HTTP. All asset
and page links are relative for the same reason.

## Editing

Open any `index.html` in a browser. There's nothing to compile. To change the
**Random Links**, edit `assets/data/random-links.js`. The **blog list** updates
itself (see below), so `assets/data/blog.js` should not be edited by hand.

## Blog auto-sync

The blog RSS feed (`https://nhull.pckt.blog/feed`) has no CORS headers, so the
browser can't read it directly. Instead, a GitHub Action
(`.github/workflows/sync-blog.yml`) runs `scripts/sync_blog.py` daily, which
fetches the feed and rewrites `assets/data/blog.js`, committing only if it
changed. New posts appear on `/blog` within a day, with no manual step.

> **One-time setup:** in GitHub → Settings → Actions → General → *Workflow
> permissions*, enable **Read and write permissions** so the Action can push.

## Deploying

Push to `main`. GitHub Pages serves the site automatically.

## Notable bits

- **Theme**: light/dark toggle, remembers the choice in `localStorage` and
  falls back to the OS preference.
- **Language**: an `SL` toggle links to the Slovenian page (work in progress).
- **Contact form**: posts to [Formspree](https://formspree.io/) with a simple
  honeypot field for spam.

## License

All content and code are dedicated to the public domain under
[CC0 1.0 Universal](LICENSE.md).
