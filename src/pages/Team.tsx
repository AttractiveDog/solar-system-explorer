import React, { useState } from 'react';
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
    ChevronRight
} from 'lucide-react';
import './Team.css';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
    branch?: string;
    year?: string;
    linkedin?: string;
    github?: string;
    email?: string;
    status?: 'online' | 'away' | 'offline';
}

const Team = () => {
    const [activeMainTab, setActiveMainTab] = useState<'founders' | 'mentor' | 'college-support' | 'structure' | 'members'>('founders');
    const [activeSubTab, setActiveSubTab] = useState<'core-team' | 'graphics' | 'management'>('core-team');
    const [activeMemberYear, setActiveMemberYear] = useState<'1st' | '2nd' | '3rd' | '4th'>('1st');

    // Data
    const founders: TeamMember[] = [
        {
            id: 'f1',
            name: 'Aarush Singh',
            role: 'Founder',
            image: '',
            branch: 'Food Technology',
            year: 'Final Year'
        },
        {
            id: 'f2',
            name: 'Mahim Gupta',
            role: 'Co-Founder',
            image: '',
            branch: 'Computer Science Engineering',
            year: 'Final Year'
        },
        {
            id: 'f3',
            name: 'Shashwat Shukla',
            role: 'Co-Founder',
            image: '',
            branch: 'Food Technology',
            year: 'Final Year'
        }
    ];

    const mentors: TeamMember[] = [
        {
            id: 'm1',
            name: '__',
            role: '__',
            image: '',
            branch: 'AI & ML',
            year: 'Faculty'
        },
        {
            id: 'm2',
            name: '',
            role: 'Entrepreneurship Faculty',
            image: '',
            branch: 'Entrepreneurship',
            year: 'Faculty'
        },
        {
            id: 'm3',
            name: '--',
            role: 'Dean',
            image: '--',
            branch: 'Administration',
            year: 'Dean'
        }
    ];

    const collegeSupport: TeamMember[] = [
        {
            id: 'cs1',
            name: 'Mr Vipul Kumar',
            role: 'TSC Convener',
            image: '',
        },
    ];

    const coreTeam: TeamMember[] = [
        {
            id: 't1',
            name: 'Rigel Thompson',
            role: 'Lead Developer',
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
            branch: 'Computer Science',
            year: '3rd Yr',
            status: 'online'
        },
        {
            id: 't2',
            name: 'Lyra Chang',
            role: 'Frontend Engineer',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
            branch: 'CS / Ent',
            year: '2nd Yr',
            status: 'online'
        },
        {
            id: 't3',
            name: 'Altair Patel',
            role: 'Backend Engineer',
            image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
            branch: 'CS / Tech',
            year: '3rd Yr',
            status: 'away'
        }
    ];

    const graphicsTeam: TeamMember[] = [
        {
            id: 'g1',
            name: 'Nebula Davis',
            role: 'Creative Director',
            image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=400',
            branch: 'Design',
            year: 'Final Year'
        },
        {
            id: 'g2',
            name: 'Cosmos Brown',
            role: 'Animation Lead',
            image: 'https://images.unsplash.com/photo-1522075469751-3a3694c60e9e?auto=format&fit=crop&q=80&w=400',
            branch: 'Animation',
            year: '3rd Year'
        },
        {
            id: 'g3',
            name: 'Aurora Wilson',
            role: 'UI/UX Designer',
            image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
            branch: 'Design',
            year: '3rd Year'
        },
        {
            id: 'g4',
            name: 'Galaxy Taylor',
            role: 'Motion Designer',
            image: 'https://images.unsplash.com/photo-1563237023-b1e97052961a?auto=format&fit=crop&q=80&w=400',
            branch: 'Media Arts',
            year: '2nd Year'
        }
    ];

    const managementTeam: TeamMember[] = [
        {
            id: 'pr1',
            name: 'Solstice White',
            role: 'Marketing',
            image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=400',
            branch: 'Marketing',
            year: 'Final Year',
            status: 'online'
        },
        {
            id: 'pr2',
            name: 'Eclipse Moore',
            role: 'Communications',
            image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=400',
            branch: 'Communications',
            year: '3rd Year',
            status: 'away'
        }
    ];

    const firstYearMembers: TeamMember[] = [
        { id: '1y1', name: 'Aria Frost', role: 'Trainee', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400', branch: 'CS', year: '1st Year' },
        { id: '1y2', name: 'Leo Spark', role: 'Trainee', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400', branch: 'IT', year: '1st Year' },
        { id: '1y3', name: 'Mira Sky', role: 'Trainee', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400', branch: 'ECE', year: '1st Year' },
    ];
    const secondYearMembers: TeamMember[] = [
        { id: '2y1', name: 'Kai Orbit', role: 'Junior Dev', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400', branch: 'CS', year: '2nd Year', status: 'online' },
        { id: '2y2', name: 'Luna Vonn', role: 'Junior Designer', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400', branch: 'Design', year: '2nd Year' },
        { id: '2y3', name: 'Jett Starr', role: 'Junior Dev', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400', branch: 'IT', year: '2nd Year', status: 'away' },
        { id: '2y4', name: 'Nova Reed', role: 'Content Writer', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400', branch: 'Marketing', year: '2nd Year' },
    ];
    const thirdYearMembers: TeamMember[] = [
        { id: '3y1', name: 'Rex Comet', role: 'Senior Dev', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400', branch: 'CS', year: '3rd Year', status: 'online' },
        { id: '3y2', name: 'Tess Ray', role: 'Senior Designer', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400', branch: 'Design', year: '3rd Year' },
        { id: '3y3', name: 'Zane Bolt', role: 'Tech Lead', image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=400', branch: 'IT', year: '3rd Year' },
    ];
    const fourthYearMembers: TeamMember[] = [
        { id: '4y1', name: 'Vera Flux', role: 'Mentor', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400', branch: 'CS', year: '4th Year' },
        { id: '4y2', name: 'Cade Void', role: 'Advisor', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400', branch: 'MBA', year: '4th Year', status: 'online' },
    ];

    const getMembersByYear = () => {
        switch (activeMemberYear) {
            case '1st': return firstYearMembers;
            case '2nd': return secondYearMembers;
            case '3rd': return thirdYearMembers;
            case '4th': return fourthYearMembers;
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
                            <section className="animate-fade-in grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {coreTeam.map(member => (
                                    <div key={member.id} className="group glass-panel p-1 rounded-2xl hover:bg-card-dark hover:-translate-y-1 transition-all duration-300 border border-white/5">
                                        <div className="relative p-6 flex items-start gap-5">
                                            <div className="relative">
                                                <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 group-hover:border-accent-cyan/50 transition-colors shadow-lg">
                                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-[3px] border-black ${member.status !== 'offline' ? 'bg-accent-cyan' : 'bg-gray-500'}`}></div>
                                            </div>
                                            <div className="flex-1 min-w-0 pt-0.5">
                                                <h3 className="font-display font-bold text-lg text-white truncate group-hover:text-accent-cyan transition-colors">{member.name}</h3>
                                                <p className="text-xs text-gray-400 font-mono uppercase tracking-wider mb-3">{member.role}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/5 text-gray-300 border border-white/10 group-hover:border-accent-cyan/20 transition-colors">
                                                        {member.year}
                                                    </span>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-accent-cyan group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                ))}
                            </section>
                        )}

                        {/* STRUCTURE > Graphics */}
                        {activeMainTab === 'structure' && activeSubTab === 'graphics' && (
                            <section className="animate-fade-in grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {graphicsTeam.map(member => (
                                    <div key={member.id} className="group glass-panel p-1 rounded-2xl hover:bg-card-dark hover:-translate-y-1 transition-all duration-300 border border-white/5">
                                        <div className="relative p-6 flex items-center gap-5">
                                            <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 group-hover:border-accent-purple/50 transition-colors shadow-lg">
                                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-display font-bold text-lg text-white group-hover:text-accent-purple transition-colors">{member.name}</h3>
                                                <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">{member.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        )}

                        {/* STRUCTURE > Management */}
                        {activeMainTab === 'structure' && activeSubTab === 'management' && (
                            <section className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-8">
                                {managementTeam.map(member => (
                                    <div key={member.id} className="group glass-panel p-8 rounded-2xl border-l-4 border-l-accent-purple hover:bg-card-dark hover:translate-x-1 transition-all duration-300 flex items-center gap-6">
                                        <img className="w-24 h-24 rounded-xl object-cover border border-white/10 shadow-xl" src={member.image} alt={member.name} />
                                        <div>
                                            <h4 className="font-display font-bold text-2xl text-white mb-1">{member.name}</h4>
                                            <p className="text-xs text-accent-purple uppercase tracking-widest font-mono mb-3">{member.role}</p>
                                            <div className="flex gap-2 items-center">
                                                <span className={`w-2 h-2 rounded-full ${member.status === 'online' ? 'bg-green-500 shadow-[0_0_8px_lime]' : 'bg-gray-500'}`}></span>
                                                <span className="text-xs text-gray-400 font-mono">{member.status === 'online' ? 'Online' : 'Away'}</span>
                                            </div>
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
                                        <div key={member.id} className="group glass-panel relative p-10 rounded-3xl flex flex-col items-center text-center hover:bg-white/[0.02] border border-white/5 hover:border-accent-cyan/30 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-2xl hover:shadow-accent-cyan/10">
                                            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                                                <Star className="w-6 h-6 text-accent-cyan" />
                                            </div>

                                            <div className="relative mb-8">
                                                <div className="absolute inset-0 bg-accent-cyan/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                <div className="w-40 h-40 rounded-full p-1.5 bg-gradient-to-br from-accent-cyan to-blue-600 relative z-10 shadow-[0_0_30px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_50px_rgba(6,182,212,0.4)] transition-all duration-500">
                                                    <img alt={member.name} className="w-full h-full rounded-full object-cover border-4 border-black/50" src={member.image} />
                                                </div>
                                            </div>

                                            <h3 className="font-display font-bold text-3xl text-white mb-2 tracking-wide group-hover:text-accent-cyan transition-colors">{member.name}</h3>
                                            <p className="text-accent-cyan/80 font-mono text-xs uppercase tracking-[0.2em] mb-8">{member.role}</p>

                                            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

                                            <button className="px-8 py-2.5 rounded-lg bg-white/5 hover:bg-accent-cyan hover:text-black text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-white/5 hover:border-accent-cyan shadow-lg">
                                                View Profile
                                            </button>
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
                                            <p className="text-xs text-accent-purple font-mono uppercase tracking-[0.15em] mb-4">{member.role}</p>
                                            <p className="text-sm text-gray-400 italic leading-relaxed border-l-2 border-white/10 pl-4">"Innovation is the bridge between the present and the future of space exploration."</p>
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
                                            <p className="text-xs text-accent-cyan font-mono uppercase tracking-[0.15em] mb-4">{member.role}</p>
                                            <p className="text-sm text-gray-400 italic leading-relaxed border-l-2 border-white/10 pl-4">"Supporting excellence in education and innovation."</p>
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
                                        {(['1st', '2nd', '3rd', '4th'] as const).map(year => (
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
                                            <div className="w-full pt-3 border-t border-white/5 flex justify-between items-center text-xs text-gray-500 font-mono">
                                                <span>{member.branch}</span>
                                                <span className="text-gray-400">{member.year}</span>
                                            </div>
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
