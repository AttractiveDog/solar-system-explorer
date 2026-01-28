import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Users, User, Loader2, AlertCircle, ExternalLink, Tag } from 'lucide-react';
import { eventAPI, Event as APIEvent, User as APIUser } from '../services/api';

const EventDetail = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const navigate = useNavigate();
    const [event, setEvent] = useState<APIEvent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Placeholder images for carousel - will be replaced with actual event images
    const eventImages = [
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop',  // Tech event 1
        'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=500&fit=crop',  // Tech event 2
        'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=500&fit=crop',  // Tech event 3
        'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=500&fit=crop',  // Tech event 4
    ];

    useEffect(() => {
        const fetchEventDetails = async () => {
            if (!eventId) {
                setError('Event ID is missing');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const response = await eventAPI.getById(eventId);
                setEvent(response.data);
            } catch (err: any) {
                console.error('Error fetching event details:', err);
                setError(err.message || 'Failed to load event details');
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % eventImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + eventImages.length) % eventImages.length);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (timeString: string) => {
        return timeString;
    };

    const getParticipants = () => {
        if (!event) return [];

        if (Array.isArray(event.participants) && event.participants.length > 0) {
            // Check if participants are populated User objects or just IDs
            if (typeof event.participants[0] === 'object') {
                return event.participants as APIUser[];
            }
        }
        return [];
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'upcoming': return 'text-cyan-400 bg-cyan-500/20 border-cyan-400/30';
            case 'ongoing': return 'text-green-400 bg-green-500/20 border-green-400/30';
            case 'completed': return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
            case 'cancelled': return 'text-red-400 bg-red-500/20 border-red-400/30';
            default: return 'text-blue-400 bg-blue-500/20 border-blue-400/30';
        }
    };

    if (loading) {
        return (
            <div className="relative w-full min-h-screen bg-[#050510] flex items-center justify-center">
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

                <div className="relative z-10 text-center">
                    <Loader2 size={48} className="text-cyan-400 animate-spin mx-auto mb-4" />
                    <p className="text-white text-lg font-display">Loading event details...</p>
                </div>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="relative w-full min-h-screen bg-[#050510] flex items-center justify-center">
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

                <div className="relative z-10 text-center bg-red-500/10 border border-red-500/30 rounded-xl p-8 max-w-md mx-4">
                    <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
                    <p className="text-red-400 text-lg mb-4">⚠️ {error || 'Event not found'}</p>
                    <button
                        onClick={() => navigate('/events')}
                        className="px-6 py-2 bg-red-500/20 border border-red-400/30 rounded-lg hover:bg-red-500/30 transition-all text-white"
                    >
                        Back to Events
                    </button>
                </div>
            </div>
        );
    }

    const participants = getParticipants();
    const participantCount = event.participantCount || participants.length;

    return (
        <div className="relative w-full h-screen bg-[#050510] font-sans overflow-hidden">
            {/* Starfield Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

            {/* Navigation Header - Fixed */}
            {/* Back Button */}
            <button
                onClick={() => navigate('/events')}
                className="absolute top-24 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 text-white font-display"
            >
                <ChevronLeft size={20} />
                <span className="text-sm font-medium">BACK TO EVENTS</span>
            </button>

            {/* Scrollable Content Container */}
            <div className="relative h-full pt-8 overflow-y-auto overflow-x-hidden scroll-smooth custom-scrollbar">
                {/* Main Content Wrapper - Scaled */}
                <div className="w-full min-h-full flex items-start justify-center py-6 px-4 md:px-8">
                    <div className="w-full max-w-7xl" style={{ transform: 'scale(0.85)', transformOrigin: 'top center' }}>
                        {/* Event Title & Status */}
                        <div className="mb-4 text-center">
                            <div className="flex items-center justify-center gap-3 mb-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(event.status)}`}>
                                    {event.status.toUpperCase()}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-wider mb-2">
                                {event.title}
                            </h1>
                        </div>

                        {/* Photo Carousel */}
                        <div className="relative mb-6 bg-white/5 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden group">
                            <div className="relative aspect-video">
                                <img
                                    src={eventImages[currentImageIndex]}
                                    alt={`Event ${currentImageIndex + 1}`}
                                    className="w-full h-full object-cover"
                                />

                                {/* Carousel Controls */}
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <ChevronLeft size={20} className="text-white" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <ChevronRight size={20} className="text-white" />
                                </button>

                                {/* Image Indicators */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                    {eventImages.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentImageIndex
                                                ? 'bg-cyan-400 w-6'
                                                : 'bg-white/50 hover:bg-white/70'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Event Details Grid */}
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            {/* Left Column - Event Information */}
                            <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-4">
                                <h2 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
                                    <Calendar className="text-cyan-400" size={20} />
                                    Event Details
                                </h2>

                                <div className="space-y-3">
                                    {/* Date */}
                                    <div className="flex items-start gap-2">
                                        <Calendar size={16} className="text-cyan-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <div className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Date</div>
                                            <div className="text-white text-sm font-medium">{formatDate(event.date)}</div>
                                        </div>
                                    </div>

                                    {/* Time */}
                                    <div className="flex items-start gap-2">
                                        <Clock size={16} className="text-cyan-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <div className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Time</div>
                                            <div className="text-white text-sm font-medium">{formatTime(event.time)} ({event.duration} mins)</div>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-start gap-2">
                                        <MapPin size={16} className="text-cyan-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <div className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Location</div>
                                            <div className="text-white text-sm font-medium capitalize">
                                                {event.location}
                                                {event.venue && ` - ${event.venue}`}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Meeting Link */}
                                    {event.meetingLink && (
                                        <div className="flex items-start gap-2">
                                            <ExternalLink size={16} className="text-cyan-400 mt-1 flex-shrink-0" />
                                            <div>
                                                <div className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Meeting Link</div>
                                                <a
                                                    href={event.meetingLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-cyan-400 hover:text-cyan-300 underline text-sm break-all"
                                                >
                                                    Join Meeting
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {/* Participants Count */}
                                    <div className="flex items-start gap-2">
                                        <Users size={16} className="text-cyan-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <div className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Participants</div>
                                            <div className="text-white text-sm font-medium">
                                                {participantCount} {event.maxParticipants && `/ ${event.maxParticipants}`} registered
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    {event.tags && event.tags.length > 0 && (
                                        <div className="flex items-start gap-2">
                                            <Tag size={16} className="text-cyan-400 mt-1 flex-shrink-0" />
                                            <div className="flex-1">
                                                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Tags</div>
                                                <div className="flex flex-wrap gap-1">
                                                    {event.tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-0.5 bg-purple-500/20 border border-purple-400/30 rounded-full text-xs text-purple-300"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Column - Description */}
                            <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-4">
                                <h2 className="text-lg font-display font-bold text-white mb-4">
                                    About This Event
                                </h2>
                                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                                    {event.description}
                                </p>
                            </div>
                        </div>

                        {/* Participants List */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-4">
                            <h2 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
                                <Users className="text-cyan-400" size={20} />
                                Participants ({participantCount})
                            </h2>

                            {participants.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                    {participants.map((participant) => (
                                        <div
                                            key={participant._id}
                                            className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
                                        >
                                            <div className="flex items-center gap-2">
                                                {/* Avatar */}
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-cyan-400/50 transition-all">
                                                    {participant.photoURL || participant.avatar ? (
                                                        <img
                                                            src={participant.photoURL || participant.avatar}
                                                            alt={participant.displayName || participant.username}
                                                            className="w-full h-full rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <User size={20} className="text-white" />
                                                    )}
                                                </div>

                                                {/* User Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-white text-sm font-semibold truncate">
                                                        {participant.displayName || participant.username}
                                                    </div>
                                                    <div className="text-xs text-gray-400 truncate">
                                                        @{participant.username}
                                                    </div>
                                                    {participant.stats && (
                                                        <div className="text-xs text-cyan-400">
                                                            {participant.stats.rank}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Users size={40} className="text-gray-600 mx-auto mb-3" />
                                    <p className="text-gray-400 text-base">No participants registered yet</p>
                                    <p className="text-gray-500 text-sm mt-1">Be the first to join this event!</p>
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
                
                .scroll-smooth {
                    scroll-behavior: smooth;
                }
            `}</style>
        </div>
    );
};

export default EventDetail;
