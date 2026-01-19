import express from 'express';
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  unregisterFromEvent,
  getUpcomingEvents,
} from '../controllers/eventController.js';

const router = express.Router();

router.route('/')
  .get(getEvents)
  .post(createEvent);

router.route('/upcoming')
  .get(getUpcomingEvents);

router.route('/:id')
  .get(getEvent)
  .put(updateEvent)
  .delete(deleteEvent);

router.route('/:id/register')
  .post(registerForEvent);

router.route('/:id/unregister')
  .post(unregisterFromEvent);

export default router;
