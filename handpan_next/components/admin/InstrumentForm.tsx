'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { NewInstrument } from '@/lib/types';

const EMPTY_FORM: NewInstrument = {
  slug: '',
  name: '',
  tuning: '',
  price: 0,
  currency: 'EUR',
  photos: [],
  videoUrl: '',
  description: '',
  descriptionLong: '',
  category: 'handpan',
  inStock: true,
  specs: {},
};

export default function InstrumentForm() {
  const router = useRouter();
  const [form, setForm] = useState<NewInstrument>(EMPTY_FORM);
  const [photosInput, setPhotosInput] = useState('');
  const [specsJson, setSpecsJson] = useState('{}');
  const [jsonMode, setJsonMode] = useState(false);
  const [rawJson, setRawJson] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      let payload: NewInstrument;
      if (jsonMode) {
        payload = JSON.parse(rawJson);
      } else {
        payload = {
          ...form,
          photos: photosInput.split('\n').map(s => s.trim()).filter(Boolean),
          specs: JSON.parse(specsJson || '{}'),
        };
      }
      const res = await fetch('/api/admin/instruments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Save failed');
      router.push('/admin/instruments');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setSaving(false);
    }
  };

  const inputCls = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white';
  const labelCls = 'block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider';

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {/* Mode toggle */}
      <div className="flex gap-2">
        <button type="button" onClick={() => setJsonMode(false)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${!jsonMode ? 'bg-violet-600 text-white' : 'border border-gray-200 text-gray-500'}`}>
          Form
        </button>
        <button type="button" onClick={() => setJsonMode(true)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${jsonMode ? 'bg-violet-600 text-white' : 'border border-gray-200 text-gray-500'}`}>
          JSON
        </button>
      </div>

      {jsonMode ? (
        <div>
          <label className={labelCls}>Paste JSON</label>
          <textarea
            rows={20}
            value={rawJson}
            onChange={e => setRawJson(e.target.value)}
            className={`${inputCls} font-mono text-xs`}
            placeholder={'{\n  "slug": "my-handpan",\n  "name": "My Handpan",\n  ...\n}'}
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Name *</label>
              <input required className={inputCls} value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>Slug *</label>
              <input required className={inputCls} value={form.slug}
                onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                placeholder="my-handpan" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Category *</label>
              <select className={inputCls} value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value as NewInstrument['category'] }))}>
                <option value="handpan">Handpan</option>
                <option value="drum">Drum</option>
                <option value="bowl">Bowl</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Tuning</label>
              <input className={inputCls} value={form.tuning}
                onChange={e => setForm(f => ({ ...f, tuning: e.target.value }))}
                placeholder="D Minor" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Price (€) *</label>
              <input required type="number" min={0} className={inputCls} value={form.price}
                onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))} />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.inStock}
                  onChange={e => setForm(f => ({ ...f, inStock: e.target.checked }))}
                  className="w-4 h-4 accent-violet-600" />
                <span className="text-sm font-medium text-gray-700">In Stock</span>
              </label>
            </div>
          </div>

          <div>
            <label className={labelCls}>Description</label>
            <textarea rows={3} className={inputCls} value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>

          <div>
            <label className={labelCls}>Photo URLs (one per line)</label>
            <textarea rows={3} className={inputCls} value={photosInput}
              onChange={e => setPhotosInput(e.target.value)}
              placeholder="/assets/images/handpan.jpg" />
          </div>

          <div>
            <label className={labelCls}>Video URL</label>
            <input className={inputCls} value={form.videoUrl || ''}
              onChange={e => setForm(f => ({ ...f, videoUrl: e.target.value }))}
              placeholder="https://youtube.com/embed/..." />
          </div>

          <div>
            <label className={labelCls}>Specs (JSON)</label>
            <textarea rows={5} className={`${inputCls} font-mono text-xs`} value={specsJson}
              onChange={e => setSpecsJson(e.target.value)}
              placeholder={'{\n  "Notes": "9",\n  "Material": "Steel"\n}'} />
          </div>
        </>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={saving}
          className="bg-violet-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-violet-700 transition disabled:opacity-50 text-sm">
          {saving ? 'Saving…' : '✓ Save Instrument'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="border border-gray-200 text-gray-500 px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition text-sm">
          Cancel
        </button>
      </div>
    </form>
  );
}
