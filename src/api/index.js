import { Router } from 'express';
import adsController from './controllers/ads-controller';

const router = Router();

adsController(router);

export default router;
