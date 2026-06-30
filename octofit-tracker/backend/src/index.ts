import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';

const app = express();
const PORT = Number(process.env.PORT || 8000);
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit';
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

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
      console.log(`API URL: ${API_URL}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
