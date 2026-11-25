# Portfolio — Juan Diego Díaz Hidalgo

Personal site, live at [juandiegodiaz.vercel.app](https://juandiegodiaz.vercel.app). Built with Next.js 14 (App Router), React and TypeScript, and deployed on Vercel.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

## Structure

```text
src/
├── app/          Routes, layout, global styles and share cards
│   ├── route.ts         Serves the homepage at /
│   └── work/[slug]/     Case-study pages
├── components/   Nav, footer and case-study video
├── content/      Case-study copy (projects.ts)
├── home/         Homepage: markup, styles and script
└── lib/          Share-card layout
public/media/     Project demos and posters
public/data/      Recorded Pandion episode replayed on the homepage
```

## Editing content

- **Homepage:** `src/home/index.html` holds the landing (with the Pandion replay), path, projects and contact. `styles.css`, `script.js` and `demos.js` (project previews and video dialogs) are inlined into it at build time.
- **Case studies:** `src/content/projects.ts` holds the sections, tags and status of each `/work/[slug]` page.
- **Share cards:** generated per page by the `opengraph-image.tsx` files.

Motion is reduced when the visitor prefers reduced motion.
