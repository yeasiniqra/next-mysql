// app/api/posts/route.js
import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET all posts
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let sql = 'SELECT id, title, slug, excerpt, cover_image, category, tags, created_at FROM posts WHERE published = 1';
    const params = [];

    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      sql += ' AND (title LIKE ? OR excerpt LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    sql += ' ORDER BY created_at DESC';

    const posts = await query(sql, params);
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST create a new post
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, cover_image, category, tags } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'title, slug and content are required' }, { status: 400 });
    }

    const result = await query(
      'INSERT INTO posts (title, slug, excerpt, content, cover_image, category, tags) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, slug, excerpt, content, cover_image, category, tags]
    );

    return NextResponse.json({ id: result.insertId, message: 'Post created!' }, { status: 201 });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
