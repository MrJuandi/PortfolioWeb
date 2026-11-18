# Portfolio — Juan Diego Díaz Hidalgo

Personal site built with Next.js 14 (App Router). Snell is the homepage at `/`, with a hexagon hero and expandable project demos. Case studies live at `/work/[slug]`.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Editing content

- **Homepage:** `src/content/snell.html` contains the hero, experience, education and project index.
- **Case studies:** `src/content/projects.ts` contains the sections, tags and status for each `/work/[slug]` page. Both the homepage and the case studies use the files in `public/media`.
- **Share cards:** generated automatically per page by `src/app/opengraph-image.tsx` and `src/app/work/[slug]/opengraph-image.tsx`.

## Notes

- Case-study links use the View Transitions API where supported. Snell and the case studies link to one another with regular navigation.
- Smooth scrolling uses Lenis. Motion is reduced when the visitor prefers reduced motion.
