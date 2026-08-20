import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next";
import './globals.css';


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Suleman Badar',
  description: 'Backend Engineer | MERN Stack Developer | AI Engineer | Open Source Contributor',
  metadataBase: new URL('https://www.sulemanbadar.me/'),
  keywords: ['Software Engineer', 'backend engineer', 'mern stack', 'ai engineer', 'open source', 'portfolio', 'suleman badar', 'suliman badar'],
  authors: [{ name: 'Suleman Badar' }],
  creator: 'Suleman Badar',
  publisher: 'Suleman Badar',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.sulemanbadar.me/',
    title: 'Suleman Badar - Portfolio',
    description: 'Backend Engineer | MERN Stack Developer | AI Engineer | Open Source Contributor',
    siteName: 'sulemanbadar.me',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suleman Badar - Portfolio',
    description: 'Backend Engineer | MERN Stack Developer | AI Engineer | Open Source Contributor',
    creator: '@suleman_badar',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION, 
  },
};

export const viewport: Viewport = {
  themeColor: '#07080a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-[#07080a] text-white antialiased">
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}