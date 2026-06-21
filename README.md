# Alex Morgan — Operations Analyst Portfolio + Blog

A free, interactive portfolio and blog built with [Jekyll](https://jekyllrb.com/) and hosted on [GitHub Pages](https://pages.github.com/) — no servers, no paid hosting, no build tools required on your machine.

**Design concept:** the site is framed as a live "ops console" — a status bar, animated KPI sparklines, a capability matrix, and a click-to-expand work timeline — because that's genuinely how operations analysts spend their day: watching dashboards and reading signal from noise.

All names, numbers, employers, and projects in this repo are **placeholder content**. Nothing here is real — replace it with your own before you publish.

---

## 1. Get it onto GitHub (5 minutes)

1. Create a new repository on GitHub. For a free site at `https://your-username.github.io`, name the repo exactly `your-username.github.io`. (You can also use any other repo name — your site will just live at `your-username.github.io/repo-name` instead.)
2. Upload everything in this folder to that repository (drag-and-drop on github.com works fine, or use git/GitHub Desktop).
3. In the repo, go to **Settings → Pages**. Under "Build and deployment", set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)`. Save.
4. Wait 1–2 minutes, then visit the URL GitHub gives you. That's your live site — GitHub rebuilds it automatically every time you push.

If your repo is **not** named `your-username.github.io`, open `_config.yml` and set:

```yaml
url: "https://your-username.github.io"
baseurl: "/your-repo-name"
```

---

## 2. Replace the placeholder content

| What | Where |
|---|---|
| Your name, role, tagline | `_config.yml` (top) and the hero in `index.html` |
| Bio, stats, KPI numbers | `index.html` — sections `#about` and `#metrics` |
| Skills / capability matrix | `index.html` — `data-pct="XX"` controls each meter's fill % |
| Work history | `index.html` — `#experience` timeline |
| Projects / case studies | `index.html` — `#projects` case cards. The `data-tags` attribute controls which filter buttons show each card |
| Contact email / LinkedIn / GitHub | `index.html` — `#contact` section |
| Resume PDF | Add a file at `assets/alex-morgan-resume.pdf` (the download button already links here) |
| Site colors/fonts | `assets/css/style.css` — all tokens are CSS variables at the top of the file under `:root` |

Everything is plain HTML with [Liquid](https://jekyllrb.com/docs/liquid/) templating — you don't need to know Jekyll deeply to edit text, just don't delete the `---` front matter block at the top of `index.html` or `blog.html`.

---

## 3. Writing blog posts (the free part)

Every file in `_posts/` becomes a blog post automatically — no CMS, no database, no extra service. To add one:

1. Create a new file in `_posts/` named `YYYY-MM-DD-a-short-title.md`.
2. Add this at the top, then write in Markdown below it:

```markdown
---
layout: post
title: "Your Post Title"
date: 2026-07-01
category: process
excerpt: "One sentence that shows up in the post list."
---

Write your post here using normal Markdown — headings, **bold**, lists, links, etc.
```

3. Commit/push. GitHub Pages rebuilds the site and your post appears at `/blog/` and on the homepage's "Field Notes" preview automatically — newest three posts only on the homepage, full archive at `/blog/`.

No Jekyll install, no `bundle exec`, no terminal needed — this works entirely through GitHub's web interface if you want.

---

## 4. Making the contact form actually send email (optional, free)

The contact form is a static placeholder — there's no backend, since this is a free static site. To make it real in about two minutes:

1. Sign up at [Formspree](https://formspree.io) (free tier covers personal portfolios).
2. Create a form and copy the endpoint URL it gives you (looks like `https://formspree.io/f/abc123`).
3. In `index.html`, change `<form class="contact-form" id="contactForm">` to:
   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/abc123" method="POST">
   ```
4. Remove the `e.preventDefault()` JS block at the bottom of `index.html` (the small inline `<script>` tag), since the form can now submit for real.

---

## 5. Previewing changes locally (optional)

You don't need this to use the site — GitHub builds it for you. But if you want to preview edits before pushing:

```bash
gem install bundler
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`.

---

## What's interactive on this site

- Live status bar clock and "system online" indicator
- Animated KPI counters and Chart.js sparkline trend charts
- Scroll-triggered reveal animations (respects `prefers-reduced-motion`)
- Click-to-expand work history timeline
- Filterable project/case-file gallery
- Auto-updating blog list and homepage "latest posts" feed — just add Markdown files
- Free RSS feed at `/feed.xml` (via `jekyll-feed`) and SEO tags (via `jekyll-seo-tag`), both built in

## File map

```
_config.yml         site settings — name, description, URL
_layouts/
  default.html       shared header/nav/footer used by every page
  post.html           wraps individual blog posts
_posts/               your blog posts (one .md file each)
index.html            the portfolio homepage
blog.html             the blog index (auto-lists all posts)
assets/css/style.css  all design/visual styling
assets/js/main.js     all interactivity (clock, charts, filters, animations)
```
