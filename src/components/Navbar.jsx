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

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const isScrolled = scrolled || !isHome;

    const navBg = isScrolled
        ? 'rgba(26,18,9,0.98)'
        : 'transparent';

    const navBorder = isScrolled
        ? '1px solid rgba(255,255,255,0.06)'
        : '1px solid transparent';

    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                backgroundColor: navBg,
                borderBottom: navBorder,
                backdropFilter: isScrolled ? 'blur(16px)' : 'none',
                WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
                transition: 'background-color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
                boxShadow: isScrolled ? '0 25px 50px rgba(26,18,9,0.2)' : 'none',
            }}
            role="navigation"
            aria-label="Main navigation"
        >
            <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

                    {/* ── Logo ── */}
                    <Link
                        to="/"
                        aria-label="Sri Lanka Tourism - Home"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
                    >
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                border: '1.5px solid #C4772A',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'background-color 0.3s',
                                flexShrink: 0,
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#C4772A'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <span style={{ fontFamily: 'Playfair Display, serif', color: '#C4772A', fontWeight: 700, fontSize: '1rem' }}>SL</span>
                        </div>
                        <div style={{ lineHeight: 1 }}>
                            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', letterSpacing: '0.05em', color: '#FDFAF5', lineHeight: '1.2' }}>
                                Sri Lanka
                            </div>
                            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C4772A', marginTop: '2px' }}>
                                Pearl of the Ocean
                            </div>
                        </div>
                    </Link>

                    {/* ── Desktop Nav (md+) ── */}
                    <div
                        className="hidden-mobile"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2rem',
                        }}
                    >
                        {navLinks.map((link) =>
                            link.children ? (
                                <div
                                    key={link.label}
                                    style={{ position: 'relative' }}
                                    onMouseEnter={() => setDropdown(link.label)}
                                    onMouseLeave={() => setDropdown(null)}
                                >
                                    <button
                                        aria-haspopup="true"
                                        aria-expanded={dropdown === link.label}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontFamily: 'Inter, sans-serif',
                                            fontSize: '0.75rem',
                                            letterSpacing: '0.1em',
                                            textTransform: 'uppercase',
                                            color: '#FDFAF5',
                                            padding: '0.25rem 0',
                                        }}
                                    >
                                        {link.label}
                                        <ChevronDown
                                            style={{
                                                width: '14px',
                                                height: '14px',
                                                transition: 'transform 0.2s',
                                                transform: dropdown === link.label ? 'rotate(180deg)' : 'none',
                                            }}
                                        />
                                    </button>
                                    {dropdown === link.label && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '100%',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                paddingTop: '0.5rem',
                                                zIndex: 100,
                                                width: '180px',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    backgroundColor: '#1A1209',
                                                    border: '1px solid rgba(196,119,42,0.3)',
                                                    boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
                                                    padding: '0.5rem 0',
                                                }}
                                            >
                                                {link.children.map((child) => (
                                                    <Link
                                                        key={child.label}
                                                        to={child.href}
                                                        style={{
                                                            display: 'block',
                                                            padding: '0.6rem 1.25rem',
                                                            fontFamily: 'Inter, sans-serif',
                                                            fontSize: '0.75rem',
                                                            letterSpacing: '0.08em',
                                                            textTransform: 'uppercase',
                                                            color: 'rgba(253,250,245,0.8)',
                                                            textDecoration: 'none',
                                                            transition: 'color 0.2s, background-color 0.2s',
                                                        }}
                                                        onMouseEnter={e => {
                                                            e.currentTarget.style.color = '#C4772A';
                                                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                                                        }}
                                                        onMouseLeave={e => {
                                                            e.currentTarget.style.color = 'rgba(253,250,245,0.8)';
                                                            e.currentTarget.style.backgroundColor = 'transparent';
                                                        }}
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
                                    style={{
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '0.75rem',
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        textDecoration: 'none',
                                        color: location.pathname === link.href ? '#C4772A' : '#FDFAF5',
                                        padding: '0.25rem 0',
                                        position: 'relative',
                                        transition: 'color 0.2s',
                                        borderBottom: location.pathname === link.href ? '1px solid #C4772A' : '1px solid transparent',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#C4772A'}
                                    onMouseLeave={e => {
                                        if (location.pathname !== link.href) e.currentTarget.style.color = '#FDFAF5';
                                    }}
                                >
                                    {link.label}
                                </Link>
                            )
                        )}
                        <Link
                            to="/planner"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '0.6rem 1.4rem',
                                backgroundColor: '#C4772A',
                                color: '#FDFAF5',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '0.7rem',
                                fontWeight: 500,
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                transition: 'background-color 0.3s',
                                whiteSpace: 'nowrap',
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#A85F1A'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#C4772A'}
                        >
                            Plan Your Journey
                        </Link>
                    </div>

                    {/* ── Mobile Hamburger ── */}
                    <button
                        className="show-mobile"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileOpen}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#FDFAF5',
                            padding: '0.5rem',
                        }}
                    >
                        {mobileOpen ? <X style={{ width: '24px', height: '24px' }} /> : <Menu style={{ width: '24px', height: '24px' }} />}
                    </button>
                </div>
            </div>

            {/* ── Mobile Drawer ── */}
            <div
                style={{
                    backgroundColor: 'rgba(26,18,9,0.98)',
                    backdropFilter: 'blur(16px)',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    padding: mobileOpen ? '1.5rem' : '0 1.5rem',
                    maxHeight: mobileOpen ? '100vh' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease, padding 0.3s ease',
                }}
                aria-hidden={!mobileOpen}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {navLinks.map((link) =>
                        link.children ? (
                            <div key={link.label}>
                                <button
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '0.8rem',
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        color: 'rgba(253,250,245,0.8)',
                                        padding: '0.75rem 0',
                                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                                    }}
                                    onClick={() => setDropdown(dropdown === link.label ? null : link.label)}
                                >
                                    {link.label}
                                    <ChevronDown
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                            transform: dropdown === link.label ? 'rotate(180deg)' : 'none',
                                            transition: 'transform 0.2s',
                                        }}
                                    />
                                </button>
                                {dropdown === link.label && (
                                    <div style={{ paddingLeft: '1rem', paddingBottom: '0.5rem' }}>
                                        {link.children.map((child) => (
                                            <Link
                                                key={child.label}
                                                to={child.href}
                                                style={{
                                                    display: 'block',
                                                    padding: '0.5rem 0',
                                                    fontFamily: 'Inter, sans-serif',
                                                    fontSize: '0.75rem',
                                                    letterSpacing: '0.08em',
                                                    textTransform: 'uppercase',
                                                    color: 'rgba(253,250,245,0.6)',
                                                    textDecoration: 'none',
                                                }}
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
                                style={{
                                    display: 'block',
                                    padding: '0.75rem 0',
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '0.8rem',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    textDecoration: 'none',
                                    color: location.pathname === link.href ? '#C4772A' : 'rgba(253,250,245,0.8)',
                                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                                }}
                            >
                                {link.label}
                            </Link>
                        )
                    )}
                    <div style={{ paddingTop: '1rem' }}>
                        <Link
                            to="/planner"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                padding: '0.75rem',
                                backgroundColor: '#C4772A',
                                color: '#FDFAF5',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                            }}
                        >
                            Plan Your Journey
                        </Link>
                    </div>
                </div>
            </div>

            {/* Responsive CSS */}
            <style>{`
                .hidden-mobile { display: flex; }
                .show-mobile { display: none; }
                @media (max-width: 900px) {
                    .hidden-mobile { display: none !important; }
                    .show-mobile { display: flex !important; }
                }
            `}</style>
        </nav>
    );
}
