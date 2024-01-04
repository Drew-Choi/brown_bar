import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
  pd_name: { type: String, required: true },
  price: { type: Number, required: true },
  desc: { type: String, default: '' },
  img_url: { type: String, required: true, unique: true },
});

// 모델이 이미 존재하는지 확인
export default mongoose.models.Product || mongoose.model('Product', productSchema);
