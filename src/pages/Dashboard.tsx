import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, User } from 'lucide-react';
import { Planet3D } from '../components/Planet3D/Planet3D';
import { clubAPI, Club as APIClub } from '../services/api';

interface Club {
    id: string;
    name: string;
    category: string;
    planetColor: string;
    color: string;
    glowColor: string;
    texture: string;
    iconBg: string;
    shadow: string;
    mission: string;
    homeBase: string;
    description: string;
    specialization: string[];
    memberCount?: number;
    status: string;
}

const Dashboard = () => {
    const [selectedClub, setSelectedClub] = useState<Club | null>(null);
    const [clubs, setClubs] = useState<Club[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Planet Schemes matching Landing Page Order
    const planetSchemes = [
        {
            // TERRA (Earth-like)
            planetColor: 'from-blue-400 to-blue-600',
            color: 'hsl(210, 100%, 65%)',
            glowColor: 'hsl(210, 100%, 70%)',
            iconBg: 'bg-blue-500',
            shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.5)]',
            texture: '/planet-terra.png'
        },
        {
            // EMBER (Red-Orange)
            planetColor: 'from-orange-500 to-red-600',
            color: 'hsl(15, 100%, 50%)',
            glowColor: 'hsl(15, 100%, 60%)',
            iconBg: 'bg-red-500',
            shadow: 'shadow-[0_0_15px_rgba(239,68,68,0.5)]',
            texture: '/planet-ember.jpg'
        },
        {
            // AZURE (Deep Blue)
            planetColor: 'from-blue-600 to-indigo-600',
            color: 'hsl(220, 80%, 50%)',
            glowColor: 'hsl(210, 100%, 60%)',
            iconBg: 'bg-indigo-500',
            shadow: 'shadow-[0_0_15px_rgba(99,102,241,0.5)]',
            texture: '/planet-azure.jpg'
        },
        {
            // PHANTOM-X (Tan/Orange)
            planetColor: 'from-amber-400 to-orange-500',
            color: 'hsl(35, 90%, 55%)',
            glowColor: 'hsl(35, 100%, 60%)',
            iconBg: 'bg-amber-500',
            shadow: 'shadow-[0_0_15px_rgba(245,158,11,0.5)]',
            texture: '/planet-phantom.jpg'
        },
        {
            // VOID-7 (Gold/Tan)
            planetColor: 'from-yellow-600 to-stone-600',
            color: 'hsl(45, 60%, 50%)',
            glowColor: 'hsl(45, 80%, 60%)',
            iconBg: 'bg-yellow-600',
            shadow: 'shadow-[0_0_15px_rgba(202,138,4,0.5)]',
            texture: '/planet-void.jpg'
        }
    ];

    const getStatus = (idx: number) => {
        const statuses = ['Orbiting • Active', 'Docked', 'Scanning', 'Offline'];
        return statuses[idx % statuses.length];
    };

    // Fetch clubs from MongoDB
    useEffect(() => {
        const fetchClubs = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await clubAPI.getAll();

                // Map MongoDB clubs to Dashboard Club format
                const formattedClubs: Club[] = response.data.map((club: APIClub, index: number) => {
                    // Assign planet scheme based on index (cycling through the 5 planets)
                    const scheme = planetSchemes[index % planetSchemes.length];

                    let status = getStatus(index);
                    // Force Finamics to be Inactive as requested
                    if (club.name.toLowerCase().includes('finamics')) {
                        status = 'Inactive';
                    }

                    return {
                        id: club._id,
                        name: club.name,
                        category: club.category,
                        planetColor: scheme.planetColor,
                        color: scheme.color,
                        glowColor: scheme.glowColor,
                        texture: scheme.texture,
                        iconBg: scheme.iconBg,
                        shadow: scheme.shadow,
                        mission: club.description,
                        homeBase: `${club.name} HQ • Station Sector ${7 + index}G`,
                        description: club.description,
                        specialization: [
                            club.category.charAt(0).toUpperCase() + club.category.slice(1),
                            'Innovation',
                            'Research'
                        ],
                        memberCount: club.memberCount || club.members?.length || 42,
                        status: status
                    };
                });

                setClubs(formattedClubs);
                if (formattedClubs.length > 0) {
                    setSelectedClub(formattedClubs[0]);
                }
            } catch (err: any) {
                console.error('Error fetching clubs:', err);
                setError(err.message || 'Failed to load clubs');
            } finally {
                setLoading(false);
            }
        };

        fetchClubs();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center w-screen h-screen bg-background-dark text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-cyan"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center w-screen h-screen bg-background-dark text-white gap-4">
                <p className="text-red-500">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500/10"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="relative w-screen min-h-screen lg:h-screen bg-background-light dark:bg-background-dark text-white font-sans lg:overflow-hidden flex flex-col selection:bg-accent-cyan selection:text-black">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 stars opacity-40 pointer-events-none"></div>
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-accent-purple/10 pointer-events-none"></div>



            {/* Main Content */}
            <main className="relative z-10 flex-1 grid grid-cols-12 gap-4 lg:gap-6 p-4 pt-20 lg:p-6 lg:pt-24 lg:overflow-hidden h-full lg:h-auto">
                {/* Left Section: Club Selection */}
                <section className="col-span-12 lg:col-span-4 flex flex-col h-[400px] lg:h-full bg-card-dark/50 backdrop-blur-sm border border-card-border rounded-2xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-card-border bg-gradient-to-r from-card-dark to-transparent">
                        <h2 className="text-xl font-display font-bold text-white tracking-wide uppercase flex items-center gap-2">
                            <span className="w-1 h-6 bg-accent-cyan rounded-full shadow-[0_0_10px_#06b6d4]"></span>
                            Club Selection
                        </h2>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
                        {clubs.map((club) => {
                            const isSelected = selectedClub?.id === club.id;

                            return (
                                <div
                                    key={club.id}
                                    onClick={() => setSelectedClub(club)}
                                    className={`group cursor-pointer relative p-4 rounded-xl border transition-all duration-300 
                                    ${isSelected
                                            ? 'border-accent-cyan/50 bg-accent-cyan/5 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                            : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full ${club.iconBg} ${club.shadow} flex items-center justify-center text-xs font-bold font-display text-white`}>
                                                {club.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className={`font-display font-bold text-lg transition-colors ${isSelected ? 'text-accent-cyan' : 'text-gray-300 group-hover:text-white'}`}>
                                                    {club.name}
                                                </h3>
                                                <p className="text-xs text-gray-400 font-mono">Status: {club.status}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className={`transition-transform duration-300 ${isSelected ? 'text-accent-cyan opacity-100' : 'text-gray-500 opacity-50 group-hover:opacity-100 group-hover:translate-x-1'}`} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Right Section: Planet View & Info */}
                <section className="col-span-12 lg:col-span-8 flex flex-col gap-4 lg:gap-6 h-auto lg:h-full">
                    {/* Planet Viewport */}
                    <div className="flex-1 relative bg-card-dark/30 border border-card-border rounded-2xl overflow-hidden shadow-2xl group min-h-[400px]">
                        <div className="absolute inset-0 z-0 opacity-20" style={{
                            backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}></div>

                        {/* Decorative Rings */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full z-0 pointer-events-none"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] border border-dashed border-white/10 rounded-full z-0 pointer-events-none"></div>

                        {/* 3D Planet Component */}
                        <div className="absolute inset-0 flex items-center justify-center z-10 p-8">
                            {selectedClub && (
                                <Planet3D
                                    size={380}
                                    color={selectedClub.color}
                                    glowColor={selectedClub.glowColor}
                                    texture={selectedClub.texture}
                                    rotationSpeed={0.2}
                                    discovered={true}
                                    showGlow={false}
                                />
                            )}

                            {/* Moon/Satellite -> Ring Loader Style Comet (Short Tail) */}
                            <div className="absolute w-[700px] h-[700px] pointer-events-none z-0 animate-spin-slow" style={{ animationDuration: '120s' }}>
                                {/* The Gradient Ring Trail - Thinner & Aligned */}
                                <div className="absolute inset-0 rounded-full"
                                    style={{
                                        background: 'conic-gradient(from 0deg, transparent 0%, transparent 85%, rgba(139, 92, 246, 0.1) 88%, rgba(6, 182, 212, 0.4) 95%, rgba(255, 255, 255, 0.9) 100%)',
                                        maskImage: 'radial-gradient(transparent 88%, black 88.5%)', // Thinner, outer ring (roughly 12% width)
                                        WebkitMaskImage: 'radial-gradient(transparent 88%, black 88.5%)',
                                        transform: 'rotate(90deg)',
                                        filter: 'blur(6px)'
                                    }}
                                ></div>
                                {/* Secondary Glow - Aligned */}
                                <div className="absolute inset-0 rounded-full opacity-30"
                                    style={{
                                        background: 'conic-gradient(from 0deg, transparent 0%, transparent 80%, rgba(59, 130, 246, 0.1) 85%, rgba(147, 51, 234, 0.3) 95%, rgba(6, 182, 212, 0.5) 100%)',
                                        maskImage: 'radial-gradient(transparent 85%, black 85.5%)',
                                        WebkitMaskImage: 'radial-gradient(transparent 85%, black 85.5%)',
                                        transform: 'rotate(90deg)',
                                        filter: 'blur(12px)'
                                    }}
                                ></div>

                                {/* Comet Head - Aligned with the Ring Track */}
                                <div className="absolute top-1/2 right-[4%] -translate-y-1/2 translate-x-1/2 z-10">
                                    {/* Bright Nucleus with Glow */}
                                    <div className="relative w-10 h-10 bg-white rounded-full shadow-[0_0_30px_rgba(6,182,212,1),0_0_60px_rgba(255,255,255,0.8)]">
                                        <div className="absolute inset-0 bg-cyan-50 rounded-full animate-pulse"></div>
                                        {/* Inner Bright Core */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-[0_0_15px_#fff]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-4 right-4 z-20">
                            <div className="bg-black/40 backdrop-blur border border-white/10 p-2 rounded text-right">
                                <div className="text-[10px] uppercase text-accent-cyan tracking-widest mb-1">Coordinates</div>
                                <div className="font-mono text-xs text-white">X: 45.291 • Y: -12.004</div>
                            </div>
                        </div>
                        <div className="absolute bottom-4 left-4 z-20">
                            <div className="flex gap-2">
                                <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-black bg-accent-cyan rounded-sm">Live Feed</span>
                                <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white border border-white/20 bg-black/40 rounded-sm">Cam 04</span>
                            </div>
                        </div>
                    </div>

                    {/* Info Panel */}
                    <div className="h-auto min-h-[220px] bg-card-dark/60 backdrop-blur-md border border-card-border rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-accent-cyan to-blue-600"></div>
                        {selectedClub && (
                            <div className="flex flex-col md:flex-row gap-8 relative z-10">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider">About: {selectedClub.name}</h2>
                                        <span className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest border rounded ${selectedClub.status === 'Inactive'
                                            ? 'border-red-500 text-red-500'
                                            : 'border-accent-cyan text-accent-cyan'
                                            }`}>
                                            {selectedClub.status.includes('Active') ? 'Active' : selectedClub.status}
                                        </span>
                                    </div>
                                    <div className="space-y-4 text-gray-300 text-sm leading-relaxed max-w-2xl">
                                        <p>
                                            <strong className="text-white font-display uppercase text-xs tracking-wide block mb-1">Mission Directive</strong>
                                            {selectedClub.mission || "Exploration and development of new technologies."}
                                        </p>
                                        <p>
                                            <strong className="text-white font-display uppercase text-xs tracking-wide block mb-1">Home Base</strong>
                                            {selectedClub.homeBase}
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3 flex flex-col justify-between border-l border-white/10 pl-6 md:pl-8">
                                    <div>
                                        <h3 className="text-xs font-display font-bold uppercase text-gray-400 mb-3 tracking-widest">Specialization</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedClub.specialization.map((spec, idx) => (
                                                <span key={idx} className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 transition-colors cursor-default">
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <h3 className="text-xs font-display font-bold uppercase text-gray-400 mb-2 tracking-widest">Current Crew</h3>
                                        <div className="flex -space-x-2 overflow-hidden items-center">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-card-dark bg-gray-800 flex items-center justify-center text-[10px] text-gray-400">
                                                    U{i}
                                                </div>
                                            ))}
                                            <div className="h-8 w-8 rounded-full ring-2 ring-card-dark bg-card-border flex items-center justify-center text-[10px] font-bold text-gray-400">
                                                +{selectedClub.memberCount}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <div className="h-2 w-full bg-gradient-to-r from-accent-purple via-blue-600 to-accent-cyan relative z-20 shadow-[0_0_20px_rgba(139,92,246,0.6)]"></div>
        </div>
    );
};

export default Dashboard;
