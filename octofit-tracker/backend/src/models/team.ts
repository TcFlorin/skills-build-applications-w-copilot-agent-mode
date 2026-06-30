import { Schema, model, Types } from 'mongoose';

export interface TeamDocument {
  name: string;
  sportFocus: string;
  points: number;
  members: Types.ObjectId[];
  createdAt: Date;
}

const teamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true },
  sportFocus: { type: String, required: true },
  points: { type: Number, required: true, default: 0 },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: () => new Date() }
});

export default model<TeamDocument>('Team', teamSchema);
