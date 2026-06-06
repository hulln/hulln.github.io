# nhull.eu

Personal website source for nhull.eu, built with HTML, CSS, and JavaScript.

This repository is public because GitHub Pages serves the site from here. The implementation can be forked and reused, but the personal/site-specific content should be replaced before publishing a derivative site.

## Site Structure

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

## Maintenance Notes

There is no build step. Most pages can be edited directly as HTML. To change the Random Links page, edit `assets/data/random-links.js`.

Deployments happen through GitHub Pages from `main`.

## Site Notes

- **Theme**: light/dark toggle, remembers the choice in `localStorage` and falls back to the OS preference.
- **Language**: an `SL` toggle links to the Slovenian page (work in progress).
- **Contact form**: posts to [Formspree](https://formspree.io/) with a simple honeypot field for spam.

## Personal Content

This site contains personal text, profile links, contact details, form endpoints, metadata, and a CV. Treat those as site content, not sample data.

## Forking This Site

You are welcome to fork this repository as a starting point for your own personal website.

Before publishing your fork, replace all personal/site-specific content, including names, text, CV files, contact links, metadata, favicons, images, form endpoints, analytics IDs, and profile links.

The reusable code is MIT licensed. The personal content is not licensed for reuse.

## License

Reusable code and styling are available under the MIT License. Personal/site-specific content is not licensed for reuse. See [LICENSE.md](LICENSE.md).
