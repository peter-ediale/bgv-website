import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FBF8F3]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="B&GV Logo" 
            width={40}
            height={40}
            className="h-10 w-auto object-contain"
          />
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-[#4A4A4A]">
          <a href="/" className="hover:text-[#C9A96E] transition-colors">Home</a>
          <a href="/shop" className="hover:text-[#C9A96E] transition-colors">Shop</a>

          <a href="/about" className="text-[#C9A96E] transition-colors">About</a>
          <a href="/contact" className="hover:text-[#C9A96E] transition-colors">Contact</a>

        </div>
        
        <button className="px-4 py-2 border border-[#1A1A1A] rounded-full text-sm hover:bg-[#1A1A1A] hover:text-white transition-all duration-300">
          Cart (0)
        </button>
      </nav>

      {/* About Content */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#1A1A1A] text-center">
          The Story Behind <br />
          <span className="text-[#C9A96E]">Blessings &amp; Good Vibes</span>
        </h1>
        
        <div className="mt-12 space-y-6 text-[#4A4A4A] leading-relaxed text-lg">
          <p>
            B&amp;GV started with a simple ritual: Friday hangouts with friends, 
            just chilling, relaxing, and being present with each other. 
            Over time, the bond in that circle grew strong enough that it earned a name 
            — <span className="font-semibold text-[#1A1A1A]">Blessings and Good Vibes,</span>  and it stuck.
          </p>
          
          <p>
            The brand is a reflection of a personal outlook on life: 
            staying positive no matter the situation, keeping a happy face through hard times, 
            having a strong sense of style and vibe in everything from parties to everyday life, 
            and crediting it all to one thing above everything else — God's blessings.
          </p>
          
          <p>
            The first edition launched in 2024.
            It was a prototype, the goal wasn't perfection, it was getting the idea 
            out of the head and into the world.
          </p>
          
          <p>
            By 2026, the brand has grown alongside its founder through tough times, 
            resilience, grit, and staying focused on the goal. 
            Edition 2 reflects that growth: not a finished glow-up, but proof of a brand 
            still evolving, still building, and still carrying blessings and good vibes 
            through every phase.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-[#F0ECE4] p-8 rounded-lg">
            <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">Our Mission</h3>
            <p className="mt-3 text-[#4A4A4A] leading-relaxed">
              To design and produce high-quality clothing that promotes self-expression, 
              confidence, and a positive lifestyle, while encouraging a sense of 
              community and unity among our customers.
            </p>
          </div>
          <div className="bg-[#F0ECE4] p-8 rounded-lg">
            <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">Our Vision</h3>
            <p className="mt-3 text-[#4A4A4A] leading-relaxed">
              To become a leading clothing brand in Africa, recognized for our 
              unique clothing style and comfort, while making a positive impact 
              on our customers' lives.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
