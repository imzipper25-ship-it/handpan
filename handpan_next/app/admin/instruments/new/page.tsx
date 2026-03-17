import InstrumentForm from '@/components/admin/InstrumentForm';

export const metadata = { title: 'Add Instrument — Admin' };

export default function NewInstrumentPage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-8">Add Instrument</h1>
      <InstrumentForm />
    </div>
  );
}
