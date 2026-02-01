import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Activity, Zap, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { Timeline } from '@/components/UI/timeline';
import { eventAPI, Event as BackendEvent } from '@/services/api';

interface Event {
    id: string;
    timestamp: Date;
    type: 'major' | 'micro';
    category: 'discovery' | 'mission' | 'alert' | 'system' | 'achievement';
    title: string;
    description: string;
    location?: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
}

const mockEvents: Event[] = [
    // --- FEBRUARY 2026 ---
    {
        id: 'feb-1',
        timestamp: new Date('2026-02-04T10:00:00'),
        type: 'major',
        category: 'mission',
        title: 'Intergalactic Startathon 2026',
        description: 'Kickoff of the largest galactic innovation hackathon. Teams from all sectors competing to solve deep-space colonization challenges.',
        location: 'Space Station Alpha',
        priority: 'critical'
    },

    // --- MARCH 2026 ---
    {
        id: 'mar-blur',
        timestamp: new Date('2026-03-15T12:00:00'),
        type: 'micro',
        category: 'discovery',
        title: 'Coming Soon',
        description: 'Encrypted data packet detected. Awaiting decryption key.',
        location: 'Sector 9',
        priority: 'medium'
    },

    // --- APRIL 2026 ---
    {
        id: 'apr-blur',
        timestamp: new Date('2026-04-20T14:00:00'),
        type: 'major',
        category: 'system',
        title: 'Coming Soon',
        description: 'Scheduled system upgrade protocol initialized. Details classified.',
        location: 'Core Systems',
        priority: 'low'
    },

    // --- MAY 2026 ---
    {
        id: 'may-blur',
        timestamp: new Date('2026-05-10T09:00:00'),
        type: 'major',
        category: 'alert',
        title: 'Coming Soon',
        description: 'Pre-cognitive warning signals received. Analysis pending.',
        location: 'Unknown',
        priority: 'critical'
    },

    // --- JUNE 2026 ---
    {
        id: 'jun-blur',
        timestamp: new Date('2026-06-21T06:00:00'),
        type: 'major',
        category: 'mission',
        title: 'Coming Soon',
        description: 'Mid-year expedition plans currently under review.',
        location: 'TBD',
        priority: 'high'
    },

    // --- JULY 2026 ---
    {
        id: 'jul-blur',
        timestamp: new Date('2026-07-04T20:00:00'),
        type: 'micro',
        category: 'achievement',
        title: 'Coming Soon',
        description: 'Federation milestone celebration preparation underway.',
        location: 'Global',
        priority: 'low'
    },

    // --- AUGUST 2026 ---
    {
        id: 'aug-blur',
        timestamp: new Date('2026-08-15T11:00:00'),
        type: 'major',
        category: 'discovery',
        title: 'Coming Soon',
        description: 'Deep space sensor array alignment scheduled.',
        location: 'Observation Deck',
        priority: 'medium'
    },

    // --- SEPTEMBER 2026 ---
    {
        id: 'sep-blur',
        timestamp: new Date('2026-09-10T16:00:00'),
        type: 'micro',
        category: 'system',
        title: 'Coming Soon',
        description: 'Quarterly infrastructure diagnostics placeholder.',
        location: 'Engineering',
        priority: 'low'
    },

    // --- OCTOBER 2026 ---
    {
        id: 'oct-blur',
        timestamp: new Date('2026-10-31T21:00:00'),
        type: 'major',
        category: 'alert',
        title: 'Coming Soon',
        description: 'Seasonal anomaly predictions being calculated.',
        location: 'All Decks',
        priority: 'medium'
    },

    // --- NOVEMBER 2026 ---
    {
        id: 'nov-blur',
        timestamp: new Date('2026-11-20T10:00:00'),
        type: 'major',
        category: 'mission',
        title: 'Coming Soon',
        description: 'Mission "Solar Flare" status: TOP SECRET.',
        location: 'Sun Station',
        priority: 'critical'
    },

    // --- DECEMBER 2026 ---
    {
        id: 'dec-blur',
        timestamp: new Date('2026-12-31T23:55:00'),
        type: 'major',
        category: 'achievement',
        title: 'Coming Soon',
        description: 'End of year protocols. Final system purge scheduled.',
        location: 'Mainframe',
        priority: 'high'
    }
];

