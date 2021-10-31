//////////////////////////////////////////////////////////////////////////
//ROUTES FOR PERFORMING CRUD OPERATIONS ON USER DOCUMENTS
//////////////////////////////////////////////////////////////////////////

import User from "../models/User.js";
import express from 'express';
import bcrypt from 'bcrypt';
const userRoute = express.Router();
const saltRounds = 10;


//READ user route: Retrieves the user with the specified userId from users collection (GET)
userRoute.get('/users/:userId', async(req, res, next) => {
    console.log("in /users route (GET) with userId = " + 
      JSON.stringify(req.params.userId));
    try {
      let thisUser = await User.findOne({"accountData.id": req.params.userId});
      if (!thisUser) {
        return res.status(404).send("No user account with id " +
          req.params.userId + " was found in database.");
      } else {
        return res.status(200).json(JSON.stringify(thisUser));
      }
    } catch (err) {
      console.log()
      return res.status(400).send("Unexpected error occurred when looking up user with id " 
        + req.params.userId + " in database: " + err);
    }
  });

//CREATE user route: Adds a new user account to the users collection (POST)
userRoute.post('/users/:userId',  async (req, res, next) => {
    console.log("in /users route (POST) with params = " + JSON.stringify(req.params) +
      " and body = " + JSON.stringify(req.body)); 
    const validAccountProps = ['id', 'password', 'securityQuestion', 'securityAnswer'];
    const validIdentityProps = ['displayName', 'profilePic'];
    const validSGProps = ['bio','homeCourse','firstRound', 'personalBest', 'clubs', 'clubComments'];
    for (const bodyProp in req.body) {
            if (bodyProp === 'accountData') {
                for (const aProp in req.body.accountData) {
                    if (!validAccountProps.includes(aProp)) {
                        return res.status(400).send(
                        "users/ POST request formulated incorrectly." +
                        "Only the following props are allowed in accountData: " +
                        "'id', 'password','securityQuestion','securityAnswer'");
                    }
                }
            } else if (bodyProp === 'identityData') {
                for (const iProp in req.body.identityData) {
                    if (!validIdentityProps.includes(iProp)) {
                        return res.status(400).send(
                        "users/ POST request formulated incorrectly." +
                        "Only the following props are allowed in identityData: " +
                        "'displayName', 'profilePic'");
                    }
                }
            } else if (bodyProp === 'speedgolfData') {
                for (const sProp in req.body.speedgolfData) {
                    if (!validSGProps.includes(sProp)) {
                        return res.status(400).send(
                        "users/ POST request formulated incorrectly." +
                        "Only the following props are allowed in speedgolfData: " +
                        "'bio', 'homeCourse', 'personalBest', 'clubs', clubComments'");
                    }
                }
            } else { 
                return res.status(400).send(
                    "users/ POST request formulated incorrectly." +
                    "Only the following top-level props are allowed in user data: " +
                    "'accountData', 'identityData', 'speedgolfData'");
            }
    }
    try {
        let thisUser = await User.findOne({"accountData.id": req.params.userId});
        if (thisUser) { //account already exists
            res.status(400).send("There is already an account with email '" + 
             req.params.userId + "'.");
        } else { //account available -- add to database
            const hash = await bcrypt.hash(req.body.accountData.password, saltRounds);
            thisUser = await new User({
                accountData: {id: req.params.userId,
                            password: hash,
                            securityQuestion: req.body.accountData.securityQuestion,
                            securityAnswer: req.body.accountData.securityAnswer},
                identityData: {displayName: req.body.identityData.displayName,
                                profilePic: req.body.identityData.profilePic},
                speedgolfData: {bio: req.body.speedgolfData.bio,
                                homeCourse: req.body.speedgolfData.homeCourse,
                                personalBest: req.body.speedgolfData.personalBest,
                                clubs: req.body.speedgolfData.clubs,
                                clubComments: req.body.speedgolfData.clubComments}
            }).save();
        return res.status(201).send("New account for '" + 
            req.params.userId + "' successfully created.");
        }
    } catch (err) {
        return res.status(400)
        .send("Unexpected error occurred when adding user to database. " + err);
    }
  });
  
//UPDATE user route: Updates a user account in the users collection (POST)
userRoute.put('/users/:userId',  async (req, res, next) => {
    console.log("in /users update route (PUT) with userId = " 
      + JSON.stringify(req.params) +
      " and body = " + JSON.stringify(req.body));
    if (!req.params.hasOwnProperty("userId"))  {
      return res.status(400).send("users/ PUT request formulated incorrectly." +
          "It must contain 'userId' as parameter.");
    }
    const validAccountProps = ['id', 'password', 'securityQuestion', 'securityAnswer'];
    const validIdentityProps = ['displayName', 'profilePic'];
    const validSGProps = ['bio','homeCourse','personalBest', 'firstRound','clubs', 'clubComments'];
    for (const bodyProp in req.body) {
        if (bodyProp === 'accountData') {
            for (const aProp in req.body.accountData) {
                if (!validAccountProps.includes(aProp)) {
                    return res.status(400).send(
                      "users/ PUT request formulated incorrectly." +
                      "Only the following props are allowed in accountData: " +
                      "'id', 'password','securityQuestion','securityAnswer'");
                }
            }
        } else if (bodyProp === 'identityData') {
            for (const iProp in req.body.identityData) {
                if (!validIdentityProps.includes(iProp)) {
                    return res.status(400).send(
                      "users/ PUT request formulated incorrectly." +
                      "Only the following props are allowed in identityData: " +
                      "'displayName', 'profilePic'");
                }
            }
        } else if (bodyProp === 'speedgolfData') {
            for (const sProp in req.body.speedgolfData) {
                if (!validSGProps.includes(sProp)) {
                    return res.status(400).send(
                      "users/ PUT request formulated incorrectly." +
                      "Only the following props are allowed in speedgolfData: " +
                      "'bio', 'homeCourse', 'personalBest', 'clubs', clubComments'");
                }
            }
        } else { 
            return res.status(400).send(
                "users/ PUT request formulated incorrectly." +
                "Only the following top-level props are allowed in user data: " +
                "'accountData', 'identityData', 'speedgolfData'");
          }
    }
    try {
        let status = await User.updateOne({"accountData.id": req.params.userId}, 
                                            {$set: req.body});
        if (status.modifiedCount != 1) { //account could not be found
            console.log("status: " + JSON.stringify(status));
            res.status(404).send("Account not updated. Either no account with that id"
                + " exists, or no value in the account was changed.");
        } else {
            res.status(200).send("User account " + req.params.userId + 
                " successfully updated.")
        }
        } catch (err) {
            res.status(400).send("Unexpected error occurred when updating user in database: " 
            + err);
        }
  });
  
//DELETE user route: Deletes the document with the specified userId from users collection (DELETE)
userRoute.delete('/users/:userId', async(req, res, next) => {
    console.log("in /users route (DELETE) with userId = " + 
      JSON.stringify(req.params.userId));
    try {
      let status = await User.deleteOne({"accountData.id": req.params.userId});
      if (status.deletedCount != 1) {
        return res.status(404).send("No user account " +
          req.params.userId + " was found. Account could not be deleted.");
      } else {
        return res.status(200).send("User account " +
        req.params.userId + " was successfully deleted.");
      }
    } catch (err) {
      return res.status(400).send("Unexpected error occurred when attempting to delete" +
        "user account with id " + req.params.userId + ": " + err);
    }
  });
  
  export default userRoute;

  