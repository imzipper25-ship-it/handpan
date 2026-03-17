// ── Instrument ──────────────────────────────────────────────────
export type InstrumentCategory = 'handpan' | 'drum' | 'bowl';

export interface Instrument {
  id: string;
  slug: string;
  name: string;
  /** Example: "D Minor", "Celtic Minor", "Kurd" */
  tuning: string;
  price: number;
  currency: 'EUR';
  photos: string[];       // local /assets/... or remote URL
  videoUrl?: string;      // YouTube or Vimeo embed URL
  description: string;
  descriptionLong?: string;
  category: InstrumentCategory;
  inStock: boolean;
  specs: Record<string, string>; // e.g. { "Notes": "9", "Material": "Nitrided Steel" }
}

// ── Blog Post ────────────────────────────────────────────────────
export type PostCategory =
  | 'guia'
  | 'tecnica'
  | 'instrumento'
  | 'cultura'
  | 'terapia';

export interface I18nString {
  pt: string;
  en: string;
  ua: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: I18nString;
  excerpt: I18nString;
  content?: I18nString;
  category: PostCategory;
  author: string;
  publishedAt: string;      // ISO 8601 date: "2026-03-10"
  readingMinutes: number;
  coverImage: string;
  audioUrl?: string;        // For BlogPlayer component
}

// ── Admin Form ───────────────────────────────────────────────────
export type NewInstrument = Omit<Instrument, 'id'>;
export type NewBlogPost   = Omit<BlogPost, 'id'>;
