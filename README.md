# nhull.eu

Source for my personal website. Plain HTML, CSS and JavaScript. No build step.

## Design

A green strip on the left holds a handwritten menu, the EN/SL switch, two doodles
and the footer; the text sits on the right. Below 760px wide the strip becomes a
bar across the top.

The handwriting is mine: the menu words, EN/SL, the flower and cloud, and the
handwritten half of the Slovene page. Each word is an inline `<svg>` drawn with
`currentColor`, so it takes its colour from the CSS. Each handwritten link has an
`aria-label` with the real word, so screen readers still get the text.

Fonts are Bricolage Grotesque (headings, site name, footer, form) and Source Serif 4 (text).
They are self-hosted in `fonts/`, so no request goes to Google: subset to Latin and
Latin Extended (enough for Slovene), converted to WOFF2, and used under the SIL Open
Font License (`fonts/OFL.txt`).

## Files

```
index.html      Home
privacy.html    Privacy notice
blog/           Redirects to nhull.pckt.blog
links/          Random Links
contact/        Contact form
sl/             Slovenian page (placeholder)
nextcloud/      Notes about the personal Nextcloud setup

style.css       All styling; colours, fonts and sizes are variables at the top
main.js         Contact form, links list, dates
links.js        Random Links content
cv.pdf          CV
img/            Favicon + Nextcloud artwork
fonts/          Bricolage Grotesque + Source Serif 4 (WOFF2) and their licence

CNAME           Custom domain
robots.txt      Crawler rules (the site is intentionally not indexed)
```

That is the whole repository.

## How it works

Every page has the same two parts:

```html
<div class="layout">
  <div class="strip">   site name, handwritten menu, EN/SL, doodles, footer
  <main>                the text
</div>
```

There is no build step, so the strip is copied into each page. A change to the
menu or the footer has to be made in all six: `index.html`, `privacy.html`,
`blog/`, `links/`, `contact/` and `sl/`. Links are relative (`../contact/index.html`)
so the pages also work when opened straight from disk.

The footer holds everything meta: copyright, last-updated date, Privacy Notice,
Cloud and the favicon credit. The Slovene page has a Slovene footer.

Profile links (LinkedIn, ORCID, GitHub, Hugging Face) live on the Contact page under
"Elsewhere", not in the footer.

`img/favicon.png` is the browser-tab icon: a pixel-art tree by
[Magnific](https://www.flaticon.com/authors/magnific), from
[Flaticon](https://www.flaticon.com/free-icon/tree_12414749), used under their free
licence, which requires crediting its author. That credit is in the footer of every
page. It is stored at 34x34 — exactly 2x its native 17x17 pixel grid — because
resampling pixel art to 16 or 32 turns it to mush.

## Editing

- Text: edit the HTML directly.
- Colours, fonts, sizes: edit the variables at the top of `style.css`. A different
  font also needs its WOFF2 file in `fonts/` and an `@font-face` rule, which sit
  right below the variables.
- Random Links: edit `links.js`.
- "Last updated" date: set automatically by `main.js` from the page's
  last-modified date; the date written in each footer is only the fallback.
- Favicon: replace `img/favicon.png`, and update the credit in every footer.

Deploys via GitHub Pages from `main`.

## Nextcloud

The **Cloud** link in the site footer opens the personal Nextcloud instance at
<https://cloud.nhull.eu>. A separate page in `nextcloud/` documents the setup.

The test instance was set up in September 2026 using Nextcloud All-in-One on an
Oracle Cloud Always Free ARM server in Frankfurt:

- Ubuntu 24.04 LTS Minimal
- `VM.Standard.A1.Flex`, 2 OCPUs and 12 GB RAM
- Docker and Nextcloud All-in-One
- a separate 150 GB ext4 block volume mounted at `/mnt/nextcloud-data`
- Nextcloud data stored in `/mnt/nextcloud-data/nextcloud`
- PostgreSQL, Redis, Apache/Caddy, Client Push, EuroOffice, Imaginary and
  Nextcloud Whiteboard

The server is intended for private file storage, sharing, browser-based document
editing and testing Nextcloud administration. Files are private unless they are
explicitly shared.

Nextcloud artwork lives in `img/nextcloud/`: `cloud-coffee.png` is the full logo
and favicon, while `cloud.png` is the simplified mark.

Artwork credits:

- [Cloud icon](https://www.flaticon.com/free-icon/cloud_8928656) from Flaticon
- [Cloud with coffee icon](https://www.flaticon.com/free-icon/cloud_8928665) from Flaticon

## Previous design

The earlier site (Inter, responsive layout, light/dark toggle) is kept in git:

```
git checkout v1-original    # tag
git checkout style/v1       # branch at the same commit
```

The Windows XP Notepad version after that (Bryant Smith's "Notepad.exe" template,
<http://www.bryantsmith.com>) is the last commit before the redesign:

```
git checkout 23a437c
```

## Reuse

This repository may be forked as a starting point. Before publishing a fork,
replace all personal content: names, text, `cv.pdf`, contact links, the form
endpoint, analytics IDs, verification tags, profile links and the handwriting.

The site-specific code is available under the MIT License. Personal content is
not licensed for reuse. See [LICENSE.md](LICENSE.md).
