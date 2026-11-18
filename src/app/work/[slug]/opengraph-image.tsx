import { ogCard, ogSize } from '@/lib/og';
import { projects, getProject } from '@/content/projects';

export const alt = 'Case study';
export const size = ogSize;
export const contentType = 'image/png';
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export default function Image({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug)!;
  const sub = p.description.length > 150 ? p.description.slice(0, p.description.lastIndexOf(' ', 150)) + '…' : p.description;
  return ogCard({
    kicker: `${p.status} · ${p.year}`,
    title: p.title,
    sub,
    footer: 'Case study — Juan Diego Díaz Hidalgo',
  });
}
