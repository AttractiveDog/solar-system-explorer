import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Mail, Linkedin, Github, Sparkles } from 'lucide-react';
import { teamData, TeamMember } from '../data/teamData';

type CometTab = 'website' | 'events' | 'members';
type EventYear = 'year1' | 'year2' | 'year3' | 'year4';
type MemberDomain = 'codex' | 'cubex';

const AboutPage = () => {
    const navigate = useNavigate();

    // State for Section 2: The Comet Team
    const [activeTab, setActiveTab] = useState<CometTab>('website');
    const [selectedYear, setSelectedYear] = useState<EventYear>('year1');
    const [selectedDomain, setSelectedDomain] = useState<MemberDomain>('codex');

    // Member Card Component
    const MemberCard = ({ member, isPremium = false }: { member: TeamMember; isPremium?: boolean }) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
            <div
                className={`group relative ${isPremium ? 'w-full max-w-sm mx-auto' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Glow Effect on Hover */}
                {isHovered && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-500 rounded-2xl blur-xl opacity-75 animate-pulse" />
                )}

                {/* Card */}
                <div className={`relative bg-slate-900/60 backdrop-blur-md border border-slate-700/50 ${isPremium ? 'rounded-3xl p-8' : 'rounded-xl p-6'
                    } transition-all duration-300 hover:scale-105 hover:border-cyan-400/50`}>

                    {/* Image */}
                    <div className="flex justify-center mb-4">
                        <div className={`relative ${isPremium ? 'w-40 h-40' : 'w-24 h-24'}`}>
                            {/* Glow behind image */}
                            <div className={`absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-600 ${isPremium ? 'rounded-full' : 'rounded-xl'
                                } blur-lg opacity-50`} />

                            {/* Image container */}
                            <div className={`relative ${isPremium ? 'rounded-full' : 'rounded-xl'} overflow-hidden ${isPremium ? 'ring-4 ring-yellow-400/50' : 'ring-2 ring-cyan-400/30'
                                }`}>
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Premium badge */}
                            {isPremium && (
                                <div className="absolute -top-2 -right-2">
                                    <Sparkles size={32} className="text-yellow-400 animate-pulse" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="text-center space-y-2">
                        <h4 className={`font-bold text-white ${isPremium ? 'text-2xl' : 'text-lg'}`}>
                            {member.name}
                        </h4>
                        <p className={`${isPremium ? 'text-yellow-400' : 'text-cyan-400'} ${isPremium ? 'text-base' : 'text-sm'
                            } font-semibold uppercase tracking-wider`}>
                            {member.role}
                        </p>

                        {member.bio && isPremium && (
                            <p className="text-gray-400 text-sm leading-relaxed mt-3">
                                {member.bio}
                            </p>
                        )}
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center justify-center gap-3 mt-4">
                        {member.linkedin && (
                            <a
                                href={`https://linkedin.com/in/${member.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-lg transition-all"
                            >
                                <Linkedin size={18} className="text-blue-400" />
                            </a>
                        )}
                        {member.github && (
                            <a
                                href={`https://github.com/${member.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 rounded-lg transition-all"
                            >
                                <Github size={18} className="text-purple-400" />
                            </a>
                        )}
                        {member.email && (
                            <a
                                href={`mailto:${member.email}`}
                                className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 rounded-lg transition-all"
                            >
                                <Mail size={18} className="text-cyan-400" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="relative w-full min-h-screen bg-[#0a0a1a] overflow-y-auto">
            {/* Starfield Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(100)].map((_, i) => (
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

            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-lg hover:bg-slate-800/80 transition-all duration-300 text-white"
            >
                <ChevronLeft size={20} />
                <span className="text-sm font-medium tracking-wider">BACK</span>
            </button>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 space-y-24">

                {/* Page Title */}
                <div className="text-center space-y-4">
                    <div className="inline-block">
                        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 tracking-wider comet-glow">
                            ABOUT COMET
                        </h1>
                    </div>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Building the future of college tech communities, one innovation at a time
                    </p>
                </div>

                {/* ========== SECTION 1: THE ORIGIN (FOUNDERS) ========== */}
                <section className="space-y-8">
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md border border-yellow-400/30 rounded-full">
                            <Sparkles size={24} className="text-yellow-400" />
                            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 tracking-widest">
                                THE ORIGIN
                            </h2>
                        </div>
                        <p className="text-gray-400 text-sm">The visionary minds who sparked the comet</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamData.founders.map((founder) => (
                            <MemberCard key={founder.id} member={founder} isPremium={true} />
                        ))}
                    </div>
                </section>

                {/* ========== SECTION 2: THE COMET TEAM ========== */}
                <section className="space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 tracking-widest">
                            THE COMET TEAM
                        </h2>
                        <p className="text-gray-400 text-sm">Our passionate team driving innovation forward</p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex items-center justify-center">
                        <div className="inline-flex gap-2 bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-xl p-2 overflow-x-auto">
                            <button
                                onClick={() => setActiveTab('website')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${activeTab === 'website'
                                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/50'
                                    : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
                                    }`}
                            >
                                Website Team
                            </button>
                            <button
                                onClick={() => setActiveTab('events')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${activeTab === 'events'
                                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/50'
                                    : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
                                    }`}
                            >
                                Event Team
                            </button>
                            <button
                                onClick={() => setActiveTab('members')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${activeTab === 'members'
                                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/50'
                                    : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
                                    }`}
                            >
                                Club Members
                            </button>
                        </div>
                    </div>

                    {/* Tab B: Year Filter (Only show when Events tab is active) */}
                    {activeTab === 'events' && (
                        <div className="flex items-center justify-center animate-fadeIn">
                            <div className="inline-flex gap-2 bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-xl p-2">
                                {(['year1', 'year2', 'year3', 'year4'] as EventYear[]).map((year, index) => (
                                    <button
                                        key={year}
                                        onClick={() => setSelectedYear(year)}
                                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${selectedYear === year
                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                                            : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
                                            }`}
                                    >
                                        {index + 1}{index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'} Year
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tab C: Domain Toggle (Only show when Members tab is active) */}
                    {activeTab === 'members' && (
                        <div className="flex items-center justify-center animate-fadeIn">
                            <div className="relative inline-flex bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-full p-1">
                                {/* Sliding background */}
                                <div
                                    className={`absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full transition-transform duration-300 shadow-lg ${selectedDomain === 'cubex' ? 'translate-x-full' : 'translate-x-0'
                                        }`}
                                />

                                <button
                                    onClick={() => setSelectedDomain('codex')}
                                    className={`relative z-10 px-8 py-3 rounded-full font-bold transition-all duration-300 ${selectedDomain === 'codex' ? 'text-white' : 'text-gray-400'
                                        }`}
                                >
                                    C/ODEX
                                </button>
                                <button
                                    onClick={() => setSelectedDomain('cubex')}
                                    className={`relative z-10 px-8 py-3 rounded-full font-bold transition-all duration-300 ${selectedDomain === 'cubex' ? 'text-white' : 'text-gray-400'
                                        }`}
                                >
                                    CUBEX
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Tab Content */}
                    <div className="animate-fadeIn">
                        {/* Website Team Grid */}
                        {activeTab === 'website' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {teamData.cometTeam.website.map((member) => (
                                    <MemberCard key={member.id} member={member} />
                                ))}
                            </div>
                        )}

                        {/* Event Team Grid (Filtered by Year) */}
                        {activeTab === 'events' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {teamData.cometTeam.events[selectedYear].map((member) => (
                                    <MemberCard key={member.id} member={member} />
                                ))}
                            </div>
                        )}

                        {/* Club Members Grid (Filtered by Domain) */}
                        {activeTab === 'members' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {teamData.cometTeam.members[selectedDomain].map((member) => (
                                    <MemberCard key={member.id} member={member} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* ========== SECTION 3: COLLEGE SUPPORT ========== */}
                <section className="space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold text-white tracking-widest">
                            COLLEGE SUPPORT
                        </h2>
                        <p className="text-gray-400 text-sm">Faculty advisors and administration supporting our journey</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamData.collegeSupport.map((member) => (
                            <div key={member.id} className="bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-all">
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className="relative w-28 h-28">
                                        <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl blur-lg opacity-50" />
                                        <div className="relative rounded-xl overflow-hidden ring-2 ring-slate-600/50">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                                        <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">{member.role}</p>
                                        {member.bio && (
                                            <p className="text-gray-500 text-xs mt-2 leading-relaxed">{member.bio}</p>
                                        )}
                                    </div>

                                    {member.email && (
                                        <a
                                            href={`mailto:${member.email}`}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 rounded-lg transition-all text-sm text-gray-300"
                                        >
                                            <Mail size={16} />
                                            Contact
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            {/* Custom Styles */}
            <style>{`
                /* Comet Glow Effect */
                .comet-glow {
                    text-shadow: 
                        0 0 10px rgba(0, 243, 255, 0.5),
                        0 0 20px rgba(0, 243, 255, 0.3),
                        0 0 30px rgba(112, 0, 255, 0.3),
                        0 0 40px rgba(112, 0, 255, 0.2);
                    animation: glow-pulse 2s ease-in-out infinite;
                }

                @keyframes glow-pulse {
                    0%, 100% {
                        text-shadow: 
                            0 0 10px rgba(0, 243, 255, 0.5),
                            0 0 20px rgba(0, 243, 255, 0.3),
                            0 0 30px rgba(112, 0, 255, 0.3),
                            0 0 40px rgba(112, 0, 255, 0.2);
                    }
                    50% {
                        text-shadow: 
                            0 0 15px rgba(0, 243, 255, 0.7),
                            0 0 25px rgba(0, 243, 255, 0.5),
                            0 0 35px rgba(112, 0, 255, 0.5),
                            0 0 45px rgba(112, 0, 255, 0.3);
                    }
                }

                /* Fade In Animation */
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out;
                }

                /* Scrollbar Styling */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                
                ::-webkit-scrollbar-track {
                    background: rgba(15, 23, 42, 0.5);
                }
                
                ::-webkit-scrollbar-thumb {
                    background: rgba(0, 243, 255, 0.3);
                    border-radius: 4px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 243, 255, 0.5);
                }
            `}</style>
        </div>
    );
};

export default AboutPage;
