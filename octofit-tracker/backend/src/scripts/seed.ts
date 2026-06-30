/*
 Seed the octofit_db database with test data
*/
import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Workout from '../models/workout';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGO_URI);
  console.log(`Connected to MongoDB at ${MONGO_URI}`);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const users = await User.create([
    { name: 'Ava Coleman', email: 'ava@example.com', role: 'member' },
    { name: 'Mason Lee', email: 'mason@example.com', role: 'coach' },
    { name: 'Nina Patel', email: 'nina@example.com', role: 'member' }
  ]);

  const teams = await Team.create([
    { name: 'Trailblazers', sportFocus: 'Running', points: 820, members: [users[0]._id, users[2]._id] },
    { name: 'Core Crushers', sportFocus: 'Strength Training', points: 940, members: [users[1]._id] }
  ]);

  const activities = await Activity.create([
    {
      user: users[0]._id,
      type: '5K run',
      durationMinutes: 28,
      caloriesBurned: 320,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      user: users[2]._id,
      type: 'Cycling',
      durationMinutes: 45,
      caloriesBurned: 510,
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      user: users[1]._id,
      type: 'HIIT session',
      durationMinutes: 30,
      caloriesBurned: 380,
      date: new Date()
    }
  ]);

  const workouts = await Workout.create([
    {
      user: users[0]._id,
      planName: 'Morning Endurance',
      exercises: [
        { name: 'Treadmill run', reps: 1, sets: 1 },
        { name: 'Stretch circuit', reps: 10, sets: 3 }
      ],
      totalDurationMinutes: 40,
      completed: true,
      scheduledFor: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
      user: users[2]._id,
      planName: 'Strength Builder',
      exercises: [
        { name: 'Squats', reps: 12, sets: 4, weightKg: 40 },
        { name: 'Deadlifts', reps: 8, sets: 3, weightKg: 60 }
      ],
      totalDurationMinutes: 55,
      completed: false,
      scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
  ]);

  await Leaderboard.create([
    { entityType: 'team', entityId: teams[1]._id, entityName: teams[1].name, rank: 1, score: 940 },
    { entityType: 'team', entityId: teams[0]._id, entityName: teams[0].name, rank: 2, score: 820 },
    { entityType: 'user', entityId: users[1]._id, entityName: users[1].name, rank: 1, score: 590 },
    { entityType: 'user', entityId: users[0]._id, entityName: users[0].name, rank: 2, score: 520 }
  ]);

  console.log('Seed data inserted successfully');
  console.log('Users:', users.length);
  console.log('Teams:', teams.length);
  console.log('Activities:', activities.length);
  console.log('Workouts:', workouts.length);

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
