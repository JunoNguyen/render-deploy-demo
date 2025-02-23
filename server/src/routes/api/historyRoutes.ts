import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import historyService from '../../service/historyService.js';
// localhost:3001/api/parks/history/ GET METHOD
router.get('/', async (_req: Request, res: Response) => {
  try {
    const savedStates = await HistoryService.getStates();
    res.json(savedStates);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}); // localhost:3001/api/history GET METHOD
// localhost:3001/api/parks/history/72e89d34-015c-4524-9e9f-3200746d53ea DELETE METHOD
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ msg: 'State id is required' });
    }
    await historyService.removeState(req.params.id);
    res.json({ success: 'State successfully removed from search history' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
