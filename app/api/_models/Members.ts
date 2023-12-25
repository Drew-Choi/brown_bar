import mongoose, { Schema } from 'mongoose';

const membersSchema = new Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

export default mongoose.model('Member', membersSchema);
