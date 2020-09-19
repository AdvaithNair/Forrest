import express from 'express';
import userRouter from './userRoutes';
import mapsRouter from './mapsRoutes';

const apiRouter = express.Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/maps', mapsRouter);
// apiRouter.use('/test', (_req, res) => res.send('test'));

export default apiRouter;
