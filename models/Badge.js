import mongoose from 'mongoose';

const BadgeSchema = new mongoose.Schema({
  icon: {type: String},
  name: {type: String},
  description: {type: String},
  obtained: {type: Boolean, default: false}
});

const Badge = mongoose.model("Badge", BadgeSchema);
export {BadgeSchema, Badge};