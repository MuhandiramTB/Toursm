import { useState } from 'react';
import { experiences } from '../data/sriLankaData';
import { AnimatedSection } from '../components/AnimatedSection';
import { Clock, DollarSign, CheckCircle, ArrowRight } from 'lucide-react';

const CATEGORIES_EXP = ['All', 'Wildlife', 'Adventure', 'Cultural', 'Culinary', 'Spiritual'];

const experienceDetails = {
    1: {
        overview: "Yala National Park, established in 1938, is Sri Lanka's most visited wildlife sanctuary and the world's highest-density leopard habitat: 1 leopard per 6 km². Our expert naturalists have tracked these extraordinary cats for over 15 years and know every territory.",
        itinerary: [
            "5:30am — Hotel pickup & pre-dawn drive to Yala",
            "6:30am — Park gates open, begin morning safari circuit",
            "8:30am — Prime leopard-spotting hours at Leopard Rock",
            "10:30am — Elephant herds at Maha Seelawewa tank",
            "12:00pm — Picnic lunch in the wilderness",
            "2:00pm — Afternoon circuit: birds, crocs, sloth bear",
            "5:30pm — Sunset from Yala's coastal cliffs",
            "6:30pm — Return transfer to hotel",
        ],
        included: ["Expert naturalist guide", "Open-air jeep with 4WD", "Picnic lunch", "Park entrance fees", "Bottled water", "Hotel transfer"],
        notIncluded: ["Hotel accommodation", "Gratuities", "Personal items"],
    },
    2: {
        overview: "Arugam Bay, on Sri Lanka's sun-drenched east coast, is ranked among the world's 10 best surf spots by Lonely Planet. Our ISA-certified instructors have taught over 3,000 students from beginner to advanced. The Point Break delivers perfect right-hand waves June–September.",
        itinerary: [
            "8:00am — Meet your instructor at Main Break",
            "8:30am — Ocean safety and board basics",
            "9:00am — First session in the water (beginners' break)",
            "11:00am — Video analysis and technique coaching",
            "11:30am — Second session at intermediate break",
            "1:00pm — Session ends; board hire extended for afternoon",
        ],
        included: ["ISA certified instructor", "Surfboard & leash", "Rashguard", "Wax", "Video analysis session"],
        notIncluded: ["Accommodation", "Meals", "Transport to Arugam Bay"],
    },
};

export default function ExperiencesPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [expanded, setExpanded] = useState(null);

    const filtered = activeCategory === 'All' ? experiences : experiences.filter(e => e.category === activeCategory);

    return (
        <div className="min-h-screen bg-cream pt-20">
            {/* Header */}
            <div className="relative bg-forest text-cream py-24 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=1920&q=60')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-forest/80" />
                <div className="relative z-10">
                    <div className="section-subheading text-saffron">Curated Journeys</div>
                    <h1 className="font-serif text-5xl md:text-6xl text-cream mb-4">Experiences</h1>
                    <div className="divider-amber" />
                    <p className="font-body text-cream/70 max-w-2xl mx-auto">
                        From leopard safaris at dawn to orthodox tea ceremonies at altitude —
                        immerse yourself in Sri Lanka's most extraordinary encounters.
                    </p>
                </div>
            </div>

            {/* Category Filters */}
            <div className="bg-cream/95 backdrop-blur-sm border-b border-cream-darker sticky top-20 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2 flex-wrap" role="group" aria-label="Filter experiences">
                    {CATEGORIES_EXP.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            aria-pressed={activeCategory === cat}
                            className={`tag-pill text-xs tracking-widest font-sans ${activeCategory === cat
                                    ? 'bg-forest text-cream border-forest'
                                    : 'border-cream-darker text-forest/60 hover:border-forest'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Experience Tiles */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filtered.map((exp, i) => (
                        <AnimatedSection key={exp.id} delay={i * 100}>
                            <article className="group bg-cream border border-cream-darker hover:border-saffron/40 hover:shadow-card-hover transition-all duration-500">
                                {/* Image */}
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={exp.image}
                                        alt={exp.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />
                                    <div className="absolute top-4 left-4 text-4xl">{exp.icon}</div>
                                    <div className="absolute top-4 right-4 bg-saffron text-forest font-sans text-xs px-3 py-1 tracking-widest uppercase">
                                        {exp.category}
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h2 className="font-serif text-2xl text-cream">{exp.title}</h2>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <p className="font-body text-forest/65 text-sm leading-relaxed mb-5">{exp.description}</p>

                                    {/* Highlights */}
                                    <ul className="space-y-2 mb-6">
                                        {exp.highlights.map(h => (
                                            <li key={h} className="flex items-center gap-2 text-sm font-body text-forest/70">
                                                <CheckCircle className="w-4 h-4 text-saffron shrink-0" />
                                                {h}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex items-center justify-between pt-4 border-t border-cream-darker">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1 font-sans text-xs text-forest/50">
                                                <Clock className="w-3.5 h-3.5" />
                                                {exp.duration}
                                            </span>
                                            <span className="font-sans text-sm text-saffron font-medium">{exp.price}</span>
                                        </div>
                                        <button
                                            onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
                                            aria-expanded={expanded === exp.id}
                                            className="flex items-center gap-1 font-sans text-xs tracking-widest uppercase text-forest/50 hover:text-saffron transition-colors"
                                        >
                                            {expanded === exp.id ? 'Less' : 'Details'}
                                            <ArrowRight className={`w-3.5 h-3.5 transition-transform ${expanded === exp.id ? 'rotate-90' : ''}`} />
                                        </button>
                                    </div>

                                    {/* Expanded Details */}
                                    {expanded === exp.id && experienceDetails[exp.id] && (
                                        <div className="mt-6 pt-6 border-t border-cream-darker space-y-4 animate-[fadeUp_0.3s_ease]">
                                            <p className="font-body text-forest/65 text-sm leading-relaxed">
                                                {experienceDetails[exp.id].overview}
                                            </p>
                                            <div>
                                                <h4 className="font-serif text-base text-forest mb-2">Day Itinerary</h4>
                                                <ul className="space-y-1">
                                                    {experienceDetails[exp.id].itinerary.map((item, j) => (
                                                        <li key={j} className="font-sans text-xs text-forest/60 flex gap-2">
                                                            <span className="text-saffron">›</span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-serif text-base text-forest mb-2">What's Included</h4>
                                                <ul className="grid grid-cols-1 gap-1">
                                                    {experienceDetails[exp.id].included.map(item => (
                                                        <li key={item} className="flex items-center gap-2 font-sans text-xs text-forest/60">
                                                            <span className="w-1.5 h-1.5 bg-sage rounded-full" />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </article>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </div>
    );
}
