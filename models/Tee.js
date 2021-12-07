import mongoose from 'mongoose';
import { HoleSchema } from './Hole.js'

const TeeSchema = new mongoose.Schema({
    teeName: {type: String, required: true},
    golfingYardage: {type: Number, required: true, min: 0},
    runningYardage: {type: Number, required: true, min: 0},
    numberHoles: {type: Number, required: true, min: 1},
    holes: [HoleSchema],
    speedGolfRecord: {
        name: String,
        minutes: {type: Number, min: 0},
        seconds: {type: Number, min: 0, max: 60},
        strokes: {type: Number, min: 1},
        date: Date,
    },
},
{
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    },
});

const Tee = mongoose.model("Tee", TeeSchema);
export {TeeSchema, Tee}