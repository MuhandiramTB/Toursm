import { useState, useMemo } from 'react';
import { X, MapPin, Star, Clock, TrendingUp, Tag } from 'lucide-react';
import { destinations } from '../data/sriLankaData';
import { AnimatedSection } from '../components/AnimatedSection';
import LazyImage from '../components/LazyImage';

const CATEGORIES = ['All', 'Heritage', 'Beach', 'Nature', 'Wildlife', 'Culture'];

const categoryColors = {
    Heritage: 'bg-saffron-DEFAULT text-cream',
    Beach: 'bg-ocean text-cream',
    Nature: 'bg-sage text-cream',
    Wildlife: 'bg-sunset text-cream',
    Culture: 'bg-gold text-forest',
};

export default function DestinationsPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState('');

    const filtered = useMemo(() => {
        return destinations.filter(d => {
            const matchCat = activeCategory === 'All' || d.category === activeCategory;
            const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.region.toLowerCase().includes(search.toLowerCase());
            return matchCat && matchSearch;
        });
    }, [activeCategory, search]);

    return (
        <div className="min-h-screen bg-cream pt-20">
            {/* Page Header */}
            <div className="bg-forest text-cream py-24 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586511925558-a4134d14cdfe?w=1920&q=60')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-forest/80" />
                <div className="relative z-10">
                    <div className="section-subheading text-saffron-DEFAULT">Explore</div>
                    <h1 className="font-serif text-5xl md:text-6xl text-cream mb-4">Destinations</h1>
                    <div className="divider-amber" />
                    <p className="font-body text-cream/70 max-w-2xl mx-auto">
                        From ancient citadels to pristine beaches, wildlife reserves to mist-draped highlands —
                        discover every corner of Sri Lanka's extraordinary landscape.
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="sticky top-20 z-30 bg-cream/95 backdrop-blur-sm border-b border-cream-darker shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Search */}
                        <input
                            type="search"
                            placeholder="Search destinations…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            aria-label="Search destinations"
                            className="border border-cream-darker bg-transparent px-4 py-2 text-sm font-sans text-forest placeholder-forest/40 focus:outline-none focus:border-saffron-DEFAULT transition-colors flex-1 min-w-48 max-w-72"
                        />

                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    aria-pressed={activeCategory === cat}
                                    className={`tag-pill font-sans text-xs tracking-widest ${activeCategory === cat
                                            ? 'bg-forest text-cream border-forest'
                                            : 'border-cream-darker text-forest/60 hover:border-forest hover:text-forest'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <span className="font-sans text-xs text-forest/40 ml-auto">
                            {filtered.length} {filtered.length === 1 ? 'destination' : 'destinations'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                {filtered.length === 0 ? (
                    <div className="text-center py-24">
                        <p className="font-serif text-3xl text-forest/30 mb-4">No destinations found</p>
                        <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="btn-primary">
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filtered.map((dest, i) => (
                            <AnimatedSection key={dest.id} delay={i * 80}>
                                <DestinationCard dest={dest} onClick={() => setSelected(dest)} />
                            </AnimatedSection>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {selected && (
                <DestinationModal dest={selected} onClose={() => setSelected(null)} />
            )}
        </div>
    );
}

function DestinationCard({ dest, onClick }) {
    return (
        <article
            className="card-luxury cursor-pointer"
            onClick={onClick}
            onKeyDown={e => e.key === 'Enter' && onClick()}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${dest.name}`}
        >
            <div className="relative h-64 overflow-hidden">
                <LazyImage src={dest.image} alt={dest.name} className="w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-sans tracking-wider uppercase ${categoryColors[dest.category] || 'bg-gray-500 text-white'}`}>
                    {dest.category}
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-forest/80 px-2 py-1">
                    <Star className="w-3 h-3 text-saffron-DEFAULT fill-saffron-DEFAULT" />
                    <span className="font-sans text-cream text-xs">{dest.rating}</span>
                </div>
            </div>
            <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif text-xl text-forest leading-tight">{dest.name}</h3>
                </div>
                <div className="flex items-center gap-1 text-forest/50 mb-3">
                    <MapPin className="w-3 h-3" />
                    <span className="font-sans text-xs">{dest.region}</span>
                </div>
                <p className="font-body text-forest/60 text-sm leading-relaxed line-clamp-2 mb-4">
                    {dest.shortDesc}
                </p>
                <div className="flex items-center justify-between text-xs font-sans pt-4 border-t border-cream-darker">
                    <span className="flex items-center gap-1 text-forest/50">
                        <Clock className="w-3 h-3" />
                        {dest.duration}
                    </span>
                    <span className="text-saffron-DEFAULT font-medium">{dest.price}</span>
                </div>
            </div>
        </article>
    );
}

function DestinationModal({ dest, onClose }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest/80 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="bg-cream max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-luxury">
                {/* Image */}
                <div className="relative h-80">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent" />
                    <button
                        onClick={onClose}
                        aria-label="Close destination details"
                        className="absolute top-4 right-4 p-2 bg-forest/60 text-cream hover:bg-forest transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className={`inline-flex px-2.5 py-1 text-xs font-sans tracking-wider uppercase mb-2 ${categoryColors[dest.category] || ''}`}>
                            {dest.category}
                        </div>
                        <h2 id="modal-title" className="font-serif text-3xl text-cream">{dest.name}</h2>
                        <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-saffron-DEFAULT" />
                                <span className="font-sans text-cream/70 text-sm">{dest.region}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 text-saffron-DEFAULT fill-saffron-DEFAULT" />
                                <span className="font-sans text-cream text-sm">{dest.rating} ({dest.reviews.toLocaleString()} reviews)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    {/* Description */}
                    <p className="font-body text-forest/70 leading-relaxed mb-8">{dest.description}</p>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: 'Best Time', value: dest.bestTime, icon: '🌤' },
                            { label: 'Duration', value: dest.duration, icon: '⏱' },
                            { label: 'Difficulty', value: dest.difficulty, icon: '🧭' },
                            { label: 'Price', value: dest.price, icon: '💰' },
                        ].map(item => (
                            <div key={item.label} className="bg-cream-dark p-4 text-center">
                                <div className="text-xl mb-1">{item.icon}</div>
                                <div className="font-sans text-xs text-forest/50 uppercase tracking-wider mb-1">{item.label}</div>
                                <div className="font-serif text-sm text-forest">{item.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Highlights */}
                    <div className="mb-8">
                        <h3 className="font-serif text-xl text-forest mb-4">Highlights</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {dest.highlights.map(h => (
                                <li key={h} className="flex items-center gap-2 font-body text-sm text-forest/70">
                                    <span className="w-1.5 h-1.5 bg-saffron-DEFAULT rounded-full shrink-0" />
                                    {h}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {dest.tags.map(tag => (
                            <span key={tag} className="tag-pill border-cream-darker text-forest/50 text-xs">
                                <Tag className="w-3 h-3" />
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
