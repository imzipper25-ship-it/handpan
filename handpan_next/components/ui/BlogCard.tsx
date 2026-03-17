import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/types';
import type { Lang } from '@/lib/i18n';

interface Props {
  post: BlogPost;
  lang?: Lang;
  readMoreLabel?: string;
}

const CATEGORY_LABELS: Record<BlogPost['category'], string> = {
  guia: 'Guia',
  tecnica: 'Técnica',
  instrumento: 'Instrumento',
  cultura: 'Cultura',
  terapia: 'Terapia Sonora',
};

export default function BlogCard({ post, lang = 'pt', readMoreLabel = 'Ler mais →' }: Props) {
  const { slug, title, excerpt, author, publishedAt, readingMinutes, coverImage, category } = post;

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col group">
      {/* Cover */}
      <div className="relative h-44 bg-gray-100 overflow-hidden">
        {coverImage && (
          <Image
            src={coverImage}
            alt={title[lang]}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <span className="inline-block text-xs font-bold text-violet-600 bg-violet-50 px-3 py-1 rounded-full mb-3 self-start">
          {CATEGORY_LABELS[category]}
        </span>
        <h3 className="font-bold text-gray-900 leading-snug mb-2 line-clamp-2">
          {title[lang]}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">{excerpt[lang]}</p>

        <div className="mt-auto flex items-center justify-between text-xs text-gray-400">
          <span>{author} · {readingMinutes} min</span>
          <Link
            href={`/blogue/${slug}`}
            className="text-violet-600 font-semibold hover:text-violet-800 transition"
          >
            {readMoreLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
