import type { Metadata } from 'next';
import InfoPage from '../../components/site/InfoPage';
import { sizeChart } from '@/lib/site';

export const metadata: Metadata = { title: 'Size Guide' };

export default function SizeGuidePage() {
  return (
    <InfoPage eyebrow="Help" title="Size guide">
      <section>
        <h2>Tees & tank tops</h2>
        <p>Measurements are of the garment laid flat, in inches. Our tees have a relaxed, boxy fit.</p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm text-left border-t border-line">
            <thead>
              <tr className="border-b border-line">
                <th className="eyebrow py-3 pr-4">Size</th>
                <th className="eyebrow py-3 pr-4">Chest (pit to pit)</th>
                <th className="eyebrow py-3">Length</th>
              </tr>
            </thead>
            <tbody>
              {sizeChart.map((r) => (
                <tr key={r.size} className="border-b border-line">
                  <td className="py-3 pr-4 font-medium">{r.size}</td>
                  <td className="py-3 pr-4">{r.chest}&quot;</td>
                  <td className="py-3">{r.length}&quot;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>How to pick your size</h2>
        <ul>
          <li>Lay your favourite tee flat and measure across the chest, armpit to armpit. Compare it with the table.</li>
          <li>Want it oversized? Go one size up. Want a closer fit? Go one size down.</li>
          <li>Still unsure? Contact us and we&apos;ll help you choose.</li>
        </ul>
      </section>

      <section>
        <h2>Caps</h2>
        <p>One size with an adjustable strap. Fits most heads.</p>
      </section>
    </InfoPage>
  );
}
