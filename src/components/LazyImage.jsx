import { useState } from 'react';

export default function LazyImage({ src, alt, className = '', placeholder = null }) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {!loaded && !error && (
                <div className="absolute inset-0 shimmer-bg" aria-hidden="true" />
            )}
            {error ? (
                <div className="absolute inset-0 bg-cream-darker flex items-center justify-center">
                    <span className="text-forest/30 font-sans text-sm">Image unavailable</span>
                </div>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setLoaded(true)}
                    onError={() => setError(true)}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                />
            )}
        </div>
    );
}
