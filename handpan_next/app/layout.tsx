import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import TopNav from '@/components/layout/TopNav';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/context/LanguageContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'handpan.pt — Escola e Loja de Handpan em Portugal',
  description: 'Aulas de handpan individuais e em grupo em Lisboa, Ericeira e Cascais. Compre, alugue ou afine o seu instrumento.',
  keywords: ['handpan', 'aulas handpan', 'portugal', 'escola', 'instrumento'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-slate-50 text-gray-900 flex flex-col min-h-screen`}>
        <LanguageProvider>
          <TopNav />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
