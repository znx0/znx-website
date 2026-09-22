# znx-website

Personal website & technical portfolio, built with [Hugo](https://gohugo.io/).

Live at [0xznx.com](https://0xznx.com)

## Overview

A minimal, hand-written Hugo site (no external theme) featuring:

- **Home** — landing page with an animated particle background (interactive with mouse) and social links
- **[0xDump](https://0xznx.com/dump/)** — blog-style list of projects and CTF write-ups
- **[Objectives](https://0xznx.com/objectives/)** — a living checklist of goals, in progress and completed
- **CV** — redirects to a separate CV site, built and deployed independently (see [znx0/cv](https://github.com/znx0/cv))

## Tech Stack

- [Hugo](https://gohugo.io/) (static site generator)
- Hand-written HTML/CSS, no theme or framework
- Vanilla JavaScript for the animated background (`static/js/particles-bg.js`) — no external libraries.
  Visual concept inspired by [ryanmontgomery.me](https://ryanmontgomery.me/)
- [Font Awesome](https://fontawesome.com/) for icons (loaded via Kit)
- Hosted on **GitHub Pages**, DNS/CDN through **Cloudflare**

# Project Structure

.
├── content/ # Markdown content (dump.md, objectives.md, ...)
├── layouts/
│ ├── index.html # Home page template
│ └── _default/
│ └──  single.html # Template for standalone pages (dump, objectives)
├── static/
│ ├── css/main.css # All styling
│ ├── js/particles-bg.js
│ ├── avatar.png
│ └── CNAME # Custom domain (0xznx.com)
├── hugo.toml
└── .github/workflows/ # GitHub Actions: build & deploy to GitHub Pages


## Running locally

Requires [Hugo](https://gohugo.io/installation/) (extended version).

```bash
git clone https://github.com/znx0/znx-website.git
cd znx-website
hugo server -D
```

Visit `http://localhost:1313`.

## Deployment

Deployment is automatic via GitHub Actions on every push to `main`: the site is built with `hugo --minify` and published to GitHub Pages.
DNS for `0xznx.com` is managed through Cloudflare, pointing to GitHub Pages.

## Adding a new page

1. Create a new Markdown file under `content/`, e.g. `content/mypage.md`
2. Add a menu entry in `hugo.toml`:
   \`\`\`toml
   [[menu.main]]
     name = "My Page"
     url = "/mypage/"
     weight = 5
   \`\`\`
3. Add the same link to the hardcoded nav in `layouts/index.html` (the home page menu is written by hand, not generated from `hugo.toml`)

## License

Content and code are personal; feel free to reference the structure if you liked it.
