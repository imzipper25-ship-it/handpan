'use client';

import { useState } from 'react';
import type { Instrument } from '@/lib/types';
import InstrumentCard from './InstrumentCard';

interface Props {
  instruments: Instrument[];
  viewDetailsLabel?: string;
}

const TABS: { key: string; label: string; filter: Instrument['category'] | 'all' }[] = [
  { key: 'all',     label: 'Todos',     filter: 'all' },
  { key: 'handpan', label: 'Handpan',   filter: 'handpan' },
  { key: 'drum',    label: 'Percussão', filter: 'drum' },
  { key: 'bowl',    label: 'Sound Healing', filter: 'bowl' },
];

export default function ProductGrid({ instruments, viewDetailsLabel }: Props) {
  const [activeTab, setActiveTab] = useState<'all' | Instrument['category']>('all');

  const filtered =
    activeTab === 'all' ? instruments : instruments.filter((i) => i.category === activeTab);

  return (
    <div>
      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-8 max-w-6xl mx-auto px-5 scrollbar-hide">
        {TABS.map(({ key, label, filter }) => (
          <button
            key={key}
            onClick={() => setActiveTab(filter)}
            className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition border ${
              activeTab === filter
                ? 'bg-violet-600 text-white border-violet-600'
                : 'text-gray-500 border-gray-200 hover:border-violet-300 hover:text-violet-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((instrument) => (
          <InstrumentCard
            key={instrument.id}
            instrument={instrument}
            viewDetailsLabel={viewDetailsLabel}
          />
        ))}
      </div>
    </div>
  );
}
