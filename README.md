# Portfolio — Juan Diego Díaz Hidalgo

Personal site, live at [juandiegodiaz.vercel.app](https://juandiegodiaz.vercel.app). Built with Next.js 14 (App Router), React, TypeScript and Lenis, and deployed on Vercel.

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
├── components/   Nav, footer, case-study video and page effects
├── content/      Case-study copy (projects.ts)
├── home/         Homepage: markup, styles and script
└── lib/          Share-card layout
public/media/     Project demos and posters
```

## Editing content

- **Homepage:** `src/home/index.html` holds the hero, experience, education and project index. `styles.css` and `script.js` are inlined into it at build time.
- **Case studies:** `src/content/projects.ts` holds the sections, tags and status of each `/work/[slug]` page.
- **Share cards:** generated per page by the `opengraph-image.tsx` files.

Motion is reduced when the visitor prefers reduced motion.
