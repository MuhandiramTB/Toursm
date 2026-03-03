import { useState } from 'react';
import { AnimatedSection } from '../components/AnimatedSection';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react';

const offices = [
    {
        city: 'Colombo HQ',
        address: 'Sri Lanka Tourism Promotion Bureau\n80 Galle Road, Colombo 03',
        phone: '+94 (11) 242-6900',
        email: 'info@srilanka.travel',
        hours: 'Mon–Fri  9 am – 5 pm IST',
        flag: '🇱🇰',
    },
    {
        city: 'London Office',
        address: '1 Devonshire Square\nLondon EC2M 4WD, UK',
        phone: '+44 (20) 7930-2627',
        email: 'london@srilanka.travel',
        hours: 'Mon–Fri  9 am – 5 pm GMT',
        flag: '🇬🇧',
    },
    {
        city: 'Frankfurt Office',
        address: 'Fahrgasse 6\n60311 Frankfurt am Main',
        phone: '+49 (69) 2972-7390',
        email: 'frankfurt@srilanka.travel',
        hours: 'Mon–Fri  9 am – 5 pm CET',
        flag: '🇩🇪',
    },
];

const enquiryTypes = [
    'General Enquiry',
    'Trip Planning',
    'Visa & Entry Requirements',
    'Accommodation',
    'Safari & Wildlife',
    'Press & Media',
    'Business Partnership',
];

