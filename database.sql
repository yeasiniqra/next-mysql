-- Run this in phpMyAdmin
CREATE DATABASE IF NOT EXISTS my_blog;
USE my_blog;

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content LONGTEXT NOT NULL,
  cover_image VARCHAR(500),
  category VARCHAR(100),
  tags VARCHAR(500),
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sample posts
INSERT INTO posts (title, slug, excerpt, content, category, tags) VALUES
('Getting Started with Next.js', 'getting-started-nextjs', 
 'A beginner guide to building web apps with Next.js and React.',
 '<p>Next.js is a powerful React framework that makes building full-stack web applications simple and fun.</p><p>In this post, we will explore the basics...</p>',
 'Development', 'nextjs,react,javascript'),

('Why I Love Tailwind CSS', 'why-i-love-tailwind',
 'Tailwind CSS changed how I think about styling forever.',
 '<p>Before Tailwind, I spent hours fighting CSS specificity. Now I write utility classes and ship faster than ever.</p>',
 'Design', 'tailwind,css,design'),

('My Development Setup in 2024', 'dev-setup-2024',
 'The tools, apps, and workflows I use every day.',
 '<p>A good development setup can make or break your productivity. Here is what I use in my day-to-day workflow...</p>',
 'Lifestyle', 'productivity,tools,setup');
