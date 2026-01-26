import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Crown, Lightbulb, GraduationCap, Code, Palette, Megaphone, Star, Sparkles, Mail, Linkedin, Github, ChevronRight } from 'lucide-react';

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
}

interface TeamSection {
    id: string;
    title: string;
    icon: JSX.Element;
    gradient: string;
    color: string;
    members: TeamMember[];
    description: string;
}

const Team = () => {
    const navigate = useNavigate();
    const [hoveredMember, setHoveredMember] = useState<string | null>(null);

    const teamSections: TeamSection[] = [
        {
            id: 'founders',
            title: 'Founders',
            icon: <Crown size={24} />,
            gradient: 'from-yellow-500/20 via-orange-500/20 to-red-500/20',
            color: 'text-yellow-400',
            description: 'Visionary leaders who brought COMET to life',
            members: [
                {
                    id: 'f1',
                    name: 'Alex Stellar',
                    role: 'Co-Founder & CEO',
                    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
                    branch: 'Computer Science',
                    year: 'Final Year',
                    linkedin: 'alexstellar',
                    github: 'alexstellar',
                    email: 'alex@comet.space'
                },
                {
                    id: 'f2',
                    name: 'Nova Chen',
                    role: 'Co-Founder & CTO',
                    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
                    branch: 'Computer Science',
                    year: 'Final Year',
                    linkedin: 'novachen',
                    github: 'novachen',
                    email: 'nova@comet.space'
                },
                {
                    id: 'f3',
                    name: 'Orion Blake',
                    role: 'Co-Founder & COO',
                    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
                    branch: 'Business Admin',
                    year: 'Final Year',
                    linkedin: 'orionblake',
                    github: 'orionblake',
                    email: 'orion@comet.space'
                }
            ]
        },
        {
            id: 'mentors',
            title: 'Mentors',
            icon: <Lightbulb size={24} />,
            gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20',
            color: 'text-purple-400',
            description: 'Guiding lights illuminating our path to success',
            members: [
                {
                    id: 'm1',
                    name: 'Dr. Cassiopeia Ray',
                    role: 'Senior Mentor',
                    image: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=400',
                    branch: 'AI & ML',
                    year: 'Faculty',
                    linkedin: 'cassiopeiaray'
                },
                {
                    id: 'm2',
                    name: 'Prof. Atlas Storm',
                    role: 'Business Mentor',
                    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
                    branch: 'Entrepreneurship',
                    year: 'Faculty',
                    linkedin: 'atlasstorm'
                },
                {
                    id: 'm3',
                    name: 'Luna Martinez',
                    role: 'Technical Mentor',
                    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
                    branch: 'Systems',
                    year: 'Faculty',
                    linkedin: 'lunamartinez'
                },
                {
                    id: 'm4',
                    name: 'Phoenix Wright',
                    role: 'Creative Mentor',
                    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
                    branch: 'Design',
                    year: 'Faculty',
                    linkedin: 'phoenixwright'
                }
            ]
        },
        {
            id: 'college-support',
            title: 'College Support Team',
            icon: <GraduationCap size={24} />,
            gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
            color: 'text-blue-400',
            description: 'Academic backbone supporting our cosmic community',
            members: [
                {
                    id: 'cs1',
                    name: 'Dr. Vega Anderson',
                    role: 'Dean',
                    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400',
                    branch: 'Administration',
                    year: 'Dean',
                    email: 'vega@college.edu'
                },
                {
                    id: 'cs2',
                    name: 'Deneb Kumar',
                    role: 'Coordinator',
                    image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=400',
                    branch: 'Academics',
                    year: 'Coordinator',
                    email: 'deneb@college.edu'
                },
                {
                    id: 'cs3',
                    name: 'Sirius Johnson',
                    role: 'Advisor',
                    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=400',
                    branch: 'CS Department',
                    year: 'Professor',
                    email: 'sirius@college.edu'
                },
                {
                    id: 'cs4',
                    name: 'Polaris Smith',
                    role: 'Manager',
                    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
                    branch: 'Resources',
                    year: 'Manager',
                    email: 'polaris@college.edu'
                }
            ]
        },
        {
            id: 'core-team',
            title: 'Core Team',
            icon: <Code size={24} />,
            gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
            color: 'text-green-400',
            description: 'Building the digital universe, one line of code at a time',
            members: [
                {
                    id: 't1',
                    name: 'Rigel Thompson',
                    role: 'Lead Developer',
                    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
                    branch: 'Computer Science',
                    year: 'Third Year',
                    github: 'rigelthompson',
                    linkedin: 'rigelthompson'
                },
                {
                    id: 't2',
                    name: 'Lyra Chang',
                    role: 'Frontend Engineer',
                    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
                    branch: 'Computer Science',
                    year: 'Second Year',
                    github: 'lyrachang',
                    linkedin: 'lyrachang'
                },
                {
                    id: 't3',
                    name: 'Altair Patel',
                    role: 'Backend Engineer',
                    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
                    branch: 'Computer Science',
                    year: 'Third Year',
                    github: 'altairpatel',
                    linkedin: 'altairpatel'
                },
                {
                    id: 't4',
                    name: 'Vela Rodriguez',
                    role: 'DevOps Engineer',
                    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
                    branch: 'IT',
                    year: 'Third Year',
                    github: 'velarodriguez',
                    linkedin: 'velarodriguez'
                },
                {
                    id: 't5',
                    name: 'Carina Lee',
                    role: 'Quality Assurance',
                    image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=400',
                    branch: 'Computer Science',
                    year: 'Second Year',
                    github: 'carinalee'
                }
            ]
        },
        {
            id: 'graphics-team',
            title: 'Graphics Team',
            icon: <Palette size={24} />,
            gradient: 'from-pink-500/20 via-purple-500/20 to-indigo-500/20',
            color: 'text-pink-400',
            description: 'Painting the cosmos with creativity and imagination',
            members: [
                {
                    id: 'g1',
                    name: 'Nebula Davis',
                    role: 'Creative Director',
                    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=400',
                    branch: 'Design',
                    year: 'Final Year',
                    linkedin: 'nebuladavis'
                },
                {
                    id: 'g2',
                    name: 'Aurora Wilson',
                    role: 'UI/UX Designer',
                    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
                    branch: 'Design',
                    year: 'Third Year',
                    linkedin: 'aurorawilson'
                },
                {
                    id: 'g3',
                    name: 'Cosmos Brown',
                    role: '3D Artist',
                    image: 'https://images.unsplash.com/photo-1522075469751-3a3694c60e9e?auto=format&fit=crop&q=80&w=400',
                    branch: 'Animation',
                    year: 'Third Year',
                    linkedin: 'cosmosbrown'
                },
                {
                    id: 'g4',
                    name: 'Galaxy Taylor',
                    role: 'Motion Designer',
                    image: 'https://images.unsplash.com/photo-1563237023-b1e97052961a?auto=format&fit=crop&q=80&w=400',
                    branch: 'Media Arts',
                    year: 'Second Year',
                    linkedin: 'galaxytaylor'
                },
                {
                    id: 'g5',
                    name: 'Stellar Garcia',
                    role: 'Graphic Designer',
                    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=400',
                    branch: 'Design',
                    year: 'Second Year',
                    linkedin: 'stellargarcia'
                }
            ]
        },
        {
            id: 'pr-team',
            title: 'PR Team',
            icon: <Megaphone size={24} />,
            gradient: 'from-orange-500/20 via-red-500/20 to-pink-500/20',
            color: 'text-orange-400',
            description: 'Amplifying our voice across the universe',
            members: [
                {
                    id: 'pr1',
                    name: 'Solstice White',
                    role: 'PR Manager',
                    image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=400',
                    branch: 'Marketing',
                    year: 'Final Year',
                    linkedin: 'solsticewhite',
                    email: 'solstice@comet.space'
                },
                {
                    id: 'pr2',
                    name: 'Eclipse Moore',
                    role: 'Social Media Lead',
                    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=400',
                    branch: 'Communications',
                    year: 'Third Year',
                    linkedin: 'eclipsemoore'
                },
                {
                    id: 'pr3',
                    name: 'Zenith Adams',
                    role: 'Content Writer',
                    image: 'https://images.unsplash.com/photo-1595182903333-615dfcf8f2b3?auto=format&fit=crop&q=80&w=400',
                    branch: 'Journalism',
                    year: 'Second Year',
                    linkedin: 'zenithadams'
                },
                {
                    id: 'pr4',
                    name: 'Horizon Clark',
                    role: 'Community Manager',
                    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=400',
                    branch: 'Marketing',
                    year: 'Third Year',
                    linkedin: 'horizonclark'
                },
                {
                    id: 'pr5',
                    name: 'Meteor Jones',
                    role: 'Event Coordinator',
                    image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&q=80&w=400',
                    branch: 'Event Management',
                    year: 'Second Year',
                    linkedin: 'meteorjones'
                }
            ]
        }
    ];

    const scrollCarousel = (sectionId: string, direction: 'left' | 'right') => {
        const container = document.getElementById(`carousel-${sectionId}`);
        if (container) {
            const isFounders = sectionId === 'founders';
            const scrollAmount = isFounders ? 400 : 300;
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

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
                className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 text-white royal-font"
            >
                <ChevronLeft size={20} />
                <span className="text-sm font-medium tracking-wider">BACK</span>
            </button>

            {/* Top Center Title */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3">
                <Sparkles className="text-yellow-400 animate-pulse" size={24} />
                <h1 className="text-3xl font-bold text-white tracking-widest royal-font">
                    MEET THE TEAM
                </h1>
                <Sparkles className="text-cyan-400 animate-pulse" size={24} />
            </div>

            {/* Main Scrollable Content */}
            <div className="relative z-10 w-full h-full pt-24 pb-8 overflow-y-auto custom-scrollbar">
                <div className="w-full max-w-7xl mx-auto px-8 space-y-10">
                    {teamSections.map((section) => {
                        const isFounders = section.id === 'founders';
                        const cardWidth = isFounders ? 'w-96' : 'w-72';
                        const imageSize = isFounders ? 'w-64 h-64' : 'w-40 h-40';
                        const nameSize = isFounders ? 'text-4xl' : 'text-xl';
                        const roleSize = isFounders ? 'text-sm' : 'text-xs';

                        return (
                            <div key={section.id} className="space-y-4">
                                {/* Compact Section Header */}
                                <div className={`inline-flex items-center gap-3 bg-gradient-to-r ${section.gradient} backdrop-blur-md border border-white/20 rounded-full px-6 py-3`}>
                                    <div className={`${section.color} flex-shrink-0`}>
                                        {section.icon}
                                    </div>
                                    <h2 className="text-2xl font-bold text-white tracking-widest royal-font">
                                        {section.title.toUpperCase()}
                                    </h2>
                                    <div className="flex items-center gap-2 ml-2 pl-2 border-l border-white/30">
                                        <div className="text-lg font-bold text-white royal-font">{section.members.length}</div>
                                        <div className="text-xs text-gray-300 uppercase tracking-wider">Members</div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-300 text-sm max-w-2xl font-light leading-relaxed pl-2">
                                    {section.description}
                                </p>

                                {/* Carousel with Navigation */}
                                <div className="relative group">
                                    {/* Left Button */}
                                    <button
                                        onClick={() => scrollCarousel(section.id, 'left')}
                                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100"
                                    >
                                        <ChevronLeft size={24} className="text-white" />
                                    </button>

                                    {/* Scrollable Container */}
                                    <div
                                        id={`carousel-${section.id}`}
                                        className="overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
                                        style={{ scrollPaddingLeft: '8px' }}
                                    >
                                        <div className="flex gap-6 px-2">
                                            {section.members.map((member) => (
                                                <div
                                                    key={member.id}
                                                    className={`group/card relative flex-shrink-0 ${cardWidth} snap-start`}
                                                    onMouseEnter={() => setHoveredMember(member.id)}
                                                    onMouseLeave={() => setHoveredMember(null)}
                                                >
                                                    {/* Card Glow Effect */}
                                                    {hoveredMember === member.id && (
                                                        <div className={`absolute -inset-1 bg-gradient-to-r ${section.gradient} rounded-2xl blur-lg opacity-75 animate-pulse`} />
                                                    )}

                                                    {/* Square Member Card */}
                                                    <div className={`relative bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300 aspect-square flex flex-col items-center justify-between ${hoveredMember === member.id ? 'border-white/40' : ''
                                                        }`}>
                                                        {/* Large Photo */}
                                                        <div className="flex justify-center mb-4">
                                                            <div className="relative">
                                                                <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} rounded-3xl blur-xl opacity-60`} />
                                                                <div className={`relative ${imageSize} rounded-3xl bg-gradient-to-br ${section.gradient} p-1.5`}>
                                                                    {member.image.startsWith('http') ? (
                                                                        <img
                                                                            src={member.image}
                                                                            alt={member.name}
                                                                            className="w-full h-full rounded-3xl object-cover"
                                                                        />
                                                                    ) : (
                                                                        <div className="w-full h-full rounded-3xl bg-[#0a0a1f] flex items-center justify-center text-7xl">
                                                                            {member.image}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {hoveredMember === member.id && (
                                                                    <div className="absolute -top-2 -right-2">
                                                                        <Star size={24} className={`${section.color} animate-spin`} style={{ animationDuration: '3s' }} />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Minimal Details */}
                                                        <div className="text-center space-y-1 flex-1 flex flex-col justify-center">
                                                            <h4 className={`${nameSize} font-bold text-white royal-font tracking-wide`}>
                                                                {member.name}
                                                            </h4>
                                                            <p className={`${roleSize} text-gray-400 uppercase tracking-wider`}>
                                                                {member.branch}
                                                            </p>
                                                            <p className="text-xs text-gray-500 tracking-wide">
                                                                {member.year}
                                                            </p>
                                                        </div>

                                                        {/* Social Links */}
                                                        <div className="flex items-center justify-center gap-2 pt-4">
                                                            {member.linkedin && (
                                                                <a
                                                                    href={`https://linkedin.com/in/${member.linkedin}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-lg transition-all duration-300"
                                                                >
                                                                    <Linkedin size={18} className="text-blue-400" />
                                                                </a>
                                                            )}
                                                            {member.github && (
                                                                <a
                                                                    href={`https://github.com/${member.github}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-300"
                                                                >
                                                                    <Github size={18} className="text-white" />
                                                                </a>
                                                            )}
                                                            {member.email && (
                                                                <a
                                                                    href={`mailto:${member.email}`}
                                                                    className="p-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 rounded-lg transition-all duration-300"
                                                                >
                                                                    <Mail size={18} className="text-purple-400" />
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right Button */}
                                    <button
                                        onClick={() => scrollCarousel(section.id, 'right')}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100"
                                    >
                                        <ChevronRight size={24} className="text-white" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer Sections */}
                <div className="max-w-7xl mx-auto px-8 pb-20 space-y-8">
                    {/* Join Us Section */}
                    <div className="relative overflow-hidden rounded-3xl border border-white/20 p-8 bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-md">
                        <div className="absolute inset-0 bg-grid-white/[0.05]" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="space-y-2 text-center md:text-left">
                                <h2 className="text-3xl font-bold text-white royal-font tracking-wide">
                                    JOIN THE CREW
                                </h2>
                                <p className="text-gray-300 max-w-xl">
                                    Ready to explore the universe with us? We're always looking for passionate
                                    astronauts to join our mission.
                                </p>
                            </div>
                            <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform duration-300 royal-font tracking-wide">
                                APPLY NOW
                            </button>
                        </div>
                    </div>

                    {/* Contact Us Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors">
                            <Mail className="text-cyan-400 mb-4" size={32} />
                            <h3 className="text-xl font-bold text-white royal-font mb-2">EMAIL US</h3>
                            <p className="text-gray-400 text-sm">hello@comet.space</p>
                        </div>
                        <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors">
                            <Linkedin className="text-blue-400 mb-4" size={32} />
                            <h3 className="text-xl font-bold text-white royal-font mb-2">LINKEDIN</h3>
                            <p className="text-gray-400 text-sm">Connect with our professional network</p>
                        </div>
                        <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors">
                            <Github className="text-purple-400 mb-4" size={32} />
                            <h3 className="text-xl font-bold text-white royal-font mb-2">GITHUB</h3>
                            <p className="text-gray-400 text-sm">Explore our open source projects</p>
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

                /* Hide scrollbar for horizontal carousel */
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                .royal-font {
                    font-family: 'Coolvetica', 'Orbitron', sans-serif;
                }

                /* Snap scroll */
                .snap-x {
                    scroll-snap-type: x mandatory;
                }
                
                .snap-start {
                    scroll-snap-align: start;
                }
            `}</style>
        </div>
    );
};

export default Team;
