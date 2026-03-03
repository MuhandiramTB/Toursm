import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { mapDestinations } from '../data/sriLankaData';
import { Star, MapPin } from 'lucide-react';

// Fix leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const categoryColorMap = {
    Heritage: '#C4772A',
    Beach: '#1E6B8C',
    Nature: '#7A9E7E',
    Wildlife: '#E8703A',
    Culture: '#D4AF37',
};

function createCustomIcon(category) {
    const color = categoryColorMap[category] || '#C4772A';
    const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 42" width="32" height="42">
      <path d="M16 0C7.16 0 0 7.16 0 16c0 10.36 14.4 25.2 15.04 25.84a1.33 1.33 0 0 0 1.92 0C17.6 41.2 32 26.36 32 16c0-8.84-7.16-16-16-16z" fill="${color}"/>
      <circle cx="16" cy="16" r="7" fill="#FDFAF5"/>
    </svg>
  `;
    return L.divIcon({
        html: svgIcon,
        className: '',
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -44],
    });
}

export default function MapPage() {
    const [selected, setSelected] = useState(null);

    const SRI_LANKA_CENTER = [7.8731, 80.7718];

    const legend = Object.entries(categoryColorMap);

    return (
        <div className="min-h-screen pt-20 bg-forest">
            {/* Header */}
            <div className="bg-forest text-cream py-16 px-6 text-center">
                <div className="section-subheading text-saffron-DEFAULT">Navigate</div>
                <h1 className="font-serif text-5xl text-cream mb-4">Interactive Map</h1>
                <div className="divider-amber" />
                <p className="font-body text-cream/70 max-w-xl mx-auto">
                    Explore all of Sri Lanka's major destinations on this interactive map.
                    Click any pin to discover details.
                </p>
            </div>

            {/* Map Wrapper */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <div className="lg:w-72 shrink-0 space-y-4">
                        {/* Legend */}
                        <div className="bg-forest border border-white/10 p-5">
                            <h2 className="font-sans text-xs tracking-[0.3em] uppercase text-saffron-DEFAULT mb-4">Category Legend</h2>
                            <ul className="space-y-2">
                                {legend.map(([cat, color]) => (
                                    <li key={cat} className="flex items-center gap-3">
                                        <span className="w-3 h-3 rounded-full border-2 border-cream/20" style={{ backgroundColor: color }} />
                                        <span className="font-sans text-cream/70 text-sm">{cat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Destination List */}
                        <div className="bg-forest border border-white/10 p-5">
                            <h2 className="font-sans text-xs tracking-[0.3em] uppercase text-saffron-DEFAULT mb-4">All Destinations</h2>
                            <ul className="space-y-1 max-h-96 overflow-y-auto no-scrollbar">
                                {mapDestinations.map(dest => (
                                    <li key={dest.id}>
                                        <button
                                            onClick={() => setSelected(dest)}
                                            className={`w-full text-left px-3 py-2.5 transition-all duration-200 flex items-center gap-2 ${selected?.id === dest.id
                                                    ? 'bg-saffron-DEFAULT/20 text-saffron-DEFAULT'
                                                    : 'text-cream/60 hover:text-cream hover:bg-white/5'
                                                }`}
                                        >
                                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: categoryColorMap[dest.category] }} />
                                            <span className="font-sans text-sm truncate">{dest.name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Selected Detail */}
                        {selected && (
                            <div className="bg-forest border border-saffron-DEFAULT/40 overflow-hidden">
                                <img src={selected.image} alt={selected.name} className="w-full h-36 object-cover" />
                                <div className="p-4">
                                    <div className="font-sans text-saffron-DEFAULT text-xs tracking-widest uppercase mb-1">{selected.category}</div>
                                    <h3 className="font-serif text-lg text-cream mb-2">{selected.name}</h3>
                                    <p className="font-body text-cream/60 text-xs leading-relaxed mb-3">{selected.shortDesc}</p>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-3 h-3 text-saffron-DEFAULT fill-saffron-DEFAULT" />
                                        <span className="font-sans text-cream/70 text-xs">{selected.rating} / 5</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Leaflet Map */}
                    <div className="flex-1 h-[600px] lg:h-[700px] border border-white/10 overflow-hidden">
                        <MapContainer
                            center={SRI_LANKA_CENTER}
                            zoom={7}
                            style={{ width: '100%', height: '100%' }}
                            zoomControl={false}
                        >
                            <ZoomControl position="topright" />
                            <TileLayer
                                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                                maxZoom={19}
                            />
                            {mapDestinations.map(dest => (
                                <Marker
                                    key={dest.id}
                                    position={dest.coords}
                                    icon={createCustomIcon(dest.category)}
                                    eventHandlers={{ click: () => setSelected(dest) }}
                                >
                                    <Popup maxWidth={260}>
                                        <div className="min-w-[220px]">
                                            <img
                                                src={dest.image}
                                                alt={dest.name}
                                                className="w-full h-28 object-cover mb-3 -mx-3 -mt-3 w-[calc(100%+24px)]"
                                                style={{ width: 'calc(100% + 24px)', marginLeft: '-12px', marginTop: '-12px', marginRight: '-12px' }}
                                            />
                                            <div className="px-1">
                                                <p className="font-sans text-saffron-DEFAULT text-xs tracking-widest uppercase mb-1">{dest.category}</p>
                                                <h3 className="font-serif text-base text-cream mb-1">{dest.name}</h3>
                                                <p className="font-sans text-cream/60 text-xs leading-relaxed">{dest.shortDesc}</p>
                                                <div className="flex items-center gap-1 mt-2">
                                                    <Star className="w-3 h-3 text-saffron-DEFAULT fill-saffron-DEFAULT" />
                                                    <span className="font-sans text-cream/70 text-xs">{dest.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
