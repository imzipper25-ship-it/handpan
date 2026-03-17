import Link from 'next/link';
import { getInstruments, getPosts } from '@/lib/data';

export const metadata = { title: 'Admin — handpan.pt' };

export default async function AdminDashboard() {
  const [instruments, posts] = await Promise.all([getInstruments(), getPosts()]);

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {[
          { label: 'Instruments', value: instruments.length, icon: '🎵', href: '/admin/instruments' },
          { label: 'Blog Posts', value: posts.length, icon: '📝', href: '/admin/posts' },
          { label: 'In Stock', value: instruments.filter(i => i.inStock).length, icon: '✅', href: '/admin/instruments' },
        ].map(({ label, value, icon, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition flex items-center gap-4"
          >
            <span className="text-3xl">{icon}</span>
            <div>
              <div className="text-3xl font-extrabold text-gray-900">{value}</div>
              <div className="text-sm text-gray-400">{label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex gap-3">
        <Link
          href="/admin/instruments/new"
          className="bg-violet-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-violet-700 transition text-sm"
        >
          ＋ Add Instrument
        </Link>
        <Link
          href="/loja"
          target="_blank"
          className="border border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition text-sm"
        >
          View Live Shop ↗
        </Link>
      </div>
    </div>
  );
}
