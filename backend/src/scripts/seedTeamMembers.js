import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import TeamMember from '../models/TeamMember.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Existing team data (from Team.tsx)
const teamData = [
    // Founders
    { name: 'Aarush Singh', role: 'Founder', category: 'founder', branch: 'Food Technology', year: 'Final Year', image: 'founder-1.jpg', order: 1 },
    { name: 'Mahim Gupta', role: 'Co-Founder', category: 'founder', branch: 'Computer Science Engineering', year: 'Final Year', image: 'founder-2.jpg', order: 2 },
    { name: 'Shashwat Shukla', role: 'Co-Founder', category: 'founder', branch: 'Food Technology', year: 'Final Year', image: 'founder-3.jpg', order: 3 },

    // Mentors
    { name: 'Mentor 1', role: 'Technical Mentor', category: 'mentor', branch: 'AI & ML', year: 'Faculty', image: 'mentor-1.jpg', order: 1 },
    { name: 'Mentor 2', role: 'Design Mentor', category: 'mentor', branch: 'Design', year: 'Faculty', image: 'mentor-2.jpg', order: 2 },
    { name: 'Mentor 3', role: 'Strategy Mentor', category: 'mentor', branch: 'Business', year: 'Faculty', image: 'mentor-3.jpg', order: 3 },

    // College Support
    { name: 'Mr Vipul Kumar', role: 'Faculty Coordinator', category: 'college-support', branch: 'Computer Science', year: 'Faculty', image: 'support-1.jpg', order: 1 },

    // Core Team
    { name: 'Rigel Thompson', role: 'Core Lead', category: 'core-team', branch: 'Computer Science', year: '3rd Year', image: 'core-1.jpg', order: 1 },
    { name: 'Lyra Chang', role: 'Core Developer', category: 'core-team', branch: 'IT', year: '3rd Year', image: 'core-2.jpg', order: 2 },
    { name: 'Altair Patel', role: 'Core Developer', category: 'core-team', branch: 'Computer Science', year: '2nd Year', image: 'core-3.jpg', order: 3 },

    // Graphics Team
    { name: 'Nebula Davis', role: 'Graphics Lead', category: 'graphics', branch: 'Design', year: '3rd Year', image: 'graphics-1.jpg', order: 1 },
    { name: 'Cosmos Brown', role: 'UI Designer', category: 'graphics', branch: 'Design', year: '2nd Year', image: 'graphics-2.jpg', order: 2 },
    { name: 'Aurora Wilson', role: 'Illustrator', category: 'graphics', branch: 'Design', year: '2nd Year', image: 'graphics-3.jpg', order: 3 },
    { name: 'Galaxy Taylor', role: 'Animator', category: 'graphics', branch: 'Design', year: '1st Year', image: 'graphics-4.jpg', order: 4 },

    // Management Team
    { name: 'Solstice White', role: 'Management Lead', category: 'management', branch: 'Business', year: '3rd Year', image: 'management-1.jpg', order: 1 },
    { name: 'Eclipse Moore', role: 'Operations Manager', category: 'management', branch: 'Management', year: '2nd Year', image: 'management-2.jpg', order: 2 },

    // Members - 1st Year
    { name: 'Aria Frost', role: 'Member', category: 'member', year: '1st Year', branch: 'Computer Science', image: 'member-year1-1.jpg', order: 1 },
    { name: 'Leo Spark', role: 'Member', category: 'member', year: '1st Year', branch: 'IT', image: 'member-year1-2.jpg', order: 2 },
    { name: 'Mira Sky', role: 'Member', category: 'member', year: '1st Year', branch: 'ECE', image: 'member-year1-3.jpg', order: 3 },

    // Members - 2nd Year
    { name: 'Kai Orbit', role: 'Member', category: 'member', year: '2nd Year', branch: 'Computer Science', image: 'member-year2-1.jpg', order: 1 },
    { name: 'Luna Vonn', role: 'Member', category: 'member', year: '2nd Year', branch: 'IT', image: 'member-year2-2.jpg', order: 2 },
    { name: 'Jett Starr', role: 'Member', category: 'member', year: '2nd Year', branch: 'ECE', image: 'member-year2-3.jpg', order: 3 },
    { name: 'Nova Reed', role: 'Member', category: 'member', year: '2nd Year', branch: 'CSE', image: 'member-year2-4.jpg', order: 4 },

    // Members - 3rd Year
    { name: 'Rex Comet', role: 'Member', category: 'member', year: '3rd Year', branch: 'Computer Science', image: 'member-year3-1.jpg', order: 1 },
    { name: 'Tess Ray', role: 'Member', category: 'member', year: '3rd Year', branch: 'IT', image: 'member-year3-2.jpg', order: 2 },
    { name: 'Zane Bolt', role: 'Member', category: 'member', year: '3rd Year', branch: 'ECE', image: 'member-year3-3.jpg', order: 3 },

    // Members - 4th Year
    { name: 'Vera Flux', role: 'Member', category: 'member', year: '4th Year', branch: 'Computer Science', image: 'member-year4-1.jpg', order: 1 },
    { name: 'Cade Void', role: 'Member', category: 'member', year: '4th Year', branch: 'IT', image: 'member-year4-2.jpg', order: 2 },
];

const seedTeamMembers = async () => {
    try {
        console.log('🌱 Starting team members seed script...');

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Copy images from frontend team-images to backend uploads
        const frontendImagesPath = path.join(__dirname, '../../../team-images');
        const backendImagesPath = path.join(__dirname, '../../uploads/team-images');

        console.log('📁 Copying images...');
        console.log('  From:', frontendImagesPath);
        console.log('  To:', backendImagesPath);

        if (fs.existsSync(frontendImagesPath)) {
            const files = fs.readdirSync(frontendImagesPath);
            let copiedCount = 0;

            files.forEach(file => {
                if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
                    const sourcePath = path.join(frontendImagesPath, file);
                    const destPath = path.join(backendImagesPath, file);

                    try {
                        fs.copyFileSync(sourcePath, destPath);
                        copiedCount++;
                    } catch (err) {
                        console.log(`  ⚠️  Could not copy ${file}:`, err.message);
                    }
                }
            });

            console.log(`✅ Copied ${copiedCount} image files`);
        } else {
            console.log('⚠️  Frontend images directory not found. Make sure images exist at:', frontendImagesPath);
        }

        // Clear existing team members
        await TeamMember.deleteMany({});
        console.log('🗑️  Cleared existing team members');

        // Insert team members
        const result = await TeamMember.insertMany(teamData);
        console.log(`✅ Seeded ${result.length} team members`);

        // Show summary
        const categories = await TeamMember.aggregate([
            { $match: { isActive: true } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        console.log('\n📊 Team Members Summary:');
        categories.forEach(cat => {
            console.log(`  ${cat._id}: ${cat.count} members`);
        });

        console.log('\n✅ Seed script completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding team members:', error);
        process.exit(1);
    }
};

// Run the seed script
seedTeamMembers();
