import express from 'express';
import {
  getClubs,
  getClub,
  createClub,
  updateClub,
  deleteClub,
  joinClub,
  leaveClub,
} from '../controllers/clubController.js';

const router = express.Router();

router.route('/')
  .get(getClubs)
  .post(createClub);

router.route('/:id')
  .get(getClub)
  .put(updateClub)
  .delete(deleteClub);

router.route('/:id/join')
  .post(joinClub);

router.route('/:id/leave')
  .post(leaveClub);

export default router;
