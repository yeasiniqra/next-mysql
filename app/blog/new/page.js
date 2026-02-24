import PostForm from '@/components/PostForm';
import Link from 'next/link';

export default function NewPostPage() {
  return (
    <div>
      <div className="mb-12 flex items-center justify-between">
        <div>
          <p className="text-amber-400 text-sm tracking-[0.3em] uppercase mb-3">Writing</p>
          <h1 className="text-4xl font-bold">Create New Article</h1>
        </div>
        <div>
          <Link href="/blog" className="px-4 py-2 border border-[#2a2a2a] text-sm rounded hover:border-amber-400">
            ← Back
          </Link>
        </div>
      </div>

      <PostForm />
    </div>
  );
}
