import { nowDayAndTimeOnlyNumber } from '@/utils/mometDayAndTime';
import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    order_idx: { type: String, unique: true },
    tb_idx: { type: Number, required: true },
    menu: [
      {
        _id: { type: String, required: true },
        pd_name: { type: String, required: true },
        price: { type: Number, required: true },
        ea: { type: Number, required: true },
        option: {
          type: {
            label: { type: String },
            price: { type: Number },
            value: { type: Number },
          },
          default: {},
        },
      },
    ],
    complete: { type: Boolean, required: true, default: false },
    pay: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

orderSchema.pre('save', async function (next) {
  if (this?.isNew) {
    const nowDataKST = nowDayAndTimeOnlyNumber({ format: 'YYYYMMDD' });

    const lastDocument = await mongoose.models.Order.findOne({
      order_idx: new RegExp('^' + nowDataKST),
    }).sort({ order_idx: -1 });

    if (lastDocument) {
      const lastNumber = Number(lastDocument.order_idx?.split('_')[1]);

      this.order_idx = `${nowDataKST}_${lastNumber + 1}`;
    } else {
      this.order_idx = `${nowDataKST}_1`;
    }
  }
  next();
});

// 모델이 이미 존재하는지 확인
export default mongoose.models.Order || mongoose.model('Order', orderSchema);
