/**
 * TEAM IMAGES CONFIGURATION
 * 
 * This file centralizes all team member image paths for easy management.
 * To update a member's image:
 * 1. Add the new image to /team-images/ folder
 * 2. Update the filename in the corresponding IMAGE_PATHS constant below
 * 3. Use consistent naming: member-{id}.jpg (e.g., founder-1.jpg, founder-2.jpg)
 * 
 * Supported formats: .jpg, .jpeg, .png, .webp
 */

// Base path for all team images
export const TEAM_IMAGES_BASE = '/team-images';

/**
 * Helper function to get the full image path
 * Usage: getImagePath('founder-1.jpg')
 */
export const getImagePath = (filename: string): string => {
    if (!filename) return '';
    return `${TEAM_IMAGES_BASE}/${filename}`;
};

/**
 * FOUNDERS IMAGE PATHS
 * Format: founder-{number}.jpg
 */
export const FOUNDER_IMAGES = {
    founder1: 'founder-1.jpg',      // Aarush Singh
    founder2: 'founder-2.jpg',      // Mahim Gupta
    founder3: 'founder-3.jpg',      // Shashwat Shukla
};

/**
 * MENTORS IMAGE PATHS
 * Format: mentor-{number}.jpg
 */
export const MENTOR_IMAGES = {
    mentor1: 'mentor-1.jpg',        // Mentor 1
    mentor2: 'mentor-2.jpg',        // Mentor 2
    mentor3: 'mentor-3.jpg',        // Mentor 3
};

/**
 * COLLEGE SUPPORT IMAGE PATHS
 * Format: support-{number}.jpg
 */
export const SUPPORT_IMAGES = {
    support1: 'support-1.jpg',      // Mr Vipul Kumar
};

/**
 * CORE TEAM IMAGE PATHS
 * Format: core-{number}.jpg
 */
export const CORE_TEAM_IMAGES = {
    core1: 'core-1.jpg',            // Rigel Thompson
    core2: 'core-2.jpg',            // Lyra Chang
    core3: 'core-3.jpg',            // Altair Patel
};

/**
 * GRAPHICS TEAM IMAGE PATHS
 * Format: graphics-{number}.jpg
 */
export const GRAPHICS_TEAM_IMAGES = {
    graphics1: 'graphics-1.jpg',    // Nebula Davis
    graphics2: 'graphics-2.jpg',    // Cosmos Brown
    graphics3: 'graphics-3.jpg',    // Aurora Wilson
    graphics4: 'graphics-4.jpg',    // Galaxy Taylor
};

/**
 * MANAGEMENT TEAM IMAGE PATHS
 * Format: management-{number}.jpg
 */
export const MANAGEMENT_TEAM_IMAGES = {
    management1: 'management-1.jpg', // Solstice White
    management2: 'management-2.jpg', // Eclipse Moore
};

/**
 * MEMBERS IMAGE PATHS (by year)
 * Format: member-year{year}-{number}.jpg
 */
export const MEMBER_IMAGES = {
    // 1st Year
    year1_1: 'member-year1-1.jpg',  // Aria Frost
    year1_2: 'member-year1-2.jpg',  // Leo Spark
    year1_3: 'member-year1-3.jpg',  // Mira Sky

    // 2nd Year
    year2_1: 'member-year2-1.jpg',  // Kai Orbit
    year2_2: 'member-year2-2.jpg',  // Luna Vonn
    year2_3: 'member-year2-3.jpg',  // Jett Starr
    year2_4: 'member-year2-4.jpg',  // Nova Reed

    // 3rd Year
    year3_1: 'member-year3-1.jpg',  // Rex Comet
    year3_2: 'member-year3-2.jpg',  // Tess Ray
    year3_3: 'member-year3-3.jpg',  // Zane Bolt

    // 4th Year
    year4_1: 'member-year4-1.jpg',  // Vera Flux
    year4_2: 'member-year4-2.jpg',  // Cade Void
};

/**
 * DEFAULT PLACEHOLDER IMAGE
 * Used when no image is specified or image fails to load
 */
export const DEFAULT_PLACEHOLDER = 'placeholder.jpg';

/**
 * Get image with fallback to placeholder
 */
export const getImageWithFallback = (filename: string): string => {
    return getImagePath(filename || DEFAULT_PLACEHOLDER);
};
