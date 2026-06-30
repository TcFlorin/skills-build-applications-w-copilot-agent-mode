import mongoose from 'mongoose';

export const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export async function connectToDatabase(): Promise<typeof mongoose> {
  return mongoose.connect(MONGO_URI);
}

export default mongoose;
