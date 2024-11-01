import { Router } from 'express';
const router = Router();

import apiRoutes from './api/index.js';
import htmlRoutes from './htmlRoutes.js';

router.use('/api', apiRoutes); // localhost:3001/api
router.use('/', htmlRoutes);

export default router;
