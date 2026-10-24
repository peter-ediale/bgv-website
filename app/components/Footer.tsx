export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm">© {new Date().getFullYear()} Blessings & Good Vibes</div>
        <div className="flex gap-4 text-sm">
          <a href="/about" className="hover:text-[#C9A96E]">About</a>
          <a href="/contact" className="hover:text-[#C9A96E]">Contact</a>
          <a href="/shop" className="hover:text-[#C9A96E]">Shop</a>
        </div>
      </div>
    </footer>
  );
}
