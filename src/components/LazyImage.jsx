import { useState } from 'react';
import { ImageOff } from 'lucide-react';

// Reliable fallback images by category keyword
const FALLBACKS = {
    heritage: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&q=80',
    beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    nature: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    wildlife: 'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80',
    culture: 'https://images.unsplash.com/photo-1573074617613-fc8ef27eaa2f?w=800&q=80',
    default: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
};

function getFallback(alt = '') {
    const lower = alt.toLowerCase();
    if (lower.includes('heritage') || lower.includes('fort') || lower.includes('temple') || lower.includes('sigiriya') || lower.includes('kandy')) return FALLBACKS.heritage;
    if (lower.includes('beach') || lower.includes('coast') || lower.includes('mirissa')) return FALLBACKS.beach;
    if (lower.includes('park') || lower.includes('wild') || lower.includes('animal') || lower.includes('elephant') || lower.includes('leopard')) return FALLBACKS.wildlife;
    if (lower.includes('nature') || lower.includes('tea') || lower.includes('ella') || lower.includes('bridge') || lower.includes('hill')) return FALLBACKS.nature;
    if (lower.includes('cultural') || lower.includes('festival') || lower.includes('dance')) return FALLBACKS.culture;
    return FALLBACKS.default;
}

export default function LazyImage({
    src,
    alt = '',
    className = '',
    style = {},
    imgClassName = 'w-full h-full object-cover',
    fallback,
    ...props
}) {
    const [loaded, setLoaded] = useState(false);
    const [errored, setErrored] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);
    const [triedFallback, setTriedFallback] = useState(false);

    const handleError = () => {
        if (!triedFallback) {
            // Try a category-specific fallback first
            const fallbackSrc = fallback || getFallback(alt);
            setCurrentSrc(fallbackSrc);
            setTriedFallback(true);
        } else {
            // Both failed — show placeholder
            setErrored(true);
        }
    };

    return (
        <div className={`relative overflow-hidden bg-cream-darker ${className}`} style={style}>
            {/* Shimmer while loading */}
            {!loaded && !errored && (
                <div
                    className="absolute inset-0 animate-pulse"
                    style={{
                        background: 'linear-gradient(90deg, #E5DDD0 25%, #F0EBE0 50%, #E5DDD0 75%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 1.5s infinite',
                    }}
                    aria-hidden="true"
                />
            )}

            {/* Error state */}
            {errored ? (
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{
                        background: 'linear-gradient(135deg, #1A1209 0%, #2E1F0C 100%)',
                    }}
                >
                    <ImageOff style={{ width: '32px', height: '32px', color: 'rgba(196,119,42,0.5)', marginBottom: '0.5rem' }} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'rgba(253,250,245,0.3)', textTransform: 'uppercase' }}>
                        {alt || 'Image'}
                    </span>
                </div>
            ) : (
                <img
                    src={currentSrc}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setLoaded(true)}
                    onError={handleError}
                    className={`${imgClassName} transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                    {...props}
                />
            )}
        </div>
    );
}
