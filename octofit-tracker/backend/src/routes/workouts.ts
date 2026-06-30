import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ workouts: [], message: 'List workouts endpoint' });
});

router.post('/', (req: Request, res: Response) => {
  const workout = req.body;
  res.status(201).json({ workout, message: 'Create workout endpoint' });
});

export default router;
