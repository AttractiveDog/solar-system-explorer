import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User } from 'lucide-react';
import { Planet3D } from '../components/Planet3D/Planet3D';

interface Club {
    id: string;
    name: string;
    planetColor: string;
    color: string;
    glowColor: string;
    texture: string;
    mission: string;
    homeBase: string;
    description: string;
    specialization: string[];
}

const clubs: Club[] = [
    {
        id: 'terra',
        name: 'TERRA',
        planetColor: 'from-blue-400 to-blue-600',
        color: 'hsl(200, 80%, 55%)',
        glowColor: 'hsl(200, 90%, 60%)',
        texture: '/planet-terra.png',
        mission: 'To explore Earth-like exoplanets.',
        homeBase: 'Terra',
        description: 'The club utilizes advanced probes and manned missions to gather data on potential habitable worlds.',
        specialization: ['Atmospheric analysis', 'Geological surveys', 'Life detection']
    },
    {
        id: 'ember',
        name: 'EMBER',
        planetColor: 'from-orange-500 to-red-600',
        color: 'hsl(15, 85%, 45%)',
        glowColor: 'hsl(20, 100%, 55%)',
        texture: '/planet-ember.jpg',
        mission: 'To study volcanic and high-temperature worlds.',
        homeBase: 'Ember',
        description: 'Specialized in extreme environments and thermal energy research.',
        specialization: ['Volcanic activity', 'Heat resistance tech', 'Mineral extraction']
    },
    {
        id: 'azure',
        name: 'AZURE',
        planetColor: 'from-blue-500 to-indigo-600',
        color: 'hsl(220, 80%, 50%)',
        glowColor: 'hsl(210, 100%, 60%)',
        texture: '/planet-azure.jpg',
        mission: 'To navigate oceanic planets and moons.',
        homeBase: 'Azure',
        description: 'Experts in underwater exploration and marine xenobiology.',
        specialization: ['Deep sea exploration', 'Aquatic life forms', 'Hydro technology']
    },
    {
        id: 'phantom-x',
        name: 'PHANTOM-X',
        planetColor: 'from-amber-400 to-orange-500',
        color: 'hsl(35, 50%, 55%)',
        glowColor: 'hsl(30, 80%, 60%)',
        texture: '/planet-phantom.jpg',
        mission: 'To investigate mysterious cosmic phenomena.',
        homeBase: 'Phantom Station',
        description: 'Pioneers in navigating unknown territories and studying phantom signals.',
        specialization: ['Phantom tracking', 'Dark energy', 'Signal analysis']
    },
    {
        id: 'void-7',
        name: 'VOID-7',
        planetColor: 'from-yellow-400 to-amber-500',
        color: 'hsl(45, 40%, 50%)',
        glowColor: 'hsl(45, 70%, 55%)',
        texture: '/planet-void.jpg',
        mission: 'To explore the darkest reaches of space.',
        homeBase: 'Void Station',
        description: 'Elite specialists operating in the most dangerous and uncharted regions.',
        specialization: ['Deep space operations', 'Void navigation', 'Dark matter research']
    }
];

const Dashboard = () => {
    const [selectedClub, setSelectedClub] = useState<Club>(clubs[0]);
    const navigate = useNavigate();

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-[#050510] font-sans">
            {/* Starfield Background */}
            <div className="absolute inset-0 overflow-hidden">
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
                className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 text-white font-display"
            >
                <ChevronLeft size={20} />
                <span className="text-sm font-medium">BACK</span>
            </button>

            {/* Top Right Section - Profile \u0026 Mission Timer */}
            <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
                {/* Profile Button */}
                <button
                    onClick={() => navigate('/profile')}
                    className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 group"
                    title="View Profile"
                >
                    <User size={20} className="text-white group-hover:text-cyan-400 transition-colors" />
                </button>

                {/* Mission Timer */}
                <div className="text-right">
                    <div className="text-xs text-gray-400 font-display tracking-wider">MISSION TIME</div>
                    <div className="text-xl font-display text-cyan-400 font-bold tracking-wider">
                        {new Date().toLocaleTimeString('en-US', { hour12: false })}
                    </div>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
                <div className="w-full max-w-7xl h-full max-h-[800px] grid grid-cols-2 gap-6">
                    {/* Left Panel - Club Selection */}
                    <div className="flex flex-col h-full">
                        <div className="mb-4">
                            <h1 className="text-2xl font-display font-bold text-white tracking-wider">
                                CLUB SELECTION
                            </h1>
                        </div>

                        {/* Scrollable Club List */}
                        <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden">
                            <div className="overflow-y-auto h-full custom-scrollbar p-2">
                                {clubs.map((club) => (
                                    <button
                                        key={club.id}
                                        onClick={() => setSelectedClub(club)}
                                        className={`w-full mb-2 p-4 rounded-lg flex items-center gap-3 transition-all duration-300 border ${selectedClub.id === club.id
                                            ? 'bg-white/20 border-orange-400 shadow-lg shadow-orange-400/30'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30'
                                            }`}
                                    >
                                        {/* Planet Icon */}
                                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${club.planetColor} shadow-lg flex-shrink-0`} />

                                        {/* Club Name */}
                                        <span className="text-white font-medium text-left flex-1">{club.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Status Bar */}
                        <div className="mt-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                                <div className="flex gap-3 items-center">
                                    {clubs.slice(0, 5).map((club, idx) => (
                                        <div
                                            key={idx}
                                            className={`w-6 h-6 rounded-full bg-gradient-to-br ${club.planetColor} shadow-md cursor-pointer hover:scale-110 transition-transform`}
                                            onClick={() => setSelectedClub(club)}
                                        />
                                    ))}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    <span className="text-xs text-gray-400 font-display">Orbiting • Active</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Planet Display & Info */}
                    <div className="flex flex-col h-full gap-4">
                        {/* 3D Planet Display */}
                        <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                            {/* 3D Textured Planet */}
                            <div className="relative flex items-center justify-center">
                                <Planet3D
                                    size={320}
                                    color={selectedClub.color}
                                    glowColor={selectedClub.glowColor}
                                    texture={selectedClub.texture}
                                    rotationSpeed={0.2}
                                    discovered={true}
                                    showGlow={false}
                                />

                                {/* Orbiting Ring */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-96 h-96 border-2 border-white/20 rounded-full animate-spin-reverse" style={{ animationDuration: '20s' }}>
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-orange-400 rounded-full shadow-lg shadow-orange-400/50" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Club Information */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-lg p-6">
                            <div className="border-l-4 border-cyan-400 pl-4">
                                <h2 className="text-lg font-display font-bold text-white mb-3 tracking-wider">
                                    ABOUT: {selectedClub.name.toUpperCase()}
                                </h2>

                                <div className="space-y-2 text-sm text-gray-300">
                                    <p>
                                        <span className="font-semibold text-white">Mission:</span> {selectedClub.mission}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-white">Home Base:</span> {selectedClub.homeBase}
                                    </p>
                                    <p className="pt-2">
                                        {selectedClub.description}
                                    </p>
                                    <div className="pt-2">
                                        <span className="font-semibold text-white">Specialization:</span>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {selectedClub.specialization.map((spec, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-xs text-cyan-300"
                                                >
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
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

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 30s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default Dashboard;
