import { Schema, model, Types } from 'mongoose';

export interface WorkoutDocument {
  user: Types.ObjectId;
  planName: string;
  exercises: { name: string; reps: number; sets: number; weightKg?: number }[];
  totalDurationMinutes: number;
  completed: boolean;
  scheduledFor: Date;
}

const workoutSchema = new Schema<WorkoutDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  planName: { type: String, required: true },
  exercises: [
    {
      name: { type: String, required: true },
      reps: { type: Number, required: true },
      sets: { type: Number, required: true },
      weightKg: { type: Number }
    }
  ],
  totalDurationMinutes: { type: Number, required: true },
  completed: { type: Boolean, default: false },
  scheduledFor: { type: Date, required: true }
});

export default model<WorkoutDocument>('Workout', workoutSchema);
