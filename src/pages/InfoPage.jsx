import { useState } from 'react';
import { faqs } from '../data/sriLankaData';
import { AnimatedSection } from '../components/AnimatedSection';
import { ChevronDown, Plane, FileText, Bus, CreditCard, Phone, Globe } from 'lucide-react';

const visaTypes = [
    {
        type: "Electronic Travel Authorization (ETA)",
        icon: "🌐",
        eligibility: "Most nationalities (60+ countries)",
        duration: "30 days (extendable to 6 months)",
        cost: "USD 20–35",
        processing: "Instant – 24 hours",
        apply: "eta.gov.lk",
        note: "Recommended for all leisure travellers. Apply at least 48 hours before departure.",
    },
    {
        type: "Visa on Arrival",
        icon: "✈️",
        eligibility: "Select nationalities",
        duration: "30 days",
        cost: "USD 35–50",
        processing: "On arrival at airport",
        apply: "Colombo BIA, Mattala Airport",
        note: "Available but ETA is faster and recommended. Long queues during peak season.",
    },
    {
        type: "Free Visa (Visa-Free Access)",
        icon: "🎉",
        eligibility: "Maldives, Seychelles, Singapore, and more",
        duration: "30 days",
        cost: "Free",
        processing: "Instant on arrival",
        apply: "No application needed",
        note: "Automatically granted on arrival for eligible nationalities.",
    },
    {
        type: "Residence Visa",
        icon: "🏠",
        eligibility: "Investors, retirees, long-term residents",
        duration: "1–5 years",
        cost: "USD 200–700",
        processing: "2–4 weeks",
        apply: "Department of Immigration, Colombo",
        note: "For those planning extended stays or investment in Sri Lanka.",
    },
];

const transportOptions = [
    {
        title: "Scenic Train Journeys",
        icon: "🚂",
        description: "The Colombo–Kandy–Ella–Badulla train is one of the world's great rail journeys, passing through 54 tunnels, 44 viaducts and some of Asia's most spectacular mountain scenery. Book online at eticket.railway.gov.lk.",
        tips: ["Book 2nd class observation car for best views", "Most scenic section: Nanu Oya → Ella (3hrs)", "Blue train departs Colombo Fort at 5:55am"],
        cost: "LKR 200–1,500 ($0.65–5)",
    },
    {
        title: "Private Chauffeur",
        icon: "🚗",
        description: "For maximum comfort and flexibility, hire a private air-conditioned vehicle with an English-speaking driver-guide. Most drivers know all the hidden gems and will adjust the itinerary daily.",
        tips: ["USD 50–90/day for AC vehicle + driver", "Request recommendations from your hotel", "Negotiate multi-day rates"],
        cost: "USD 50–90/day",
    },
    {
        title: "Tuk-Tuk (Auto Rickshaw)",
        icon: "🛺",
        description: "The quintessential Sri Lankan experience for short hops and local exploration. Uber Tuk-Tuk operates in Colombo and major cities with metered pricing.",
        tips: ["Always agree the price before departure", "Uber Tuk-Tuk available in Colombo", "Great for fort towns and city exploration"],
        cost: "LKR 200–800 ($0.65–2.65)",
    },
    {
        title: "Intercity Buses",
        icon: "🚌",
        description: "Sri Lanka's private AC express buses are comfortable and frequent between major cities. Public buses are cheaper but crowded. Air-con express is recommended.",
        tips: ["Book AC express buses from main terminals", "Start early to avoid afternoon heat", "Luggage storage limited"],
        cost: "LKR 300–1,200 ($1–4)",
    },
    {
        title: "Domestic Flights",
        icon: "✈️",
        description: "FitsAir operates flights between Colombo (BIA/Ratmalana) and Jaffna, Trincomalee, and Batticaloa. Reduces long road journeys significantly.",
        tips: ["Book in advance online at fitsair.com", "Check luggage allowances carefully", "Ratmalana airport closer to Colombo city"],
        cost: "USD 50–150",
    },
    {
        title: "Scooter / Bicycle Hire",
        icon: "🛵",
        description: "In beach areas (Mirissa, Arugam Bay, Hikkaduwa) and Galle Fort, scooters and bicycles are available for hire. Ideal for independent coastal exploration.",
        tips: ["International driving licence required for scooters", "Helmets compulsory by law", "Bicycle hire free at some hotels"],
        cost: "LKR 1,000–2,500/day ($3–8)",
    },
];

