import { Schema, model, Types } from 'mongoose';

export interface UserDocument {
  name: string;
  email: string;
  role: 'member' | 'coach' | 'admin';
  team?: Types.ObjectId;
  createdAt: Date;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['member', 'coach', 'admin'], default: 'member' },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  createdAt: { type: Date, default: () => new Date() }
});

export default model<UserDocument>('User', userSchema);
