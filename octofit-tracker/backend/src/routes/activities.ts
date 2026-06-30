import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ activities: [], message: 'List activities endpoint' });
});

router.post('/', (req: Request, res: Response) => {
  const activity = req.body;
  res.status(201).json({ activity, message: 'Create activity endpoint' });
});

export default router;
