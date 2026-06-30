import { Router, Request, Response } from 'express';
import Team from '../models/team';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const teams = await Team.find().populate('members').lean();
  res.json({ teams });
});

router.post('/', async (req: Request, res: Response) => {
  const team = await Team.create(req.body);
  res.status(201).json({ team });
});

export default router;
