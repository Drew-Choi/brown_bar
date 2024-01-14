import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    order_idx: { type: Number, required: true, unique: true },
    tb_idx: { type: Number, required: true },
    menu: [
      {
        _id: { type: String, required: true },
        pd_name: { type: String, required: true },
        price: { type: Number, required: true },
        ea: { type: Number, required: true },
      },
    ],
    complete: { type: Boolean, required: true },
    pay: { type: Boolean, required: true },
  },

  {
    timestamps: { createdAt: 'created_at' },
  },
);

orderSchema.pre('save', async function (next) {
  if (this?.isNew) {
    const lastDocument = await mongoose.models.Menu.findOne().sort({ order_idx: -1 });
    if (lastDocument) {
      this.order_idx = lastDocument.order_idx + 1;
    } else {
      this.order_idx = 1;
    }
  }
  next();
});

// 모델이 이미 존재하는지 확인
export default mongoose.models.Order || mongoose.model('Order', orderSchema);
