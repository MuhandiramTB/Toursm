import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const footerLinks = {
    explore: [
        { label: 'Destinations', href: '/destinations' },
        { label: 'Experiences', href: '/experiences' },
        { label: 'Interactive Map', href: '/map' },
        { label: 'Seasonal Guide', href: '/seasonal' },
        { label: 'Photo Gallery', href: '/gallery' },
    ],
    plan: [
        { label: 'Trip Planner', href: '/planner' },
        { label: 'Visa & Entry', href: '/info' },
        { label: 'Stories & Blog', href: '/blog' },
        { label: 'Newsletter', href: '/#newsletter' },
    ],
};

const social = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter / X' },
    { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
    return (
        <footer className="bg-forest text-cream" role="contentinfo">
            {/* Top bar */}
            <div className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-3 mb-6 group">
                            <div className="w-12 h-12 border border-saffron flex items-center justify-center">
                                <span className="font-serif text-saffron text-xl font-bold">SL</span>
                            </div>
                            <div>
                                <div className="font-serif text-2xl leading-none">Sri Lanka</div>
                                <div className="text-saffron font-sans text-xs tracking-[0.3em] uppercase mt-0.5">Pearl of the Ocean</div>
                            </div>
                        </Link>
                        <p className="font-body text-cream/60 text-sm leading-relaxed mb-6">
                            The official portal for Sri Lanka Tourism. Discover 2,500 years of civilisation, pristine beaches and boundless nature in the Indian Ocean's most radiant island.
                        </p>
                        <div className="flex items-center gap-4">
                            {social.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="w-9 h-9 border border-cream/20 flex items-center justify-center text-cream/60 hover:text-saffron hover:border-saffron transition-all duration-300"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Explore Links */}
                    <div>
                        <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-saffron mb-6">Explore</h3>
                        <ul className="space-y-3">
                            {footerLinks.explore.map(link => (
                                <li key={link.label}>
                                    <Link
                                        to={link.href}
                                        className="font-body text-sm text-cream/60 hover:text-saffron flex items-center gap-2 group transition-colors duration-200"
                                    >
                                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-200" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Plan Links */}
                    <div>
                        <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-saffron mb-6">Plan & Visit</h3>
                        <ul className="space-y-3">
                            {footerLinks.plan.map(link => (
                                <li key={link.label}>
                                    <Link
                                        to={link.href}
                                        className="font-body text-sm text-cream/60 hover:text-saffron flex items-center gap-2 group transition-colors duration-200"
                                    >
                                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-200" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-saffron mb-6">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-cream/60 text-sm">
                                <MapPin className="w-4 h-4 text-saffron mt-0.5 shrink-0" />
                                <span className="font-body">Sri Lanka Tourism Promotion Bureau<br />80 Galle Road, Colombo 03, Sri Lanka</span>
                            </li>
                            <li className="flex items-center gap-3 text-cream/60 text-sm">
                                <Phone className="w-4 h-4 text-saffron shrink-0" />
                                <a href="tel:+94112426900" className="font-body hover:text-saffron transition-colors">+94 (11) 242-6900</a>
                            </li>
                            <li className="flex items-center gap-3 text-cream/60 text-sm">
                                <Mail className="w-4 h-4 text-saffron shrink-0" />
                                <a href="mailto:info@srilanka.travel" className="font-body hover:text-saffron transition-colors">info@srilanka.travel</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="font-sans text-xs text-cream/40 tracking-wider">
                    © {new Date().getFullYear()} Sri Lanka Tourism Promotion Bureau. All rights reserved.
                </p>
                <div className="flex items-center gap-6">
                    <Link to="/info" className="font-sans text-xs text-cream/40 hover:text-saffron tracking-wider transition-colors">Privacy Policy</Link>
                    <Link to="/info" className="font-sans text-xs text-cream/40 hover:text-saffron tracking-wider transition-colors">Terms of Use</Link>
                    <Link to="/info" className="font-sans text-xs text-cream/40 hover:text-saffron tracking-wider transition-colors">Accessibility</Link>
                </div>
            </div>
        </footer>
    );
}
