//////////////////////////////////////////////////////////////////////////
//ROUTE FOR PERFORMING UPDATE OPERATION ON USER BADGE ARRAY
//////////////////////////////////////////////////////////////////////////

import User from "../models/User.js";
import express from 'express';
const badgeRoute = express.Router();

//UPDATE badge route: Updates a specific badge for a given user
//in the users collection (PUT)
badgeRoute.put('/badges/:userId/:badgeIndex', async (req, res, next) => {
  console.log("in /badges (PUT) route with params = " + 
              JSON.stringify(req.params) + " and body = " + 
              JSON.stringify(req.body));
  if (!req.body.hasOwnProperty("obtained")) {
    //Body does not contain correct properties
    return res.status(400).send("PUT request on /badges formulated incorrectly." +
      "Body must contain all required field: obtained.");
  }
  
  if (req.body.obtained != false)
  {
      if (req.body.obtained != true)
      {
          //Property is not the proper type
            return res.status(400).send("PUT request on /badges formulated incorrectly." +
            "Property obtained must be a boolean true or false.");
      }
  }

  try {
    let index = req.params.badgeIndex;
    const status = await User.findOneAndUpdate(
      {"accountData.id": req.params.userId},
      {"$set": {
        [`badges.${index}.value`]: req.body.obtained
      }}
    );
    if (status == null)
    {
      return res.status(400).send("Badge not updated in database. "+
          "User '" + req.params.userId + "' or Badge '" + req.params.badgeIndex + "' does not exist.");
    }
    else {
      return res.status(201).send("Badge successfully updated in database.");
    }
  } catch (err)
  {
    console.log(err);
      return res.status(400).send("Badge not updated in database. " +
        "Unexpected error occurred: " + err);
  }
});

export default badgeRoute;