# Portfolio — Juan Diego Díaz Hidalgo

Personal site built with Next.js 14 (App Router). Black and white, with a pinned project showcase and a case-study page per project.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Editing content

- **Projects:** `src/content/projects.ts`. Each project feeds the hero index, the showcase and its `/work/[slug]` case study (sections, tags, status). Media goes in `public/media`.
- **Path (experience and education):** `src/content/path.ts`.
- **Share cards:** generated automatically per page by `src/app/opengraph-image.tsx` and `src/app/work/[slug]/opengraph-image.tsx`.

## Notes

- Page-to-page transitions use the View Transitions API through `next-view-transitions`; browsers without support navigate normally.
- Smooth scrolling uses Lenis. Motion is reduced when the visitor prefers reduced motion.
