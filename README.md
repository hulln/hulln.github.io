# nhull.eu

Source for my personal website. Plain HTML, CSS and JavaScript. No build step.

## Template credit

The site is styled as a Windows XP Notepad window using **"Notepad.exe"**, a free
web template by **Bryant Smith** — <http://www.bryantsmith.com>.

Downloaded from <https://www.html.am/templates/downloads/bryantsmith/notepad/>.

The window chrome in `img/` (`titlebar.png`, `menu.png`, `notepad_back.png`,
`footer.png`, `background.png`, `icon.png`) is his artwork, and the layout rules
at the top of `style.css` are his. His only condition, in the template source, is
"please leave my link somewhere in your page, that is all I ask".

The footer of every page carries "template by bryant smith": *template* links to the
html.am download page, *bryant smith* links to his own site. The second one is the
link he actually asked for -- keep that one if you reuse this. The first is a
courtesy, pointing at where the template came from.

See [LICENSE.md](LICENSE.md) — the MIT grant covers my code, not his template.

## Files

```
index.html      Home
privacy.html    Privacy notice
blog/           Redirects to nhull.pckt.blog
links/          Random Links
contact/        Contact form
sl/             Slovenian page (placeholder)

style.css       All styling
main.js         Contact form, links list, dates
links.js        Random Links content
cv.pdf          CV
img/            Window chrome + favicon

CNAME           Custom domain
robots.txt      Crawler rules (the site is intentionally not indexed)
```

That is the whole repository.

## How it works

Every page has the same four parts, which come from the template:

```html
<div id="page">
  <div id="titlebar">   the filename, e.g. nh.txt - Notepad
  <div id="bar">        the menu strip, used for navigation
  <div id="main">       the text area
  <div id="footer">     small print + the two credits, all on one 9px line
</div>
```

The window is a fixed **614px** wide, because the chrome images are exactly that
wide. Pages carry **no `viewport` meta tag on purpose**, so phones scale the whole
window down to fit instead of overflowing it.

The footer strip holds everything meta on a single line: copyright, Privacy Notice,
last-updated date, and the template and icon credits. It has to stay one line —
`footer.png` is only white above y=17, and below that is the scrollbar artwork.

Profile links (LinkedIn, ORCID, GitHub, Hugging Face) live on the Contact page under
"Elsewhere", not in the footer.

`img/icon.png` is the title-bar icon, from the template.

`img/favicon.png` is the browser-tab icon: a pixel-art tree by
[Magnific](https://www.flaticon.com/authors/magnific), from
[Flaticon](https://www.flaticon.com/free-icon/tree_12414749), used under their free
licence, which requires crediting its author. That credit is in the footer of every
page alongside Bryant Smith's. It is stored at 34x34 — exactly 2x its native 17x17
pixel grid — because resampling pixel art to 16 or 32 turns it to mush.

## Editing

- Text: edit the HTML directly.
- Random Links: edit `links.js`.
- "Last updated" date: edit `siteLastUpdated` at the top of the block in `main.js`.
- Title-bar icon: replace `img/icon.png` (16x16 PNG).
- Favicon: replace `img/favicon.png`, and update the credit in every footer.

Deploys via GitHub Pages from `main`.

## Previous design

The earlier site (Inter, responsive layout, light/dark toggle) is kept in git:

```
git checkout v1-original    # tag
git checkout style/v1       # branch at the same commit
```

## Reuse

You are welcome to fork this as a starting point. Before publishing, replace all
personal content: names, text, `cv.pdf`, contact links, form endpoint, analytics
IDs, verification tags and profile links. Keep Bryant Smith's footer credit.

My code is MIT licensed. My personal content is not licensed for reuse. The
template is his. See [LICENSE.md](LICENSE.md).
