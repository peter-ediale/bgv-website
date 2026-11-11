import type { Metadata } from 'next';
import InfoPage from '../../components/site/InfoPage';
import { site } from '@/lib/site';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <InfoPage eyebrow="Legal" title="Privacy" updated="November 2026">
      <section>
        <p>
          This policy explains what personal information {site.fullName} (&quot;B&amp;GV&quot;, &quot;we&quot;) collects
          when you use this website, and how we use it. We follow the Nigeria Data Protection Act 2023.
        </p>
      </section>

      <section>
        <h2>What we collect</h2>
        <ul>
          <li>When you order: your name, email, phone number and delivery address.</li>
          <li>When you join our newsletter or waitlist: your email address.</li>
          <li>When you contact us: your name, email and message.</li>
        </ul>
        <p className="mt-3">
          We never see or store your card details. Payments are handled by Paystack, a licensed payment processor.
        </p>
      </section>

      <section>
        <h2>How we use it</h2>
        <ul>
          <li>To process, deliver and support your order.</li>
          <li>To send order confirmations and delivery updates.</li>
          <li>To send news about drops, only if you signed up. You can unsubscribe at any time.</li>
        </ul>
        <p className="mt-3">We never sell your information.</p>
      </section>

      <section>
        <h2>Who we share it with</h2>
        <ul>
          <li>Paystack, to take payment.</li>
          <li>Our delivery partner, who gets your name, phone and address to deliver your order.</li>
          <li>Service providers that store our data and send our emails (Supabase and Resend).</li>
        </ul>
      </section>

      <section>
        <h2>Cookies & storage</h2>
        <p>
          We don&apos;t use advertising cookies. Your shopping bag is saved in your browser so it&apos;s still there
          when you come back.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          You can ask us to show, correct or delete the information we hold about you. Email{' '}
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      </section>
    </InfoPage>
  );
}
