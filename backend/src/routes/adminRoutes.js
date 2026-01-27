import express from 'express';
import {
  adminLogin,
  getDashboardStats,
  getAllUsersAdmin,
  getAllClubsAdmin,
  getAllEventsAdmin,
  deleteUserAdmin,
  deleteClubAdmin,
  deleteEventAdmin,
  updateUserAdmin,
  updateClubAdmin,
  updateEventAdmin,

  getUserByIdAdmin,
  createClubAdmin,
  createEventAdmin,
  getClubByIdAdmin,
  getEventByIdAdmin,
} from '../controllers/adminController.js';

const router = express.Router();

// Authentication
router.post('/login', adminLogin);

// Dashboard
router.get('/stats', getDashboardStats);

// User management
router.get('/users', getAllUsersAdmin);
router.get('/users/:id', getUserByIdAdmin);
router.put('/users/:id', updateUserAdmin);
router.delete('/users/:id', deleteUserAdmin);

// Club management
router.post('/clubs', createClubAdmin);
router.get('/clubs', getAllClubsAdmin);
router.get('/clubs/:id', getClubByIdAdmin);
router.put('/clubs/:id', updateClubAdmin);
router.delete('/clubs/:id', deleteClubAdmin);

// Event management
router.post('/events', createEventAdmin);
router.get('/events', getAllEventsAdmin);
router.get('/events/:id', getEventByIdAdmin);
router.put('/events/:id', updateEventAdmin);
router.delete('/events/:id', deleteEventAdmin);

export default router;
