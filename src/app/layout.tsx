import type { Metadata, Viewport } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Instrument_Serif } from 'next/font/google';
import { ViewTransitions } from 'next-view-transitions';
import Nav from '@/components/Nav';
import Effects from '@/components/Effects';
import './globals.css';

const serif = Instrument_Serif({ weight: '400', style: ['normal', 'italic'], subsets: ['latin'], variable: '--font-serif' });

const site = 'https://juandiegodiaz.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: 'Juan Diego Díaz Hidalgo', template: '%s — Juan Diego Díaz Hidalgo' },
  description: 'Engineer in Madrid. I build ML models, data pipelines and the software around them.',
  openGraph: { type: 'website', siteName: 'Juan Diego Díaz Hidalgo' },
};

export const viewport: Viewport = { themeColor: '#f5f5f3' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${serif.variable}`}>
        <head>
          <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        </head>
        <body data-theme="light">
          <a className="skip" href="#main">Skip to content</a>
          <Nav />
          {children}
          <Effects />
          <SpeedInsights />
        </body>
      </html>
    </ViewTransitions>
  );
}
