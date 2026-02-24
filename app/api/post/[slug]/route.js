// app/api/post/[slug]/route.js
import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET single post by slug
export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const posts = await query(
      'SELECT * FROM posts WHERE slug = ? AND published = 1',
      [slug]
    );

    if (posts.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post: posts[0] });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

// PUT update a post
export async function PUT(request, { params }) {
  try {
    const { slug } = params;
    const body = await request.json();
    const { title, excerpt, content, cover_image, category, tags } = body;

    await query(
      'UPDATE posts SET title=?, excerpt=?, content=?, cover_image=?, category=?, tags=? WHERE slug=?',
      [title, excerpt, content, cover_image, category, tags, slug]
    );

    return NextResponse.json({ message: 'Post updated!' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

// DELETE a post
export async function DELETE(request, { params }) {
  try {
    const { slug } = params;
    await query('DELETE FROM posts WHERE slug = ?', [slug]);
    return NextResponse.json({ message: 'Post deleted!' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
