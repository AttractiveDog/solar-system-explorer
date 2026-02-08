import React, { useState, useEffect } from 'react';
import {
    Star,
    GraduationCap,
    Users,
    Folder,
    Terminal,
    Palette,
    UserCog,
    Grid,
    List,
    Filter,
    Info,
    ChevronRight,
    Loader
} from 'lucide-react';
import './Team.css';

interface TeamMember {
    _id?: string;
    id?: string;
    name: string;
    role: string;
    image: string;
    branch?: string;
    year?: string;
    bio?: string;
    linkedin?: string;
    github?: string;
    email?: string;
    status?: 'online' | 'away' | 'offline';
}

interface TeamData {
    founders: TeamMember[];
    mentors: TeamMember[];
    collegeSupport: TeamMember[];
    coreTeam: TeamMember[];
    graphics: TeamMember[];
    management: TeamMember[];
    members: {
        year1: TeamMember[];
        year2: TeamMember[];
        year3: TeamMember[];
        year4: TeamMember[];
    };
}

const API_BASE = 'http://localhost:5000/api/v1';

const Team = () => {
    const [activeMainTab, setActiveMainTab] = useState<'founders' | 'mentor' | 'college-support' | 'structure' | 'members'>('founders');
    const [activeSubTab, setActiveSubTab] = useState<'core-team' | 'graphics' | 'management'>('core-team');
    const [activeMemberYear, setActiveMemberYear] = useState<'1st' | '2nd' | '3rd' | '4th'>('1st');

    // API state management
    const [teamData, setTeamData] = useState<TeamData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch team data from API
    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE}/team`);
                const data = await response.json();

                if (data.success) {
                    setTeamData(data.data);
                } else {
                    setError('Failed to load team data');
                }
            } catch (err) {
                console.error('Error fetching team data:', err);
                setError('Failed to connect to server');
            } finally {
                setLoading(false);
            }
        };

        fetchTeamData();
    }, []);

    // Set default active year to first year with members
    useEffect(() => {
        if (teamData) {
            const years: Array<'1st' | '2nd' | '3rd' | '4th'> = ['1st', '2nd', '3rd', '4th'];
            const firstYearWithMembers = years.find(year => {
                const yearData = teamData.members[`year${year[0]}` as 'year1' | 'year2' | 'year3' | 'year4'];
                return yearData && yearData.length > 0;
            });
            if (firstYearWithMembers) {
                setActiveMemberYear(firstYearWithMembers);
            }
        }
    }, [teamData]);

    // Show loading state
    if (loading) {
        return (
            <div className="team-loading">
                <Loader className="spinner" size={48} />
                <p>Loading team members...</p>
            </div>
        );
    }

    // Show error state
    if (error || !teamData) {
        return (
            <div className="team-error">
                <p>{error || 'Failed to load team data'}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    // Extract data from API response
    const founders = teamData.founders.map(m => ({
        ...m,
        id: m._id || m.id || '',
        image: `http://localhost:5000/uploads/team-images/${m.image || 'placeholder.jpg'}`
    }));

    const mentors = teamData.mentors.map(m => ({
        ...m,
        id: m._id || m.id || '',
        image: `http://localhost:5000/uploads/team-images/${m.image || 'placeholder.jpg'}`
    }));

    const collegeSupport = teamData.collegeSupport.map(m => ({
        ...m,
        id: m._id || m.id || '',
        image: `http://localhost:5000/uploads/team-images/${m.image || 'placeholder.jpg'}`
    }));

    const coreTeam = teamData.coreTeam.map(m => ({
        ...m,
        id: m._id || m.id || '',
        image: `http://localhost:5000/uploads/team-images/${m.image || 'placeholder.jpg'}`
    }));

    const graphicsTeam = teamData.graphics.map(m => ({
        ...m,
        id: m._id || m.id || '',
        image: `http://localhost:5000/uploads/team-images/${m.image || 'placeholder.jpg'}`
    }));

    const managementTeam = teamData.management.map(m => ({
        ...m,
        id: m._id || m.id || '',
        image: `http://localhost:5000/uploads/team-images/${m.image || 'placeholder.jpg'}`
    }));

    const membersByYear = {
        '1st': teamData.members.year1.map(m => ({
            ...m,
            id: m._id || m.id || '',
            image: `http://localhost:5000/uploads/team-images/${m.image || 'placeholder.jpg'}`
        })),
        '2nd': teamData.members.year2.map(m => ({
            ...m,
            id: m._id || m.id || '',
            image: `http://localhost:5000/uploads/team-images/${m.image || 'placeholder.jpg'}`
        })),
        '3rd': teamData.members.year3.map(m => ({
            ...m,
            id: m._id || m.id || '',
            image: `http://localhost:5000/uploads/team-images/${m.image || 'placeholder.jpg'}`
        })),
        '4th': teamData.members.year4.map(m => ({
            ...m,
            id: m._id || m.id || '',
            image: `http://localhost:5000/uploads/team-images/${m.image || 'placeholder.jpg'}`
        }))
    };


    // Helper function to get members by year from API data
    const getMembersByYear = () => {
        switch (activeMemberYear) {
            case '1st': return membersByYear['1st'];
            case '2nd': return membersByYear['2nd'];
            case '3rd': return membersByYear['3rd'];
            case '4th': return membersByYear['4th'];
            default: return [];
        }
    };

    return (
        <div className="relative w-screen min-h-screen bg-background-light dark:bg-background-dark text-white font-sans flex flex-col selection:bg-accent-cyan selection:text-black">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 stars opacity-40 pointer-events-none"></div>
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-accent-purple/10 pointer-events-none"></div>

            <main className="relative z-10 flex-1 flex flex-col pt-32 pb-16 px-6 md:px-12 max-w-[1400px] mx-auto w-full">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center justify-center relative mb-16 md:mb-20">
                    <div className="text-center z-10 max-w-3xl">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_10px_cyan]"></span>
                            <span className="text-xs uppercase tracking-[0.2em] text-accent-cyan font-display font-bold">Directory</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white uppercase tracking-tight drop-shadow-2xl mb-4">
                            Meet The Team
                        </h1>
                        <p className="text-gray-400 font-sans text-lg md:text-xl leading-relaxed">
                            The architects, engineers, and visionaries driving our exploration.
                        </p>
                    </div>

                    {/* View Controls */}
                    <div className="md:absolute md:right-0 mt-8 md:mt-0 flex bg-card-dark/60 backdrop-blur-xl border border-white/10 rounded-lg p-1 z-20 shadow-xl">
                        <button className="p-2.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-all duration-300">
                            <Grid className="w-5 h-5" />
                        </button>
                        <div className="w-px bg-white/10 mx-1 my-1.5"></div>
                        <button className="p-2.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-all duration-300">
                            <List className="w-5 h-5" />
                        </button>
                        <div className="w-px bg-white/10 mx-1 my-1.5"></div>
                        <button className="p-2.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-all duration-300">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Main Navigation Tabs */}
                <div className="flex justify-center mb-16 md:mb-24">
                    <div className="flex flex-wrap justify-center gap-4 p-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                        <button
                            className={`px-6 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-300 ${activeMainTab === 'founders' ? 'bg-accent-cyan text-black shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            onClick={() => setActiveMainTab('founders')}
                        >
                            <Star className="w-4 h-4" />
                            <span>Founders</span>
                        </button>
                        <button
                            className={`px-6 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-300 ${activeMainTab === 'mentor' ? 'bg-accent-cyan text-black shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            onClick={() => setActiveMainTab('mentor')}
                        >
                            <GraduationCap className="w-4 h-4" />
                            <span>Mentor</span>
                        </button>
                        <button
                            className={`px-6 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-300 ${activeMainTab === 'college-support' ? 'bg-accent-cyan text-black shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            onClick={() => setActiveMainTab('college-support')}
                        >
                            <UserCog className="w-4 h-4" />
                            <span>College Support</span>
                        </button>
                        <button
                            className={`px-6 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-300 ${activeMainTab === 'structure' ? 'bg-accent-cyan text-black shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            onClick={() => setActiveMainTab('structure')}
                        >
                            <Users className="w-4 h-4" />
                            <span>Structure</span>
                        </button>
                        <button
                            className={`px-6 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-300 ${activeMainTab === 'members' ? 'bg-accent-cyan text-black shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            onClick={() => setActiveMainTab('members')}
                        >
                            <Folder className="w-4 h-4" />
                            <span>Members</span>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 min-h-[500px]">
                    {/* Sidebar / Sub-Navigation - Only show for Structure */}
                    {activeMainTab === 'structure' && (
                        <div className="w-full lg:w-72 flex-shrink-0 animate-fade-in-left">
                            <div className="sticky top-32 glass-panel p-3 rounded-2xl border border-white/10">
                                <div className="px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-display font-bold">Departments</div>
                                <div className="space-y-1">
                                    <button
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 ${activeSubTab === 'core-team' ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
                                        onClick={() => setActiveSubTab('core-team')}
                                    >
                                        <Terminal className="w-4 h-4" /> Core Team
                                    </button>
                                    <button
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 ${activeSubTab === 'graphics' ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
                                        onClick={() => setActiveSubTab('graphics')}
                                    >
                                        <Palette className="w-4 h-4" /> Graphics
                                    </button>
                                    <button
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 ${activeSubTab === 'management' ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
                                        onClick={() => setActiveSubTab('management')}
                                    >
                                        <UserCog className="w-4 h-4" /> Management
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Content Area */}
                    <div className="flex-1 w-full">
                        {/* STRUCTURE > Core Team */}
                        {activeMainTab === 'structure' && activeSubTab === 'core-team' && (
                            <section className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-8">
                                {coreTeam.map(member => (
                                    <div key={member.id} className="group glass-panel p-2 rounded-3xl hover:bg-card-dark hover:-translate-y-2 transition-all duration-300 border border-white/5">
                                        <div className="relative p-4 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                                            <div className="relative flex-shrink-0">
                                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-accent-cyan/50 transition-colors shadow-xl">
                                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className={`absolute -bottom-2 -right-2 w-5 h-5 rounded-full border-4 border-black ${member.status !== 'offline' ? 'bg-accent-cyan shadow-[0_0_12px_cyan]' : 'bg-gray-500'}`}></div>
                                            </div>
                                            <div className="flex-1 min-w-0 pt-1 text-center sm:text-left w-full">
                                                <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-accent-cyan transition-colors mb-2">{member.name}</h3>
                                                <p className="text-xs sm:text-sm text-gray-400 font-mono uppercase tracking-wider mb-3">{member.role}</p>
                                                {member.bio && (
                                                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{member.bio}</p>
                                                )}
                                                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                                                    {member.branch && (
                                                        <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 text-gray-300 border border-white/10 group-hover:border-accent-cyan/30 transition-colors">
                                                            {member.branch}
                                                        </span>
                                                    )}
                                                    {(member.email || member.linkedin || member.github) && (
                                                        <div className="flex gap-1.5">
                                                            {member.email && (
                                                                <a href={`mailto:${member.email}`} className="p-1.5 rounded bg-white/5 hover:bg-accent-cyan hover:text-black text-white transition-all" title="Email">
                                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                                    </svg>
                                                                </a>
                                                            )}
                                                            {member.linkedin && (
                                                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded bg-white/5 hover:bg-accent-cyan hover:text-black text-white transition-all" title="LinkedIn">
                                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                                    </svg>
                                                                </a>
                                                            )}
                                                            {member.github && (
                                                                <a href={member.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded bg-white/5 hover:bg-accent-cyan hover:text-black text-white transition-all" title="GitHub">
                                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                                    </svg>
                                                                </a>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <ChevronRight className="hidden sm:block w-6 h-6 text-gray-600 group-hover:text-accent-cyan group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                ))}
                            </section>
                        )}

                        {/* STRUCTURE > Graphics */}
                        {activeMainTab === 'structure' && activeSubTab === 'graphics' && (
                            <section className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-8">
                                {graphicsTeam.map(member => (
                                    <div key={member.id} className="group glass-panel p-2 rounded-3xl hover:bg-card-dark hover:-translate-y-2 transition-all duration-300 border border-white/5">
                                        <div className="relative p-4 sm:p-8 flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6">
                                            <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-accent-purple/50 transition-colors shadow-xl">
                                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 text-center sm:text-left w-full">
                                                <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-accent-purple transition-colors mb-2">{member.name}</h3>
                                                <p className="text-xs sm:text-sm text-gray-400 font-mono uppercase tracking-wider mb-3">{member.role}</p>
                                                {member.bio && (
                                                    <p className="text-xs text-gray-500 mb-3">{member.bio}</p>
                                                )}
                                                {(member.email || member.linkedin || member.github) && (
                                                    <div className="flex gap-2 mt-2 justify-center sm:justify-start">
                                                        {member.email && (
                                                            <a href={`mailto:${member.email}`} className="p-1.5 rounded bg-white/5 hover:bg-accent-purple hover:text-black text-white transition-all" title="Email">
                                                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                                </svg>
                                                            </a>
                                                        )}
                                                        {member.linkedin && (
                                                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded bg-white/5 hover:bg-accent-purple hover:text-black text-white transition-all" title="LinkedIn">
                                                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                                </svg>
                                                            </a>
                                                        )}
                                                        {member.github && (
                                                            <a href={member.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded bg-white/5 hover:bg-accent-purple hover:text-black text-white transition-all" title="GitHub">
                                                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                                </svg>
                                                            </a>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        )}

                        {/* STRUCTURE > Management */}
                        {activeMainTab === 'structure' && activeSubTab === 'management' && (
                            <section className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                                {managementTeam.map(member => (
                                    <div key={member.id} className="group glass-panel p-6 sm:p-10 rounded-3xl border-l-4 border-l-accent-purple hover:bg-card-dark hover:translate-x-2 transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-8">
                                        <img className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-2xl object-cover border-2 border-white/10 shadow-2xl" src={member.image} alt={member.name} />
                                        <div className="text-center sm:text-left w-full">
                                            <h4 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">{member.name}</h4>
                                            <p className="text-xs sm:text-sm text-accent-purple uppercase tracking-widest font-mono mb-3">{member.role}</p>
                                            {member.bio && (
                                                <p className="text-xs text-gray-400 mb-3">{member.bio}</p>
                                            )}
                                            <div className="flex gap-2 items-center justify-center sm:justify-start mb-3">
                                                <span className={`w-3 h-3 rounded-full ${member.status === 'online' ? 'bg-green-500 shadow-[0_0_12px_lime]' : 'bg-gray-500'}`}></span>
                                                <span className="text-sm text-gray-400 font-mono">{member.status === 'online' ? 'Online' : 'Away'}</span>
                                            </div>
                                            {(member.email || member.linkedin || member.github) && (
                                                <div className="flex gap-2 justify-center sm:justify-start">
                                                    {member.email && (
                                                        <a href={`mailto:${member.email}`} className="p-1.5 rounded bg-white/5 hover:bg-accent-purple hover:text-black text-white transition-all" title="Email">
                                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                    {member.linkedin && (
                                                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded bg-white/5 hover:bg-accent-purple hover:text-black text-white transition-all" title="LinkedIn">
                                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                    {member.github && (
                                                        <a href={member.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded bg-white/5 hover:bg-accent-purple hover:text-black text-white transition-all" title="GitHub">
                                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </section>
                        )}

                        {/* FOUNDERS - Centered Grid */}
                        {activeMainTab === 'founders' && (
                            <section className="animate-fade-in max-w-6xl mx-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
                                    {founders.map(member => (
                                        <div key={member.id} className="group glass-panel relative p-8 rounded-3xl flex flex-col items-center text-center hover:bg-white/[0.02] border border-white/5 hover:border-accent-cyan/30 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-2xl hover:shadow-accent-cyan/10">
                                            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                                                <Star className="w-6 h-6 text-accent-cyan" />
                                            </div>

                                            <div className="relative mb-6">
                                                <div className="absolute inset-0 bg-accent-cyan/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-accent-cyan/30 relative z-10 shadow-[0_0_20px_rgba(6,182,212,0.2)] group-hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-500 group-hover:border-accent-cyan">
                                                    <img alt={member.name} className="w-full h-full object-cover" src={member.image} />
                                                </div>
                                            </div>

                                            <h3 className="font-display font-bold text-2xl text-white mb-2 tracking-wide group-hover:text-accent-cyan transition-colors">{member.name}</h3>
                                            <p className="text-accent-cyan/80 font-mono text-xs uppercase tracking-[0.2em] mb-3">{member.role}</p>

                                            {member.branch && (
                                                <span className="px-4 py-1.5 mb-4 rounded-lg text-xs font-bold bg-white/5 text-gray-300 border border-white/10 group-hover:border-accent-cyan/30 transition-colors">
                                                    {member.branch}
                                                </span>
                                            )}

                                            {member.bio && (
                                                <p className="text-sm text-gray-400 leading-relaxed mb-4 px-2">{member.bio}</p>
                                            )}

                                            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4"></div>

                                            {(member.email || member.linkedin || member.github) && (
                                                <div className="flex gap-2 justify-center">
                                                    {member.email && (
                                                        <a
                                                            href={`mailto:${member.email}`}
                                                            className="p-2 rounded-lg bg-white/5 hover:bg-accent-cyan hover:text-black text-white transition-all duration-300 border border-white/10 hover:border-accent-cyan"
                                                            title="Email"
                                                        >
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                    {member.linkedin && (
                                                        <a
                                                            href={member.linkedin}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 rounded-lg bg-white/5 hover:bg-accent-cyan hover:text-black text-white transition-all duration-300 border border-white/10 hover:border-accent-cyan"
                                                            title="LinkedIn"
                                                        >
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                    {member.github && (
                                                        <a
                                                            href={member.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 rounded-lg bg-white/5 hover:bg-accent-cyan hover:text-black text-white transition-all duration-300 border border-white/10 hover:border-accent-cyan"
                                                            title="GitHub"
                                                        >
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* MENTOR - Grid */}
                        {activeMainTab === 'mentor' && (
                            <section className="animate-fade-in max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {mentors.map(member => (
                                    <div key={member.id} className="flex flex-col sm:flex-row items-center sm:items-start gap-8 p-8 glass-panel rounded-3xl hover:bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1">
                                        <div className="w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                            <img className="w-full h-full object-cover" src={member.image} alt={member.name} />
                                        </div>
                                        <div className="text-center sm:text-left">
                                            <h3 className="font-display font-bold text-2xl text-white tracking-wide mb-1">{member.name}</h3>
                                            <p className="text-xs text-accent-purple font-mono uppercase tracking-[0.15em] mb-3">{member.role}</p>
                                            {member.bio && (
                                                <p className="text-sm text-gray-400 leading-relaxed mb-4 border-l-2 border-white/10 pl-4">{member.bio}</p>
                                            )}
                                            {(member.email || member.linkedin || member.github) && (
                                                <div className="flex gap-2 justify-center sm:justify-start">
                                                    {member.email && (
                                                        <a
                                                            href={`mailto:${member.email}`}
                                                            className="p-2 rounded-lg bg-white/5 hover:bg-accent-purple hover:text-black text-white transition-all duration-300 border border-white/10 hover:border-accent-purple"
                                                            title="Email"
                                                        >
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                    {member.linkedin && (
                                                        <a
                                                            href={member.linkedin}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 rounded-lg bg-white/5 hover:bg-accent-purple hover:text-black text-white transition-all duration-300 border border-white/10 hover:border-accent-purple"
                                                            title="LinkedIn"
                                                        >
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                    {member.github && (
                                                        <a
                                                            href={member.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 rounded-lg bg-white/5 hover:bg-accent-purple hover:text-black text-white transition-all duration-300 border border-white/10 hover:border-accent-purple"
                                                            title="GitHub"
                                                        >
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </section>
                        )}

                        {/* COLLEGE SUPPORT - Grid */}
                        {activeMainTab === 'college-support' && (
                            <section className="animate-fade-in max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {collegeSupport.map(member => (
                                    <div key={member.id} className="flex flex-col sm:flex-row items-center sm:items-start gap-8 p-8 glass-panel rounded-3xl hover:bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1">
                                        <div className="w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                            <img className="w-full h-full object-cover" src={member.image} alt={member.name} />
                                        </div>
                                        <div className="text-center sm:text-left">
                                            <h3 className="font-display font-bold text-2xl text-white tracking-wide mb-1">{member.name}</h3>
                                            <p className="text-xs text-accent-cyan font-mono uppercase tracking-[0.15em] mb-3">{member.role}</p>
                                            {member.bio && (
                                                <p className="text-sm text-gray-400 leading-relaxed mb-4 border-l-2 border-white/10 pl-4">{member.bio}</p>
                                            )}
                                            {(member.email || member.linkedin || member.github) && (
                                                <div className="flex gap-2 justify-center sm:justify-start">
                                                    {member.email && (
                                                        <a
                                                            href={`mailto:${member.email}`}
                                                            className="p-2 rounded-lg bg-white/5 hover:bg-accent-cyan hover:text-black text-white transition-all duration-300 border border-white/10 hover:border-accent-cyan"
                                                            title="Email"
                                                        >
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                    {member.linkedin && (
                                                        <a
                                                            href={member.linkedin}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 rounded-lg bg-white/5 hover:bg-accent-cyan hover:text-black text-white transition-all duration-300 border border-white/10 hover:border-accent-cyan"
                                                            title="LinkedIn"
                                                        >
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                    {member.github && (
                                                        <a
                                                            href={member.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 rounded-lg bg-white/5 hover:bg-accent-cyan hover:text-black text-white transition-all duration-300 border border-white/10 hover:border-accent-cyan"
                                                            title="GitHub"
                                                        >
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </section>
                        )}

                        {/* MEMBERS - Year Tabs & Grid */}
                        {activeMainTab === 'members' && (
                            <section className="animate-fade-in max-w-6xl mx-auto">
                                {/* Year Tabs */}
                                <div className="flex justify-center mb-10">
                                    <div className="flex flex-wrap justify-center gap-2 p-1 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                                        {(['1st', '2nd', '3rd', '4th'] as const)
                                            .filter(year => membersByYear[year].length > 0)
                                            .map(year => (
                                                <button
                                                    key={year}
                                                    className={`px-6 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeMemberYear === year ? 'bg-accent-cyan text-black shadow-lg shadow-cyan-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                                    onClick={() => setActiveMemberYear(year)}
                                                >
                                                    {year} Year
                                                </button>
                                            ))}
                                    </div>
                                </div>

                                {/* Members Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {getMembersByYear().map(member => (
                                        <div key={member.id} className="group glass-panel p-4 rounded-xl hover:bg-card-dark hover:-translate-y-1 transition-all duration-300 border border-white/5 flex flex-col items-center text-center">
                                            <div className="relative mb-4">
                                                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-accent-cyan/50 transition-colors shadow-lg">
                                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                                </div>
                                                {member.status && (
                                                    <div className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-black ${member.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                                                )}
                                            </div>
                                            <h3 className="font-display font-bold text-lg text-white mb-1 group-hover:text-accent-cyan transition-colors">{member.name}</h3>
                                            <p className="text-[10px] text-accent-cyan uppercase tracking-widest font-mono mb-2">{member.role}</p>
                                            {(member.branch || member.year) && (
                                                <div className="w-full pt-3 border-t border-white/5 flex justify-between items-center text-xs text-gray-500 font-mono">
                                                    {member.branch && <span>{member.branch}</span>}
                                                    {member.year && <span className="text-gray-400">{member.year}</span>}
                                                    {/* If only one exists, center it */}
                                                    {(member.branch && !member.year) && <span></span>}
                                                    {(!member.branch && member.year) && <span></span>}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Team;
