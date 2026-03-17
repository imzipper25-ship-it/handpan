import { getPosts } from '@/lib/data';
import BlogCard from '@/components/ui/BlogCard';

export const metadata = {
  title: 'Blogue — handpan.pt',
  description: 'Artigos, dicas e guias para apaixonados pelo handpan.',
};

export default async function BloguePage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 text-center px-5">
        <span className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
          Blogue
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          O Blogue do{' '}
          <span className="text-violet-600">Handpan</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Artigos, dicas e guias para apaixonados pelo handpan.
        </p>
      </section>

      {/* Blog grid */}
      <section className="max-w-6xl mx-auto px-5 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} lang="pt" />
          ))}
        </div>
      </section>
    </div>
  );
}
