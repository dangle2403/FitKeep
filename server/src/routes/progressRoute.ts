import Router from 'express';

const progressRouter = Router();

progressRouter.get('//users/:userId/progress', ) // return aggregated stats
progressRouter.get('/users/:userId/progress/:exerciseName', ) // return stats for a specific user


export default progressRouter;