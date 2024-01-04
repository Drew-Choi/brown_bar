import mongoose, { Schema } from 'mongoose';

const startSchema = new Schema({
  is_start: { type: Boolean, required: true },
});

// 모델이 이미 존재하는지 확인
export default mongoose.models.Start || mongoose.model('Start', startSchema);
