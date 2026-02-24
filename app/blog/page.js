// app/blog/page.js
import Link from 'next/link';

async function getPosts(searchParams) {
  const params = new URLSearchParams();
  if (searchParams?.category) params.set('category', searchParams.category);
  if (searchParams?.search) params.set('search', searchParams.search);

  try {
    const res = await fetch(`http://localhost:3000/api/posts?${params}`, { cache: 'no-store' });
    const data = await res.json();
    return data.posts || [];
  } catch {
    return [];
  }
}

export default async function BlogPage({ searchParams }) {
  const posts = await getPosts(searchParams);
  const categories = [...new Set(posts.map(p => p.category).filter(Boolean))];
 console.log("postX", posts);
  return (
    <div>
      <div className="mb-12 flex items-center justify-between">
        <div>
          <p className="text-amber-400 text-sm tracking-[0.3em] uppercase mb-3">Writing</p>
          <h1 className="text-4xl font-bold">All Articles</h1>
        </div>
        <div>
          <Link href="/blog/new" className="px-4 py-2 border border-[#2a2a2a] text-sm rounded hover:border-amber-400">
            + New Post
          </Link>
        </div>
      </div>

      {/* Filter by category */}
      {categories.length > 0 && (
        <div className="flex gap-3 mb-10 flex-wrap">
          <Link
            href="/blog"
            className={`px-4 py-1.5 text-xs tracking-widest uppercase border transition-colors ${
              !searchParams?.category
                ? 'border-amber-400 text-amber-400'
                : 'border-[#2a2a2a] text-[#666] hover:border-[#444]'
            }`}
          >
            All
          </Link>
          {categories.map(cat => (
            <Link
              key={cat}
              href={`/blog?category=${cat}`}
              className={`px-4 py-1.5 text-xs tracking-widest uppercase border transition-colors ${
                searchParams?.category === cat
                  ? 'border-amber-400 text-amber-400'
                  : 'border-[#2a2a2a] text-[#666] hover:border-[#444]'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      )}

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-[#555] text-lg italic">No articles found.</p>
        </div>
      ) : (
        <div className="grid gap-px bg-[#1e1e1e]">
          {posts.map(post => (
            <article key={post.id} className="bg-[#0d0d0d] p-8 group hover:bg-[#111] transition-colors">
              <Link href={`/blog/${post.slug}`}>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      {post.category && (
                        <span className="text-xs tracking-widest text-amber-400 uppercase">
                          {post.category}
                        </span>
                      )}
                      <span className="text-xs text-[#444]">
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold group-hover:text-amber-400 transition-colors mb-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-[#777] text-base leading-relaxed max-w-xl">
                        {post.excerpt}
                      </p>
                    )}
                    {post.tags && (
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {post.tags.split(',').map(tag => (
                          <span key={tag} className="text-xs text-[#555] font-mono">#{tag.trim()}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[#333] group-hover:text-amber-400 transition-colors text-2xl shrink-0">→</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
