import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ users: [], message: 'List users endpoint' });
});

router.post('/', (req: Request, res: Response) => {
  const user = req.body;
  res.status(201).json({ user, message: 'Create user endpoint' });
});

export default router;
