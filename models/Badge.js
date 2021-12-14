// May be unneeded.
import mongoose from 'mongoose';

const BadgeSchema = new mongoose.Schema({
  name: {type: String},
  obtained: {type: Boolean, default: false}
});

const Badge = mongoose.model("Badge", BadgeSchema);
export {BadgeSchema, Badge};