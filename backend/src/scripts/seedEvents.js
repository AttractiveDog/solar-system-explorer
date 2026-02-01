import mongoose from 'mongoose';
import Event from '../models/Event.js';
import Club from '../models/Club.js';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const seedEvents = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('📡 Connected to MongoDB');

        // Get a club and user to associate with events
        const club = await Club.findOne();
        const user = await User.findOne();

        if (!club || !user) {
            console.log('⚠️  Please ensure you have at least one club and one user in the database');
            process.exit(1);
        }

        console.log(`Using club: ${club.name} and user: ${user.username}`);

        // Clear existing events (optional - comment out if you want to keep existing events)
        // await Event.deleteMany({});
        // console.log('🗑️  Cleared existing events');

        // Sample events with different categories and types
        const sampleEvents = [
            {
                title: 'Intergalactic Startathon 2026',
                description: 'Kickoff of the largest galactic innovation hackathon. Teams from all sectors competing to solve deep-space colonization challenges.',
                club: club._id,
                date: new Date('2026-02-04T10:00:00'),
                time: '10:00 AM',
                duration: 480,
                location: 'offline',
                venue: 'Space Station Alpha',
                status: 'upcoming',
                category: 'mission',
                type: 'major',
                tags: ['hackathon', 'innovation', 'competition'],
                createdBy: user._id,
                maxParticipants: 100,
            },
            {
                title: 'AI/ML Workshop: Neural Networks Basics',
                description: 'Learn the fundamentals of neural networks and deep learning. Hands-on session with Python and TensorFlow.',
                club: club._id,
                date: new Date('2026-02-10T14:00:00'),
                time: '2:00 PM',
                duration: 120,
                location: 'online',
                meetingLink: 'https://meet.example.com/ai-workshop',
                status: 'upcoming',
                category: 'discovery',
                type: 'micro',
                tags: ['AI', 'machine learning', 'workshop', 'neural networks'],
                createdBy: user._id,
                maxParticipants: 50,
            },
            {
                title: 'Code Review Session',
                description: 'Weekly code review session. Share your projects and get feedback from peers.',
                club: club._id,
                date: new Date('2026-02-08T16:00:00'),
                time: '4:00 PM',
                duration: 60,
                location: 'online',
                meetingLink: 'https://meet.example.com/code-review',
                status: 'upcoming',
                category: 'system',
                type: 'micro',
                tags: ['code review', 'feedback', 'learning'],
                createdBy: user._id,
                maxParticipants: 20,
            },
            {
                title: 'Urgent: Server Maintenance Alert',
                description: 'Critical server maintenance scheduled. All services will be temporarily unavailable.',
                club: club._id,
                date: new Date('2026-02-05T23:00:00'),
                time: '11:00 PM',
                duration: 180,
                location: 'online',
                status: 'upcoming',
                category: 'alert',
                type: 'micro',
                tags: ['maintenance', 'alert', 'urgent'],
                createdBy: user._id,
            },
            {
                title: 'Cosmic Code Quest 2026',
                description: 'Annual coding competition featuring algorithmic challenges inspired by space exploration. Prizes for top performers!',
                club: club._id,
                date: new Date('2026-02-20T09:00:00'),
                time: '9:00 AM',
                duration: 300,
                location: 'hybrid',
                venue: 'Innovation Hub',
                meetingLink: 'https://meet.example.com/code-quest',
                status: 'upcoming',
                category: 'mission',
                type: 'major',
                tags: ['competition', 'coding', 'algorithms'],
                createdBy: user._id,
                maxParticipants: 200,
            },
            {
                title: 'Project Showcase: Student Innovations',
                description: 'Showcase your semester projects! Celebrate achievements and share your innovative solutions with the community.',
                club: club._id,
                date: new Date('2026-02-25T15:00:00'),
                time: '3:00 PM',
                duration: 180,
                location: 'offline',
                venue: 'Auditorium Hall',
                status: 'upcoming',
                category: 'achievement',
                type: 'major',
                tags: ['showcase', 'projects', 'innovation', 'achievement'],
                createdBy: user._id,
                maxParticipants: 150,
            },
            {
                title: 'Quantum Computing Discovery Talk',
                description: 'Explore the fascinating world of quantum computing. Guest lecture by industry expert.',
                club: club._id,
                date: new Date('2026-03-05T17:00:00'),
                time: '5:00 PM',
                duration: 90,
                location: 'online',
                meetingLink: 'https://meet.example.com/quantum-talk',
                status: 'upcoming',
                category: 'discovery',
                type: 'micro',
                tags: ['quantum computing', 'lecture', 'science'],
                createdBy: user._id,
                maxParticipants: 75,
            },
            {
                title: 'Database Migration Notice',
                description: 'System notification: Database migration to new infrastructure. Please backup your data.',
                club: club._id,
                date: new Date('2026-03-01T02:00:00'),
                time: '2:00 AM',
                duration: 240,
                location: 'online',
                status: 'upcoming',
                category: 'system',
                type: 'micro',
                tags: ['system', 'database', 'migration'],
                createdBy: user._id,
            },
            {
                title: 'Security Breach Alert - Immediate Action Required',
                description: 'Critical security alert! Potential vulnerability detected. All members must update their credentials.',
                club: club._id,
                date: new Date('2026-02-03T10:00:00'),
                time: '10:00 AM',
                duration: 30,
                location: 'online',
                status: 'upcoming',
                category: 'alert',
                type: 'micro',
                tags: ['security', 'alert', 'critical', 'urgent'],
                createdBy: user._id,
            },
            {
                title: 'Web Development Bootcamp',
                description: 'Intensive 2-day bootcamp covering modern web development. HTML, CSS, JavaScript, React, and Node.js.',
                club: club._id,
                date: new Date('2026-03-15T09:00:00'),
                time: '9:00 AM',
                duration: 960,
                location: 'hybrid',
                venue: 'Tech Campus - Lab 3',
                meetingLink: 'https://meet.example.com/web-bootcamp',
                status: 'upcoming',
                category: 'mission',
                type: 'major',
                tags: ['bootcamp', 'web development', 'full stack'],
                createdBy: user._id,
                maxParticipants: 40,
            },
            {
                title: 'Year-End Achievements Gala',
                description: 'Celebrate the year\'s accomplishments! Awards ceremony, networking, and recognition of outstanding contributions.',
                club: club._id,
                date: new Date('2026-12-15T18:00:00'),
                time: '6:00 PM',
                duration: 240,
                location: 'offline',
                venue: 'Grand Hall',
                status: 'upcoming',
                category: 'achievement',
                type: 'major',
                tags: ['awards', 'celebration', 'networking', 'gala'],
                createdBy: user._id,
                maxParticipants: 300,
            },
            {
                title: 'Blockchain Fundamentals Workshop',
                description: 'Discover the technology behind cryptocurrencies. Learn about blockchain, smart contracts, and decentralized apps.',
                club: club._id,
                date: new Date('2026-03-20T16:00:00'),
                time: '4:00 PM',
                duration: 150,
                location: 'online',
                meetingLink: 'https://meet.example.com/blockchain',
                status: 'upcoming',
                category: 'discovery',
                type: 'major',
                tags: ['blockchain', 'cryptocurrency', 'smart contracts', 'discovery'],
                createdBy: user._id,
                maxParticipants: 60,
            }
        ];

        // Insert events
        const createdEvents = await Event.insertMany(sampleEvents);
        console.log(`✅ Created ${createdEvents.length} sample events`);

        // Display created events by category
        for (const category of ['discovery', 'mission', 'alert', 'system', 'achievement']) {
            const count = createdEvents.filter(e => e.category === category).length;
            console.log(`   - ${category}: ${count} events`);
        }

        // Display created events by type
        console.log('\nEvents by type:');
        for (const type of ['major', 'micro']) {
            const count = createdEvents.filter(e => e.type === type).length;
            console.log(`   - ${type}: ${count} events`);
        }

        console.log('\n🎉 Event seeding completed successfully!');
        console.log('\nYou can now test the following API endpoints:');
        console.log('  - GET /api/v1/events');
        console.log('  - GET /api/v1/events?category=mission');
        console.log('  - GET /api/v1/events?type=major');
        console.log('  - GET /api/v1/events?category=discovery&type=micro');
        console.log('  - GET /api/v1/events/categories');
        console.log('  - GET /api/v1/events/types');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding events:', error);
        process.exit(1);
    }
};

seedEvents();
