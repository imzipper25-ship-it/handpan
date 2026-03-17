/**
 * Data access layer — swap the implementations below to use Supabase or Strapi.
 *
 * Supabase swap example:
 *   import { createClient } from '@supabase/supabase-js';
 *   const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
 *   export async function getInstruments() { return (await sb.from('instruments').select('*')).data ?? []; }
 */

import type { Instrument, BlogPost, NewInstrument, NewBlogPost } from './types';
import instrumentsRaw from '@/data/instruments.json';
import postsRaw from '@/data/posts.json';
import { promises as fs } from 'fs';
import path from 'path';

const instruments: Instrument[] = instrumentsRaw as unknown as Instrument[];
const posts: BlogPost[] = postsRaw as unknown as BlogPost[];

// ── Instruments ──────────────────────────────────────────────────

export async function getInstruments(): Promise<Instrument[]> {
  return instruments;
}

export async function getInstrumentsByCategory(
  category: Instrument['category']
): Promise<Instrument[]> {
  return instruments.filter((i) => i.category === category);
}

export async function getInstrumentBySlug(
  slug: string
): Promise<Instrument | null> {
  return instruments.find((i) => i.slug === slug) ?? null;
}

export async function createInstrument(
  data: NewInstrument
): Promise<Instrument> {
  const newItem: Instrument = { ...data, id: Date.now().toString() };
  const filePath = path.join(process.cwd(), 'data', 'instruments.json');
  const current: Instrument[] = JSON.parse(await fs.readFile(filePath, 'utf8'));
  current.push(newItem);
  await fs.writeFile(filePath, JSON.stringify(current, null, 2));
  return newItem;
}

// ── Blog Posts ───────────────────────────────────────────────────

export async function getPosts(): Promise<BlogPost[]> {
  return posts;
}

export async function getPostsByCategory(
  category: BlogPost['category']
): Promise<BlogPost[]> {
  return posts.filter((p) => p.category === category);
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function createPost(data: NewBlogPost): Promise<BlogPost> {
  const newPost: BlogPost = { ...data, id: Date.now().toString() };
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const current: BlogPost[] = JSON.parse(await fs.readFile(filePath, 'utf8'));
  current.push(newPost);
  await fs.writeFile(filePath, JSON.stringify(current, null, 2));
  return newPost;
}
