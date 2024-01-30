import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
  {
    pd_name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    desc: { type: String, require: true },
    img_url: { type: String, required: true },
    option_arr: { type: [{ label: String, value: Number, price: Number }], default: [] },
    finding_section: { type: [String], default: [] },
    category_idx: { type: Number, require: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

// 모델이 이미 존재하는지 확인
export default mongoose.models.Product || mongoose.model('Product', productSchema);
