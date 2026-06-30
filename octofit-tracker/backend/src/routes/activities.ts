import { Router, Request, Response } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const activities = await Activity.find().populate('user').lean();
  res.json({ activities });
});

router.post('/', async (req: Request, res: Response) => {
  const activity = await Activity.create(req.body);
  res.status(201).json({ activity });
});

export default router;
