import PostForm from '@/components/PostForm';
import Link from 'next/link';

async function getPost(slug) {
  try {
    const res = await fetch(`https://next-mysql-indol.vercel.app/api/post/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.post;
  } catch {
    return null;
  }
}

export default async function EditPostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) return (
    <div className="py-20 text-center">Post not found.</div>
  );

  return (
    <div>
      <div className="mb-12 flex items-center justify-between">
        <div>
          <p className="text-amber-400 text-sm tracking-[0.3em] uppercase mb-3">Writing</p>
          <h1 className="text-4xl font-bold">Edit Article</h1>
        </div>
        <div>
          <Link href={`/blog/${params.slug}`} className="px-4 py-2 border border-[#2a2a2a] text-sm rounded hover:border-amber-400">
            ← View
          </Link>
        </div>
      </div>

      <PostForm initialData={post} isEdit={true} slug={params.slug} />
    </div>
  );
}
