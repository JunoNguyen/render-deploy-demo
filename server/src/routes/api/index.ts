import { Router } from 'express';
const router = Router();

import parkRoutes from './parkRoutes.js';
import historyRoutes from './historyRoutes.js';

router.use('/parks', parkRoutes); // localhost:3001/api/parks
router.use('/history', historyRoutes); // localhost:3001/api/history

export default router;
