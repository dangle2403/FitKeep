import Router from 'express';
import { createSchedule, getAllSchedule, getScheduleById } from '../controllers/schedule.Controller.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const scheduleRouter = Router();

scheduleRouter.use(requireAuth)

scheduleRouter.post('/', createSchedule) // create a schedule
scheduleRouter.get('/', getAllSchedule) // list schedules of that user (filter by day/week)
scheduleRouter.get('/:id', getScheduleById) // Get a specific schedule by ID

export default scheduleRouter;