// app/layout.js
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'My Blog',
  description: 'A personal blog built with Next.js and MySQL',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0d0d0d] text-[#e8e0d0] font-serif">
        {/* NAV */}
        <nav className="border-b border-[#2a2a2a] sticky top-0 z-50 bg-[#0d0d0d]/90 backdrop-blur">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-widest text-amber-400 uppercase">
              ✦ Yeasin Blog
            </Link>
            <div className="flex gap-6 text-sm tracking-wider text-[#888]">
              <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <Link href="/blog" className="hover:text-amber-400 transition-colors">Articles</Link>
              <Link href="/about" className="hover:text-amber-400 transition-colors">About</Link>
            </div>
          </div>
        </nav>

        {/* MAIN */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="border-t border-[#2a2a2a] mt-24 py-8 text-center text-xs text-[#444] tracking-widest">
          <p>© {new Date().getFullYear()} MY BLOG — BUILT WITH NEXT.JS & MYSQL</p>
        </footer>
      </body>
    </html>
  );
}
