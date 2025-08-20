import Router from 'express';

const scheduleRouter = Router();

scheduleRouter.post('/', ) // Create a new schedule for a user
scheduleRouter.get('/', ) // Get all schedules for a user
scheduleRouter.get('/:id', ) // Get a specific schedule by ID
scheduleRouter.patch('/:id', ) // Update an existing schedule
scheduleRouter.delete('/:id', ) // Delete a schedule

export default scheduleRouter;