const categoryIcons = {
    discovery: Activity,
    mission: Zap,
    alert: AlertTriangle,
    system: Info,
    achievement: CheckCircle2
};

const priorityColors = {
    low: 'text-blue-400 border-blue-400/30 bg-blue-500/10',
    medium: 'text-cyan-400 border-cyan-400/30 bg-cyan-500/10',
    high: 'text-orange-400 border-orange-400/30 bg-orange-500/10',
    critical: 'text-red-400 border-red-400/30 bg-red-500/10'
};

const categoryColors = {
    discovery: 'text-purple-400 bg-purple-500/20 border-purple-400/30',
    mission: 'text-cyan-400 bg-cyan-500/20 border-cyan-400/30',
    alert: 'text-red-400 bg-red-500/20 border-red-400/30',
    system: 'text-blue-400 bg-blue-500/20 border-blue-400/30',
    achievement: 'text-green-400 bg-green-500/20 border-green-400/30'
};

const EventLogs = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const scrollRef = useRef<HTMLDivElement>(null);

    // Fetch events from backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await eventAPI.getAll();

                // Map backend events to component Event interface
                const mappedEvents: Event[] = response.data.map((backendEvent: BackendEvent) => {
                    // Determine category based on tags or club
                    let category: Event['category'] = 'system';
                    if (backendEvent.tags.some(tag => tag.toLowerCase().includes('discovery') || tag.toLowerCase().includes('science'))) {
                        category = 'discovery';
                    } else if (backendEvent.tags.some(tag => tag.toLowerCase().includes('mission') || tag.toLowerCase().includes('workshop'))) {
                        category = 'mission';
                    } else if (backendEvent.tags.some(tag => tag.toLowerCase().includes('alert') || tag.toLowerCase().includes('urgent'))) {
                        category = 'alert';
                    } else if (backendEvent.tags.some(tag => tag.toLowerCase().includes('achievement'))) {
                        category = 'achievement';
                    }

                    // Determine type based on duration or status
                    const type: Event['type'] = backendEvent.duration >= 120 || backendEvent.status === 'upcoming' ? 'major' : 'micro';

                    // Determine priority based on status and participant count
                    let priority: Event['priority'] = 'low';
                    if (backendEvent.status === 'ongoing') {
                        priority = 'critical';
                    } else if ((backendEvent.participantCount || 0) > 30) {
                        priority = 'high';
                    } else if ((backendEvent.participantCount || 0) > 15) {
                        priority = 'medium';
                    }

                    return {
                        id: backendEvent._id,
                        timestamp: new Date(backendEvent.date),
                        type,
                        category,
                        title: backendEvent.title,
                        description: backendEvent.description,
                        location: backendEvent.venue || backendEvent.location || 'Online',
                        priority
                    };
                });

                setEvents(mappedEvents);
            } catch (error) {
                console.error('Error fetching events:', error);
                // Keep existing mock events as fallback
                setEvents(mockEvents);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.location?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
            const matchesType = selectedType === 'all' || event.type === selectedType;

            return matchesSearch && matchesCategory && matchesType;
        });
    }, [searchQuery, selectedCategory, selectedType, events]);

    // Keyboard navigation for scrolling
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!scrollRef.current) return;

            const scrollAmount = 100; // pixels to scroll per key press

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                scrollRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                scrollRef.current.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
            } else if (e.key === 'PageDown') {
                e.preventDefault();
                scrollRef.current.scrollBy({ top: scrollRef.current.clientHeight, behavior: 'smooth' });
            } else if (e.key === 'PageUp') {
                e.preventDefault();
                scrollRef.current.scrollBy({ top: -scrollRef.current.clientHeight, behavior: 'smooth' });
            } else if (e.key === 'Home') {
                e.preventDefault();
                scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (e.key === 'End') {
                e.preventDefault();
                scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Auto-focus the scrollable container
    useEffect(() => {
        if (scrollRef.current && filteredEvents.length > 0) {
            // Small delay to ensure DOM is ready
            const timer = setTimeout(() => {
                scrollRef.current?.focus();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [filteredEvents.length]);



    // Helper: Determine if event is close to current date (within 30 days)
    const isEventNearby = (eventDate: Date) => {
        const now = new Date('2026-02-01'); // Current date in the app
        const diffInDays = Math.abs((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return diffInDays <= 30;
    };

    // Group events intelligently - show full date for nearby events, month for distant ones
    const timelineData = useMemo(() => {
        // Sort events chronologically
        const sortedEvents = [...filteredEvents].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

        const groups: { [key: string]: { displayTitle: string, events: Event[], sortKey: number } } = {};

        sortedEvents.forEach(event => {
            const isNear = isEventNearby(event.timestamp);

            let groupKey: string;
            let displayTitle: string;

            if (isNear) {
                // Show full date for nearby events (within 30 days)
                groupKey = event.timestamp.toISOString().split('T')[0];
                const dayOfWeek = event.timestamp.toLocaleDateString('en-US', { weekday: 'long' });
                const monthDay = event.timestamp.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                displayTitle = `${dayOfWeek}, ${monthDay}`;
            } else {
                // Show only month and year for future/distant events
                groupKey = `${event.timestamp.getFullYear()}-${event.timestamp.getMonth()}`;
                displayTitle = event.timestamp.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            }

            if (!groups[groupKey]) {
                groups[groupKey] = {
                    displayTitle,
                    events: [],
                    sortKey: event.timestamp.getTime()
                };
            }
            groups[groupKey].events.push(event);
        });

        // Convert to array and sort by time
        return Object.values(groups)
            .sort((a, b) => a.sortKey - b.sortKey)
            .map(group => ({
                title: group.displayTitle,
                content: (
                    <div className="space-y-6 pb-8">
                        {group.events.map((event) => {
                            const CategoryIcon = categoryIcons[event.category];
                            const dayNumber = event.timestamp.getDate();
                            const dayName = event.timestamp.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
                            const isBlurred = event.title === 'Coming Soon';
                            const isNear = isEventNearby(event.timestamp);

                            return (
                                <div
                                    key={event.id}
                                    onClick={() => !isBlurred && navigate(`/events/${event.id}`)}
                                    className={`relative bg-white/5 backdrop-blur-sm border rounded-xl p-6 transition-all duration-500 ${event.type === 'major'
                                        ? 'border-cyan-400/30 shadow-lg shadow-cyan-400/10'
                                        : 'border-white/10'
                                        } ${isBlurred ? 'opacity-70' : 'hover:bg-white/10 hover:scale-[1.01] cursor-pointer'}`}
                                >
                                    {/* Top Row: Badges and Date (only show day if nearby) */}
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        {/* Date on Left - only for nearby events */}
                                        {isNear && (
                                            <div className="flex items-center gap-3">
                                                <div className="text-center min-w-[60px]">
                                                    <div className={`text-3xl font-display font-bold leading-none transition-colors ${isBlurred ? 'text-gray-600 blur-[2px]' : 'text-white/90'}`}>
                                                        {isBlurred ? '??' : dayNumber}
                                                    </div>
                                                    <div className="text-xs font-medium text-gray-500 tracking-wider mt-1">
                                                        {isBlurred ? '???' : dayName}
                                                    </div>
                                                </div>
                                                <div className="w-px h-12 bg-white/10" />
                                            </div>
                                        )}

                                        {/* Badges */}
                                        <div className="flex flex-wrap items-center gap-2 flex-1 justify-end">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[event.category]}`}>
                                                <CategoryIcon size={12} className="inline mr-1" />
                                                {event.category.toUpperCase()}
                                            </span>
                                            {event.type === 'major' && (
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold border border-cyan-400/30 bg-cyan-500/20 text-cyan-300">
                                                    MAJOR
                                                </span>
                                            )}
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${priorityColors[event.priority]}`}>
                                                {event.priority.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className={`text-xl md:text-2xl font-display font-bold text-white mb-3 ${isBlurred ? 'blur-sm select-none' : ''}`}>
                                        {event.title}
                                    </h3>

                                    {/* Description */}
                                    <p className={`text-gray-300 text-sm md:text-base leading-relaxed mb-4 ${isBlurred ? 'blur-[4px] select-none opacity-60' : ''}`}>
                                        {event.description}
                                    </p>

                                    {/* Footer: Time and Location */}
                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className={`text-xs text-gray-500 font-mono ${isBlurred ? 'blur-[1px]' : ''}`}>
                                            {isBlurred ? '??:??' : event.timestamp.toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false
                                            })}
                                        </div>
                                        {event.location && (
                                            <div className={`flex items-center gap-2 text-xs text-gray-500 ${isBlurred ? 'blur-[2px]' : ''}`}>
                                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                                <span className="font-mono">{event.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )
            }));
    }, [filteredEvents]);

    return (
        <div className="relative w-full min-h-screen bg-[#050510] font-sans">
            {/* Starfield Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(150)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white animate-pulse"
                        style={{
                            width: Math.random() * 2 + 0.5 + 'px',
                            height: Math.random() * 2 + 0.5 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animationDelay: Math.random() * 3 + 's',
                            animationDuration: Math.random() * 2 + 2 + 's',
                            opacity: Math.random() * 0.7 + 0.3
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full min-h-screen pt-32 pb-12 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-wider mb-3">
                            EVENT LOGS
                        </h1>
                        <p className="text-gray-400 text-sm md:text-base">
                            Timeline of mission events, system alerts, and discoveries
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-5 mb-8 sticky top-28 z-40">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Search Bar */}
                            <div className="md:col-span-2 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search events..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                                />
                            </div>

                            {/* Category Filter */}
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all cursor-pointer"
                            >
                                <option value="all" className="bg-[#050510]">All Categories</option>
                                <option value="discovery" className="bg-[#050510]">Discovery</option>
                                <option value="mission" className="bg-[#050510]">Mission</option>
                                <option value="alert" className="bg-[#050510]">Alert</option>
                                <option value="system" className="bg-[#050510]">System</option>
                                <option value="achievement" className="bg-[#050510]">Achievement</option>
                            </select>

                            {/* Type Filter */}
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all cursor-pointer"
                            >
                                <option value="all" className="bg-[#050510]">All Types</option>
                                <option value="major" className="bg-[#050510]">Major Events</option>
                                <option value="micro" className="bg-[#050510]">Micro Events</option>
                            </select>
                        </div>

                        {/* Results Count */}
                        <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>Showing {filteredEvents.length} of {events.length} events</span>
                            </div>
                            <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
                                <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-cyan-400">↑</kbd>
                                <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-cyan-400">↓</kbd>
                                <span>to scroll</span>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    {loading ? (
                        <div className="h-96 flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mb-4"></div>
                            <p className="text-gray-400 text-lg">Loading events from the cosmos...</p>
                        </div>
                    ) : filteredEvents.length === 0 ? (
                        <div className="h-96 flex flex-col items-center justify-center text-center">
                            <Activity size={48} className="text-gray-600 mb-4" />
                            <p className="text-gray-400 text-lg">No events found</p>
                            <p className="text-gray-500 text-sm mt-2">Try adjusting your search filters</p>
                        </div>
                    ) : (
                        <div
                            ref={scrollRef}
                            className="h-[calc(100vh-28rem)] overflow-y-auto custom-scrollbar bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                            tabIndex={0}
                        >
                            <Timeline data={timelineData} scrollContainerRef={scrollRef} />
                        </div>
                    )}
                </div>
            </div>

            {/* Custom Scrollbar Styles */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 10px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 5px;
                    margin: 8px 0;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(180deg, rgba(34, 211, 238, 0.4) 0%, rgba(34, 211, 238, 0.2) 100%);
                    border-radius: 5px;
                    border: 2px solid rgba(34, 211, 238, 0.1);
                    transition: all 0.3s ease;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(180deg, rgba(34, 211, 238, 0.6) 0%, rgba(34, 211, 238, 0.4) 100%);
                    border-color: rgba(34, 211, 238, 0.3);
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:active {
                    background: linear-gradient(180deg, rgba(34, 211, 238, 0.8) 0%, rgba(34, 211, 238, 0.6) 100%);
                }

                /* Firefox scrollbar */
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(34, 211, 238, 0.4) rgba(255, 255, 255, 0.05);
                }
            `}</style>
        </div>
    );
};

export default EventLogs;
