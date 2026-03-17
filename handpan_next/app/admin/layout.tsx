import Link from 'next/link';
import type { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 text-gray-300 flex flex-col py-8 px-4 gap-2 flex-shrink-0">
        <h2 className="text-white font-bold text-lg mb-6 px-3">Admin Panel</h2>
        {[
          { href: '/admin', label: '📊 Dashboard' },
          { href: '/admin/instruments', label: '🎵 Instruments' },
          { href: '/admin/instruments/new', label: '  ＋ Add New' },
          { href: '/loja', label: '🔗 View Shop ↗' },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="block px-3 py-2 rounded-lg hover:bg-white/10 transition text-sm font-medium"
          >
            {label}
          </Link>
        ))}
      </aside>

      {/* Main */}
      <main className="flex-1 bg-slate-50 p-8">{children}</main>
    </div>
  );
}
