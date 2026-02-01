import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Trophy, Medal, Star } from 'lucide-react';

interface Student {
    id: string;
    rank: number;
    name: string;
    rollNo: string;
    points: number;
    club: string;
    avatar: string;
}

const studentsData: Student[] = [];

const Leaderboard = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    // Filter and sort students (although data is already sorted, good to be safe)
    const filteredStudents = studentsData
        .filter(student => student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => b.points - a.points)
        .slice(0, 10);

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Trophy className="text-yellow-400 w-6 h-6" />;
        if (rank === 2) return <Medal className="text-gray-300 w-6 h-6" />;
        if (rank === 3) return <Medal className="text-amber-600 w-6 h-6" />;
        return <span className="text-gray-400 font-bold w-6 text-center">{rank}</span>;
    };

    return (
        <div className="relative w-full min-h-screen h-auto bg-[#050510] font-sans overflow-x-hidden overflow-y-auto">
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

            {/* Nebula Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>



            {/* Main Content */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-start px-4 md:px-8 pb-8 pt-40 custom-scrollbar overflow-y-auto">
                <div className="w-full max-w-4xl space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 tracking-wider filter drop-shadow-lg">
                            LEADERBOARD
                        </h1>
                        <p className="text-gray-400 tracking-widest text-sm uppercase">Top Explorers of the System</p>
                    </div>

                    {/* Search Bar */}
                    {/* Search Bar - Only show if there is data */}
                    {/* Search Bar */}
                    <div className="relative max-w-md mx-auto w-full group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-200"></div>
                        <div className="relative bg-[#0a0a1f] rounded-lg flex items-center p-1 border border-white/10">
                            <Search className="text-gray-400 ml-3 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by Roll No..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent text-white border-none focus:ring-0 px-4 py-2 placeholder-gray-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Leaderboard Table Container */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden relative overflow-x-auto">
                        {/* Header Row */}
                        <div className="grid grid-cols-12 gap-2 md:gap-4 p-4 border-b border-white/10 bg-white/5 text-gray-400 font-semibold text-xs md:text-sm uppercase tracking-wider min-w-[600px]">
                            <div className="col-span-1 text-center">Rank</div>
                            <div className="col-span-1 text-center"></div> {/* Avatar */}
                            <div className="col-span-3">Name</div>
                            <div className="col-span-3">Roll No</div>
                            <div className="col-span-2 text-center">Club</div>
                            <div className="col-span-2 text-right">Points</div>
                        </div>

                        {/* Data Rows */}
                        <div className="divide-y divide-white/10">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student, index) => (
                                    <div
                                        key={student.id}
                                        className="grid grid-cols-12 gap-2 md:gap-4 p-4 items-center hover:bg-white/5 transition-colors duration-200 group min-w-[600px]"
                                    >
                                        <div className="col-span-1 flex justify-center items-center">
                                            {getRankIcon(student.rank)}
                                        </div>
                                        <div className="col-span-1 flex justify-center">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl border border-white/20 group-hover:border-white/40 transition-colors">
                                                {student.avatar}
                                            </div>
                                        </div>
                                        <div className="col-span-3 font-medium text-white group-hover:text-cyan-400 transition-colors">
                                            {student.name}
                                        </div>
                                        <div className="col-span-3 text-gray-300 font-mono text-sm">
                                            {student.rollNo}
                                        </div>
                                        <div className="col-span-2 flex justify-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold bg-white/10 border border-white/10 
                                                ${student.club === 'Codex' ? 'text-blue-400 border-blue-400/30 bg-blue-400/10' :
                                                    student.club === 'Cube' ? 'text-red-400 border-red-400/30 bg-red-400/10' :
                                                        student.club === 'Finamics' ? 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10' :
                                                            student.club === 'unknown-1' ? 'text-amber-400 border-amber-400/30 bg-amber-400/10' :
                                                                'text-purple-400 border-purple-400/30 bg-purple-400/10'}`}>
                                                {student.club}
                                            </span>
                                        </div>
                                        <div className="col-span-2 text-right font-display font-bold text-lg text-yellow-400 drop-shadow-sm flex items-center justify-end gap-1">
                                            {student.points.toLocaleString()}
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-16 flex flex-col items-center text-center relative overflow-hidden group">

                                    {/* Background Glows */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/05 rounded-full blur-[80px] pointer-events-none"></div>

                                    {/* Animated Icon */}
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 bg-yellow-500/10 blur-xl rounded-full animate-pulse"></div>
                                        <div className="w-20 h-20 bg-[#0a0a1f]/80 border border-yellow-500/20 rounded-2xl flex items-center justify-center relative z-10 rotate-3 group-hover:rotate-6 transition-transform duration-500">
                                            <Trophy className="w-10 h-10 text-yellow-400/90 drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]" />
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <h2 className="text-2xl font-display font-bold text-white mb-2 tracking-wide">
                                        Mission in Progress
                                    </h2>
                                    <p className="text-gray-400 text-base leading-relaxed max-w-sm mb-6">
                                        Leaderboard rankings will be synchronized and displayed here upon event completion.
                                    </p>

                                    {/* Status Badge */}
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/5 border border-yellow-500/10 text-yellow-400 text-xs font-semibold tracking-wider">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-yellow-500"></span>
                                        </span>
                                        SYSTEM STANDBY
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
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
            `}</style>
        </div>
    );
};

export default Leaderboard;
