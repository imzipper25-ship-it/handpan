import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 mt-auto">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <span className="text-xl font-bold text-white block mb-3">handpan.pt</span>
            <p className="text-sm opacity-70 leading-relaxed">
              Despertar através do som.<br />
              Escola de handpan em Portugal desde 2015.
            </p>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Localizações</h4>
            <ul className="space-y-2 text-sm">
              {['Lisboa', 'Ericeira', 'Cascais'].map((loc) => (
                <li key={loc} className="hover:text-white transition cursor-pointer">{loc}</li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Páginas</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Escola', href: '/escola' },
                { label: 'Eventos', href: '/eventos' },
                { label: 'Loja', href: '/loja' },
                { label: 'Blogue', href: '/blogue' },
                { label: 'Contactos', href: '/contactos' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Newsletter</h4>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="O seu email"
                className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-violet-400 transition text-sm"
              />
              <button
                type="submit"
                className="bg-violet-600 text-white font-semibold py-2.5 rounded-lg hover:bg-violet-700 transition text-sm"
              >
                Subscrever
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-xs opacity-40">
          © 2026 Ding Handpan School Lisboa. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
