import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Trophy, Code, TrendingUp, DollarSign, Users, Settings, Share2, Award, Github, Calendar, Linkedin } from 'lucide-react';

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
    status: 'upcoming' | 'ongoing' | 'completed';
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
    const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'achievements'>('overview');

    // User data
    const user = {
        username: 'EXPLORER_2077',
        githubUsername: 'explorer2077',
        linkedinUsername: 'explorer2077',
        rank: 'Elite Contributor',
        level: 24,
        experience: 6750,
        nextLevelExp: 10000,
        joinDate: 'Jan 2025',
        eventsAttended: 12,
        contributions: 47,
        totalPoints: 340,
    };

    const clubs: Club[] = [
        {
            id: 'coding',
            name: 'Coding Club',
            icon: <Code size={20} />,
            color: 'text-cyan-400',
            gradient: 'from-cyan-500/20 to-blue-500/20',
            members: 156,
            joined: 'Jan 10, 2025'
        },
        {
            id: 'trading',
            name: 'Trading Club',
            icon: <TrendingUp size={20} />,
            color: 'text-green-400',
            gradient: 'from-green-500/20 to-emerald-500/20',
            members: 89,
            joined: 'Jan 12, 2025'
        },
        {
            id: 'finance',
            name: 'Finance Club',
            icon: <DollarSign size={20} />,
            color: 'text-yellow-400',
            gradient: 'from-yellow-500/20 to-orange-500/20',
            members: 124,
            joined: 'Jan 15, 2025'
        }
    ];

    const microEvents: MicroEvent[] = [
        { id: '1', title: 'DSA Workshop: Dynamic Programming', club: 'Coding', date: 'Jan 22', time: '4:00 PM', status: 'upcoming', participants: 45 },
        { id: '2', title: 'Trading Simulation Challenge', club: 'Trading', date: 'Jan 21', time: '6:00 PM', status: 'upcoming', participants: 32 },
        { id: '3', title: 'Financial Modeling Masterclass', club: 'Finance', date: 'Jan 20', time: '5:30 PM', status: 'ongoing', participants: 28 },
        { id: '4', title: 'Web3 Development Session', club: 'Coding', date: 'Jan 19', time: '3:00 PM', status: 'completed', participants: 52 },
        { id: '5', title: 'Options Trading Basics', club: 'Trading', date: 'Jan 18', time: '7:00 PM', status: 'completed', participants: 38 },
        { id: '6', title: 'Portfolio Analysis Workshop', club: 'Finance', date: 'Jan 17', time: '4:30 PM', status: 'completed', participants: 41 },
    ];

    const achievements: Achievement[] = [
        { id: '1', title: 'First Steps', description: 'Attend your first event', icon: '👣', unlocked: true, date: 'Jan 10' },
        { id: '2', title: 'Code Master', description: 'Complete 10 coding challenges', icon: '💻', unlocked: true, date: 'Jan 14' },
        { id: '3', title: 'Trading Prodigy', description: 'Win a trading simulation', icon: '📈', unlocked: true, date: 'Jan 16' },
        { id: '4', title: 'Triple Threat', description: 'Join all 3 clubs', icon: '🎯', unlocked: true, date: 'Jan 15' },
        { id: '5', title: 'Community Leader', description: 'Host 5 events', icon: '👑', unlocked: false },
        { id: '6', title: 'Contribution King', description: 'Make 100 contributions', icon: '⭐', unlocked: false },
    ];

    const experiencePercent = (user.experience / user.nextLevelExp) * 100;

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-[#050510]">
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
            <div className="absolute top-6 left-6 right-6 z-50 flex items-center justify-between">
                <button
                    onClick={() => navigate('/dashboard')}
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
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-8 pt-24 overflow-y-auto custom-scrollbar">
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
                                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === tab
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
