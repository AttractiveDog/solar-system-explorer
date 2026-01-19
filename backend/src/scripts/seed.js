import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import Club from '../models/Club.js';
import Event from '../models/Event.js';
import { Achievement } from '../models/Achievement.js';

dotenv.config();

// Sample data
const users = [
  {
    username: 'astronaut_alex',
    email: 'alex@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    bio: 'Passionate about space exploration and coding',
    stats: {
      rank: 'Pioneer',
      points: 1250,
      contributions: 45,
      projects: 12,
    },
    social: {
      github: 'https://github.com/alex',
      linkedin: 'https://linkedin.com/in/alex',
    },
  },
  {
    username: 'stellar_sarah',
    email: 'sarah@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    bio: 'UI/UX designer exploring the cosmos',
    stats: {
      rank: 'Navigator',
      points: 890,
      contributions: 32,
      projects: 8,
    },
    social: {
      github: 'https://github.com/sarah',
    },
  },
  {
    username: 'cosmic_chris',
    email: 'chris@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chris',
    bio: 'Data scientist mapping the universe',
    stats: {
      rank: 'Explorer',
      points: 650,
      contributions: 28,
      projects: 6,
    },
  },
];

const clubs = [
  {
    name: 'Code Constellation',
    description: 'Join us to explore the universe of programming and software development',
    icon: 'Code',
    color: '#6366f1',
    gradient: 'from-indigo-500 to-purple-600',
    category: 'development',
  },
  {
    name: 'Design Nebula',
    description: 'Creative minds shaping beautiful user experiences',
    icon: 'Palette',
    color: '#ec4899',
    gradient: 'from-pink-500 to-rose-600',
    category: 'design',
  },
  {
    name: 'Data Galaxy',
    description: 'Exploring insights through data science and analytics',
    icon: 'Database',
    color: '#10b981',
    gradient: 'from-emerald-500 to-teal-600',
    category: 'data',
  },
  {
    name: 'Business Orbit',
    description: 'Entrepreneurship and innovation in the digital age',
    icon: 'TrendingUp',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600',
    category: 'business',
  },
];

const achievements = [
  {
    title: 'First Steps',
    description: 'Created your first account',
    icon: 'rocket',
    category: 'milestone',
    rarity: 'common',
    points: 10,
  },
  {
    title: 'Social Butterfly',
    description: 'Join 5 different clubs',
    icon: 'users',
    category: 'participation',
    rarity: 'common',
    points: 25,
  },
  {
    title: 'Event Enthusiast',
    description: 'Attend 10 events',
    icon: 'calendar',
    category: 'participation',
    rarity: 'rare',
    points: 50,
  },
  {
    title: 'Code Master',
    description: 'Complete 20 coding projects',
    icon: 'code',
    category: 'skill',
    rarity: 'epic',
    points: 100,
  },
  {
    title: 'Team Leader',
    description: 'Create and lead a club',
    icon: 'award',
    category: 'leadership',
    rarity: 'rare',
    points: 75,
  },
  {
    title: 'Point Pioneer',
    description: 'Reach 1000 points',
    icon: 'star',
    category: 'milestone',
    rarity: 'epic',
    points: 150,
  },
  {
    title: 'Legendary Explorer',
    description: 'Reach Legend rank',
    icon: 'trophy',
    category: 'milestone',
    rarity: 'legendary',
    points: 500,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Club.deleteMany({});
    await Event.deleteMany({});
    await Achievement.deleteMany({});

    console.log('🌱 Seeding users...');
    const createdUsers = await User.insertMany(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    console.log('🌱 Seeding achievements...');
    const createdAchievements = await Achievement.insertMany(achievements);
    console.log(`✅ Created ${createdAchievements.length} achievements`);

    // Give first user some achievements
    await User.findByIdAndUpdate(createdUsers[0]._id, {
      $push: {
        achievements: {
          $each: [createdAchievements[0]._id, createdAchievements[1]._id],
        },
      },
    });

    console.log('🌱 Seeding clubs...');
    const clubsWithCreators = clubs.map((club, index) => ({
      ...club,
      createdBy: createdUsers[index % createdUsers.length]._id,
      members: [
        {
          user: createdUsers[index % createdUsers.length]._id,
          role: 'admin',
        },
      ],
    }));
    const createdClubs = await Club.insertMany(clubsWithCreators);
    console.log(`✅ Created ${createdClubs.length} clubs`);

    // Update users with clubs
    for (let i = 0; i < createdUsers.length; i++) {
      await User.findByIdAndUpdate(createdUsers[i]._id, {
        $push: { clubs: createdClubs[i % createdClubs.length]._id },
      });
    }

    console.log('🌱 Seeding events...');
    const events = [
      {
        title: 'Web Development Workshop',
        description: 'Learn modern web development with React and Node.js',
        club: createdClubs[0]._id,
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        time: '18:00',
        duration: 120,
        location: 'online',
        meetingLink: 'https://meet.example.com/web-dev',
        status: 'upcoming',
        participants: [createdUsers[0]._id, createdUsers[1]._id],
        maxParticipants: 50,
        tags: ['web', 'development', 'react', 'nodejs'],
        createdBy: createdUsers[0]._id,
      },
      {
        title: 'UI/UX Design Masterclass',
        description: 'Design beautiful and functional user interfaces',
        club: createdClubs[1]._id,
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        time: '15:00',
        duration: 90,
        location: 'hybrid',
        venue: 'Building A, Room 301',
        meetingLink: 'https://meet.example.com/design',
        status: 'upcoming',
        participants: [createdUsers[1]._id],
        maxParticipants: 30,
        tags: ['design', 'ui', 'ux', 'figma'],
        createdBy: createdUsers[1]._id,
      },
      {
        title: 'Data Science Hackathon',
        description: 'Analyze real-world datasets and build ML models',
        club: createdClubs[2]._id,
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        time: '09:00',
        duration: 480, // 8 hours
        location: 'offline',
        venue: 'Tech Hub, Innovation Lab',
        status: 'upcoming',
        participants: [createdUsers[0]._id, createdUsers[2]._id],
        maxParticipants: 40,
        tags: ['data', 'ml', 'hackathon', 'python'],
        createdBy: createdUsers[2]._id,
      },
      {
        title: 'Startup Pitch Night',
        description: 'Present your startup ideas to investors and mentors',
        club: createdClubs[3]._id,
        date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
        time: '19:00',
        duration: 180,
        location: 'offline',
        venue: 'Startup Incubator',
        status: 'upcoming',
        participants: [createdUsers[1]._id, createdUsers[2]._id],
        maxParticipants: 25,
        tags: ['business', 'startup', 'pitch', 'networking'],
        createdBy: createdUsers[0]._id,
      },
    ];
    const createdEvents = await Event.insertMany(events);
    console.log(`✅ Created ${createdEvents.length} events`);

    console.log('✨ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Users: ${createdUsers.length}`);
    console.log(`   Clubs: ${createdClubs.length}`);
    console.log(`   Events: ${createdEvents.length}`);
    console.log(`   Achievements: ${createdAchievements.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
