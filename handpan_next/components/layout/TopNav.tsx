'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import type { Lang } from '@/lib/i18n';

const NAV_LINKS = [
  { key: 'nav.school',  href: '/escola' },
  { key: 'nav.events',  href: '/eventos' },
  { key: 'nav.shop',    href: '/loja' },
  { key: 'nav.blog',    href: '/blogue' },
  { key: 'nav.about',   href: '/sobre' },
  { key: 'nav.contact', href: '/contactos' },
];

const LANGS: { code: Lang; label: string }[] = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'ua', label: 'UA' },
];

export default function TopNav() {
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="top-nav fixed w-full z-50 flex items-center justify-between px-6 h-16 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold tracking-tight text-violet-700 hover:text-violet-500 transition">
        handpan.pt
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-6">
        {NAV_LINKS.map(({ key, href }) => (
          <li key={key}>
            <Link href={href} className="text-sm font-medium text-gray-600 hover:text-violet-600 transition">
              {t(key)}
            </Link>
          </li>
        ))}
      </ul>

      {/* Language switcher + CTA */}
      <div className="hidden md:flex items-center gap-3">
        <div className="flex gap-1 bg-gray-100 rounded-full p-1">
          {LANGS.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                lang === code
                  ? 'bg-violet-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <Link
          href="/inscricao"
          className="bg-violet-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-violet-700 transition"
        >
          {t('nav.book')}
        </Link>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden p-2 text-gray-600"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className="block w-6 h-0.5 bg-current mb-1" />
        <span className="block w-6 h-0.5 bg-current mb-1" />
        <span className="block w-6 h-0.5 bg-current" />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg">
          <ul className="flex flex-col p-4 gap-2">
            {NAV_LINKS.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-violet-50 font-medium transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
            <li className="flex gap-2 mt-2">
              {LANGS.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => { setLang(code); setMenuOpen(false); }}
                  className={`flex-1 py-2 rounded-full text-sm font-bold transition border ${
                    lang === code
                      ? 'bg-violet-600 text-white border-violet-600'
                      : 'border-gray-200 text-gray-500'
                  }`}
                >
                  {label}
                </button>
              ))}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
