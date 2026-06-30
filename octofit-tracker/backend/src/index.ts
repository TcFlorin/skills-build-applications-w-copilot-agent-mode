import express, { Request, Response } from 'express';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';
import { connectToDatabase, MONGO_URI } from './database';

const app = express();
const PORT = Number(process.env.PORT || 8000);
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_URL = process.env.API_URL ||
  (CODESPACE_NAME
    ? `https://8000-${CODESPACE_NAME}.githubpreview.dev`
    : `http://localhost:${PORT}`);

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'OctoFit Tracker API is running', apiUrl: API_URL });
});

app.get('/api/config', (_req: Request, res: Response) => {
  res.json({ apiUrl: API_URL, port: PORT });
});

connectToDatabase()
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
      console.log(`API URL: ${API_URL}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
