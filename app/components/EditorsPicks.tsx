import Image from 'next/image';

export default function EditorsPicks() {
  return (
    <section id="picks" className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-6">Editor's Picks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map((i) => (
            <div key={i} className="flex gap-4 items-center bg-white p-4 rounded shadow">
              <div className="w-28 h-28 relative bg-[#F0ECE4] rounded overflow-hidden">
                <Image src={`/model${i}.jpeg`} alt={`Look ${i}`} fill className="object-cover" />
              </div>
              <div>
                <div className="font-medium">Look {i} — Curated</div>
                <div className="text-sm text-[#8B7A6B] mt-1">A staple piece styled for everyday resilience.</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
