import { Schema, model, Types } from 'mongoose';

export interface LeaderboardDocument {
  entityType: 'user' | 'team';
  entityId: Types.ObjectId;
  entityName: string;
  rank: number;
  score: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<LeaderboardDocument>({
  entityType: { type: String, required: true, enum: ['user', 'team'] },
  entityId: { type: Schema.Types.ObjectId, required: true },
  entityName: { type: String, required: true },
  rank: { type: Number, required: true },
  score: { type: Number, required: true },
  updatedAt: { type: Date, default: () => new Date() }
});

export default model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
