//////////////////////////////////////////////////////////////////////////
//ROUTES FOR PERFORMING CRUD OPERATIONS ON COURSE DOCUMENTS
//////////////////////////////////////////////////////////////////////////

import {Course} from "../models/Course.js";
import express from 'express';
const courseRoute = express.Router();

//CREATE course route: Adds a new course to the courses document (POST)
courseRoute.post('/courses/:courseName', async (req, res, next) => {
    console.log("in /courses (POST) route with params = " + 
                JSON.stringify(req.params) + " and body = " + 
                JSON.stringify(req.body));
    const validCourseProps = [
      'courseName', 'address', 'phoneNumber', 
      'geolocation', 'picture', 'tees',
      'rating', 'roundCount', 'email',
      'reviews'
    ];
    for (const prop in req.body)
    {
      if (!validCourseProps.includes(prop))
      {
        return res.status(400).send(
          "courses/ POST request formulated incorrectly.\n" +
          "Only following props are allowed in course entries:\n" +
          "'courseName', 'address', 'phoneNumber', 'geolocation', 'picture', 'tees',\n" +
          "'rating', 'roundCount', 'email', and 'reviews'."
        )
      }
    }
    if (!req.body.hasOwnProperty("courseName") || 
        !req.body.hasOwnProperty("address")) {
      //Body does not contain correct properties
      return res.status(400).send("POST request on /courses formulated incorrectly." +
        "Body must contain all 2 required fields: courseName, and address.");
    }
    try {
      let thisCourse = await Course.findOne({"courseName": req.params.courseName});
        if (thisCourse) { //Course already exists
            res.status(400).send("There is already a Course with courseName '" + 
             req.params.courseName + "'.");
        } else { //Course available -- add to database
            thisCourse = await new Course({
                courseName: req.params.courseName,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                geolocation: req.body.geolocation,
                picture: req.body.picture,
                tees: [],
                rating: req.body.rating,
                roundCount: req.body.roundCount,
                email: req.body.email,
                reviews: []
            }).save();
        return res.status(201).send("New course '" + 
            req.params.courseName + "' successfully created.");
        }
    } catch (err) {
      console.log(err);
      return res.status(400).send("Course not added to database. " +
        "Unexpected error occurred: " + err);
    } 
  });

//READ course route: Returns a course with given courseName in 
//the courses collection (GET)
courseRoute.get('/courses/:courseName', async(req, res) => {
    console.log("in /courses route (GET) with courseName = " + 
      JSON.stringify(req.params.courseName));
    try {
      let thisCourse = await Course.findOne({"courseName": req.params.courseName});
      if (!thisCourse) {
        return res.status(400).send("No course with specified courseName " + 
           "was found in database.");
      } else {
        return res.status(200).json(JSON.stringify(thisCourse));
      }
    } catch (err) {
      console.log()
      return res.status(400).send("Unexpected error occurred when looking " +
        "up course in database: " + err);
    }
  });
  
//UPDATE course route: Updates a specific course
//in the courses collection (PUT)
courseRoute.put('/courses/:courseName', async (req, res, next) => {
  console.log("in /courses (PUT) route with params = " + 
                JSON.stringify(req.params) + " and body = " + 
                JSON.stringify(req.body));
    const validCourseProps = [
      'courseName', 'address', 'phoneNumber', 
      'geolocation', 'picture', 'tees',
      'rating', 'roundCount', 'email',
      'reviews'
    ];
    for (const prop in req.body)
    {
      if (!validCourseProps.includes(prop))
      {
        return res.status(400).send(
          "courses/ PUT request formulated incorrectly.\n" +
          "Only following props are allowed in course entries:\n" +
          "'courseName', 'address', 'phoneNumber', 'geolocation', 'picture', 'tees',\n" +
          "'rating', 'roundCount', 'email', and 'reviews'."
        )
      }
    }
    if (!req.body.hasOwnProperty("courseName") || 
        !req.body.hasOwnProperty("address")) {
      //Body does not contain correct properties
      return res.status(400).send("PUT request on /courses formulated incorrectly." +
        "Body must contain all 2 required fields: courseName, and address.");
    }
  try {
    let status = await Course.updateOne({"courseName": req.params.courseName}, 
                                            {$set: req.body});
        if (status.modifiedCount != 1) { //course could not be found
            console.log("status: " + JSON.stringify(status));
            res.status(404).send("Course not updated. Either no course with that courseName"
                + " exists, or no value in the course was changed.");
        } else {
            res.status(200).send("Course " + req.params.courseName + 
                " successfully updated.")
        }
        } catch (err) {
            res.status(400).send("Unexpected error occurred when updating course in database: " 
            + err);
        }
});

//DELETE course route: Deletes a specific course
//in the courses collection (DELETE)
courseRoute.delete('/courses/:courseName', async (req, res, next) => {
  console.log("in /courses (DELETE) route with params = " + 
              JSON.stringify(req.params));
  try {
    const status = await Course.findOneAndUpdate(
      {"courseName": req.params.courseName},
      {"$pull": {"courses":{"courseName": req.params.courseName}}}
    );
    if (status == null)
    {
      return res.status(400).send("Course not deleted in database. "+
          "Course '" + req.params.courseName + "' does not exist.");
    }
    else {
      return res.status(201).send("Course successfully deleted in database.");
    }
  } catch (err)
  {
    console.log(err);
      return res.status(400).send("Course not deleted in database. " +
        "Unexpected error occurred: " + err);
  }
});

export default courseRoute;