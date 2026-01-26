import express from 'express';
import {
  getUsers,
  getUser,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
  getLeaderboard,
} from '../controllers/userController.js';
import { syncFirebaseUser } from '../controllers/authController.js';

const router = express.Router();

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/auth/sync')
  .post(syncFirebaseUser);

router.route('/stats/leaderboard')
  .get(getLeaderboard);

router.route('/username/:username')
  .get(getUserByUsername);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

export default router;
