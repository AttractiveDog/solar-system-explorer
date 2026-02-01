import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Users, User, Loader2, AlertCircle, ExternalLink, Tag } from 'lucide-react';
import { eventAPI } from '../services/api';
import type { Event as APIEvent, User as APIUser } from '../services/api';

const EventDetail = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const navigate = useNavigate();
    const [event, setEvent] = useState<APIEvent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Placeholder images for carousel - will be replaced with actual event images
    const placeholderImages = [
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop',  // Tech event 1
        'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=500&fit=crop',  // Tech event 2
        'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=500&fit=crop',  // Tech event 3
        'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=500&fit=crop',  // Tech event 4
    ];

    const organisers = [
        { name: 'Dr. Sarah Miller', role: 'Event Lead', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
        { name: 'John Cooper', role: 'Coordinator', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
        { name: 'Emma Thompson', role: 'Tech Support', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' }
    ];

    const getImageUrl = (url: string) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        // Fallback to localhost:5000 if env is missing, ensuring we point to backend
        const API_URL = import.meta.env.VITE_API_URL || '/api/v1';
        const BASE_URL = API_URL.replace('/api/v1', '');
        return `${BASE_URL}${url}`;
    };

    const eventImages = event?.images && event.images.length > 0
        ? event.images.map(getImageUrl)
        : placeholderImages;

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


            {/* Scrollable Content Container */}
            <div className="relative h-full pt-40 overflow-y-auto overflow-x-hidden scroll-smooth custom-scrollbar">
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
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:opacity-100 z-10 group/btn"
                                >
                                    <ChevronLeft size={32} className="text-white/70 group-hover/btn:text-white transition-colors" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:opacity-100 z-10 group/btn"
                                >
                                    <ChevronRight size={32} className="text-white/70 group-hover/btn:text-white transition-colors" />
                                </button>

                                {/* Image Indicators */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                    {eventImages.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`h-3 rounded-full transition-all duration-300 ${index === currentImageIndex
                                                ? 'bg-cyan-400 w-12 shadow-[0_0_10px_rgba(34,211,238,0.5)]'
                                                : 'bg-white/40 w-3 hover:bg-white/80 hover:scale-110'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Event Details Grid */}
                        <div className="grid md:grid-cols-3 gap-6 mb-6">
                            {/* Left Column (Span 2) - Event Information & Description */}
                            <div className="md:col-span-2 space-y-6">
                                {/* Event Details */}
                                <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Calendar size={120} className="text-white" />
                                    </div>

                                    <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                                        <Calendar className="text-cyan-400" size={24} />
                                        Event Overview
                                    </h2>

                                    <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                                        {/* Date */}
                                        <div className="space-y-1">
                                            <div className="text-xs text-cyan-400 uppercase tracking-widest font-semibold flex items-center gap-2">
                                                <Calendar size={12} /> Date
                                            </div>
                                            <div className="text-white text-lg font-medium">{formatDate(event.date)}</div>
                                        </div>

                                        {/* Time */}
                                        <div className="space-y-1">
                                            <div className="text-xs text-cyan-400 uppercase tracking-widest font-semibold flex items-center gap-2">
                                                <Clock size={12} /> Time
                                            </div>
                                            <div className="text-white text-lg font-medium">{formatTime(event.time)} ({event.duration} mins)</div>
                                        </div>

                                        {/* Location */}
                                        <div className="space-y-1 sm:col-span-2">
                                            <div className="text-xs text-cyan-400 uppercase tracking-widest font-semibold flex items-center gap-2">
                                                <MapPin size={12} /> Location
                                            </div>
                                            <div className="text-white text-lg font-medium capitalize">
                                                {event.location}
                                                {event.venue && ` - ${event.venue}`}
                                            </div>
                                        </div>

                                        {/* Meeting Link - Full Width */}
                                        {event.meetingLink && (
                                            <div className="space-y-1 sm:col-span-2">
                                                <div className="text-xs text-cyan-400 uppercase tracking-widest font-semibold flex items-center gap-2">
                                                    <ExternalLink size={12} /> Link
                                                </div>
                                                <a
                                                    href={event.meetingLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white hover:text-cyan-300 underline text-base break-all transition-colors"
                                                >
                                                    {event.meetingLink}
                                                </a>
                                            </div>
                                        )}

                                        {/* Tags */}
                                        {event.tags && event.tags.length > 0 && (
                                            <div className="space-y-2 sm:col-span-2 pt-2">
                                                <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold flex items-center gap-2">
                                                    <Tag size={12} /> Tags
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {event.tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 uppercase tracking-wider"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6">
                                    <h2 className="text-xl font-display font-bold text-white mb-4">
                                        About This Event
                                    </h2>
                                    <div className="prose prose-invert max-w-none text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                                        {event.description}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column (Span 1) - Organisers */}
                            <div className="space-y-6">
                                <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6 h-fit sticky top-6">
                                    <h2 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
                                        <Users className="text-purple-400" size={20} />
                                        Organisers
                                    </h2>

                                    <div className="space-y-4">
                                        {organisers.map((org, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                                                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
                                                    <img src={org.image} alt={org.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-bold text-sm">{org.name}</h3>
                                                    <p className="text-cyan-400 text-xs uppercase tracking-wider">{org.role}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Contact Button */}
                                    <button className="w-full mt-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-lg text-cyan-400 font-semibold text-sm hover:bg-white/5 hover:border-cyan-400/50 transition-all uppercase tracking-wider">
                                        Contact Organisers
                                    </button>
                                </div>
                            </div>
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
                
                .fallback-icon-visible .fallback-icon {
                    display: block !important;
                }
            `}</style>
        </div>
    );
};

export default EventDetail;
