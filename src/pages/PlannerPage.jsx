import { useState } from 'react';
import { AnimatedSection } from '../components/AnimatedSection';
import { Calendar, Clock, Users, Compass, ChevronRight, ChevronLeft, Check, MapPin } from 'lucide-react';

const INTERESTS = [
    { id: 'heritage', label: 'Heritage & History', icon: '🏛', destinations: ['Sigiriya', 'Anuradhapura', 'Polonnaruwa', 'Galle Fort'] },
    { id: 'beach', label: 'Beaches & Coast', icon: '🏖', destinations: ['Mirissa', 'Arugam Bay', 'Trincomalee', 'Unawatuna'] },
    { id: 'wildlife', label: 'Wildlife Safari', icon: '🐆', destinations: ['Yala', 'Wilpattu', 'Minneriya', 'Udawalawe'] },
    { id: 'nature', label: 'Nature & Trekking', icon: '🌿', destinations: ['Ella', 'Knuckles', 'Horton Plains', 'Adam\'s Peak'] },
    { id: 'culture', label: 'Culture & Arts', icon: '🎭', destinations: ['Kandy', 'Colombo', 'Jaffna', 'Matale'] },
    { id: 'spiritual', label: 'Spiritual Journeys', icon: '🕌', destinations: ['Anuradhapura', 'Kataragama', 'Adam\'s Peak', 'Temple of Tooth'] },
    { id: 'culinary', label: 'Food & Cuisine', icon: '🍛', destinations: ['Colombo', 'Jaffna', 'Galle', 'Kandy'] },
    { id: 'surf', label: 'Surf & Adventure', icon: '🏄', destinations: ['Arugam Bay', 'Hikkaduwa', 'Weligama', 'Mirissa'] },
];

const DURATIONS = [3, 5, 7, 10, 14, 21];

function generateItinerary(interests, duration, startDate, groupType) {
    const interestData = INTERESTS.filter(i => interests.includes(i.id));
    const allDestinations = [...new Set(interestData.flatMap(i => i.destinations))];

    // Distribute days intelligently
    const days = [];
    const destinationsToVisit = allDestinations.slice(0, Math.min(allDestinations.length, duration));

    const startD = new Date(startDate);

    for (let i = 0; i < duration; i++) {
        const date = new Date(startD);
        date.setDate(startD.getDate() + i);
        const dest = destinationsToVisit[i % destinationsToVisit.length];

        days.push({
            day: i + 1,
            date: date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }),
            destination: dest || 'Colombo',
            activities: generateDayActivities(dest, interests, i),
            accommodation: generateAccommodation(dest, groupType),
            transport: i === 0 ? 'Airport transfer' : i === duration - 1 ? 'Transfer to airport' : 'Private driver transfer',
        });
    }

    return days;
}

function generateDayActivities(dest, interests, dayIndex) {
    const activityBank = {
        'Sigiriya': ['Climb Sigiriya Rock at sunrise', 'Explore the water gardens', 'Visit Pidurangala Rock viewpoint', 'Explore Dambulla Cave Temple'],
        'Mirissa': ['Morning whale-watching cruise', 'Snorkelling at Parrot Rock', 'Sunset coconut toddy tasting', 'Beach yoga session'],
        'Yala': ['Dawn leopard safari (Block 1)', 'Birdwatching at Yala lagoons', 'Sloth bear tracking with naturalist', 'Elephant herd observation'],
        'Ella': ['Sunrise at Nine Arch Bridge', 'Little Adam\'s Peak hike', 'Tea factory visit & tasting', 'Ravana Falls swim'],
        'Kandy': ['Temple of the Sacred Tooth visit', 'Kandyan dance performance', 'Royal Botanical Gardens', 'Evening lake walk'],
        'Galle Fort': ['Fort rampart sunset walk', 'Dutch Reformed Church visit', 'Lighthouse exploration', 'Boutique market shopping'],
        'Colombo': ['Pettah market spice hunt', 'Gangaramaya Temple', 'Galle Face Green sunset', 'Fine-dining Sri Lankan cuisine'],
        'Anuradhapura': ['Sacred Bodhi Tree worship', 'Ruvanvelisaya Dagoba', 'Isurumuniya Lovers rock carving', 'Evening cycling tour'],
        'Arugam Bay': ['Morning surf lesson', 'Lagoon safari by boat', 'Pottuvil Lagoon birdwatch', 'Beach bonfire & BBQ'],
    };

    const destActivities = activityBank[dest] || ['Explore local markets', 'Visit cultural landmarks', 'Cooking class with local family', 'Sunset viewpoint'];
    return destActivities.slice(0, 3);
}

