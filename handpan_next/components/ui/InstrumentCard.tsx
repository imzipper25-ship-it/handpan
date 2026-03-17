import Image from 'next/image';
import Link from 'next/link';
import type { Instrument } from '@/lib/types';

interface Props {
  instrument: Instrument;
  viewDetailsLabel?: string;
}

export default function InstrumentCard({ instrument, viewDetailsLabel = 'Ver detalhes' }: Props) {
  const { slug, name, tuning, price, currency, photos, category } = instrument;

  const categoryLabel: Record<Instrument['category'], string> = {
    handpan: 'Handpan',
    drum: 'Percussão',
    bowl: 'Sound Healing',
  };

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col group">
      {/* Photo */}
      <div className="relative h-52 bg-gray-100 overflow-hidden">
        {photos[0] ? (
          <Image
            src={photos[0]}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">🎵</div>
        )}
        <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-violet-700">
          {categoryLabel[category]}
        </span>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-gray-400 font-medium mb-1">{tuning}</p>
        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">{name}</h3>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-2xl font-bold text-violet-600">
            {currency === 'EUR' ? '€' : currency}{price.toLocaleString()}
          </span>
          <Link
            href={`/loja/${slug}`}
            className="bg-violet-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-violet-700 transition"
          >
            {viewDetailsLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
