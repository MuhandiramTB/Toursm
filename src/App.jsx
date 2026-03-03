import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { ArrowUp, MessageCircle } from 'lucide-react';

// Lazy-loaded pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const DestinationsPage = lazy(() => import('./pages/DestinationsPage'));
const ExperiencesPage = lazy(() => import('./pages/ExperiencesPage'));
const MapPage = lazy(() => import('./pages/MapPage'));
const PlannerPage = lazy(() => import('./pages/PlannerPage'));
const SeasonalPage = lazy(() => import('./pages/SeasonalPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const InfoPage = lazy(() => import('./pages/InfoPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="w-16 h-16 border-2 border-cream-darker rounded-full" />
          <div className="w-16 h-16 border-2 border-t-saffron rounded-full animate-spin absolute inset-0" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-saffron text-sm font-bold">SL</span>
          </div>
        </div>
        <p className="font-sans text-forest/40 text-xs tracking-widest uppercase">Loading…</p>
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6 pt-20">
      <div className="text-center">
        <div className="font-serif text-[10rem] leading-none text-cream-dark">404</div>
        <h1 className="font-serif text-4xl text-forest mb-4">Page Not Found</h1>
        <p className="font-body text-forest/60 mb-8">The page you're looking for doesn't exist.</p>
        <a href="/" className="btn-primary">Return Home</a>
      </div>
    </div>
  );
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

// Back to Top button
function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 50,
        width: '48px',
        height: '48px',
        backgroundColor: hovered ? '#C4772A' : '#1A1209',
        border: '1.5px solid rgba(196,119,42,0.6)',
        color: hovered ? '#1A1209' : '#C4772A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        transition: 'background-color 0.3s, color 0.3s, transform 0.2s',
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
      }}
    >
      <ArrowUp style={{ width: '18px', height: '18px' }} />
    </button>
  );
}

// WhatsApp floating button
function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="https://wa.me/94112426900?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20visiting%20Sri%20Lanka"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '1.5rem',
        zIndex: 50,
        width: '52px',
        height: '52px',
        backgroundColor: hovered ? '#1DA851' : '#25D366',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(37,211,102,0.35)',
        transition: 'background-color 0.3s, transform 0.2s',
        transform: hovered ? 'scale(1.12)' : 'scale(1)',
        textDecoration: 'none',
      }}
    >
      <MessageCircle style={{ width: '24px', height: '24px', color: '#fff', fill: '#fff' }} />
    </a>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/destinations" element={<DestinationsPage />} />
                <Route path="/experiences" element={<ExperiencesPage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/planner" element={<PlannerPage />} />
                <Route path="/seasonal" element={<SeasonalPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/info" element={<InfoPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
        <BackToTop />
        <WhatsAppButton />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
