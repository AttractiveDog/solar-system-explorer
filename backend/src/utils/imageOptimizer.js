import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

/**
 * Optimize and resize uploaded image
 * @param {string} filePath - Path to the uploaded file
 * @param {Object} options - Optimization options
 * @returns {Promise<string>} - Path to optimized file
 */
export const optimizeImage = async (filePath, options = {}) => {
    const {
        maxWidth = 800,
        maxHeight = 800,
        quality = 85,
        format = 'webp', // Convert to WebP for better compression
    } = options;

    try {
        const parsedPath = path.parse(filePath);
        const optimizedFileName = `${parsedPath.name}-optimized.${format}`;
        const optimizedFilePath = path.join(parsedPath.dir, optimizedFileName);

        // Process image with sharp
        await sharp(filePath)
            .resize(maxWidth, maxHeight, {
                fit: 'inside', // Maintain aspect ratio
                withoutEnlargement: true, // Don't upscale small images
            })
            .toFormat(format, {
                quality,
            })
            .toFile(optimizedFilePath);

        // Delete original file
        await fs.unlink(filePath);

        return optimizedFileName;
    } catch (error) {
        console.error('Image optimization error:', error);
        // If optimization fails, return original filename
        return path.basename(filePath);
    }
};

/**
 * Create thumbnail from image
 * @param {string} filePath - Path to the image file
 * @param {number} size - Thumbnail size (width/height)
 * @returns {Promise<string>} - Path to thumbnail
 */
export const createThumbnail = async (filePath, size = 150) => {
    try {
        const parsedPath = path.parse(filePath);
        const thumbnailFileName = `${parsedPath.name}-thumb.webp`;
        const thumbnailFilePath = path.join(parsedPath.dir, thumbnailFileName);

        await sharp(filePath)
            .resize(size, size, {
                fit: 'cover', // Crop to square
                position: 'center',
            })
            .toFormat('webp', {
                quality: 80,
            })
            .toFile(thumbnailFilePath);

        return thumbnailFileName;
    } catch (error) {
        console.error('Thumbnail creation error:', error);
        return null;
    }
};

/**
 * Get image metadata
 * @param {string} filePath - Path to the image file
 * @returns {Promise<Object>} - Image metadata
 */
export const getImageMetadata = async (filePath) => {
    try {
        const metadata = await sharp(filePath).metadata();
        return {
            width: metadata.width,
            height: metadata.height,
            format: metadata.format,
            size: metadata.size,
            hasAlpha: metadata.hasAlpha,
        };
    } catch (error) {
        console.error('Get metadata error:', error);
        return null;
    }
};
