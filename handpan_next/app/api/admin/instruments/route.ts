import { NextRequest, NextResponse } from 'next/server';
import { createInstrument } from '@/lib/data';
import type { NewInstrument } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body: NewInstrument = await req.json();
    if (!body.name || !body.slug) {
      return NextResponse.json({ error: 'name and slug are required' }, { status: 400 });
    }
    const instrument = await createInstrument(body);
    return NextResponse.json(instrument, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
