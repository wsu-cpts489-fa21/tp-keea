import mongoose from 'mongoose';
import { TeeSchema } from './Tee';

const CourseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    phoneNumber: {type: Number},
    geolocation: {type: String},
    picture: {type: String},
    tees: [TeeSchema]
},
{
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    }   
});

const Course = mongoose.model("Course", CourseSchema);
export {CourseSchema, Course};