const essentials = [
    { title: "Currency & Money", icon: <CreditCard className="w-5 h-5" />, content: "Sri Lankan Rupee (LKR). USD 1 ≈ LKR 300. Carry cash for rural areas. ATMs widely available in city centres. Visa/Mastercard accepted in hotels and larger restaurants. USD/EUR cash accepted at many tourist sites." },
    { title: "Emergency Contacts", icon: <Phone className="w-5 h-5" />, content: "Police: 119 | Ambulance: 110 | Tourist Police: +94 11 242 1052 | British High Commission Colombo: +94 11 539 0639 | US Embassy: +94 11 249 8500 | Hospital: National Hospital Colombo +94 11 269 1111" },
    { title: "Language", icon: <Globe className="w-5 h-5" />, content: "Sinhala is the official language. Tamil is spoken in the North and East. English is widely understood in all tourist areas, hotels and by most educated Sri Lankans — so communication is rarely a barrier." },
    { title: "Electricity & Plugs", icon: '🔌', content: "240V / 50Hz. Sri Lanka uses the British 3-pin square plug (Type G) and circular 3-pin (Type D). Bring a universal travel adapter. Most hotels have adaptors available at reception." },
];

function AccordionItem({ question, answer, index }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-cream-darker">
            <button
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-controls={`faq-${index}`}
                className="w-full text-left flex items-center justify-between py-5 gap-4 group"
            >
                <span className="font-serif text-lg text-forest group-hover:text-saffron transition-colors duration-200">
                    {question}
                </span>
                <ChevronDown className={`w-5 h-5 text-saffron shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>
            <div
                id={`faq-${index}`}
                className={`accordion-content ${open ? 'open' : ''}`}
            >
                <p className="font-body text-forest/65 leading-relaxed pb-6 text-sm">{answer}</p>
            </div>
        </div>
    );
}

export default function InfoPage() {
    return (
        <div className="min-h-screen bg-cream pt-20">
            {/* Header */}
            <div className="bg-forest text-cream py-24 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1627894006066-b786e1e49e4b?w=1920&q=60')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-forest/80" />
                <div className="relative z-10">
                    <div className="section-subheading text-saffron">Practical Information</div>
                    <h1 className="font-serif text-5xl md:text-6xl text-cream mb-4">Visas & Travel Guide</h1>
                    <div className="divider-amber" />
                    <p className="font-body text-cream/70 max-w-2xl mx-auto">
                        Everything you need to know to plan a seamless Sri Lanka journey —
                        visas, transport, currency, safety and more.
                    </p>
                </div>
            </div>

            {/* Visa Types */}
            <section className="py-20 px-6 max-w-7xl mx-auto" aria-labelledby="visa-heading">
                <AnimatedSection className="text-center mb-12">
                    <div className="section-subheading">Entry Requirements</div>
                    <h2 id="visa-heading" className="section-heading mb-4">Visa Types</h2>
                    <div className="divider-amber" />
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {visaTypes.map((visa, i) => (
                        <AnimatedSection key={visa.type} delay={i * 100}>
                            <div className="border border-cream-darker p-8 hover:border-saffron/50 hover:shadow-card transition-all duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-3xl">{visa.icon}</span>
                                    <h3 className="font-serif text-xl text-forest">{visa.type}</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    {[
                                        { label: 'Eligibility', value: visa.eligibility },
                                        { label: 'Duration', value: visa.duration },
                                        { label: 'Cost', value: visa.cost },
                                        { label: 'Processing', value: visa.processing },
                                    ].map(item => (
                                        <div key={item.label}>
                                            <div className="font-sans text-xs text-forest/40 tracking-widest uppercase mb-1">{item.label}</div>
                                            <div className="font-body text-sm text-forest">{item.value}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-cream-dark p-3 border-l-2 border-saffron">
                                    <p className="font-body text-xs text-forest/65">{visa.note}</p>
                                </div>
                                {visa.apply.includes('.') && (
                                    <a
                                        href={`https://${visa.apply}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 mt-4 font-sans text-xs text-saffron hover:underline"
                                    >
                                        <FileText className="w-3.5 h-3.5" />
                                        Apply at {visa.apply}
                                    </a>
                                )}
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                <div className="bg-saffron/10 border border-saffron/30 p-6">
                    <div className="flex gap-3">
                        <Plane className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-serif text-lg text-forest mb-2">ETA Strongly Recommended</h4>
                            <p className="font-body text-forest/65 text-sm">
                                We strongly recommend all visitors obtain an ETA online before travelling. Visit{' '}
                                <a href="https://eta.gov.lk" target="_blank" rel="noopener noreferrer" className="text-saffron hover:underline">
                                    eta.gov.lk
                                </a>{' '}
                                — the only official government portal. Beware of unofficial websites charging higher fees.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Transport Guide */}
            <section className="py-20 bg-forest text-cream" aria-labelledby="transport-heading">
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection className="text-center mb-12">
                        <div className="section-subheading text-saffron">Getting Around</div>
                        <h2 id="transport-heading" className="font-serif text-5xl text-cream mb-4">Transport Guide</h2>
                        <div className="divider-amber" />
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {transportOptions.map((opt, i) => (
                            <AnimatedSection key={opt.title} delay={i * 80}>
                                <div className="border border-white/10 p-6 hover:border-saffron/50 transition-all duration-300 h-full">
                                    <div className="text-3xl mb-3">{opt.icon}</div>
                                    <h3 className="font-serif text-xl text-cream mb-3">{opt.title}</h3>
                                    <p className="font-body text-cream/60 text-sm leading-relaxed mb-4">{opt.description}</p>
                                    <ul className="space-y-1.5 mb-4">
                                        {opt.tips.map(tip => (
                                            <li key={tip} className="flex items-start gap-2 font-sans text-xs text-cream/50">
                                                <span className="text-saffron mt-0.5">›</span>
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="font-sans text-xs text-saffron tracking-wider border-t border-white/10 pt-3">
                                        Approx: {opt.cost}
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Essentials */}
            <section className="py-20 px-6 max-w-7xl mx-auto" aria-labelledby="essentials-heading">
                <AnimatedSection className="text-center mb-12">
                    <div className="section-subheading">Travel Essentials</div>
                    <h2 id="essentials-heading" className="section-heading mb-4">Useful to Know</h2>
                    <div className="divider-amber" />
                </AnimatedSection>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                    {essentials.map((item, i) => (
                        <AnimatedSection key={item.title} delay={i * 80}>
                            <div className="p-6 border border-cream-darker hover:border-saffron/40 transition-all duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 border border-saffron flex items-center justify-center text-saffron">
                                        {typeof item.icon === 'string' ? <span className="text-lg">{item.icon}</span> : item.icon}
                                    </div>
                                    <h3 className="font-serif text-xl text-forest">{item.title}</h3>
                                </div>
                                <p className="font-body text-forest/65 text-sm leading-relaxed">{item.content}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                {/* FAQ Section */}
                <AnimatedSection className="text-center mb-10">
                    <div className="section-subheading">Common Questions</div>
                    <h2 className="section-heading mb-4">Frequently Asked</h2>
                    <div className="divider-amber" />
                </AnimatedSection>

                <div className="max-w-3xl mx-auto" role="list" aria-label="Frequently asked questions">
                    {faqs.map((faq, i) => (
                        <AnimatedSection key={i} delay={i * 60}>
                            <AccordionItem question={faq.question} answer={faq.answer} index={i} />
                        </AnimatedSection>
                    ))}
                </div>
            </section>
        </div>
    );
}
