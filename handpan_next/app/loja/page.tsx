import { getInstruments } from '@/lib/data';
import ProductGrid from '@/components/ui/ProductGrid';

export const metadata = {
  title: 'Loja — handpan.pt',
  description: 'Compre, alugue ou afine o seu handpan em Portugal.',
};

export default async function LojaPage() {
  const instruments = await getInstruments();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 text-center px-5">
        <span className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
          Loja
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 font-[var(--font-outfit)] mb-4">
          Instrumentos{' '}
          <span className="text-violet-600">&amp; Serviços</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Compre, alugue, afine ou repare o seu instrumento.
        </p>
      </section>

      {/* Product Grid */}
      <section className="pb-24">
        <ProductGrid instruments={instruments} />
      </section>
    </div>
  );
}
