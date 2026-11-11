import type { Metadata } from 'next';
import InfoPage from '../../components/site/InfoPage';
import { formatNaira } from '@/lib/catalog';
import { delivery, site } from '@/lib/site';

export const metadata: Metadata = { title: 'Shipping & Returns' };

export default function ShippingReturnsPage() {
  return (
    <InfoPage eyebrow="Help" title="Shipping & returns">
      <section>
        <h2>Delivery</h2>
        <p>We deliver to all 36 states and the FCT. Orders are packed and dispatched within 1–2 business days of payment.</p>
        <ul className="mt-3">
          <li>Lagos: {formatNaira(delivery.lagos)}, {delivery.lagosDays}</li>
          <li>Other states: {formatNaira(delivery.otherStates)}, {delivery.otherDays}</li>
          {delivery.freeOver > 0 && <li>Free delivery on orders over {formatNaira(delivery.freeOver)}</li>}
        </ul>
        <p className="mt-3">Our rider will call the phone number you give at checkout before delivery.</p>
      </section>

      <section>
        <h2>Exchanges</h2>
        <p>
          Wrong size? We&apos;ll exchange it. Contact us within 7 days of delivery. Items must be unworn, unwashed and
          have their tags attached. Delivery costs for exchanges are paid by the customer unless we sent the wrong item.
        </p>
      </section>

      <section>
        <h2>Returns & refunds</h2>
        <p>
          If your item arrives damaged or we sent the wrong item, contact us within 48 hours of delivery with a photo,
          and we&apos;ll replace it or refund you in full. Because our editions are limited, we don&apos;t offer refunds
          for change of mind.
        </p>
      </section>

      <section>
        <h2>Need help?</h2>
        <p>
          Email <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> with your order number (it starts with
          BGV-) and we&apos;ll sort you out.
        </p>
      </section>
    </InfoPage>
  );
}
