import mongoose from 'mongoose';

const HoleSchema = new mongoose.Schema({
    strokePar: {type: Number, required: true},
    golfingYardage: {type: Number, required: true},
    runningYardage: {type: Number, required: true},
    timeParMultiplier: {type: Number, required: true, min: 1, max: 1000, default: 70},
},
{
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    },
});

HoleSchema.virtual('timePar').get(function() {
    return (this.runningYardage) * (this.timeParMultiplier);
});

const Hole = mongoose.model("Hole", HoleSchema);
export {HoleSchema, Hole}