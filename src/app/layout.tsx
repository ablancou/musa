import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, Cormorant_Garamond, Noto_Sans_JP, Noto_Sans_SC } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '@/lib/i18n/I18nProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ConsentProvider } from '@/components/providers/ConsentProvider';
import { ServiceWorkerRegistration } from '@/components/providers/ServiceWorkerRegistration';
import ArtAssistantWrapper from '@/components/chat/ArtAssistantWrapper';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const notoJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-jp',
  display: 'swap',
  weight: ['300', '400', '500', '700'],
});

const notoSC = Noto_Sans_SC({
  subsets: ['latin'],
  variable: '--font-noto-sc',
  display: 'swap',
  weight: ['300', '400', '500', '700'],
});

export const viewport: Viewport = {
  themeColor: '#C5932A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'MŪSA — El Arte como Nunca lo Habías Vivido',
  description:
    '4,000 años de historia del arte en una experiencia inmersiva. Narrativa cinematográfica, música de cada época y herramientas interactivas.',
  keywords: ['art history', 'historia del arte', 'education', 'interactive', 'museum'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MŪSA',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/images/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/images/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/images/icons/icon-152x152.png', sizes: '152x152' },
      { url: '/images/icons/icon-192x192.png', sizes: '192x192' },
    ],
  },
  openGraph: {
    title: 'MŪSA — Art Like You\'ve Never Experienced It',
    description: '4,000 years of art history in an immersive experience.',
    type: 'website',
    locale: 'es_MX',
    alternateLocale: ['en_US', 'it_IT', 'pt_BR', 'de_DE', 'ja_JP', 'zh_CN'],
    siteName: 'MŪSA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MŪSA — El Arte como Nunca lo Habías Vivido',
    description: '4,000 años de historia del arte en una experiencia inmersiva.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable} ${notoJP.variable} ${notoSC.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Global referrer policy — Wikimedia blocks images with referrer headers */}
        <meta name="referrer" content="no-referrer" />
      </head>
      <body className="bg-art-cream text-art-charcoal antialiased">
        <I18nProvider>
          <ThemeProvider>
            {children}
            <ArtAssistantWrapper />
            <ConsentProvider />
            <ServiceWorkerRegistration />
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
