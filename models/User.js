import mongoose from 'mongoose';
import {RoundSchema} from './Round.js';

const UserSchema = new mongoose.Schema({
  accountData: {
      id: String,
      password: String,
      securityQuestion: String,
      securityAnswer: String
  },
  identityData: {
      displayName: String,
      profilePic: String
  },
  speedgolfData: {
    bio: String,
    homeCourse: String,
    firstRound: Date,
    personalBest: {strokes: Number,
                   minutes: Number, 
                   seconds: Number,
                   course: String},
    clubs: {},
    clubComments: String
  },
  rounds:[RoundSchema]
});

const User = mongoose.model("User",UserSchema);
export default User;