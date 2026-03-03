import { useInView } from 'react-intersection-observer';

export function AnimatedSection({ children, className = '', delay = 0, direction = 'up' }) {
    const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

    const transforms = {
        up: 'translate-y-12',
        down: '-translate-y-12',
        left: '-translate-x-12',
        right: 'translate-x-12',
        none: '',
    };

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ${className} ${inView
                    ? 'opacity-100 translate-x-0 translate-y-0'
                    : `opacity-0 ${transforms[direction]}`
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

export function StaggeredChildren({ children, className = '', stagger = 100 }) {
    return (
        <div className={className}>
            {Array.isArray(children)
                ? children.map((child, i) => (
                    <AnimatedSection key={i} delay={i * stagger}>
                        {child}
                    </AnimatedSection>
                ))
                : children}
        </div>
    );
}
