import type { Metadata, Viewport } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistSans } from 'geist/font/sans';
import { Martian_Mono } from 'next/font/google';
import { ViewTransitions } from 'next-view-transitions';
import Nav from '@/components/Nav';
import './globals.css';

const mono = Martian_Mono({ subsets: ['latin'], axes: ['wdth'], variable: '--font-martian' });

const site = 'https://juandiegodiaz.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: 'Juan Diego Díaz Hidalgo', template: '%s — Juan Diego Díaz Hidalgo' },
  description: 'Engineer in Madrid. I build ML models, data pipelines and the software around them.',
  openGraph: { type: 'website', siteName: 'Juan Diego Díaz Hidalgo' },
};

export const viewport: Viewport = { themeColor: '#0b0a10' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="en" className={`${GeistSans.variable} ${mono.variable}`}>
        <body>
          <a className="skip" href="#main">Skip to content</a>
          <div className="frame" id="top">
            <Nav />
            {children}
          </div>
          <SpeedInsights />
        </body>
      </html>
    </ViewTransitions>
  );
}
