# nhull.eu

Static personal site for nhull.eu built with HTML, CSS, and a little vanilla JavaScript.

## Structure

```
index.html              Home (About, Work, Advocacy, Now, Skills)
blog/index.html         Redirects to nhull.pckt.blog
links/index.html        Random Links
contact/index.html      Contact form + email
privacy.html            Privacy notice
sl/index.html           Slovenian page (placeholder for now)
robots.txt              Crawler rules (site is intentionally not indexed)
CNAME                   Custom domain for GitHub Pages
assets/
  css/style.css         Shared styles
  js/main.js            Theme toggle, copy buttons, contact form, list rendering
  data/random-links.js  Random Links content
  img/                  Favicons
  other/                CV (PDF)
```

The Blog menu item points to pckt.blog, and `/blog` redirects there too. Other links stay relative so the site works the same from a local file or over HTTP.

## Editing

Open any `index.html` in a browser. There's nothing to compile. To change the Random Links, edit `assets/data/random-links.js`.

## Deploying

Push to `main`. GitHub Pages serves the site automatically.

## Notable bits

- **Theme**: light/dark toggle, remembers the choice in `localStorage` and falls back to the OS preference.
- **Language**: an `SL` toggle links to the Slovenian page (work in progress).
- **Contact form**: posts to [Formspree](https://formspree.io/) with a simple honeypot field for spam.

## License

All content and code are dedicated to the public domain under [CC0 1.0 Universal](LICENSE.md).
