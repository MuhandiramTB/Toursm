import { useState, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import { galleryImages } from '../data/sriLankaData';
import { AnimatedSection } from '../components/AnimatedSection';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const GALLERY_CATEGORIES = ['All', 'Heritage', 'Beach', 'Nature', 'Wildlife', 'Culture'];

const breakpointColumns = {
    default: 4,
    1280: 4,
    1024: 3,
    768: 2,
    640: 2,
    0: 1,
};

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [lightbox, setLightbox] = useState(null); // index

    const filtered = activeCategory === 'All'
        ? galleryImages
        : galleryImages.filter(img => img.category === activeCategory);

    const openLightbox = useCallback((index) => setLightbox(index), []);
    const closeLightbox = useCallback(() => setLightbox(null), []);

    const prevImage = useCallback(() => {
        if (lightbox !== null) setLightbox(prev => (prev - 1 + filtered.length) % filtered.length);
    }, [lightbox, filtered.length]);

    const nextImage = useCallback(() => {
        if (lightbox !== null) setLightbox(prev => (prev + 1) % filtered.length);
    }, [lightbox, filtered.length]);

    // Keyboard navigation
    const handleKeyDown = useCallback((e) => {
        if (lightbox === null) return;
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'Escape') closeLightbox();
    }, [lightbox, prevImage, nextImage, closeLightbox]);

    return (
        <div className="min-h-screen bg-forest pt-20" onKeyDown={handleKeyDown} tabIndex={-1}>
            {/* Header */}
            <div className="bg-forest text-cream py-24 px-6 text-center relative overflow-hidden">
                <div className="relative z-10">
                    <div className="section-subheading text-saffron">Visual Stories</div>
                    <h1 className="font-serif text-5xl md:text-6xl text-cream mb-4">Gallery</h1>
                    <div className="divider-amber" />
                    <p className="font-body text-cream/70 max-w-xl mx-auto">
                        A curated collection of Sri Lanka's most extraordinary moments —
                        captured by our photographers across the island.
                    </p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="sticky top-20 z-30 bg-forest/95 backdrop-blur-sm border-b border-white/10 px-6 py-4">
                <div className="max-w-7xl mx-auto flex flex-wrap gap-2" role="group" aria-label="Filter gallery">
                    {GALLERY_CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            aria-pressed={activeCategory === cat}
                            className={`px-5 py-2 font-sans text-xs tracking-widest uppercase border transition-all duration-200 ${activeCategory === cat
                                    ? 'border-saffron bg-saffron text-forest'
                                    : 'border-white/20 text-cream/60 hover:border-cream/40 hover:text-cream'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                    <span className="ml-auto font-sans text-xs text-cream/30 self-center">
                        {filtered.length} images
                    </span>
                </div>
            </div>

            {/* Masonry Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <Masonry
                    breakpointCols={breakpointColumns}
                    className="masonry-grid"
                    columnClassName="masonry-column"
                >
                    {filtered.map((img, i) => (
                        <AnimatedSection key={img.id} delay={i * 60}>
                            <div
                                className="mb-4 overflow-hidden group cursor-pointer relative"
                                onClick={() => openLightbox(i)}
                                role="button"
                                tabIndex={0}
                                aria-label={`View ${img.title} in fullscreen`}
                                onKeyDown={e => e.key === 'Enter' && openLightbox(i)}
                            >
                                <img
                                    src={img.url}
                                    alt={img.title}
                                    loading="lazy"
                                    className="w-full transition-transform duration-700 group-hover:scale-105"
                                    style={{ aspectRatio: `${img.width}/${img.height}` }}
                                />
                                <div className="absolute inset-0 bg-forest/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="text-center">
                                        <ZoomIn className="w-8 h-8 text-cream mb-2 mx-auto" />
                                        <p className="font-serif text-cream text-sm">{img.title}</p>
                                        <p className="font-sans text-saffron text-xs tracking-widest uppercase">{img.category}</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </Masonry>
            </div>

            {/* Lightbox */}
            {lightbox !== null && filtered[lightbox] && (
                <div
                    className="lightbox-overlay"
                    onClick={e => e.target === e.currentTarget && closeLightbox()}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Lightbox: ${filtered[lightbox].title}`}
                >
                    {/* Close */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 z-10 p-3 text-cream/60 hover:text-cream transition-colors"
                        aria-label="Close lightbox"
                    >
                        <X className="w-7 h-7" />
                    </button>

                    {/* Prev */}
                    <button
                        onClick={prevImage}
                        className="absolute left-4 sm:left-8 p-3 text-cream/60 hover:text-cream transition-colors"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    {/* Image */}
                    <div className="max-w-5xl mx-auto px-16 text-center">
                        <img
                            src={filtered[lightbox].url.replace('w=600', 'w=1200')}
                            alt={filtered[lightbox].title}
                            className="max-h-[80vh] max-w-full object-contain mx-auto shadow-luxury"
                        />
                        <div className="mt-4">
                            <h2 className="font-serif text-2xl text-cream">{filtered[lightbox].title}</h2>
                            <p className="font-sans text-saffron text-xs tracking-widest uppercase mt-1">{filtered[lightbox].category}</p>
                            <p className="font-sans text-cream/30 text-xs mt-3">
                                {lightbox + 1} / {filtered.length}
                            </p>
                        </div>
                    </div>

                    {/* Next */}
                    <button
                        onClick={nextImage}
                        className="absolute right-4 sm:right-8 p-3 text-cream/60 hover:text-cream transition-colors"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>
                </div>
            )}
        </div>
    );
}
