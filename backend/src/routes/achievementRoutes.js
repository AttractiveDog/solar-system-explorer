import express from 'express';
import {
  getAchievements,
  getAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  getUserAchievements,
  unlockAchievement,
} from '../controllers/achievementController.js';

const router = express.Router();

router.route('/')
  .get(getAchievements)
  .post(createAchievement);

router.route('/user/:userId')
  .get(getUserAchievements);

router.route('/:id')
  .get(getAchievement)
  .put(updateAchievement)
  .delete(deleteAchievement);

router.route('/:id/unlock')
  .post(unlockAchievement);

export default router;
