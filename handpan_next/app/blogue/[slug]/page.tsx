import { getPostBySlug, getPosts } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title.pt} — handpan.pt`, description: post.excerpt.pt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-5 py-16">
      <Link href="/blogue" className="text-sm text-gray-400 hover:text-violet-600 transition mb-8 block">
        ← Voltar ao Blogue
      </Link>

      {post.coverImage && (
        <div className="relative h-72 rounded-2xl overflow-hidden mb-8 shadow-lg">
          <Image src={post.coverImage} alt={post.title.pt} fill className="object-cover" priority />
        </div>
      )}

      <span className="inline-block text-xs font-bold text-violet-600 bg-violet-50 px-3 py-1 rounded-full mb-4">
        {post.category}
      </span>
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
        {post.title.pt}
      </h1>
      <p className="text-sm text-gray-400 mb-8">
        {post.author} · {post.publishedAt} · {post.readingMinutes} min de leitura
      </p>

      <p className="text-lg text-gray-600 leading-relaxed">{post.excerpt.pt}</p>
      {post.content?.pt && (
        <div className="mt-8 prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.pt }}
        />
      )}
    </article>
  );
}
