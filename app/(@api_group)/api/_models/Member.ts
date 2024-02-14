import mongoose, { Schema } from 'mongoose';

const memberSchema = new Schema({
  id: { type: String, require: true, unique: true },
  nick_name: { type: String, require: true },
  profile_img: { type: String, unique: true, default: '' },
  is_admin: { type: Boolean, default: false },
  fcm: { type: [String], default: [] },
});

// 모델이 이미 존재하는지 확인
export default mongoose.models.Member || mongoose.model('Member', memberSchema);
