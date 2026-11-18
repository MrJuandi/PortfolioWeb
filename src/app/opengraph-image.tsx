import { ogCard, ogSize } from '@/lib/og';

export const alt = 'Juan Diego Díaz Hidalgo — Engineer, Madrid';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return ogCard({
    kicker: 'Engineer — Madrid',
    title: 'Juan Diego Díaz Hidalgo',
    sub: 'I build ML models, data pipelines and the software around them.',
    footer: 'Nightjar · LOSSIA · Halfline',
  });
}
