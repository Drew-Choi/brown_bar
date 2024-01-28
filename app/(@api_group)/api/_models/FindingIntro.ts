import mongoose, { Schema } from 'mongoose';

const findingIntroSchema = new Schema({
  finding_idx: { type: Number, required: true, unique: true },
  intro_text: { type: String, required: true },
});

// 모델이 이미 존재하는지 확인
export default mongoose.models.FindingIntro || mongoose.model('FindingIntro', findingIntroSchema);
