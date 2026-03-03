import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Play, MapPin, Star } from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import { destinations, experiences } from '../data/sriLankaData';

const heroSlides = [
    {
        url: "https://images.unsplash.com/photo-1586511925558-a4134d14cdfe?w=1920&q=90",
        title: "Ancient Wonders",
        sub: "Cultural Triangle",
    },
    {
        url: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=1920&q=90",
        title: "Pearl Shores",
        sub: "Southern Coastline",
    },
    {
        url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1920&q=90",
        title: "Highland Magic",
        sub: "Tea Country",
    },
    {
        url: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=1920&q=90",
        title: "Wild Kingdom",
        sub: "National Parks",
    },
];

const stats = [
    { value: "65+", label: "National Parks" },
    { value: "8", label: "UNESCO Sites" },
    { value: "1,340km", label: "Coastline" },
    { value: "2,500+", label: "Years of History" },
];

export default function HomePage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [parallaxOffset, setParallaxOffset] = useState(0);
    const heroRef = useRef(null);
    const intervalRef = useRef(null);

    // Auto-advance slides
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(intervalRef.current);
    }, []);

    // Parallax scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (heroRef.current) {
                setParallaxOffset(window.scrollY * 0.4);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const goToSlide = (i) => {
        setCurrentSlide(i);
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % heroSlides.length);
        }, 5000);
    };

    return (
        <div className="bg-cream">
            {/* ═══════════════════════ HERO ═══════════════════════ */}
            <section
                ref={heroRef}
                className="relative h-screen min-h-[600px] overflow-hidden"
                aria-label="Hero section"
            >
                {/* Slides */}
                {heroSlides.map((slide, i) => (
                    <div
                        key={i}
                        className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        aria-hidden={i !== currentSlide}
                    >
                        <div
                            className="absolute inset-0 scale-110 parallax-container"
                            style={{ transform: `translateY(${parallaxOffset}px) scale(1.1)` }}
                        >
                            <img
                                src={slide.url}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                                loading={i === 0 ? 'eager' : 'lazy'}
                            />
                        </div>
                    </div>
                ))}

                {/* Overlay */}
                <div className="absolute inset-0 hero-overlay z-10" />

                {/* Ambient overlay pattern */}
                <div className="absolute inset-0 z-10 opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(196,119,42,0.3) 0%, transparent 50%)',
                    }}
                />

                {/* Hero Content */}
                <div className="relative z-20 h-full flex items-center justify-center">
                    <div className="text-center text-cream px-6 max-w-5xl mx-auto">
                        {/* Eyebrow */}
                        <div className="flex items-center justify-center gap-3 mb-6 animate-[fadeUp_0.8s_ease_forwards]">
                            <div className="h-px w-12 bg-saffron-DEFAULT" />
                            <span className="font-sans text-saffron-DEFAULT text-xs tracking-[0.4em] uppercase">
                                {heroSlides[currentSlide].sub}
                            </span>
                            <div className="h-px w-12 bg-saffron-DEFAULT" />
                        </div>

                        {/* Main Title */}
                        <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none mb-4 animate-[fadeUp_0.8s_0.2s_ease_both]">
                            <span className="block">Sri Lanka</span>
                            <span className="block italic text-saffron-light">Awaits</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="font-body text-cream/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-[fadeUp_0.8s_0.4s_ease_both]">
                            An ancient island of wonder — where leopards prowl through jungle shadows,
                            tea mist rolls over emerald hills, and golden temples pierce the equatorial sky.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-[fadeUp_0.8s_0.6s_ease_both]">
                            <Link to="/destinations" className="btn-primary">
                                Discover Destinations
                            </Link>
                            <Link to="/planner" className="btn-outline">
                                Plan Your Journey
                            </Link>
                        </div>

                        {/* Slide dots */}
                        <div className="flex items-center justify-center gap-2 mt-12">
                            {heroSlides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goToSlide(i)}
                                    aria-label={`Slide ${i + 1}: ${heroSlides[i].title}`}
                                    className={`transition-all duration-300 ${i === currentSlide
                                            ? 'w-8 h-1 bg-saffron-DEFAULT'
                                            : 'w-2 h-1 bg-cream/40 hover:bg-cream/70'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Slide label (bottom right) */}
                <div className="absolute bottom-10 right-8 z-20 hidden lg:block">
                    <div className="writing-vertical text-cream/40 font-sans text-xs tracking-[0.3em] uppercase">
                        {String(currentSlide + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
                    <ChevronDown className="w-6 h-6 text-cream/60" />
                    <span className="font-sans text-cream/40 text-xs tracking-widest uppercase">Scroll</span>
                </div>
            </section>

            {/* ═══════════════════════ STATS STRIP ═══════════════════════ */}
            <section className="bg-forest py-10" aria-label="Destination statistics">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <AnimatedSection key={stat.label} delay={i * 100} className="text-center">
                            <div className="font-serif text-4xl text-saffron-DEFAULT mb-1">{stat.value}</div>
                            <div className="font-sans text-cream/50 text-xs tracking-widest uppercase">{stat.label}</div>
                        </AnimatedSection>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════ INTRO ═══════════════════════ */}
            <section className="py-24 px-6 max-w-7xl mx-auto" aria-labelledby="intro-heading">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <AnimatedSection direction="left">
                        <div className="section-subheading">The Pearl of the Indian Ocean</div>
                        <h2 id="intro-heading" className="section-heading mb-6">
                            A Civilisation<br />Kissed by the<br />
                            <em className="text-saffron-DEFAULT">Indian Ocean</em>
                        </h2>
                        <div className="divider-amber ml-0" />
                        <p className="font-body text-forest/70 leading-relaxed mb-6">
                            Sri Lanka — Serendib to Arab traders, Taprobane to the Greeks — is one of Asia's most
                            diverse and storied destinations. A teardrop island barely 65,000 km² yet containing
                            eight UNESCO World Heritage Sites, 26 national parks, 1,340 km of coastline and a
                            civilisation stretching unbroken for 2,500 years.
                        </p>
                        <p className="font-body text-forest/70 leading-relaxed mb-8">
                            Whether you seek the spiritual serenity of lotus-filled dagobas, the primal thrill of
                            tracking leopards at dawn, the meditative rhythm of high-altitude tea trails, or simply
                            the luxury of an untouched Indian Ocean beach — Sri Lanka offers it all within a single
                            enchanted island.
                        </p>
                        <Link to="/destinations" className="btn-primary">
                            Explore All Destinations
                        </Link>
                    </AnimatedSection>

                    <AnimatedSection direction="right">
                        <div className="grid grid-cols-2 gap-4 h-[600px]">
                            <div className="flex flex-col gap-4">
                                <div className="flex-1 overflow-hidden group">
                                    <img
                                        src="https://images.unsplash.com/photo-1627894006066-b786e1e49e4b?w=400&q=80"
                                        alt="Temple of the Sacred Tooth, Kandy"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="h-48 overflow-hidden group">
                                    <img
                                        src="https://images.unsplash.com/photo-1571891190280-b5a90a9fe5a6?w=400&q=80"
                                        alt="Galle Fort"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 pt-8">
                                <div className="h-48 overflow-hidden group">
                                    <img
                                        src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=400&q=80"
                                        alt="Mirissa Beach"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="flex-1 overflow-hidden group">
                                    <img
                                        src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&q=80"
                                        alt="Nine Arch Bridge, Ella"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* ═══════════════════════ TOP DESTINATIONS ═══════════════════════ */}
            <section className="py-24 bg-forest text-cream" aria-labelledby="top-dest-heading">
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection className="text-center mb-16">
                        <div className="section-subheading text-saffron-DEFAULT">Must-See Places</div>
                        <h2 id="top-dest-heading" className="font-serif text-5xl text-cream mb-4">
                            Iconic Destinations
                        </h2>
                        <div className="divider-amber" />
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {destinations.slice(0, 4).map((dest, i) => (
                            <AnimatedSection key={dest.id} delay={i * 120}>
                                <Link
                                    to="/destinations"
                                    className="block group relative overflow-hidden aspect-[3/4] cursor-pointer"
                                    aria-label={`Explore ${dest.name}`}
                                >
                                    <img
                                        src={dest.image}
                                        alt={dest.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <div className="flex items-center gap-1 mb-2">
                                            <Star className="w-3 h-3 text-saffron-DEFAULT fill-saffron-DEFAULT" />
                                            <span className="font-sans text-saffron-DEFAULT text-xs">{dest.rating}</span>
                                        </div>
                                        <div className="font-sans text-cream/60 text-xs tracking-widest uppercase mb-1">{dest.category}</div>
                                        <h3 className="font-serif text-xl text-cream leading-tight mb-1">{dest.name}</h3>
                                        <div className="flex items-center gap-1 text-cream/50">
                                            <MapPin className="w-3 h-3" />
                                            <span className="font-sans text-xs">{dest.region}</span>
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="bg-saffron-DEFAULT text-forest font-sans text-xs tracking-wider uppercase px-3 py-1">
                                            Explore
                                        </span>
                                    </div>
                                </Link>
                            </AnimatedSection>
                        ))}
                    </div>

                    <AnimatedSection className="text-center mt-12">
                        <Link to="/destinations" className="btn-outline">
                            View All Destinations
                        </Link>
                    </AnimatedSection>
                </div>
            </section>

            {/* ═══════════════════════ EXPERIENCES STRIP ═══════════════════════ */}
            <section className="py-24 px-6 max-w-7xl mx-auto" aria-labelledby="exp-heading">
                <AnimatedSection className="text-center mb-16">
                    <div className="section-subheading">Curated Journeys</div>
                    <h2 id="exp-heading" className="section-heading mb-4">
                        Extraordinary Experiences
                    </h2>
                    <div className="divider-amber" />
                </AnimatedSection>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {experiences.map((exp, i) => (
                        <AnimatedSection key={exp.id} delay={i * 100}>
                            <div className="card-luxury h-full flex flex-col">
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={exp.image}
                                        alt={exp.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-forest/70 to-transparent" />
                                    <div className="absolute bottom-4 left-4 text-3xl">{exp.icon}</div>
                                    <div className="absolute top-4 right-4 bg-saffron-DEFAULT text-forest font-sans text-xs px-3 py-1 tracking-wider uppercase">
                                        {exp.category}
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="font-serif text-2xl text-forest mb-3">{exp.title}</h3>
                                    <p className="font-body text-forest/60 text-sm leading-relaxed flex-1 mb-4">{exp.description}</p>
                                    <div className="flex items-center justify-between text-xs font-sans text-forest/50 pt-4 border-t border-cream-darker">
                                        <span>{exp.duration}</span>
                                        <span className="text-saffron-DEFAULT font-medium">{exp.price}</span>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                <AnimatedSection className="text-center mt-12">
                    <Link to="/experiences" className="btn-primary">
                        All Experiences
                    </Link>
                </AnimatedSection>
            </section>

            {/* ═══════════════════════ CTA BANNER ═══════════════════════ */}
            <section className="relative py-32 overflow-hidden" aria-labelledby="cta-heading">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=1920&q=80"
                        alt="Sri Lanka elephant in misty forest"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-forest/70" />
                </div>
                <div className="relative z-10 text-center text-cream max-w-3xl mx-auto px-6">
                    <AnimatedSection>
                        <div className="section-subheading text-saffron-DEFAULT">Start Planning</div>
                        <h2 id="cta-heading" className="font-serif text-5xl md:text-6xl text-cream mb-6">
                            Your Dream Journey<br />
                            <em className="text-saffron-light">Begins Here</em>
                        </h2>
                        <p className="font-body text-cream/70 text-lg mb-10">
                            Use our intelligent trip planner to craft a bespoke Sri Lanka itinerary
                            tailored perfectly to your interests, timeline and travel style.
                        </p>
                        <Link to="/planner" className="btn-primary text-sm">
                            Build My Itinerary
                        </Link>
                    </AnimatedSection>
                </div>
            </section>

            {/* ═══════════════════════ NEWSLETTER ═══════════════════════ */}
            <NewsletterSection />
        </div>
    );
}

function NewsletterSection() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | error

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;
        setStatus('loading');
        // Simulate API call
        await new Promise(r => setTimeout(r, 1200));
        setStatus('success');
        setEmail('');
    };

    return (
        <section id="newsletter" className="py-24 bg-saffron-DEFAULT/10 border-y border-saffron-DEFAULT/20" aria-labelledby="newsletter-heading">
            <div className="max-w-2xl mx-auto px-6 text-center">
                <AnimatedSection>
                    <div className="section-subheading">Stay Inspired</div>
                    <h2 id="newsletter-heading" className="font-serif text-4xl text-forest mb-4">
                        The Sri Lanka Almanac
                    </h2>
                    <p className="font-body text-forest/60 mb-8">
                        Monthly dispatches of travel stories, hidden discoveries, festival calendars,
                        and exclusive offers — curated by our editorial team in Colombo.
                    </p>

                    {status === 'success' ? (
                        <div className="flex items-center justify-center gap-3 py-4 text-saffron-DEFAULT">
                            <span className="text-2xl">✓</span>
                            <span className="font-serif text-xl">You're on the list. Welcome to the journey.</span>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
                            <label htmlFor="newsletter-email" className="sr-only">Your email address</label>
                            <input
                                id="newsletter-email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Your email address"
                                required
                                className="flex-1 bg-cream border-2 border-forest/20 px-5 py-4 font-body text-forest placeholder-forest/40 focus:outline-none focus:border-saffron-DEFAULT transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="btn-primary border-0 py-4 px-8 disabled:opacity-70"
                            >
                                {status === 'loading' ? '...' : 'Subscribe'}
                            </button>
                        </form>
                    )}
                    <p className="font-sans text-forest/40 text-xs mt-4">
                        No spam. Unsubscribe at any time. Read our{' '}
                        <Link to="/info" className="underline hover:text-saffron-DEFAULT transition-colors">Privacy Policy</Link>.
                    </p>
                </AnimatedSection>
            </div>
        </section>
    );
}
