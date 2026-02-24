# My Personal Blog
Built with Next.js 14, Tailwind CSS, and MySQL (XAMPP)

## Setup Steps

### 1. Database Setup (phpMyAdmin)
1. Open phpMyAdmin → `http://localhost/phpmyadmin`
2. Click **Import** tab → upload or paste the content of `database.sql`
3. This creates the `my_blog` database with a `posts` table and sample data

### 2. Project Setup
```bash
# Install dependencies
npm install

# Copy the env file (already set up for XAMPP defaults)
# Edit .env.local if your MySQL password is different

# Run development server
npm run dev
```

### 3. Open in browser
```
https://next-mysql-indol.vercel.app
```

## File Structure
```
my-blog/
├── app/
│   ├── layout.js           ← Nav + Footer wrapper
│   ├── page.js             ← Homepage
│   ├── globals.css         ← Tailwind + custom styles
│   ├── about/page.js       ← About page
│   ├── blog/
│   │   ├── page.js         ← All posts listing
│   │   └── [slug]/page.js  ← Single post view
│   └── api/
│       ├── posts/route.js      ← GET all / POST create
│       └── post/[slug]/route.js ← GET / PUT / DELETE by slug
├── lib/
│   └── db.js               ← MySQL connection pool
├── .env.local              ← DB credentials
└── database.sql            ← Run this in phpMyAdmin
```

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts?category=Dev` | Filter by category |
| GET | `/api/posts?search=keyword` | Search posts |
| POST | `/api/posts` | Create new post |
| GET | `/api/post/[slug]` | Get single post |
| PUT | `/api/post/[slug]` | Update post |
| DELETE | `/api/post/[slug]` | Delete post |

## Adding Posts
You can add posts in 3 ways:
1. **phpMyAdmin** → `my_blog` → `posts` table → Insert
2. **API call** (Postman/curl): `POST /api/posts`
3. Build an admin panel (optional next step)

## .env.local defaults for XAMPP
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=        ← empty by default in XAMPP
DB_NAME=my_blog
DB_PORT=3306
```
