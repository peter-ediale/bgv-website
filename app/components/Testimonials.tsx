export default function Testimonials() {
  const quotes = [
    { name: 'Keddie', text: "Timeless pieces — I wear mine everywhere." },
    { name: 'lala', text: 'Quality and fit are excellent.' },
    { name: 'bee', text: 'The designs feel personal and confident.' },
  ];

  return (
    <section id="testimonials" className="py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-6">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <blockquote key={q.name} className="bg-white p-6 rounded shadow">
              <p className="text-[#8B7A6B]">“{q.text}”</p>
              <footer className="mt-4 text-sm font-medium">— {q.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
