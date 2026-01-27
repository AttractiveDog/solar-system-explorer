
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Event from '../models/Event.js';
import Club from '../models/Club.js';
import User from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const debugEvents = async () => {
    await connectDB();

    try {
        console.log("Attempting to find events WITHOUT populate...");
        const eventsRaw = await Event.find({}).sort({ date: 1 });
        console.log("Raw events found:", eventsRaw.length);
        
        // Check for potential data issues
        eventsRaw.forEach((e, i) => {
             if (!Array.isArray(e.participants)) {
                 console.error(`Event ${e._id} has invalid participants:`, e.participants);
             }
        });

        console.log("Attempting to find events WITH populate...");
        const events = await Event.find({})
            .populate('club', 'name icon color')
            .populate('participants', 'username avatar')
            .populate('createdBy', 'username')
            .sort({ date: 1 });
        
        console.log("Events found:", events.length);
        // Try serialization manually
        console.log("Serializing first event...");
        console.log(JSON.stringify(events[0], null, 2));
    } catch (error) {
        console.error("FULL ERROR DETAILS:");
        console.error(error);
    } finally {
        await mongoose.disconnect();
    }
};

debugEvents();
