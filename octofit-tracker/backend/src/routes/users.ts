import { Router, Request, Response } from 'express';
import User from '../models/user';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const users = await User.find().lean();
  res.json({ users });
});

router.post('/', async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).json({ user });
});

export default router;
