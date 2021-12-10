//////////////////////////////////////////////////////////////////////////
//ROUTES FOR PERFORMING CRUD OPERATIONS ON TEE DOCUMENTS
//////////////////////////////////////////////////////////////////////////

import {Tee} from "../models/Tee.js";
import {Course} from "../models/Course.js"
import express from 'express';
const teeRoute = express.Router();

//CREATE tee route: Adds a new tee to the tees document (POST)
teeRoute.post('/tees/:courseName', async (req, res, next) => {
    console.log("in /tees (POST) route with params = " + 
                JSON.stringify(req.params) + " and body = " + 
                JSON.stringify(req.body));
    const validTeeProps = [
      'teeName', 'golfingYardage', 'runningYardage', 
      'numberHoles', 'holes', 'speedGolfRecord'
    ];
    const validSpeedGolfDataProps = [
        'name', 'minutes', 'seconds',
        'strokes', 'date']
    for (const prop in req.body)
    {
      if (!validTeeProps.includes(prop))
      {
        return res.status(400).send(
          "tees/ POST request formulated incorrectly.\n" +
          "Only following props are allowed in tee entries:\n" +
          "'teeName', 'golfingYardage', 'runningYardage',\n" +
          "'numberHoles', 'holes', 'speedGolfRecord'."
        )
      }
      if (prop === 'speedGolfRecord')
      {
        for (const sProp in req.body.speedGolfRecord) {
            if (!validSpeedGolfDataProps.includes(sProp)) {
                return res.status(400).send(
                "tees/ POST request formulated incorrectly." +
                "Only the following props are allowed in speedGolfRecord: " +
                "'name', 'minutes', 'seconds', 'strokes', and 'date'");
            }
        }
      }
    }
    if (!req.body.hasOwnProperty("teeName") || 
        !req.body.hasOwnProperty("golfingYardage") ||
        !req.body.hasOwnProperty("runningYardage") ||
        !req.body.hasOwnProperty("numberHoles")) {
      //Body does not contain correct properties
      return res.status(400).send("POST request on /tees formulated incorrectly." +
        "Body must contain all 4 required fields: teeName, golfingYardage, runningYardage, and numberHoles.");
    }
    try {
        const tee = new Tee(req.body);
        const error = tee.validateSync();
        if (error) { //Schema validation error occurred
          return res.status(400).send("Tee not added to database. " + error.message);
        }
        const status = await Course.updateOne(
          {"courseName": req.params.courseName},
          {$push: {tees:{
            teeName: req.body.teeName,
            golfingYardage: req.body.golfingYardage,
            runningYardage: req.body.runningYardage,
            numberHoles: req.body.numberHoles,
            holes: [],
            speedGolfRecord: {
                name: req.body.speedGolfRecord.name,
                minutes: req.body.speedGolfRecord.minutes,
                seconds: req.body.speedGolfRecord.seconds,
                strokes: req.body.speedGolfRecord.stroke,
                date: req.body.speedGolfRecord.date,
            },
          }}});
        if (status.modifiedCount != 1) {
          return res.status(400).send("Tee not added to database. "+
            "Course '" + req.params.courseName + "' does not exist.");
        } else {
          return res.status(201).send("Tee successfully added to database.");
        }
      } catch (err) {
        console.log(err);
        return res.status(400).send("Tee not added to database. " +
          "Unexpected error occurred: " + err);
      }
  });

//READ tee route: Returns all tees associated with a given course in 
//the courses collection (GET)
teeRoute.get('/tees/:courseName', async(req, res) => {
    console.log("in /tees route (GET) with name = " + 
      JSON.stringify(req.params.courseName));
    try {
      let thisCourse = await Course.findOne({"courseName": req.params.courseName});
      if (!thisCourse) {
        return res.status(400).send("No course with specified name " + 
           "was found in database.");
      } else {
        return res.status(200).json(JSON.stringify(thisCourse.tees));
      }
    } catch (err) {
      console.log()
      return res.status(400).send("Unexpected error occurred when looking " +
        "up course in database: " + err);
    }
  });
  
//UPDATE tee route: Updates a specific tee
//in the courses collection (PUT)
teeRoute.put('/tees/:courseName/:teeId', async (req, res, next) => {
  console.log("in /tees (PUT) route with params = " + 
                JSON.stringify(req.params) + " and body = " + 
                JSON.stringify(req.body));
    const validTeeProps = [
      'teeName', 'golfingYardage', 'runningYardage', 
      'numberHoles', 'holes', 'speedGolfRecord'
    ];
    for (const prop in req.body)
    {
      if (!validTeeProps.includes(prop))
      {
        return res.status(400).send(
          "tees/ POST request formulated incorrectly.\n" +
          "Only following props are allowed in tee entries:\n" +
          "'teeName', 'golfingYardage', 'runningYardage',\n" +
          "'numberHoles', 'holes', 'speedGolfRecord'."
        )
      }
    }
    if (!req.body.hasOwnProperty("teeName") || 
        !req.body.hasOwnProperty("golfingYardage") ||
        !req.body.hasOwnProperty("runningYardage") ||
        !req.body.hasOwnProperty("numberHoles")) {
      //Body does not contain correct properties
      return res.status(400).send("POST request on /tees formulated incorrectly." +
        "Body must contain all 4 required fields: teeName, golfingYardage, runningYardage, and numberHoles.");
    }
  try {
    const tee = new Tee(req.body);
    const error = round.validateSync();
    if (error) { //Schema validation error occurred
      return res.status(400).send("Tee not updated in database. " + error.message);
    }
    const status = await Course.findOneAndUpdate(
      {"courseName": req.params.courseName, "tees._id": req.params.teeId},
      {"$set": {
        "tees.$.teeName": req.body.teeName,
        "tees.$.golfingYardage": req.body.golfingYardage,
        "tees.$.runningYardage": req.body.runningYardage,
        "tees.$.numberHoles": req.body.numberHoles,
        "tees.$.holes": req.body.holes,
        "tees.$.speedGolfRecord": req.body.speedGolfRecord
      }}
    );
    if (status == null)
    {
      return res.status(400).send("Tee not updated in database. "+
          "Course '" + req.params.courseName + "' or Tee '" + req.params.teeId + "' does not exist.");
    }
    else {
      return res.status(201).send("Tee successfully updated in database.");
    }
  } catch (err)
  {
    console.log(err);
      return res.status(400).send("Tee not updated in database. " +
        "Unexpected error occurred: " + err);
  }
});

//DELETE tee route: Deletes a specific tee
//in the tees collection (DELETE)
teeRoute.delete('/tees/:courseName/:teeId', async (req, res, next) => {
  console.log("in /tees (DELETE) route with params = " + 
              JSON.stringify(req.params));
  try {
    const status = await Course.findOneAndUpdate(
      {"courseName": req.params.courseName, "tees.teeId": req.params.teeId},
      {"$pull": {"tees":{"_id": req.params.teeId}}}
    );
    if (status == null)
    {
      return res.status(400).send("Tee not deleted in database. "+
          "Course '" + req.params.courseName + "' or Tee '" + req.params.teeId + "' does not exist.");
    }
    else {
      return res.status(201).send("Tee successfully deleted in database.");
    }
  } catch (err)
  {
    console.log(err);
      return res.status(400).send("Tee not deleted in database. " +
        "Unexpected error occurred: " + err);
  }
});

export default teeRoute;