// app/about/page.js
export default function AboutPage() {
  console.log("Hello")
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-12">
        <p className="text-amber-400 text-sm tracking-[0.3em] uppercase mb-3">About</p>
        <h1 className="text-4xl font-bold">Hey, I'm Yeasin 👋</h1>
      </div>

      <div className="space-y-6 text-[#c0b8a8] text-lg leading-8">
        <p>
          Welcome to my little corner of the internet. I'm a developer,
          passionate about building things and writing about the journey.
        </p>
        <p>
          On this blog you'll find thoughts on technology, development, design, and
          everyday observations. I write to learn, and I share in case it helps someone else.
        </p>
        <p>
          When I'm not coding, I'm probably reading, drinking coffee, or exploring
          something new.
        </p>
      </div>

      <div className="mt-12 pt-12 border-t border-[#2a2a2a]">
        <h2 className="text-xl font-bold mb-6 text-amber-400 tracking-widest uppercase text-sm">Get in touch</h2>
        <div className="flex gap-6">
          <a href="mailto:you@email.com" className="text-[#888] hover:text-amber-400 transition-colors text-sm tracking-wider">
            Email →
          </a>
          <a href="https://github.com" target="_blank" className="text-[#888] hover:text-amber-400 transition-colors text-sm tracking-wider">
            GitHub →
          </a>
          <a href="https://twitter.com" target="_blank" className="text-[#888] hover:text-amber-400 transition-colors text-sm tracking-wider">
            Twitter →
          </a>
        </div>
      </div>
    </div>
  );
}
