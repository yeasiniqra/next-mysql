"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PostForm({ initialData = {}, isEdit = false, slug }) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData.title || '');
  const [postSlug, setPostSlug] = useState(initialData.slug || '');
  const [excerpt, setExcerpt] = useState(initialData.excerpt || '');
  const [content, setContent] = useState(initialData.content || '');
  const [coverImage, setCoverImage] = useState(initialData.cover_image || '');
  const [category, setCategory] = useState(initialData.category || '');
  const [tags, setTags] = useState(initialData.tags || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!title || !postSlug || !content) {
      setError('Title, slug and content are required');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title,
        slug: postSlug,
        excerpt,
        content,
        cover_image: coverImage,
        category,
        tags,
      };

      const url = isEdit ? `/api/post/${encodeURIComponent(slug || postSlug)}` : '/api/posts';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Request failed');
      }

      // navigate back to blog listing or to the post
      router.push('/blog');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
      {error && <div className="text-red-400">{error}</div>}

      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Slug</label>
        <input value={postSlug} onChange={e => setPostSlug(e.target.value)} className="w-full p-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Excerpt</label>
        <input value={excerpt} onChange={e => setExcerpt(e.target.value)} className="w-full p-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Content (HTML)</label>
        <textarea value={content} onChange={e => setContent(e.target.value)} rows={10} className="w-full p-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded font-mono" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Cover image URL</label>
        <input value={coverImage} onChange={e => setCoverImage(e.target.value)} className="w-full p-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input value={category} onChange={e => setCategory(e.target.value)} className="w-full p-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
          <input value={tags} onChange={e => setTags(e.target.value)} className="w-full p-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded" />
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button type="submit" disabled={loading} className="px-5 py-2 bg-amber-400 text-black font-medium rounded">
          {loading ? (isEdit ? 'Updating...' : 'Creating...') : isEdit ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}
