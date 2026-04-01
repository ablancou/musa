import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cormorant_Garamond, Noto_Sans_JP, Noto_Sans_SC } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '@/lib/i18n/I18nProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ConsentProvider } from '@/components/providers/ConsentProvider';

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

export const metadata: Metadata = {
  title: 'MŪSA — El Arte como Nunca lo Habías Vivido',
  description:
    '4,000 años de historia del arte en una experiencia inmersiva. Narrativa cinematográfica, música de cada época y herramientas interactivas.',
  keywords: ['art history', 'historia del arte', 'education', 'interactive', 'museum'],
  openGraph: {
    title: 'MŪSA — Art Like You\'ve Never Experienced It',
    description: '4,000 years of art history in an immersive experience.',
    type: 'website',
    locale: 'es_MX',
    alternateLocale: ['en_US', 'it_IT', 'pt_BR', 'de_DE', 'ja_JP', 'zh_CN'],
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
      <body className="bg-art-cream text-art-charcoal antialiased">
        <I18nProvider>
          <ThemeProvider>
            {children}
            <ConsentProvider />
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
