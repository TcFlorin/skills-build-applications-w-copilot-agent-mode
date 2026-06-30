import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ teams: [], message: 'List teams endpoint' });
});

router.post('/', (req: Request, res: Response) => {
  const team = req.body;
  res.status(201).json({ team, message: 'Create team endpoint' });
});

export default router;
