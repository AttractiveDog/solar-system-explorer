import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Trophy, Code, TrendingUp, DollarSign, Users, Settings, Share2, Award, Github, Calendar, Linkedin, Loader2, LogOut } from 'lucide-react';
import { userAPI, clubAPI, eventAPI, achievementAPI, syncUserWithBackend, User as APIUser, Club as APIClub, Event as APIEvent, Achievement as APIAchievement } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface Club {
    id: string;
    name: string;
    icon: JSX.Element;
    color: string;
    gradient: string;
    members: number;
    joined: string;
}

interface MicroEvent {
    id: string;
    title: string;
    club: string;
    date: string;
    time: string;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    participants: number;
}

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
    date?: string;
}

const Profile = () => {
    const navigate = useNavigate();
    const { user: authUser, signInWithGoogle, signOut, loading: authLoading } = useAuth();
    const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'achievements'>('overview');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State for API data
    const [user, setUser] = useState<any>(null);
    const [clubs, setClubs] = useState<Club[]>([]);
    const [microEvents, setMicroEvents] = useState<MicroEvent[]>([]);
    const [achievements, setAchievements] = useState<Achievement[]>([]);

    // Handle login
    const handleLogin = async () => {
        try {
            await signInWithGoogle();
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    // Fetch data from MongoDB
    useEffect(() => {
        const fetchProfileData = async () => {
            if (!authUser) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                // Sync and get current user data from backend
                const userResponse = await syncUserWithBackend({
                    firebaseUid: authUser.uid,
                    email: authUser.email || '',
                    displayName: authUser.displayName || '',
                    photoURL: authUser.photoURL || '',
                    provider: 'google'
                });

                const currentUser = userResponse.data;

                if (currentUser) {
                    // Set user data
                    setUser({
                        username: currentUser.username,
                        githubUsername: currentUser.social?.github || 'github',
                        linkedinUsername: currentUser.social?.linkedin || 'linkedin',
                        rank: currentUser.stats.rank,
                        level: Math.floor(currentUser.stats.points / 100) + 1,
                        experience: currentUser.stats.points * 10,
                        nextLevelExp: (Math.floor(currentUser.stats.points / 100) + 2) * 1000,
                        joinDate: new Date(currentUser.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                        eventsAttended: currentUser.stats.projects,
                        contributions: currentUser.stats.contributions,
                        totalPoints: currentUser.stats.points,
                    });

                    // Fetch user's clubs
                    const clubsResponse = await clubAPI.getAll();
                    const userClubs = clubsResponse.data
                        .filter((club: APIClub) =>
                            club.members.some((member: any) =>
                                member.user && (typeof member.user === 'string'
                                    ? member.user === currentUser._id
                                    : member.user._id === currentUser._id)
                            )
                        )
                        .map((club: APIClub) => {
                            const memberInfo = club.members.find((m: any) =>
                                m.user && (typeof m.user === 'string'
                                    ? m.user === currentUser._id
                                    : m.user._id === currentUser._id)
                            );

                            const iconMap: any = {
                                'development': <Code size={20} />,
                                'design': <DollarSign size={20} />,
                                'data': <TrendingUp size={20} />,
                                'business': <DollarSign size={20} />,
                            };

                            return {
                                id: club._id,
                                name: club.name,
                                icon: iconMap[club.category] || <Code size={20} />,
                                color: `text-${club.color}`,
                                gradient: club.gradient || 'from-cyan-500/20 to-blue-500/20',
                                members: club.memberCount || club.members.length,
                                joined: new Date(memberInfo?.joinedDate || club.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                            };
                        });
                    setClubs(userClubs);

                    // Fetch all events
                    const eventsResponse = await eventAPI.getAll();
                    const formattedEvents = eventsResponse.data.map((event: APIEvent) => ({
                        id: event._id,
                        title: event.title,
                        club: typeof event.club === 'string' ? 'Club' : event.club?.name || 'Club',
                        date: new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                        time: event.time,
                        status: event.status,
                        participants: event.participantCount || (Array.isArray(event.participants) ? event.participants.length : 0)
                    }));
                    setMicroEvents(formattedEvents);

                    // Fetch all achievements
                    const achievementsResponse = await achievementAPI.getAll();
                    const formattedAchievements = achievementsResponse.data.map((achievement: APIAchievement) => ({
                        id: achievement._id,
                        title: achievement.title,
                        description: achievement.description,
                        icon: achievement.icon,
                        unlocked: Math.random() > 0.5, // You can check UserAchievements collection
                        date: achievement.createdAt ? new Date(achievement.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : undefined
                    }));
                    setAchievements(formattedAchievements);
                }

            } catch (err: any) {
                console.error('Error fetching profile data:', err);
                setError(err.message || 'Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading) {
            fetchProfileData();
        }
    }, [authUser, authLoading]);

    const experiencePercent = user ? (user.experience / user.nextLevelExp) * 100 : 0;

    if (!authLoading && !authUser) {
        return (
            <div className="relative w-screen h-screen overflow-hidden bg-[#050510] flex items-start justify-center pt-32">
                {/* Animated Starfield Background */}
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

                {/* Coming Soon Banner */}
                <div className="relative z-10 p-8 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl max-w-md w-full text-center">
                    <h2 className="text-3xl font-bold text-white mb-4 font-display">Identity Verification</h2>
                    <p className="text-gray-400 mb-8">Please authenticate your credentials to access your explorer profile.</p>

                    <button
                        onClick={handleLogin}
                        className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-cyan-500/40 to-blue-500/40 rounded-xl font-bold text-white hover:shadow-lg hover:from-cyan-500/50 hover:to-blue-500/50 transition-all cursor-pointer"
                    >
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <span className="text-blue-500 text-xs font-bold">G</span>
                        </div>
                        Connect with Google
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="mt-6 text-gray-500 hover:text-white transition-colors text-sm"
                    >
                        Return to Solar System
                    </button>
                </div>

                {/* Shimmer animation for the text */}
                <style>{`
                    @keyframes shimmer {
                        0% { background-position: 0% center; }
                        100% { background-position: 200% center; }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="relative w-full min-h-screen h-auto bg-[#050510] overflow-x-hidden overflow-y-auto">
            {/* Animated Starfield Background */}
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

            {/* Nebula Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Navigation */}
            <div className="absolute top-24 left-6 right-16 md:right-40 z-50 flex items-center justify-between">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 text-white font-display"
                >
                    <ChevronLeft size={20} />
                    <span className="text-sm font-medium">BACK</span>
                </button>

                <div className="flex gap-3">
                    <button className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300">
                        <Share2 size={18} className="text-white" />
                    </button>
                    <button className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300">
                        <Settings size={18} className="text-white" />
                    </button>
                    <button
                        onClick={() => signOut()}
                        className="p-2 bg-red-500/10 backdrop-blur-md border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all duration-300"
                        title="Sign Out"
                    >
                        <LogOut size={18} className="text-red-400" />
                    </button>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 size={48} className="text-cyan-400 animate-spin mx-auto mb-4" />
                        <p className="text-white text-lg font-display">Loading profile data...</p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && !loading && (
                <div className="relative z-10 w-full h-full flex items-center justify-center">
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

            {/* Main Content */}
            {!loading && !error && user && (
                <div className="relative z-10 w-full h-full flex items-start justify-center p-8 pt-24 pb-12 overflow-y-auto custom-scrollbar">
                    <div className="w-full max-w-7xl space-y-6">
                        {/* Profile Header Card */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 relative overflow-hidden">
                            {/* Animated Border Glow */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-shift opacity-50" />

                            <div className="relative flex flex-col md:flex-row items-center gap-6">
                                {/* Avatar */}
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-xl opacity-70 animate-pulse" />
                                    <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 p-1">
                                        <div className="w-full h-full rounded-full bg-[#0a0a1f] flex items-center justify-center text-6xl">
                                            👨‍🚀
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-3 py-1 border-2 border-[#050510]">
                                        <span className="text-xs font-bold text-black">LVL {user.level}</span>
                                    </div>
                                </div>

                                {/* User Info */}
                                <div className="flex-1 text-center md:text-left">
                                    <h1 className="text-4xl font-bold text-white mb-2 tracking-wider font-display">
                                        {user.username}
                                    </h1>
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                                        <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-full">
                                            <Award size={16} className="text-purple-400" />
                                            <span className="text-sm text-purple-300 font-semibold">{user.rank}</span>
                                        </div>
                                    </div>

                                    {/* Social Links */}
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                                        {/* GitHub Link */}
                                        <a
                                            href={`https://github.com/${user.githubUsername}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300"
                                        >
                                            <Github size={16} className="text-white" />
                                            <span className="text-sm text-white font-medium">@{user.githubUsername}</span>
                                        </a>

                                        {/* LinkedIn Link */}
                                        <a
                                            href={`https://linkedin.com/in/${user.linkedinUsername}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-400/30 rounded-lg hover:bg-blue-500/30 transition-all duration-300"
                                        >
                                            <Linkedin size={16} className="text-blue-400" />
                                            <span className="text-sm text-blue-300 font-medium">LinkedIn</span>
                                        </a>
                                    </div>

                                    {/* Experience Bar */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-400">Experience Points</span>
                                            <span className="text-cyan-400 font-semibold">{user.experience} / {user.nextLevelExp} XP</span>
                                        </div>
                                        <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/20">
                                            <div
                                                className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 animate-shimmer"
                                                style={{ width: `${experiencePercent}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center bg-white/5 rounded-lg p-4 border border-white/10">
                                        <div className="text-3xl font-bold text-cyan-400">{user.eventsAttended}</div>
                                        <div className="text-xs text-gray-400 mt-1">Events</div>
                                    </div>
                                    <div className="text-center bg-white/5 rounded-lg p-4 border border-white/10">
                                        <div className="text-3xl font-bold text-purple-400">{user.contributions}</div>
                                        <div className="text-xs text-gray-400 mt-1">Contributions</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {[
                                { icon: <Calendar className="text-orange-400" />, label: 'Events Attended', value: user.eventsAttended, color: 'from-orange-500/20 to-red-500/20' },
                                { icon: <Star className="text-cyan-400" />, label: 'Total Points', value: user.totalPoints, color: 'from-cyan-500/20 to-blue-500/20' },
                                { icon: <Trophy className="text-yellow-400" />, label: 'Achievements', value: achievements.filter(a => a.unlocked).length + '/' + achievements.length, color: 'from-yellow-500/20 to-amber-500/20' },
                                { icon: <Users className="text-pink-400" />, label: 'Club Memberships', value: clubs.length, color: 'from-pink-500/20 to-purple-500/20' }
                            ].map((stat, idx) => (
                                <div key={idx} className={`bg-gradient-to-br ${stat.color} backdrop-blur-md border border-white/20 rounded-xl p-6 hover:scale-105 transition-transform duration-300`}>
                                    <div className="flex items-center gap-3 mb-2">
                                        {stat.icon}
                                        <span className="text-gray-400 text-sm">{stat.label}</span>
                                    </div>
                                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-2 bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-2">
                            {(['overview', 'events', 'achievements'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 px-3 py-2 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all duration-300 ${activeTab === tab
                                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                                        : 'text-gray-400 hover:bg-white/5'
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Clubs */}
                                <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6">
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                        <Users size={20} className="text-cyan-400" />
                                        My Clubs
                                    </h3>
                                    <div className="space-y-3">
                                        {clubs.map((club) => (
                                            <div key={club.id} className={`p-4 bg-gradient-to-br ${club.gradient} border border-white/10 rounded-lg hover:scale-105 transition-all duration-300`}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className={club.color}>{club.icon}</div>
                                                        <span className="text-white font-semibold">{club.name}</span>
                                                    </div>
                                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                                </div>
                                                <div className="flex items-center gap-4 text-xs text-gray-400">
                                                    <span>{club.members} members</span>
                                                    <span>•</span>
                                                    <span>Joined {club.joined}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Events */}
                                <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6">
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                        <Calendar size={20} className="text-purple-400" />
                                        Recent Events
                                    </h3>
                                    <div className="space-y-3">
                                        {microEvents.slice(0, 3).map((event) => (
                                            <div key={event.id} className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h4 className="text-white font-medium text-sm">{event.title}</h4>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${event.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30' :
                                                        event.status === 'ongoing' ? 'bg-green-500/20 text-green-400 border border-green-400/30' :
                                                            'bg-gray-500/20 text-gray-400 border border-gray-400/30'
                                                        }`}>
                                                        {event.status.toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-gray-400">
                                                    <span>{event.club}</span>
                                                    <span>•</span>
                                                    <span>{event.date} at {event.time}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'events' && (
                            <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Calendar size={20} className="text-orange-400" />
                                    Micro Events
                                </h3>
                                <div className="space-y-3">
                                    {microEvents.map((event) => (
                                        <div key={event.id} className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex-1">
                                                    <h4 className="text-white font-semibold mb-1">{event.title}</h4>
                                                    <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                                                        <span className="flex items-center gap-1">
                                                            <span className={`w-2 h-2 rounded-full ${event.club === 'Coding' ? 'bg-cyan-400' :
                                                                event.club === 'Trading' ? 'bg-green-400' : 'bg-yellow-400'
                                                                }`} />
                                                            {event.club}
                                                        </span>
                                                        <span>•</span>
                                                        <span>{event.date} at {event.time}</span>
                                                        <span>•</span>
                                                        <span>{event.participants} participants</span>
                                                    </div>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${event.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30' :
                                                    event.status === 'ongoing' ? 'bg-green-500/20 text-green-400 border border-green-400/30' :
                                                        'bg-gray-500/20 text-gray-400 border border-gray-400/30'
                                                    }`}>
                                                    {event.status.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'achievements' && (
                            <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Trophy size={20} className="text-yellow-400" />
                                    Achievements
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {achievements.map((achievement) => (
                                        <div
                                            key={achievement.id}
                                            className={`p-4 rounded-lg border transition-all duration-300 ${achievement.unlocked
                                                ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-400/30 hover:scale-105'
                                                : 'bg-white/5 border-white/10 opacity-50'
                                                }`}
                                        >
                                            <div className="text-4xl mb-2">{achievement.icon}</div>
                                            <h4 className="text-white font-semibold mb-1">{achievement.title}</h4>
                                            <p className="text-gray-400 text-sm mb-2">{achievement.description}</p>
                                            {achievement.unlocked && achievement.date && (
                                                <div className="text-xs text-yellow-400">Unlocked: {achievement.date}</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Custom Styles */}
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

                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }

                @keyframes gradient-shift {
                    0%, 100% { transform: rotate(0deg) scale(1); }
                    50% { transform: rotate(180deg) scale(1.1); }
                }

                .animate-shimmer {
                    background-size: 200% 100%;
                    animation: shimmer 2s infinite;
                }

                .animate-gradient-shift {
                    animation: gradient-shift 10s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default Profile;
