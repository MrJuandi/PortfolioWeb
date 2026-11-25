import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };

// Shared share-card layout: near-black page, light type, the J mark.
export function ogCard({ kicker, title, sub, footer }: { kicker: string; title: string; sub: string; footer: string }) {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0b0a10', color: '#ece8df', padding: '64px 72px', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', width: 56, height: 56, background: '#ece8df' }}>
            <svg width="56" height="56" viewBox="0 0 64 64"><path d="M38 14v22a10 10 0 0 1-20 0" fill="none" stroke="#0b0a10" strokeWidth="7" strokeLinecap="square" /></svg>
          </div>
          <div style={{ display: 'flex', fontSize: 22, color: '#938e9c' }}>{kicker}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 120, fontWeight: 600, letterSpacing: -5, lineHeight: 1 }}>{title}</div>
          <div style={{ display: 'flex', marginTop: 28, fontSize: 34, lineHeight: 1.3, color: '#bdb8c0', maxWidth: 940 }}>{sub}</div>
        </div>
        <div style={{ display: 'flex', borderTop: '2px solid #48434f', paddingTop: 22, fontSize: 24, color: '#938e9c' }}>{footer}</div>
      </div>
    ),
    ogSize,
  );
}
