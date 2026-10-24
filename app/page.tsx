import Image from 'next/image';
import CartButton from './components/CartButton';
import FeaturedSection from './components/FeaturedSection';
import EditorsPicks from './components/EditorsPicks';
import AboutSection from './components/AboutSection';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

export default function Home() {
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
          <a href="#" className="hover:text-[#C9A96E] transition-colors">Home</a>
          <a href="/shop" className="hover:text-[#C9A96E] transition-colors">Shop</a>

          <a href="/about" className="hover:text-[#C9A96E] transition-colors">About</a>

          <a href="/contact" className="hover:text-[#C9A96E] transition-colors">Contact</a>

        </div>
        
        <CartButton />
      </nav>

      {/* Hero Section with Background Image */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/hero-bg.jpeg" 
            alt="B&GV Hero" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <p className="text-sm tracking-[0.3em] uppercase text-[#C9A96E] mb-4">
            Edition 2 — Coming Soon
          </p>
          
          <h1 className="font-serif text-6xl md:text-8xl font-bold leading-[1.1]">
            Blessings &amp;
            <br />
            <span className="text-[#C9A96E]">Good Vibes</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Premium clothing for the resilient.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-[#C9A96E] text-white rounded-full hover:bg-[#B8963E] transition-all duration-300 font-medium">
              Notify Me
            </button>
            <a href="/shop">
  <button className="px-8 py-4 border-2 border-[#1A1A1A] rounded-full hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 font-medium">
    Explore Edition 1
  </button>
</a>

          </div>
        </div>
      </section>

      <FeaturedSection />
      <EditorsPicks />
      <AboutSection />
      <Testimonials />
      <Gallery />
      <Footer />
    </main>
  );
}
