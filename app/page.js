// app/page.js
import Link from 'next/link';

async function getLatestPosts() {
  try {
    const res = await fetch('http://localhost:3000/api/posts', { cache: 'no-store' });
    const data = await res.json();
    return data.posts || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const posts = await getLatestPosts();

  return (
    <div>
      {/* Hero */}
      <section className="py-16 border-b border-[#2a2a2a] mb-16">
        <p className="text-amber-400 text-sm tracking-[0.3em] uppercase mb-4">Personal Blog</p>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          Thoughts,<br />
          <span className="italic text-[#888]">ideas & stories</span>
        </h1>
        <p className="text-[#888] text-xl max-w-xl leading-relaxed">
          A space to share what I learn, build, and think about. Welcome.
        </p>
      </section>

      {/* Latest Posts */}
      <section>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-sm tracking-[0.3em] uppercase text-[#666]">Latest Articles</h2>
          <Link href="/blog" className="text-amber-400 text-sm hover:text-amber-300 transition-colors">
            View all →
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-[#666] italic">No posts yet. Add some from phpMyAdmin!</p>
        ) : (
          <div className="space-y-0 divide-y divide-[#1e1e1e]">
            {posts.slice(0, 5).map((post, i) => (
              <article key={post.id} className="py-8 group">
                <Link href={`/blog/${post.slug}`}>
                  <div className="flex gap-6 items-start">
                    <span className="text-[#333] font-mono text-sm pt-1 w-8 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {post.category && (
                          <span className="text-xs tracking-widest text-amber-400 uppercase">
                            {post.category}
                          </span>
                        )}
                        <span className="text-xs text-[#444]">
                          {new Date(post.created_at).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold group-hover:text-amber-400 transition-colors mb-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-[#888] leading-relaxed">{post.excerpt}</p>
                      )}
                    </div>
                    <span className="text-[#333] group-hover:text-amber-400 transition-colors text-xl pt-1">
                      →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
