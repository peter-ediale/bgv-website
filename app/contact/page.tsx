import Image from 'next/image';

export default function ContactPage() {
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
          <a href="/about" className="hover:text-[#C9A96E] transition-colors">About</a>
          <a href="/contact" className="text-[#C9A96E] transition-colors">Contact</a>
        </div>
        
        <button className="px-4 py-2 border border-[#1A1A1A] rounded-full text-sm hover:bg-[#1A1A1A] hover:text-white transition-all duration-300">
          Cart (0)
        </button>
      </nav>

      {/* Contact Header */}
      <div className="text-center py-12 px-4">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A]">
          Let's Connect
        </h1>
        <p className="mt-2 text-[#8B7A6B] text-sm tracking-[0.2em] uppercase">
          We'd love to hear from you
        </p>
      </div>

      {/* Contact Content */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Left Side - Contact Info */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-6">
              Get in Touch
            </h2>
            <p className="text-[#4A4A4A] leading-relaxed mb-8">
              Have a question about your order, want to collaborate, or just want to 
              share some good vibes? We're all ears.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div>
                <p className="text-sm text-[#8B7A6B] uppercase tracking-wider mb-1">Email</p>
                <a 
                  href="mailto:peterediale2@gmail.com" 
                  className="text-[#1A1A1A] hover:text-[#C9A96E] transition-colors text-lg font-medium"
                >
                  peterediale2@gmail.com
                </a>
              </div>

              {/* Response Time */}
              <div>
                <p className="text-sm text-[#8B7A6B] uppercase tracking-wider mb-1">Response Time</p>
                <p className="text-[#1A1A1A] text-lg font-medium">Within 24 hours</p>
              </div>

              {/* Location */}
              <div>
                <p className="text-sm text-[#8B7A6B] uppercase tracking-wider mb-1">Location</p>
                <p className="text-[#1A1A1A] text-lg font-medium">Nigeria</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-10">
              <p className="text-sm text-[#8B7A6B] uppercase tracking-wider mb-4">Follow Us</p>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="px-6 py-3 border border-[#1A1A1A] rounded-full text-sm hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
                >
                  Instagram
                </a>
                <a 
                  href="#" 
                  className="px-6 py-3 border border-[#1A1A1A] rounded-full text-sm hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
                >
                  TikTok
                </a>
              </div>
              <p className="text-xs text-[#8B7A6B] mt-2">@BGVstyles — Coming Soon</p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-[#F0ECE4] p-8 rounded-lg">
            <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-6">
              Send a Message
            </h3>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
                  Your Name
                </label>
                <input 
                  type="text" 
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-white border border-[#E8E0D8] rounded-lg focus:outline-none focus:border-[#C9A96E] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
                  Your Email
                </label>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white border border-[#E8E0D8] rounded-lg focus:outline-none focus:border-[#C9A96E] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
                  Message
                </label>
                <textarea 
                  rows={4}
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-4 py-3 bg-white border border-[#E8E0D8] rounded-lg focus:outline-none focus:border-[#C9A96E] transition-colors resize-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-[#1A1A1A] text-white rounded-lg hover:bg-[#C9A96E] transition-all duration-300 font-medium"
              >
                Send Message ✨
              </button>
              <p className="text-xs text-[#8B7A6B] text-center mt-2">
                We'll get back to you within 24 hours
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
