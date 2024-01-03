import mongoose, { Schema } from 'mongoose';

const memberSchema = new Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  auth: { type: String, default: '' },
});

// 모델이 이미 존재하는지 확인
export default mongoose.models.Member || mongoose.model('Member', memberSchema);
