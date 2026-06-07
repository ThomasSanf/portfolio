# Portfolio landing page

Drop these into your Next.js project (pages router). They sit alongside the
ThreeReact boilerplate — your existing `threejs/` and `hooks/` folders are left
untouched (the new home page just doesn't import them).

## Files
- `pages/index.js` — landing page (navbar + hero + "My last works")
- `pages/_app.js` — imports global styles (replaces the boilerplate one)
- `pages/_document.js` — font preconnect + flash-free dark-mode init
- `pages/projects/[slug].js` — auto-generated project detail pages
- `components/` — Navbar, Hero, Works, ThemeToggle, icons
- `data/site.js` — all your personal info (name, bio, socials, CV link)
- `data/projects.js` — your projects; first 3 show on the landing page
- `styles/globals.css` — color tokens for light/dark + Google Fonts
- `styles/Home.module.css`, `styles/Project.module.css`

## To make it yours
1. Edit `data/site.js` (name, bio, location, social links, CV url).
2. Edit `data/projects.js` — each project's `slug` becomes its URL
   (`/projects/your-slug`). The cards link there automatically.
3. Add a photo at `public/profile.jpg` and your CV at `public/cv.pdf`.
4. `npm run dev`.

Fonts (Bricolage Grotesque / Hanken Grotesk / JetBrains Mono) load from Google
Fonts via @import in globals.css — no build-time fetch, no extra deps.
