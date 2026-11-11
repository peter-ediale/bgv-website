import type { Metadata } from 'next';
import ContactForm from '../../components/site/ContactForm';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Questions about an order, collaborations, or just good vibes. Get in touch with B&GV.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24 grid gap-16 md:grid-cols-2">
      <div>
        <p className="eyebrow text-muted">Contact</p>
        <h1 className="display text-7xl md:text-9xl mt-4">Let&apos;s talk</h1>
        <p className="mt-8 text-muted leading-relaxed max-w-md">
          Question about your order, want to collaborate, or just want to share some good vibes? We usually reply
          within 24 hours.
        </p>

        <dl className="mt-12 space-y-8">
          <div>
            <dt className="eyebrow text-muted">Email</dt>
            <dd className="mt-2">
              <a href={`mailto:${site.contactEmail}`} className="text-lg underline underline-offset-4 hover:text-clay">
                {site.contactEmail}
              </a>
            </dd>
          </div>
          {site.whatsapp && (
            <div>
              <dt className="eyebrow text-muted">WhatsApp</dt>
              <dd className="mt-2">
                <a href={`https://wa.me/${site.whatsapp}`} className="text-lg underline underline-offset-4 hover:text-clay">
                  Chat with us
                </a>
              </dd>
            </div>
          )}
          <div>
            <dt className="eyebrow text-muted">Based in</dt>
            <dd className="mt-2 text-lg">Nigeria, delivering nationwide</dd>
          </div>
        </dl>
      </div>

      <div className="md:pt-24">
        <ContactForm />
      </div>
    </div>
  );
}
