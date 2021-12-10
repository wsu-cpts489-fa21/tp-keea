import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    reviewComments: String,
    friendliness: {type: Number, min: 0, max: 5, default: 0},
    golfChallenge: {type: Number, min: 0, max: 5, default: 0},
    runChallenge: {type: Number, min: 0, max: 5, default: 0},
    overall: {type: Number, min: 0, max: 5, default: 0},
});

const Review = mongoose.model("Review", ReviewSchema);
export {ReviewSchema, Review};