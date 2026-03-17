import { getInstruments, getInstrumentBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const instruments = await getInstruments();
  return instruments.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const instrument = await getInstrumentBySlug(slug);
  if (!instrument) return {};
  return {
    title: `${instrument.name} — handpan.pt`,
    description: instrument.description,
  };
}

export default async function InstrumentPage({ params }: Props) {
  const { slug } = await params;
  const instrument = await getInstrumentBySlug(slug);
  if (!instrument) notFound();

  const { name, tuning, price, currency, photos, description, descriptionLong, specs } = instrument;
  const symbol = currency === 'EUR' ? '€' : currency;

  return (
    <div className="max-w-6xl mx-auto px-5 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Photo Gallery */}
        <div>
          <div className="rounded-2xl overflow-hidden shadow-xl bg-white aspect-square relative">
            {photos[0] ? (
              <Image
                src={photos[0]}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-7xl">🎵</div>
            )}
          </div>
          {/* Thumbnail strip */}
          {photos.length > 1 && (
            <div className="flex gap-2 mt-3">
              {photos.slice(1).map((ph, idx) => (
                <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-violet-400 transition cursor-pointer">
                  <Image src={ph} alt={`${name} ${idx + 2}`} fill className="object-cover" sizes="80px" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <p className="text-xs text-violet-600 font-bold uppercase tracking-widest mb-2">{tuning}</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{name}</h1>
          <p className="text-4xl font-bold text-violet-600 mb-6">{symbol}{price.toLocaleString()}</p>

          <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
          {descriptionLong && (
            <p className="text-gray-500 leading-relaxed mb-8 text-sm">{descriptionLong}</p>
          )}

          {/* Specifications */}
          <div className="bg-white rounded-xl p-5 mb-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">Especificações</h3>
            <ul className="space-y-2">
              {Object.entries(specs).map(([key, value]) => (
                <li key={key} className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-xs flex-shrink-0">✓</span>
                  <span className="text-gray-500 font-medium w-28 flex-shrink-0">{key}:</span>
                  <span className="text-gray-800">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <button className="w-full bg-violet-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-violet-700 transition shadow-lg mb-3">
            Adicionar ao Carrinho — {symbol}{price.toLocaleString()}
          </button>
          <Link
            href="/loja"
            className="block text-center text-gray-400 hover:text-gray-600 transition text-sm"
          >
            ← Voltar à Loja
          </Link>
        </div>
      </div>
    </div>
  );
}
