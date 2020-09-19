import express from 'express';
import * as tokenController from '../controllers/tokenController';
import * as mapsController from '../controllers/mapsController';

const mapsRouter = express.Router();

// Gets Route Options
mapsRouter.get(
  '/routes',
  tokenController.validateUser,
  mapsController.getBestRoutes
);

// Test Route
mapsRouter.get(
    '/routes/test',
    tokenController.validateUser,
    mapsController.test
  );

export default mapsRouter;