function generateAccommodation(dest, groupType) {
    const hotels = {
        'Sigiriya': 'Water Garden Sigiriya (5★)',
        'Mirissa': 'Mirissa Hills Eco Resort (4★)',
        'Yala': 'Wild Coast Tented Lodge (5★ Glamping)',
        'Ella': '98 Acres Resort & Spa (5★)',
        'Kandy': 'Earl\'s Regency (4★)',
        'Galle Fort': 'Galle Fort Hotel (5★)',
        'Colombo': 'Shangri-La Colombo (5★)',
        'Anuradhapura': 'Ulagalla by Uga Escapes (5★)',
        'Arugam Bay': 'Gecko\'s Bay (4★ Boutique)',
    };
    return hotels[dest] || 'Boutique Heritage Hotel (4★)';
}

export default function PlannerPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        startDate: '',
        duration: 7,
        groupType: 'couple',
        interests: [],
        budget: 'luxury',
    });
    const [itinerary, setItinerary] = useState(null);
    const [generating, setGenerating] = useState(false);

    const toggleInterest = (id) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(id)
                ? prev.interests.filter(i => i !== id)
                : [...prev.interests, id],
        }));
    };

    const generatePlan = async () => {
        setStep(4);
        setGenerating(true);
        await new Promise(r => setTimeout(r, 2000));
        const days = generateItinerary(
            formData.interests.length > 0 ? formData.interests : ['heritage', 'beach', 'wildlife'],
            formData.duration,
            formData.startDate || new Date().toISOString().split('T')[0],
            formData.groupType
        );
        setItinerary(days);
        setGenerating(false);
    };

    const TOTAL_STEPS = 3;

    return (
        <div className="min-h-screen bg-cream pt-20">
            {/* Header */}
            <div className="relative bg-forest text-cream py-24 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580974852861-c381510bc98a?w=1920&q=60')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-forest/80" />
                <div className="relative z-10">
                    <div className="section-subheading text-saffron-DEFAULT">AI-Powered Travel</div>
                    <h1 className="font-serif text-5xl md:text-6xl text-cream mb-4">Trip Planner</h1>
                    <div className="divider-amber" />
                    <p className="font-body text-cream/70 max-w-2xl mx-auto">
                        Tell us your travel style, and we'll craft a bespoke Sri Lanka itinerary
                        tailored perfectly to your timeline and interests.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-16">
                {/* Progress */}
                {step < 4 && (
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-3">
                            {['Travel Dates', 'Your Style', 'Interests'].map((label, i) => (
                                <div key={label} className="flex items-center gap-2">
                                    <div className={`w-8 h-8 flex items-center justify-center border-2 font-sans text-sm transition-all duration-300 ${step > i + 1 ? 'bg-saffron-DEFAULT border-saffron-DEFAULT text-forest' :
                                            step === i + 1 ? 'border-saffron-DEFAULT text-saffron-DEFAULT' :
                                                'border-cream-darker text-forest/30'
                                        }`}>
                                        {step > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
                                    </div>
                                    <span className={`font-sans text-xs tracking-wider uppercase hidden sm:block ${step === i + 1 ? 'text-forest' : 'text-forest/40'
                                        }`}>{label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="h-1 bg-cream-darker">
                            <div
                                className="h-full bg-saffron-DEFAULT transition-all duration-500"
                                style={{ width: `${((step - 1) / TOTAL_STEPS) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Step 1: Dates & Duration */}
                {step === 1 && (
                    <AnimatedSection>
                        <h2 className="font-serif text-3xl text-forest mb-8">When are you travelling?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            <div>
                                <label htmlFor="start-date" className="font-sans text-xs tracking-widest uppercase text-forest/50 block mb-3">
                                    Arrival Date
                                </label>
                                <input
                                    id="start-date"
                                    type="date"
                                    value={formData.startDate}
                                    onChange={e => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                                    className="w-full border-b-2 border-cream-darker bg-transparent py-3 font-body text-forest focus:outline-none focus:border-saffron-DEFAULT transition-colors"
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                            <div>
                                <label className="font-sans text-xs tracking-widest uppercase text-forest/50 block mb-3">
                                    Trip Duration
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {DURATIONS.map(d => (
                                        <button
                                            key={d}
                                            onClick={() => setFormData(prev => ({ ...prev, duration: d }))}
                                            className={`px-4 py-2 border font-sans text-sm transition-all duration-200 ${formData.duration === d
                                                    ? 'border-saffron-DEFAULT bg-saffron-DEFAULT text-cream'
                                                    : 'border-cream-darker text-forest/60 hover:border-forest'
                                                }`}
                                        >
                                            {d} days
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mb-10">
                            <label className="font-sans text-xs tracking-widest uppercase text-forest/50 block mb-3">
                                Budget Style
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { id: 'comfort', label: 'Comfort', desc: '$100-200/day', icon: '⭐⭐⭐' },
                                    { id: 'luxury', label: 'Luxury', desc: '$200-500/day', icon: '⭐⭐⭐⭐' },
                                    { id: 'ultra', label: 'Ultra-Luxury', desc: '$500+/day', icon: '⭐⭐⭐⭐⭐' },
                                ].map(b => (
                                    <button
                                        key={b.id}
                                        onClick={() => setFormData(prev => ({ ...prev, budget: b.id }))}
                                        className={`p-4 border text-center transition-all duration-200 ${formData.budget === b.id
                                                ? 'border-saffron-DEFAULT bg-saffron-DEFAULT/10'
                                                : 'border-cream-darker hover:border-forest'
                                            }`}
                                    >
                                        <div className="text-lg mb-1">{b.icon}</div>
                                        <div className="font-serif text-base text-forest">{b.label}</div>
                                        <div className="font-sans text-xs text-forest/50">{b.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button onClick={() => setStep(2)} className="btn-primary">
                            Continue <ChevronRight className="w-4 h-4" />
                        </button>
                    </AnimatedSection>
                )}

                {/* Step 2: Travel Style */}
                {step === 2 && (
                    <AnimatedSection>
                        <h2 className="font-serif text-3xl text-forest mb-8">Who's travelling?</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                            {[
                                { id: 'solo', label: 'Solo', icon: '👤' },
                                { id: 'couple', label: 'Couple', icon: '👫' },
                                { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
                                { id: 'group', label: 'Group', icon: '👥' },
                            ].map(g => (
                                <button
                                    key={g.id}
                                    onClick={() => setFormData(prev => ({ ...prev, groupType: g.id }))}
                                    className={`p-6 border text-center transition-all duration-200 ${formData.groupType === g.id
                                            ? 'border-saffron-DEFAULT bg-saffron-DEFAULT/10'
                                            : 'border-cream-darker hover:border-forest'
                                        }`}
                                >
                                    <div className="text-4xl mb-3">{g.icon}</div>
                                    <div className="font-serif text-lg text-forest">{g.label}</div>
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setStep(1)} className="btn-outline border-forest text-forest">
                                <ChevronLeft className="w-4 h-4" /> Back
                            </button>
                            <button onClick={() => setStep(3)} className="btn-primary">
                                Continue <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </AnimatedSection>
                )}

                {/* Step 3: Interests */}
                {step === 3 && (
                    <AnimatedSection>
                        <h2 className="font-serif text-3xl text-forest mb-3">What excites you most?</h2>
                        <p className="font-body text-forest/60 mb-8">Select all that apply. We'll build your itinerary around your passions.</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                            {INTERESTS.map(interest => {
                                const isSelected = formData.interests.includes(interest.id);
                                return (
                                    <button
                                        key={interest.id}
                                        onClick={() => toggleInterest(interest.id)}
                                        aria-pressed={isSelected}
                                        className={`p-4 border transition-all duration-200 text-left ${isSelected
                                                ? 'border-saffron-DEFAULT bg-saffron-DEFAULT/10 shadow-saffron-glow/30'
                                                : 'border-cream-darker hover:border-forest'
                                            }`}
                                    >
                                        <div className="text-2xl mb-2">{interest.icon}</div>
                                        <div className={`font-sans text-xs tracking-wide ${isSelected ? 'text-saffron-DEFAULT' : 'text-forest/70'}`}>
                                            {interest.label}
                                        </div>
                                        {isSelected && (
                                            <div className="mt-2">
                                                <Check className="w-3.5 h-3.5 text-saffron-DEFAULT" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setStep(2)} className="btn-outline border-forest text-forest">
                                <ChevronLeft className="w-4 h-4" /> Back
                            </button>
                            <button onClick={generatePlan} className="btn-primary">
                                <Compass className="w-4 h-4" /> Generate My Itinerary
                            </button>
                        </div>
                    </AnimatedSection>
                )}

                {/* Step 4: Generated Itinerary */}
                {step === 4 && (
                    <AnimatedSection>
                        {generating ? (
                            <div className="text-center py-24">
                                <div className="w-16 h-16 border-4 border-cream-darker border-t-saffron-DEFAULT rounded-full animate-spin mx-auto mb-6" />
                                <h2 className="font-serif text-3xl text-forest mb-3">Crafting Your Journey…</h2>
                                <p className="font-body text-forest/60">Our AI is curating the perfect Sri Lanka itinerary for you.</p>
                            </div>
                        ) : itinerary && (
                            <>
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <div className="section-subheading">Your Personalised Plan</div>
                                        <h2 className="font-serif text-3xl text-forest">
                                            {formData.duration}-Day Sri Lanka Journey
                                        </h2>
                                    </div>
                                    <button
                                        onClick={() => { setStep(1); setItinerary(null); setFormData({ startDate: '', duration: 7, groupType: 'couple', interests: [], budget: 'luxury' }); }}
                                        className="font-sans text-xs tracking-widest uppercase text-forest/50 hover:text-saffron-DEFAULT transition-colors"
                                    >
                                        Start Over
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {itinerary.map((day, i) => (
                                        <div
                                            key={day.day}
                                            className="border border-cream-darker bg-cream p-6 hover:border-saffron-DEFAULT/50 transition-all duration-300"
                                            style={{ animationDelay: `${i * 50}ms` }}
                                        >
                                            <div className="flex items-start gap-6">
                                                <div className="shrink-0 text-center">
                                                    <div className="font-sans text-xs text-saffron-DEFAULT tracking-widest uppercase">Day</div>
                                                    <div className="font-serif text-4xl text-forest">{String(day.day).padStart(2, '0')}</div>
                                                    <div className="font-sans text-xs text-forest/40">{day.date}</div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <MapPin className="w-4 h-4 text-saffron-DEFAULT" />
                                                        <h3 className="font-serif text-xl text-forest">{day.destination}</h3>
                                                    </div>
                                                    <ul className="space-y-1.5 mb-4">
                                                        {day.activities.map((act, j) => (
                                                            <li key={j} className="flex items-start gap-2 font-body text-sm text-forest/65">
                                                                <span className="text-saffron-DEFAULT mt-1">›</span>
                                                                {act}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <div className="flex flex-wrap gap-4 text-xs font-sans text-forest/50">
                                                        <span>🏨 {day.accommodation}</span>
                                                        <span>🚗 {day.transport}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Download / Enquire CTA */}
                                <div className="mt-10 p-8 bg-forest text-cream text-center">
                                    <h3 className="font-serif text-2xl mb-3">Ready to Book?</h3>
                                    <p className="font-body text-cream/70 text-sm mb-6">
                                        Send this itinerary to our travel specialists who will arrange everything —
                                        from hotels and transfers to exclusive experiences.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                        <button className="btn-primary">Enquire Now</button>
                                        <button
                                            onClick={() => window.print()}
                                            className="btn-outline"
                                        >
                                            Print Itinerary
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </AnimatedSection>
                )}
            </div>
        </div>
    );
}
