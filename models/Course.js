import mongoose from 'mongoose';
import { TeeSchema } from './Tee.js';
import { ReviewSchema } from './Review.js';

const CourseSchema = new mongoose.Schema({
    courseName: {type: String, required: true},
    address: {type: String, required: true},
    phoneNumber: {type: String},
    geolocation: {type: String},
    picture: {type: String},
    tees: [TeeSchema],
    rating: {type: Number, min: 0, max: 5, default: 0},
    roundCount: {type: Number, min: 0, default: 0},
    email: {type: String},
    reviews: [ReviewSchema]
},
{
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    }   
});

CourseSchema.virtual('averageFriendliness').get(function() {
    let average = 0;
    let count = 0;
    for (const review in this.reviews)
    {
        average += review.friendliness;
        count++;
    }
    if (count > 0) 
    {
        return average / count;
    }
    else {
        return 0;
    }
});
CourseSchema.virtual('averageGolfChallenge').get(function() {
    let average = 0;
    let count = 0;
    for (const review in this.reviews)
    {
        average += review.golfChallenge;
        count++;
    }
    if (count > 0) 
    {
        return average / count;
    }
    else {
        return 0;
    }
});
CourseSchema.virtual('averageRunChallenge').get(function() {
    let average = 0;
    let count = 0;
    for (const review in this.reviews)
    {
        average += review.runChallenge;
        count++;
    }
    if (count > 0) 
    {
        return average / count;
    }
    else {
        return 0;
    }
});
CourseSchema.virtual('averageOverall').get(function() {
    let average = 0;
    let count = 0;
    for (const review in this.reviews)
    {
        average += review.overall;
        count++;
    }
    if (count > 0) 
    {
        return average / count;
    }
    else {
        return 0;
    }
});

const Course = mongoose.model("Course", CourseSchema);
export {CourseSchema, Course};