import { getInstruments } from '@/lib/data';
import Link from 'next/link';

export default async function AdminInstrumentsPage() {
  const instruments = await getInstruments();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Instruments</h1>
        <Link
          href="/admin/instruments/new"
          className="bg-violet-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-violet-700 transition text-sm"
        >
          ＋ Add New
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="text-left px-5 py-3">Name</th>
              <th className="text-left px-5 py-3">Category</th>
              <th className="text-left px-5 py-3">Tuning</th>
              <th className="text-left px-5 py-3">Price</th>
              <th className="text-left px-5 py-3">Stock</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {instruments.map((i) => (
              <tr key={i.id} className="hover:bg-slate-50 transition">
                <td className="px-5 py-3 font-medium text-gray-800">{i.name}</td>
                <td className="px-5 py-3 text-gray-500 capitalize">{i.category}</td>
                <td className="px-5 py-3 text-gray-500">{i.tuning}</td>
                <td className="px-5 py-3 font-semibold text-violet-600">€{i.price}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${i.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                    {i.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <Link href={`/loja/${i.slug}`} target="_blank" className="text-gray-400 hover:text-violet-600 transition text-xs">
                    View ↗
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
