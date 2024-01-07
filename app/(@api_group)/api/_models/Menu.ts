import mongoose, { Schema } from 'mongoose';

const menuSchema = new Schema({
  label: { type: String, required: true, unique: true },
  category_idx: { type: Number },
});

menuSchema.pre('save', async function (next) {
  if (this?.isNew) {
    const lastDocument = await mongoose.models.Menu.findOne().sort({ category_idx: -1 });
    if (lastDocument) {
      this.category_idx = lastDocument.category_idx + 1;
    } else {
      this.category_idx = 1;
    }
  }
  next();
});

// 모델이 이미 존재하는지 확인
export default mongoose.models.Menu || mongoose.model('Menu', menuSchema);
