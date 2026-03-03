import { useState } from 'react';
import { blogPosts } from '../data/sriLankaData';
import { AnimatedSection } from '../components/AnimatedSection';
import { Clock, User, Tag, ArrowRight } from 'lucide-react';

export default function BlogPage() {
    const [selected, setSelected] = useState(null);

    if (selected) {
        return <ArticleView post={selected} onBack={() => setSelected(null)} />;
    }

    return (
        <div className="min-h-screen bg-cream pt-20">
            {/* Header */}
            <div className="bg-forest text-cream py-24 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571891190280-b5a90a9fe5a6?w=1920&q=60')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-forest/80" />
                <div className="relative z-10">
                    <div className="section-subheading text-saffron-DEFAULT">Editorial</div>
                    <h1 className="font-serif text-5xl md:text-6xl text-cream mb-4">Stories & Dispatches</h1>
                    <div className="divider-amber" />
                    <p className="font-body text-cream/70 max-w-2xl mx-auto">
                        Travel writing, photography, and personal dispatches from across Sri Lanka —
                        told by writers, explorers, and wanderers who've fallen under the island's spell.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Featured Article */}
                <AnimatedSection className="mb-16">
                    <button
                        className="w-full text-left group"
                        onClick={() => setSelected(blogPosts[0])}
                        aria-label={`Read article: ${blogPosts[0].title}`}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-cream-darker hover:border-saffron-DEFAULT/50 hover:shadow-card-hover transition-all duration-500">
                            <div className="relative h-80 lg:h-auto overflow-hidden">
                                <img
                                    src={blogPosts[0].image}
                                    alt={blogPosts[0].title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-5 left-5 bg-saffron-DEFAULT text-forest font-sans text-xs px-3 py-1 tracking-widest uppercase">
                                    Featured
                                </div>
                            </div>
                            <div className="p-10 flex flex-col justify-center">
                                <div className="font-sans text-saffron-DEFAULT text-xs tracking-widest uppercase mb-3">{blogPosts[0].category}</div>
                                <h2 className="font-serif text-3xl text-forest leading-tight mb-4">{blogPosts[0].title}</h2>
                                <p className="font-body text-forest/65 leading-relaxed mb-6">{blogPosts[0].excerpt}</p>
                                <div className="flex items-center gap-4 text-xs font-sans text-forest/50 mb-6">
                                    <span className="flex items-center gap-1">
                                        <User className="w-3.5 h-3.5" /> {blogPosts[0].author}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5" /> {blogPosts[0].readTime}
                                    </span>
                                    <span>{blogPosts[0].date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-saffron-DEFAULT font-sans text-sm tracking-wider group-hover:gap-3 transition-all duration-300">
                                    Read Article <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </button>
                </AnimatedSection>

                {/* Article Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.slice(1).map((post, i) => (
                        <AnimatedSection key={post.id} delay={i * 100}>
                            <button
                                className="w-full text-left group card-luxury"
                                onClick={() => setSelected(post)}
                                aria-label={`Read article: ${post.title}`}
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute top-4 left-4 bg-forest/80 text-saffron-DEFAULT font-sans text-xs px-3 py-1 tracking-widest uppercase">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-serif text-xl text-forest leading-tight mb-3 group-hover:text-saffron-DEFAULT transition-colors duration-300">
                                        {post.title}
                                    </h3>
                                    <p className="font-body text-forest/60 text-sm leading-relaxed line-clamp-2 mb-4">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-xs font-sans text-forest/40 pt-4 border-t border-cream-darker">
                                        <span>{post.author} · {post.authorRole}</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                            </button>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ArticleView({ post, onBack }) {
    return (
        <div className="min-h-screen bg-cream pt-20">
            {/* Hero */}
            <div className="relative h-[55vh] overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
                    <div className="font-sans text-saffron-DEFAULT text-xs tracking-widest uppercase mb-3">{post.category}</div>
                    <h1 className="font-serif text-4xl md:text-5xl text-cream leading-tight mb-4">{post.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm font-sans text-cream/60">
                        <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
                        <span className="text-saffron-DEFAULT">{post.authorRole}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</span>
                        <span>·</span>
                        <span>{post.date}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-16">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-forest/50 hover:text-saffron-DEFAULT transition-colors mb-10"
                    aria-label="Back to all articles"
                >
                    ← Back to Stories
                </button>

                <div className="font-body text-forest/75 text-lg leading-relaxed space-y-6">
                    <p className="text-xl italic font-body text-forest/60 border-l-4 border-saffron-DEFAULT pl-6">
                        {post.excerpt}
                    </p>
                    <p>
                        The island of Sri Lanka holds a particular magic that defies easy explanation. Perhaps it is the way the light falls at dusk — golden and slow, the colour of old honey — over the ancient ruins of Anuradhapura. Perhaps it is the scent of frangipani that drifts through open-air restaurants at night, or the sound of temple drums that carry across the still waters of Kandy Lake.
                    </p>
                    <p>
                        Whatever its essence, Sri Lanka announces itself not with a single revelation but through accumulated moments: the flash of a kingfisher over a paddy field, the kindness of a stranger offering fresh king coconut on a roadside, the sudden appearance of an elephant family at a forest waterhole at dawn.
                    </p>
                    <h2 className="font-serif text-3xl text-forest mt-10 mb-4">Into the Wild Heart</h2>
                    <p>
                        The island's ecological diversity is, in scientific terms, extraordinary. Sri Lanka is officially one of 36 global biodiversity hotspots — a concentration of endemic species found nowhere else on Earth. But statistics fail to capture what it means to stand at the edge of Yala's Block 1 at 6am as emerald bee-eaters launch from thorn scrub, and somewhere, not far off, a leopard pauses its morning patrol to regard you with serene yellow eyes.
                    </p>
                    <p>
                        Sri Lanka has been stealing hearts and reshaping travel writers' souls for centuries. There is something about this island that invites not just visits but returns — again and again, to see what has changed and what remains eternally, beautifully the same.
                    </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-10 pt-10 border-t border-cream-darker">
                    {post.tags.map(tag => (
                        <span key={tag} className="tag-pill border-cream-darker text-forest/50 text-xs">
                            <Tag className="w-3 h-3" /> {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
