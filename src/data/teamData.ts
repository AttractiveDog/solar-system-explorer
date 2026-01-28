// Team Data Structure for Comet Community

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
    bio?: string;
    linkedin?: string;
    github?: string;
    email?: string;
}

export interface TeamData {
    founders: TeamMember[];
    collegeSupport: TeamMember[];
    cometTeam: {
        website: TeamMember[];
        events: {
            year1: TeamMember[];
            year2: TeamMember[];
            year3: TeamMember[];
            year4: TeamMember[];
        };
        members: {
            codex: TeamMember[];
            cubex: TeamMember[];
        };
    };
}

export const teamData: TeamData = {
    // SECTION 1: THE ORIGIN - FOUNDERS
    founders: [
        {
            id: 'f1',
            name: 'Alex Stellar',
            role: 'Co-Founder & Visionary',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
            bio: 'Pioneering the future of college tech communities',
            linkedin: 'alexstellar',
            github: 'alexstellar',
            email: 'alex@comet.space'
        },
        {
            id: 'f2',
            name: 'Nova Chen',
            role: 'Co-Founder & Chief Architect',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
            bio: 'Building the technological backbone of tomorrow',
            linkedin: 'novachen',
            github: 'novachen',
            email: 'nova@comet.space'
        },
        {
            id: 'f3',
            name: 'Orion Blake',
            role: 'Co-Founder & Strategy Lead',
            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
            bio: 'Orchestrating our mission across the cosmos',
            linkedin: 'orionblake',
            github: 'orionblake',
            email: 'orion@comet.space'
        }
    ],

    // SECTION 3: COLLEGE SUPPORT
    collegeSupport: [
        {
            id: 'cs1',
            name: 'Dr. Vega Anderson',
            role: 'Dean of Student Affairs',
            image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400',
            bio: 'Championing student innovation and excellence',
            email: 'vega@college.edu'
        },
        {
            id: 'cs2',
            name: 'Prof. Atlas Storm',
            role: 'Faculty Advisor',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
            bio: 'Guiding the next generation of tech leaders',
            email: 'atlas@college.edu'
        },
        {
            id: 'cs3',
            name: 'Dr. Cassiopeia Ray',
            role: 'Head of Department - CS',
            image: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=400',
            bio: 'Fostering academic excellence in technology',
            email: 'cassiopeia@college.edu'
        }
    ],

    // SECTION 2: THE COMET TEAM
    cometTeam: {
        // TAB A: WEBSITE TEAM
        website: [
            {
                id: 'w1',
                name: 'Rigel Thompson',
                role: 'Lead Developer',
                image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
                github: 'rigelthompson',
                linkedin: 'rigelthompson'
            },
            {
                id: 'w2',
                name: 'Lyra Chang',
                role: 'Frontend Engineer',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
                github: 'lyrachang',
                linkedin: 'lyrachang'
            },
            {
                id: 'w3',
                name: 'Altair Patel',
                role: 'Backend Engineer',
                image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
                github: 'altairpatel',
                linkedin: 'altairpatel'
            },
            {
                id: 'w4',
                name: 'Aurora Wilson',
                role: 'UI/UX Designer',
                image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
                linkedin: 'aurorawilson'
            },
            {
                id: 'w5',
                name: 'Cosmos Brown',
                role: 'DevOps Engineer',
                image: 'https://images.unsplash.com/photo-1522075469751-3a3694c60e9e?auto=format&fit=crop&q=80&w=400',
                github: 'cosmosbrown'
            },
            {
                id: 'w6',
                name: 'Galaxy Taylor',
                role: 'QA Engineer',
                image: 'https://images.unsplash.com/photo-1563237023-b1e97052961a?auto=format&fit=crop&q=80&w=400',
                linkedin: 'galaxytaylor'
            }
        ],

        // TAB B: EVENT TEAM (Organized by Year)
        events: {
            year1: [
                {
                    id: 'e1y1',
                    name: 'Meteor Jones',
                    role: 'Event Coordinator',
                    image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&q=80&w=400',
                    linkedin: 'meteorjones'
                },
                {
                    id: 'e1y2',
                    name: 'Comet Davis',
                    role: 'Logistics Assistant',
                    image: 'https://images.unsplash.com/photo-1595182903333-615dfcf8f2b3?auto=format&fit=crop&q=80&w=400',
                    linkedin: 'cometdavis'
                },
                {
                    id: 'e1y3',
                    name: 'Star Miller',
                    role: 'Volunteer Coordinator',
                    image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=400',
                    linkedin: 'starmiller'
                }
            ],
            year2: [
                {
                    id: 'e2y1',
                    name: 'Zenith Adams',
                    role: 'Content Manager',
                    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=400',
                    linkedin: 'zenithadams'
                },
                {
                    id: 'e2y2',
                    name: 'Horizon Clark',
                    role: 'Social Media Lead',
                    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=400',
                    linkedin: 'horizonclark'
                },
                {
                    id: 'e2y3',
                    name: 'Luna Martinez',
                    role: 'Sponsorship Coordinator',
                    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=400',
                    linkedin: 'lunamartinez'
                }
            ],
            year3: [
                {
                    id: 'e3y1',
                    name: 'Solstice White',
                    role: 'Event Manager',
                    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=400',
                    linkedin: 'solsticewhite',
                    email: 'solstice@comet.space'
                },
                {
                    id: 'e3y2',
                    name: 'Eclipse Moore',
                    role: 'Marketing Head',
                    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400',
                    linkedin: 'eclipsemoore'
                },
                {
                    id: 'e3y3',
                    name: 'Phoenix Lee',
                    role: 'Partnership Lead',
                    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
                    linkedin: 'phoenixlee'
                }
            ],
            year4: [
                {
                    id: 'e4y1',
                    name: 'Nebula Davis',
                    role: 'Senior Event Director',
                    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=400',
                    linkedin: 'nebuladavis'
                },
                {
                    id: 'e4y2',
                    name: 'Stellar Garcia',
                    role: 'Operations Head',
                    image: 'https://images.unsplash.com/photo-1590086782792-42dd2350140d?auto=format&fit=crop&q=80&w=400',
                    linkedin: 'stellargarcia'
                }
            ]
        },

        // TAB C: CLUB MEMBERS (Organized by Domain)
        members: {
            codex: [
                {
                    id: 'cd1',
                    name: 'Quantum Rivera',
                    role: 'C/ODEX Lead',
                    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
                    github: 'quantumrivera',
                    linkedin: 'quantumrivera'
                },
                {
                    id: 'cd2',
                    name: 'Binary Johnson',
                    role: 'AI/ML Specialist',
                    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
                    github: 'binaryjohnson'
                },
                {
                    id: 'cd3',
                    name: 'Cipher Smith',
                    role: 'Cybersecurity Expert',
                    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400',
                    github: 'ciphersmith'
                },
                {
                    id: 'cd4',
                    name: 'Algorithm Williams',
                    role: 'Data Scientist',
                    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
                    github: 'algorithmwilliams'
                },
                {
                    id: 'cd5',
                    name: 'Cache Anderson',
                    role: 'Full Stack Developer',
                    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
                    github: 'cacheanderson'
                }
            ],
            cubex: [
                {
                    id: 'cb1',
                    name: 'Venture Thomas',
                    role: 'CUBEX Director',
                    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
                    linkedin: 'venturethomas'
                },
                {
                    id: 'cb2',
                    name: 'Startup Jackson',
                    role: 'Business Strategist',
                    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=400',
                    linkedin: 'startupjackson'
                },
                {
                    id: 'cb3',
                    name: 'Equity Martin',
                    role: 'Finance Lead',
                    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
                    linkedin: 'equitymartin'
                },
                {
                    id: 'cb4',
                    name: 'Market Thompson',
                    role: 'Marketing Director',
                    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
                    linkedin: 'marketthompson'
                },
                {
                    id: 'cb5',
                    name: 'Growth Wilson',
                    role: 'Growth Hacker',
                    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
                    linkedin: 'growthwilson'
                },
                {
                    id: 'cb6',
                    name: 'Revenue Brown',
                    role: 'Sales Manager',
                    image: 'https://images.unsplash.com/photo-1522075469751-3a3694c60e9e?auto=format&fit=crop&q=80&w=400',
                    linkedin: 'revenuebrown'
                }
            ]
        }
    }
};
