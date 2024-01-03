import mongoose, { Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const connection = mongoose.createConnection(process.env.MONGO_URI as string);
autoIncrement.initialize(connection);

const productSchema = new Schema({
  pd_idx: { type: Number, required: true, unique: true },
  pd_name: { type: String, required: true },
  price: { type: Number, required: true },
  desc: { type: String, default: '' },
  img_url: { type: String, required: true },
});

productSchema.plugin(autoIncrement.plugin, {
  model: 'Product',
  field: 'pd_idx',
  start: 1,
  incrementBy: 1,
});

// 모델이 이미 존재하는지 확인
export default mongoose.models.Product || mongoose.model('Product', productSchema);
