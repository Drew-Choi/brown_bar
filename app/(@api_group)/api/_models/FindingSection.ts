import mongoose, { Schema } from 'mongoose';

const findingSectionSchema = new Schema({
  finding_idx: { type: Number, required: true },
  sub_category_idx: { type: Number, required: true },
  section_list: {
    type: [
      {
        title: { type: String, required: true },
      },
    ],
    default: [],
  },
});

// 모델이 이미 존재하는지 확인
export default mongoose.models.FindingSection ||
  mongoose.model('FindingSection', findingSectionSchema);