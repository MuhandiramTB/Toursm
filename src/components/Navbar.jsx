import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
    { label: 'Destinations', href: '/destinations' },
    { label: 'Experiences', href: '/experiences' },
    { label: 'Map', href: '/map' },
    { label: 'Plan Trip', href: '/planner' },
    {
        label: 'Explore',
        children: [
            { label: 'Seasonal Guide', href: '/seasonal' },
            { label: 'Gallery', href: '/gallery' },
            { label: 'Stories', href: '/blog' },
        ],
    },
    { label: 'Visas & Info', href: '/info' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdown, setDropdown] = useState(null);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
        setDropdown(null);
    }, [location]);

    const navClass = scrolled || !isHome
        ? 'bg-forest/98 backdrop-blur-md shadow-luxury border-b border-white/5'
        : 'bg-transparent';

    const textClass = scrolled || !isHome ? 'text-cream' : 'text-cream';

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navClass}`}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-3 group"
                        aria-label="Sri Lanka Tourism - Home"
                    >
                        <div className="w-10 h-10 border border-saffron-DEFAULT flex items-center justify-center group-hover:bg-saffron-DEFAULT transition-colors duration-300">
                            <span className="font-serif text-saffron-DEFAULT group-hover:text-forest text-lg font-bold transition-colors duration-300">SL</span>
                        </div>
                        <div>
                            <div className={`font-serif text-xl leading-none tracking-wider ${textClass}`}>Sri Lanka</div>
                            <div className="text-saffron-DEFAULT font-sans text-xs tracking-[0.3em] uppercase">Pearl of the Ocean</div>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) =>
                            link.children ? (
                                <div
                                    key={link.label}
                                    className="relative"
                                    onMouseEnter={() => setDropdown(link.label)}
                                    onMouseLeave={() => setDropdown(null)}
                                >
                                    <button
                                        className={`nav-link flex items-center gap-1 ${textClass} text-sm tracking-widest uppercase font-sans`}
                                        aria-haspopup="true"
                                        aria-expanded={dropdown === link.label}
                                    >
                                        {link.label}
                                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdown === link.label ? 'rotate-180' : ''}`} />
                                    </button>
                                    {dropdown === link.label && (
                                        <div className="absolute top-full left-0 pt-3 w-48 z-50">
                                            <div className="bg-forest border border-saffron-DEFAULT/30 py-2 shadow-luxury">
                                                {link.children.map((child) => (
                                                    <Link
                                                        key={child.label}
                                                        to={child.href}
                                                        className="block px-5 py-3 text-cream/80 hover:text-saffron-DEFAULT hover:bg-white/5 font-sans text-sm tracking-wider uppercase transition-all duration-200"
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    key={link.label}
                                    to={link.href}
                                    className={`nav-link ${textClass} text-sm tracking-widest uppercase font-sans ${location.pathname === link.href ? 'text-saffron-DEFAULT after:w-full' : ''}`}
                                >
                                    {link.label}
                                </Link>
                            )
                        )}
                        <Link to="/planner" className="btn-primary text-xs py-3 px-6">
                            Plan Your Journey
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-cream"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden transition-all duration-400 overflow-hidden ${mobileOpen ? 'max-h-screen' : 'max-h-0'}`}
                aria-hidden={!mobileOpen}
            >
                <div className="bg-forest/98 backdrop-blur-md border-t border-white/5 px-4 py-6 space-y-1">
                    {navLinks.map((link) =>
                        link.children ? (
                            <div key={link.label}>
                                <button
                                    className="flex items-center justify-between w-full text-cream/80 py-3 font-sans text-sm tracking-widest uppercase"
                                    onClick={() => setDropdown(dropdown === link.label ? null : link.label)}
                                >
                                    {link.label}
                                    <ChevronDown className={`w-4 h-4 transition-transform ${dropdown === link.label ? 'rotate-180' : ''}`} />
                                </button>
                                {dropdown === link.label && (
                                    <div className="pl-4 space-y-1">
                                        {link.children.map((child) => (
                                            <Link
                                                key={child.label}
                                                to={child.href}
                                                className="block text-cream/60 hover:text-saffron-DEFAULT py-2 font-sans text-sm tracking-wider uppercase transition-colors"
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                key={link.label}
                                to={link.href}
                                className={`block py-3 font-sans text-sm tracking-widest uppercase transition-colors ${location.pathname === link.href ? 'text-saffron-DEFAULT' : 'text-cream/80 hover:text-saffron-DEFAULT'}`}
                            >
                                {link.label}
                            </Link>
                        )
                    )}
                    <div className="pt-4">
                        <Link to="/planner" className="btn-primary w-full justify-center text-xs py-3">
                            Plan Your Journey
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
