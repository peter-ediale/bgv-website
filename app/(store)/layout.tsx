import AnnouncementBar from '../components/site/AnnouncementBar';
import Header from '../components/site/Header';
import Footer from '../components/site/Footer';
import CartDrawer from '../components/site/CartDrawer';
import { WhatsAppIcon } from '../components/site/Icons';
import { site } from '../../lib/site';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-ink focus:text-paper focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <CartDrawer />
      {site.whatsapp && (
        <a
          href={`https://wa.me/${site.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="fixed bottom-5 right-5 z-30 size-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-lg hover:scale-105 transition-transform"
        >
          <WhatsAppIcon />
        </a>
      )}
    </>
  );
}
