import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Calendar, Activity, Zap, AlertTriangle, Info, CheckCircle2, User, Clock, Loader2 } from 'lucide-react';
import { format, isToday, isYesterday, startOfDay } from 'date-fns';
import { eventAPI, Event as APIEvent } from '../services/api';

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const navigate = useNavigate();

    // Fetch events from MongoDB
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await eventAPI.getAll();
                const formattedEvents = response.data.map((event: APIEvent) => {
                    // Map event data to Event Logs format
                    const eventDate = new Date(event.date);
                    const timeString = event.time;

                    // Create timestamp by combining date and time
                    const [hours, minutes] = timeString.split(':').map(Number);
                    const timestamp = new Date(eventDate);
                    timestamp.setHours(hours || 0, minutes || 0);

                    // Determine event type based on participant count or other criteria
                    const participantCount = event.participantCount || (Array.isArray(event.participants) ? event.participants.length : 0);
                    const type: 'major' | 'micro' = participantCount > 30 ? 'major' : 'micro';

                    // Map status to category and priority
                    const statusCategoryMap: Record<string, { category: Event['category'], priority: Event['priority'] }> = {
                        'upcoming': { category: 'mission', priority: 'medium' },
                        'ongoing': { category: 'alert', priority: 'high' },
                        'completed': { category: 'achievement', priority: 'low' },
                        'cancelled': { category: 'system', priority: 'low' }
                    };

                    const mapping = statusCategoryMap[event.status] || { category: 'system', priority: 'medium' };

                    return {
                        id: event._id,
                        timestamp,
                        type,
                        category: mapping.category,
                        title: event.title,
                        description: event.description,
                        location: event.location === 'online' ? 'Virtual Space' : event.venue || 'TBD',
                        priority: mapping.priority
                    };
                });

                setAllEvents(formattedEvents);
            } catch (err: any) {
                console.error('Error fetching events:', err);
                setError(err.message || 'Failed to load events');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const filteredEvents = useMemo(() => {
        return allEvents.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.location?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
            const matchesType = selectedType === 'all' || event.type === selectedType;

            return matchesSearch && matchesCategory && matchesType;
        });
    }, [searchQuery, selectedCategory, selectedType, allEvents]);

    const groupedEvents = useMemo(() => {
        const groups: { [key: string]: Event[] } = {};

        filteredEvents.forEach(event => {
            const dateKey = startOfDay(event.timestamp).toISOString();
            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            groups[dateKey].push(event);
        });

        // Ensure events within groups are sorted by time (descending)
        Object.keys(groups).forEach(key => {
            groups[key].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        });

        // Sort groups by date (descending)
        return Object.entries(groups).sort((a, b) => {
            return new Date(b[0]).getTime() - new Date(a[0]).getTime();
        });
    }, [filteredEvents]);

    const formatTimestamp = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (hours > 0) {
            return `${hours}h ${minutes}m ago`;
        }
        return `${minutes}m ago`;
    };

    return (
        <div className="relative w-full min-h-screen h-auto bg-[#050510] font-sans overflow-x-hidden overflow-y-auto">
            {/* Starfield Background */}
            <div className="absolute inset-0 overflow-hidden">
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
            <div className="relative z-10 w-full h-full pt-24 md:pt-32 pb-8 px-4 md:px-8">
                <div className="max-w-7xl mx-auto h-full flex flex-col">
                    {/* Page Header */}
                    <div className="mb-6">
                        <h1 className="text-4xl font-display font-bold text-white tracking-wider mb-2">
                            EVENT LOGS
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Timeline of mission events, system alerts, and discoveries
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-lg p-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Search Bar */}
                            <div className="md:col-span-2 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search events..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                                />
                            </div>

                            {/* Category Filter */}
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all cursor-pointer"
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
                                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all cursor-pointer"
                            >
                                <option value="all" className="bg-[#050510]">All Types</option>
                                <option value="major" className="bg-[#050510]">Major Events</option>
                                <option value="micro" className="bg-[#050510]">Micro Events</option>
                            </select>
                        </div>

                        {/* Results Count */}
                        <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                            <Calendar size={16} />
                            <span>Showing {filteredEvents.length} of {allEvents.length} events</span>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <Loader2 size={48} className="text-cyan-400 animate-spin mx-auto mb-4" />
                                <p className="text-white text-lg font-display">Loading events...</p>
                            </div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center bg-red-500/10 border border-red-500/30 rounded-xl p-8 max-w-md">
                                <p className="text-red-400 text-lg mb-4">⚠️ {error}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-6 py-2 bg-red-500/20 border border-red-400/30 rounded-lg hover:bg-red-500/30 transition-all text-white"
                                >
                                    Retry
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Timeline */}
                    {!loading && !error && (
                        <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden">
                            <div className="h-full overflow-y-auto custom-scrollbar p-6">
                                {filteredEvents.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center">
                                        <Activity size={48} className="text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg">No events found</p>
                                        <p className="text-gray-500 text-sm mt-2">Try adjusting your search filters</p>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <div className="space-y-8 pb-10">
                                            {groupedEvents.map(([dateKey, events]) => {
                                                const date = new Date(dateKey);
                                                let dateLabel = format(date, 'MMMM d, yyyy');
                                                if (isToday(date)) dateLabel = 'Today';
                                                else if (isYesterday(date)) dateLabel = 'Yesterday';

                                                return (
                                                    <div key={dateKey} className="relative">
                                                        {/* Sticky Date Header */}
                                                        <div className="sticky top-0 z-30 -mx-6 px-6 py-4 bg-[#050510]/95 backdrop-blur-md border-b border-white/5 mb-4 flex items-center gap-4 shadow-lg shadow-black/20">
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-white font-bold text-lg tracking-wide font-display">
                                                                    {dateLabel}
                                                                </span>
                                                                <span className="text-sm text-gray-500 font-mono bg-white/5 px-2 py-0.5 rounded-full">
                                                                    {events.length}
                                                                </span>
                                                            </div>
                                                            <div className="h-px bg-gradient-to-r from-white/10 to-transparent flex-1" />
                                                            <div className="text-xs text-gray-600 font-mono uppercase tracking-wider">
                                                                {format(date, 'EEEE')}
                                                            </div>
                                                        </div>

                                                        {/* Google Photos-style Grid */}
                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2">
                                                            {events.map((event, index) => {
                                                                const CategoryIcon = categoryIcons[event.category];
                                                                return (
                                                                    <button
                                                                        key={event.id}
                                                                        onClick={() => navigate(`/events/${event.id}`)}
                                                                        className={`group relative flex flex-col h-full bg-white/5 backdrop-blur-sm border rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/10 text-left animate-in fade-in zoom-in-95 duration-500 fill-mode-both ${event.type === 'major'
                                                                            ? 'border-cyan-400/30'
                                                                            : 'border-white/10'
                                                                            }`}
                                                                        style={{ animationDelay: `${index * 50}ms` }}
                                                                    >
                                                                        {/* Top Section: Icon & Time */}
                                                                        <div className={`p-4 pb-2 flex justify-between items-start relative overflow-hidden`}>
                                                                            {/* Background Glow for Category */}
                                                                            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 ${categoryColors[event.category].split(' ')[1]}`} />

                                                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${categoryColors[event.category]}`}>
                                                                                <CategoryIcon size={18} />
                                                                            </div>

                                                                            {event.type === 'major' && (
                                                                                <div className="absolute top-0 right-0 p-1">
                                                                                    <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
                                                                                </div>
                                                                            )}

                                                                            <span className="text-xs font-mono text-gray-400 bg-black/20 px-2 py-1 rounded backdrop-blur-sm z-10">
                                                                                {event.timestamp.toLocaleTimeString('en-US', {
                                                                                    hour: '2-digit',
                                                                                    minute: '2-digit',
                                                                                    hour12: false
                                                                                })}
                                                                            </span>
                                                                        </div>

                                                                        {/* Content Section */}
                                                                        <div className="p-4 pt-2 flex-1 flex flex-col">
                                                                            <h3 className="text-lg font-display font-bold text-white mb-2 leading-tight group-hover:text-cyan-300 transition-colors line-clamp-2">
                                                                                {event.title}
                                                                            </h3>

                                                                            <p className="text-gray-400 text-xs mb-4 line-clamp-3 leading-relaxed flex-1">
                                                                                {event.description}
                                                                            </p>

                                                                            {/* Footer Tags */}
                                                                            <div className="flex flex-wrap gap-2 mt-auto">
                                                                                <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold border ${priorityColors[event.priority]}`}>
                                                                                    {event.priority}
                                                                                </span>
                                                                                {event.location && (
                                                                                    <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-gray-400 border border-white/5 truncate max-w-[120px]">
                                                                                        📍 {event.location}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Custom Scrollbar Styles */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 4px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 4px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
            `}</style>
        </div>
    );
};

export default EventLogs;