export default function ContactPage() {
    const [form, setForm] = useState({
        name: '', email: '', phone: '', type: enquiryTypes[0], message: '',
    });
    const [status, setStatus] = useState('idle'); // idle | loading | success | error

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;
        setStatus('loading');
        // Simulate API call
        await new Promise(r => setTimeout(r, 1600));
        setStatus('success');
    };

    return (
        <div className="min-h-screen bg-cream pt-20">
            {/* Header */}
            <div className="relative bg-forest text-cream py-24 px-6 text-center overflow-hidden">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1627894006066-b786e1e49e4b?w=1920&q=60')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="absolute inset-0 bg-forest/80" />
                <div className="relative z-10">
                    <div className="section-subheading" style={{ color: '#C4772A' }}>Get in Touch</div>
                    <h1 className="font-serif text-5xl md:text-6xl text-cream mb-4">Contact Us</h1>
                    <div className="w-16 h-0.5 mx-auto my-6" style={{ backgroundColor: '#C4772A' }} />
                    <p className="font-body text-cream/70 max-w-2xl mx-auto">
                        Our team of Sri Lanka specialists is ready to help you plan the perfect journey.
                        Reach out however you prefer — we'll respond within 24 hours.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* ─── Contact Form ─── */}
                    <AnimatedSection direction="left">
                        <div className="section-subheading">Send a Message</div>
                        <h2 className="font-serif text-3xl text-forest mb-8">Enquire Now</h2>

                        {status === 'success' ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <CheckCircle className="w-16 h-16 mb-6" style={{ color: '#C4772A' }} />
                                <h3 className="font-serif text-2xl text-forest mb-3">Message Received!</h3>
                                <p className="font-body text-forest/60 mb-8">
                                    Thank you, {form.name}. One of our Sri Lanka specialists will
                                    get back to you at <span style={{ color: '#C4772A' }}>{form.email}</span> within 24 hours.
                                </p>
                                <button
                                    onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', type: enquiryTypes[0], message: '' }); }}
                                    className="btn-primary"
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                                {/* Name & Email */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block font-sans text-xs tracking-widest uppercase text-forest/50 mb-2">
                                            Full Name <span style={{ color: '#C4772A' }}>*</span>
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your full name"
                                            className="input-luxury"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block font-sans text-xs tracking-widest uppercase text-forest/50 mb-2">
                                            Email Address <span style={{ color: '#C4772A' }}>*</span>
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="you@example.com"
                                            className="input-luxury"
                                        />
                                    </div>
                                </div>

                                {/* Phone & Type */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="phone" className="block font-sans text-xs tracking-widest uppercase text-forest/50 mb-2">
                                            Phone (Optional)
                                        </label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={form.phone}
                                            onChange={handleChange}
                                            placeholder="+1 234 567 8900"
                                            className="input-luxury"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="type" className="block font-sans text-xs tracking-widest uppercase text-forest/50 mb-2">
                                            Enquiry Type
                                        </label>
                                        <select
                                            id="type"
                                            name="type"
                                            value={form.type}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-b-2 py-3 font-body text-forest focus:outline-none transition-colors duration-300"
                                            style={{ borderColor: '#E5DDD0' }}
                                            onFocus={e => e.target.style.borderColor = '#C4772A'}
                                            onBlur={e => e.target.style.borderColor = '#E5DDD0'}
                                        >
                                            {enquiryTypes.map(t => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block font-sans text-xs tracking-widest uppercase text-forest/50 mb-2">
                                        Your Message <span style={{ color: '#C4772A' }}>*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="Tell us about your dream Sri Lanka trip — destinations, dates, group size, any special requests…"
                                        className="w-full bg-transparent border-b-2 py-3 font-body text-forest focus:outline-none transition-colors duration-300 resize-none"
                                        style={{ borderColor: '#E5DDD0' }}
                                        onFocus={e => e.target.style.borderColor = '#C4772A'}
                                        onBlur={e => e.target.style.borderColor = '#E5DDD0'}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                                            Sending…
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Send Enquiry
                                        </>
                                    )}
                                </button>

                                <p className="font-sans text-xs text-forest/40 mt-2">
                                    We typically respond within 24 hours during business days.
                                </p>
                            </form>
                        )}
                    </AnimatedSection>

                    {/* ─── Contact Info ─── */}
                    <AnimatedSection direction="right">
                        {/* WhatsApp CTA */}
                        <div
                            className="p-6 mb-10 flex items-start gap-4"
                            style={{ backgroundColor: '#f0fdf4', border: '1px solid #86efac' }}
                        >
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                                style={{ backgroundColor: '#25D366' }}
                            >
                                <MessageCircle className="w-6 h-6 text-white fill-white" />
                            </div>
                            <div>
                                <h3 className="font-serif text-lg text-forest mb-1">Prefer WhatsApp?</h3>
                                <p className="font-body text-forest/60 text-sm mb-3">
                                    Chat directly with our travel team for instant answers.
                                </p>
                                <a
                                    href="https://wa.me/94112426900?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20visiting%20Sri%20Lanka"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 font-sans text-sm font-medium tracking-wider"
                                    style={{ color: '#25D366' }}
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Office Cards */}
                        <div className="section-subheading">Our Offices</div>
                        <h2 className="font-serif text-3xl text-forest mb-8">Find Us Worldwide</h2>

                        <div className="space-y-6">
                            {offices.map((office, i) => (
                                <AnimatedSection key={office.city} delay={i * 100}>
                                    <div
                                        className="p-6 transition-all duration-300"
                                        style={{ border: '1px solid #E5DDD0' }}
                                        onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(196,119,42,0.4)'}
                                        onMouseLeave={e => e.currentTarget.style.borderColor = '#E5DDD0'}
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-2xl">{office.flag}</span>
                                            <h3 className="font-serif text-xl text-forest">{office.city}</h3>
                                        </div>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-3 font-body text-sm text-forest/65">
                                                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#C4772A' }} />
                                                <span style={{ whiteSpace: 'pre-line' }}>{office.address}</span>
                                            </li>
                                            <li className="flex items-center gap-3 font-body text-sm text-forest/65">
                                                <Phone className="w-4 h-4 shrink-0" style={{ color: '#C4772A' }} />
                                                <a
                                                    href={`tel:${office.phone.replace(/\s/g, '')}`}
                                                    className="hover:underline transition-colors"
                                                    style={{ color: 'inherit' }}
                                                >
                                                    {office.phone}
                                                </a>
                                            </li>
                                            <li className="flex items-center gap-3 font-body text-sm text-forest/65">
                                                <Mail className="w-4 h-4 shrink-0" style={{ color: '#C4772A' }} />
                                                <a
                                                    href={`mailto:${office.email}`}
                                                    className="hover:underline transition-colors"
                                                    style={{ color: 'inherit' }}
                                                >
                                                    {office.email}
                                                </a>
                                            </li>
                                            <li className="flex items-center gap-3 font-body text-sm text-forest/65">
                                                <Clock className="w-4 h-4 shrink-0" style={{ color: '#C4772A' }} />
                                                {office.hours}
                                            </li>
                                        </ul>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </div>

            {/* Map Section */}
            <section className="bg-forest py-20" aria-label="Office location map">
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection className="text-center mb-10">
                        <div className="section-subheading" style={{ color: '#C4772A' }}>Colombo Headquarters</div>
                        <h2 className="font-serif text-4xl text-cream mb-4">Visit Us in Colombo</h2>
                        <div className="w-16 h-0.5 mx-auto my-6" style={{ backgroundColor: '#C4772A' }} />
                    </AnimatedSection>
                    <div className="overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)', height: '400px' }}>
                        <iframe
                            title="Sri Lanka Tourism Board, Colombo"
                            src="https://www.openstreetmap.org/export/embed.html?bbox=79.84300%2C6.89800%2C79.86800%2C6.91800&layer=mapnik&marker=6.90764%2C79.85610"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(30%) invert(10%)' }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                    <p className="font-sans text-cream/40 text-xs text-center mt-3">
                        80 Galle Road, Colombo 03 · <a href="https://www.openstreetmap.org/?mlat=6.90764&mlon=79.85610#map=15/6.90764/79.85610" target="_blank" rel="noopener noreferrer" className="underline hover:text-cream/70 transition-colors">Open in OpenStreetMap</a>
                    </p>
                </div>
            </section>
        </div>
    );
}
