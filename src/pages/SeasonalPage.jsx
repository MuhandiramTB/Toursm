import { seasonalData } from '../data/sriLankaData';
import { AnimatedSection } from '../components/AnimatedSection';
import { Sun, Cloud, CloudRain, Droplets } from 'lucide-react';

const ratingColors = {
    5: 'bg-sage',
    4: 'bg-saffron-DEFAULT',
    3: 'bg-saffron-light',
    2: 'bg-sunset/70',
    1: 'bg-red-400',
};

const ratingLabels = {
    5: 'Peak Season',
    4: 'Great',
    3: 'Good',
    2: 'Fair',
    1: 'Low Season',
};

const WeatherIcon = ({ weather }) => {
    if (weather === 'Dry') return <Sun className="w-5 h-5 text-saffron-DEFAULT" />;
    if (weather === 'Monsoon') return <CloudRain className="w-5 h-5 text-ocean" />;
    if (weather === 'Hot') return <Sun className="w-5 h-5 text-sunset" />;
    return <Cloud className="w-5 h-5 text-forest/40" />;
};

const regionGuides = [
    {
        name: "West & South Coast",
        image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=600&q=80",
        bestMonths: "November – April",
        description: "The classic Sri Lankan circuit: Colombo, Galle Fort, Mirissa, Tangalle. Peak season runs December–February.",
        highlights: ["Whale watching (Dec–Apr)", "Galle Fort New Year", "Beach season"],
    },
    {
        name: "East Coast",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
        bestMonths: "May – September",
        description: "When the west is rainy, the east coast shines — Arugam Bay surf, Trincomalee diving, Pasikudah beaches.",
        highlights: ["Surf season peak (Jun–Sep)", "Whale shark (Mar–Jul)", "Trincomalee diving"],
    },
    {
        name: "Cultural Triangle",
        image: "https://images.unsplash.com/photo-1586511925558-a4134d14cdfe?w=600&q=80",
        bestMonths: "January – April, July – September",
        description: "Sigiriya, Anuradhapura, Polonnaruwa — visit year round but avoid heavy monsoon rains from Oct–Nov.",
        highlights: ["Esala Perahera (Jul–Aug)", "Minneriya elephant gathering", "Cool dry mornings"],
    },
    {
        name: "Hill Country",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80",
        bestMonths: "January – April",
        description: "Kandy, Ella, Nuwara Eliya — misty mountains at their finest in the first quarter. Tea estates bloom.",
        highlights: ["Tea harvest (Jan–Mar)", "Kandy Perahera (Jul–Aug)", "Misty morning trails"],
    },
];

