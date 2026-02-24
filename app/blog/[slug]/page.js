// app/blog/[slug]/page.js
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getPost(slug) {
  try {
    const res = await fetch(`http://localhost:3000/api/post/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.post;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);

  return {
    title: post?.title || 'Post not found',
    description: post?.excerpt || '',
  };
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  

  if (!post) notFound();

  return (
    <article className="max-w-2xl mx-auto">
      {/* Back link */}
      <Link href="/blog" className="text-[#555] text-sm hover:text-amber-400 transition-colors inline-flex items-center gap-2 mb-10">
        ← Back to articles
      </Link>

      {/* Header */}
      <header className="mb-12 pb-12 border-b border-[#2a2a2a]">
        <div className="flex items-center gap-3 mb-4">
          {post.category && (
            <span className="text-xs tracking-widest text-amber-400 uppercase">{post.category}</span>
          )}
          <span className="text-xs text-[#444]">
            {new Date(post.created_at).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-xl text-[#888] italic leading-relaxed">{post.excerpt}</p>
        )}
        {post.tags && (
          <div className="flex gap-2 mt-6 flex-wrap">
            {post.tags.split(',').map(tag => (
              <span key={tag} className="text-xs text-[#555] font-mono bg-[#1a1a1a] px-2 py-1 rounded">
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Cover image */}
      {post.cover_image && (
        <div className="mb-10 rounded-lg overflow-hidden">
          <img src={post.cover_image} alt={post.title} className="w-full h-64 object-cover" />
        </div>
      )}

      {/* Content */}
      <div
        className="prose-blog"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
