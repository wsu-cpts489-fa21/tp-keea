//////////////////////////////////////////////////////////////////////////
//IMPORTS AND VARIABLE INITIALIZATIONS
//The following code imports necessary dependencies and initializes
//variables used in the server middleware.
//////////////////////////////////////////////////////////////////////////
import path from 'path';
import { URL } from 'url';
import express from 'express';
import passportConfig from './passport/config.js';
import authRoute from './routes/authRoutes.js';
import userRoute from './routes/userRoutes.js';
import roundRoute from './routes/roundRoutes.js';
import courseRoute from './routes/courseRoutes.js';
import teeRoute from './routes/teeRoutes.js'
import badgeRoute from './routes/badgeRoute.js';
import cors from 'cors';
const __dirname = path.resolve();
const PORT = process.env.PORT || process.env.LOCAL_PORT;
const app = express(); //Instantiate express app
// const cors = require('cors');
const buildPath = (PORT === process.env.PORT) ?
  new URL('client/build/', import.meta.url).pathname :
  (new URL('client/build/', import.meta.url).pathname).substring(1);
import mongoose from 'mongoose';
//const connectStr = 'mongodb://localhost:27017/appdb'; //Local
const connectStr = 'mongodb+srv://' + process.env.MONGODB_USER + ':' + 
                  process.env.MONGODB_PW + process.env.MONGODB_CSTRING; //Remote DB
//////////////////////////////////////////////////////////////////////////
//MONGOOSE SET-UP
//The following code sets up the app to connect to a MongoDB database
//using the mongoose library.
//////////////////////////////////////////////////////////////////////////
mongoose.connect(connectStr, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(
    () =>  {console.log(`Connected to ${connectStr}.`)},
    err => {console.error(`Error connecting to ${connectStr}: ${err}`)}
  );

//////////////////////////////////////////////////////////////////////////
//EXPRESS SET-UP
// The following code uses express.static to serve the React app defined 
//in the client/ directory at PORT.
/////////////////////////////////////////////////////////////////////////

// const cors = require('cors');

passportConfig(app); //Configure session and passport
app
  .use(express.static(path.join(__dirname, 'client', 'build')))
  //.use(express.static(buildPath))
  .use(cors())
  .use(express.json({limit: '20mb'}))
  .use(authRoute)
  .use(userRoute)
  .use(roundRoute)
  .use(courseRoute)
  .use(teeRoute)
  .use(badgeRoute)
  .listen(PORT, () => console.log(`Listening on ${PORT}`));