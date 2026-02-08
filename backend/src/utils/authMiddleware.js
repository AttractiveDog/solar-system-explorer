import Admin from '../models/Admin.js';
import { extractToken, verifyToken } from './jwtUtils.js';

// JWT-based admin authentication middleware
export const adminAuth = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;
        const token = extractToken(authHeader);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No authentication token provided',
            });
        }

        // Verify token
        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token',
            });
        }

        // Find admin by ID from token
        const admin = await Admin.findById(decoded.id);

        if (!admin || !admin.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Admin account not found or inactive',
            });
        }

        // Attach admin to request
        req.admin = {
            id: admin._id,
            username: admin.username,
            email: admin.email,
            role: admin.role,
        };

        next();
    } catch (error) {
        console.error('Admin auth error:', error);
        res.status(500).json({
            success: false,
            message: 'Authentication error',
            error: error.message,
        });
    }
};