export default function SeasonalPage() {
    return (
        <div className="min-h-screen bg-cream pt-20">
            {/* Header */}
            <div className="bg-forest text-cream py-24 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576673442511-7e39b6545c87?w=1920&q=60')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-forest/80" />
                <div className="relative z-10">
                    <div className="section-subheading text-saffron-DEFAULT">When To Go</div>
                    <h1 className="font-serif text-5xl md:text-6xl text-cream mb-4">Seasonal Guide</h1>
                    <div className="divider-amber" />
                    <p className="font-body text-cream/70 max-w-2xl mx-auto">
                        Sri Lanka's dual monsoon system means there's always somewhere beautiful to explore.
                        Here's your month-by-month guide to planning the perfect trip.
                    </p>
                </div>
            </div>

            {/* Month-by-Month Chart */}
            <section className="py-20 px-6 max-w-6xl mx-auto" aria-labelledby="month-chart">
                <AnimatedSection className="text-center mb-12">
                    <div className="section-subheading">Monthly Overview</div>
                    <h2 id="month-chart" className="section-heading mb-4">Best Time to Visit</h2>
                    <div className="divider-amber" />
                </AnimatedSection>

                {/* Desktop chart */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full" role="table" aria-label="Sri Lanka monthly weather chart">
                        <thead>
                            <tr className="border-b-2 border-cream-darker">
                                <th className="text-left font-sans text-xs tracking-widest uppercase text-forest/50 pb-4 pr-6">Month</th>
                                <th className="font-sans text-xs tracking-widest uppercase text-forest/50 pb-4 px-3">Weather</th>
                                <th className="font-sans text-xs tracking-widest uppercase text-forest/50 pb-4 px-3">Temp</th>
                                <th className="font-sans text-xs tracking-widest uppercase text-forest/50 pb-4 px-3">Rainfall</th>
                                <th className="font-sans text-xs tracking-widest uppercase text-forest/50 pb-4 px-3 text-left">Best For</th>
                                <th className="font-sans text-xs tracking-widest uppercase text-forest/50 pb-4 px-3">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {seasonalData.map((month, i) => (
                                <AnimatedSection key={month.month} delay={i * 60} className="contents">
                                    <tr className="border-b border-cream-darker hover:bg-cream-dark transition-colors group">
                                        <td className="py-5 pr-6">
                                            <span className="font-serif text-xl text-forest group-hover:text-saffron-DEFAULT transition-colors">{month.month}</span>
                                        </td>
                                        <td className="py-5 px-3 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <WeatherIcon weather={month.weather} />
                                                <span className="font-sans text-xs text-forest/60">{month.weather}</span>
                                            </div>
                                        </td>
                                        <td className="py-5 px-3 text-center">
                                            <span className="font-serif text-lg text-forest">{month.temp}°C</span>
                                        </td>
                                        <td className="py-5 px-3">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-2 bg-cream-darker">
                                                    <div
                                                        className="h-full bg-ocean/60 transition-all duration-700"
                                                        style={{ width: `${Math.min((month.rainfall / 400) * 100, 100)}%` }}
                                                    />
                                                </div>
                                                <span className="font-sans text-xs text-forest/50 w-10 text-right">{month.rainfall}mm</span>
                                            </div>
                                        </td>
                                        <td className="py-5 px-3">
                                            <span className="font-body text-sm text-forest/65">{month.regions}</span>
                                        </td>
                                        <td className="py-5 px-3 text-center">
                                            <div className="flex items-center gap-1 justify-center">
                                                {[...Array(5)].map((_, j) => (
                                                    <span
                                                        key={j}
                                                        className={`w-3 h-3 rounded-sm transition-all ${j < month.rating ? ratingColors[month.rating] : 'bg-cream-darker'}`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="font-sans text-xs text-forest/40">{ratingLabels[month.rating]}</span>
                                        </td>
                                    </tr>
                                </AnimatedSection>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden space-y-4">
                    {seasonalData.map((month, i) => (
                        <AnimatedSection key={month.month} delay={i * 60}>
                            <div className="border border-cream-darker p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-serif text-2xl text-forest">{month.month}</span>
                                    <div className={`px-3 py-1 font-sans text-xs text-cream ${ratingColors[month.rating] || 'bg-gray-400'}`}>
                                        {ratingLabels[month.rating]}
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-3 mb-3 text-center">
                                    <div>
                                        <WeatherIcon weather={month.weather} />
                                        <div className="font-sans text-xs text-forest/50 mt-1">{month.weather}</div>
                                    </div>
                                    <div>
                                        <div className="font-serif text-xl text-forest">{month.temp}°C</div>
                                        <div className="font-sans text-xs text-forest/50">Temperature</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1 justify-center">
                                            <Droplets className="w-4 h-4 text-ocean" />
                                            <span className="font-serif text-base text-forest">{month.rainfall}</span>
                                        </div>
                                        <div className="font-sans text-xs text-forest/50">mm Rainfall</div>
                                    </div>
                                </div>
                                <p className="font-body text-sm text-forest/60">{month.note}</p>
                                <p className="font-sans text-xs text-saffron-DEFAULT mt-1">{month.regions}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </section>

            {/* Region Guides */}
            <section className="py-20 bg-forest text-cream" aria-labelledby="region-guides">
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection className="text-center mb-12">
                        <div className="section-subheading text-saffron-DEFAULT">Region by Region</div>
                        <h2 id="region-guides" className="font-serif text-5xl text-cream mb-4">When to Visit Each Region</h2>
                        <div className="divider-amber" />
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {regionGuides.map((region, i) => (
                            <AnimatedSection key={region.name} delay={i * 120}>
                                <div className="group relative overflow-hidden bg-forest/40 border border-white/10 hover:border-saffron-DEFAULT/50 transition-all duration-300">
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="sm:w-48 h-40 sm:h-auto overflow-hidden shrink-0">
                                            <img
                                                src={region.image}
                                                alt={region.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="p-6 flex-1">
                                            <h3 className="font-serif text-xl text-cream mb-1">{region.name}</h3>
                                            <div className="font-sans text-saffron-DEFAULT text-xs tracking-wider uppercase mb-3">
                                                Best: {region.bestMonths}
                                            </div>
                                            <p className="font-body text-cream/60 text-sm leading-relaxed mb-4">{region.description}</p>
                                            <ul className="space-y-1">
                                                {region.highlights.map(h => (
                                                    <li key={h} className="flex items-center gap-2 font-sans text-xs text-cream/50">
                                                        <span className="w-1.5 h-1.5 bg-saffron-DEFAULT rounded-full" />
                                                        {h}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
