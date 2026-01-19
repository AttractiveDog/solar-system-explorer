import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Calendar, Activity, Zap, AlertTriangle, Info, CheckCircle2, User, Clock } from 'lucide-react';

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
    {
        id: '1',
        timestamp: new Date('2026-01-19T09:30:00'),
        type: 'major',
        category: 'discovery',
        title: 'New Exoplanet Discovered',
        description: 'TERRA mission has identified a potentially habitable exoplanet in the Kepler-442 system. Initial scans show presence of liquid water.',
        location: 'Sector 7-Alpha',
        priority: 'critical'
    },
    {
        id: '2',
        timestamp: new Date('2026-01-19T08:45:00'),
        type: 'micro',
        category: 'system',
        title: 'System Calibration Complete',
        description: 'All sensors recalibrated successfully. Accuracy improved by 12%.',
        location: 'COMET Station',
        priority: 'low'
    },
    {
        id: '3',
        timestamp: new Date('2026-01-19T07:15:00'),
        type: 'major',
        category: 'mission',
        title: 'EMBER Mission Launch',
        description: 'Mission to study volcanic activity on Io commenced. Expected duration: 72 hours.',
        location: 'Jupiter Orbit',
        priority: 'high'
    },
    {
        id: '4',
        timestamp: new Date('2026-01-19T06:30:00'),
        type: 'micro',
        category: 'achievement',
        title: 'Crew Training Milestone',
        description: 'All AZURE crew members completed deep-sea survival training module.',
        location: 'Training Facility',
        priority: 'medium'
    },
    {
        id: '5',
        timestamp: new Date('2026-01-19T05:00:00'),
        type: 'major',
        category: 'alert',
        title: 'Solar Flare Warning',
        description: 'Class X solar flare detected. All external missions should take protective measures.',
        location: 'Solar Observatory',
        priority: 'critical'
    },
    {
        id: '6',
        timestamp: new Date('2026-01-19T04:20:00'),
        type: 'micro',
        category: 'system',
        title: 'Data Upload Complete',
        description: 'Mission logs from VOID-7 successfully uploaded to central database.',
        location: 'Data Center',
        priority: 'low'
    },
    {
        id: '7',
        timestamp: new Date('2026-01-19T03:45:00'),
        type: 'major',
        category: 'discovery',
        title: 'Anomaly Detected',
        description: 'PHANTOM-X detected unusual energy signature near the Horsehead Nebula. Investigation pending.',
        location: 'Sector 12-Gamma',
        priority: 'high'
    },
    {
        id: '8',
        timestamp: new Date('2026-01-19T02:10:00'),
        type: 'micro',
        category: 'mission',
        title: 'Supply Delivery Completed',
        description: 'Essential supplies delivered to all active stations. Next delivery in 48 hours.',
        location: 'Supply Hub',
        priority: 'medium'
    },
    {
        id: '9',
        timestamp: new Date('2026-01-19T01:30:00'),
        type: 'major',
        category: 'achievement',
        title: 'Mission Milestone Reached',
        description: '1000th successful planetary scan completed by TERRA team. Celebration ceremony scheduled.',
        location: 'TERRA Base',
        priority: 'medium'
    },
    {
        id: '10',
        timestamp: new Date('2026-01-19T00:15:00'),
        type: 'micro',
        category: 'system',
        title: 'Routine Maintenance',
        description: 'Scheduled maintenance on life support systems completed without issues.',
        location: 'All Stations',
        priority: 'low'
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
    const navigate = useNavigate();

    const filteredEvents = useMemo(() => {
        return mockEvents.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.location?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
            const matchesType = selectedType === 'all' || event.type === selectedType;

            return matchesSearch && matchesCategory && matchesType;
        });
    }, [searchQuery, selectedCategory, selectedType]);

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
        <div className="relative w-screen h-screen overflow-hidden bg-[#050510] font-sans">
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

            {/* Navigation Header */}
            <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-6">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 text-white font-display"
                >
                    <ChevronLeft size={20} />
                    <span className="text-sm font-medium">BACK</span>
                </button>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/profile')}
                        className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 group"
                        title="View Profile"
                    >
                        <User size={20} className="text-white group-hover:text-cyan-400 transition-colors" />
                    </button>

                    <div className="text-right">
                        <div className="text-xs text-gray-400 font-display tracking-wider">CURRENT TIME</div>
                        <div className="text-xl font-display text-cyan-400 font-bold tracking-wider">
                            {new Date().toLocaleTimeString('en-US', { hour12: false })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full h-full pt-24 pb-8 px-8">
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
                            <span>Showing {filteredEvents.length} of {mockEvents.length} events</span>
                        </div>
                    </div>

                    {/* Timeline */}
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
                                    {/* Timeline Line */}
                                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-transparent" />

                                    {/* Events */}
                                    <div className="space-y-6">
                                        {filteredEvents.map((event, index) => {
                                            const CategoryIcon = categoryIcons[event.category];
                                            return (
                                                <div key={event.id} className="relative pl-20">
                                                    {/* Timeline Node */}
                                                    <div className={`absolute left-4 top-6 w-8 h-8 rounded-full border-4 border-[#050510] ${event.type === 'major'
                                                        ? 'bg-gradient-to-br from-cyan-400 to-purple-500 shadow-lg shadow-cyan-400/50'
                                                        : 'bg-white/20 shadow-md'
                                                        } flex items-center justify-center z-10`}>
                                                        {event.type === 'major' && (
                                                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                                        )}
                                                    </div>

                                                    {/* Event Card */}
                                                    <div className={`bg-white/5 backdrop-blur-sm border rounded-lg p-5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] ${event.type === 'major'
                                                        ? 'border-cyan-400/30 shadow-lg shadow-cyan-400/10'
                                                        : 'border-white/10'
                                                        }`}>
                                                        {/* Event Header */}
                                                        <div className="flex items-start justify-between gap-4 mb-3">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[event.category]}`}>
                                                                        <CategoryIcon size={12} className="inline mr-1" />
                                                                        {event.category.toUpperCase()}
                                                                    </span>
                                                                    {event.type === 'major' && (
                                                                        <span className="px-3 py-1 rounded-full text-xs font-semibold border border-cyan-400/30 bg-cyan-500/20 text-cyan-300">
                                                                            MAJOR EVENT
                                                                        </span>
                                                                    )}
                                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${priorityColors[event.priority]}`}>
                                                                        {event.priority.toUpperCase()}
                                                                    </span>
                                                                </div>
                                                                <h3 className="text-xl font-display font-bold text-white mb-1">
                                                                    {event.title}
                                                                </h3>
                                                            </div>
                                                            <div className="text-right flex-shrink-0">
                                                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                                                    <Clock size={12} />
                                                                    {formatTimestamp(event.timestamp)}
                                                                </div>
                                                                <div className="text-xs text-gray-400 mt-1">
                                                                    {event.timestamp.toLocaleTimeString('en-US', {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                        hour12: false
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Event Description */}
                                                        <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                                                            {event.description}
                                                        </p>

                                                        {/* Event Footer */}
                                                        {event.location && (
                                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                                                <span>Location: {event.location}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
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
