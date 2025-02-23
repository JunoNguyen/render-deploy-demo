import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import ParkService from '../../service/parkService.js';

router.get('/:state', async (req: Request, res: Response) => {
  try {
    const stateName = req.params.state; // minnesota
    const stateCode = await ParkService.convertStateNameToCode(stateName); // e1312d
    const parks = await ParkService.getParksByState(stateCode); // API FETCH
    //ensures saved data has proper casing regardless of input
    const sanitizedStateName = await ParkService.convertStateCodeToName(
      stateCode
    ); // minnesota ----> Minnesota
    await HistoryService.addState(sanitizedStateName);
    res.json(parks);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/events/:state', async (req: Request, res: Response) => {
  try {
    const state = req.params.state;
    const stateCode = await ParkService.convertStateNameToCode(state);
    const events = await ParkService.getClosestEventByState(stateCode);
    if (typeof events === 'string') {
      res.status(404).json({ message: 'No events found' });
    } else {
      res.json(events);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
