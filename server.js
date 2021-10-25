//////////////////////////////////////////////////////////////////////////
//IMPORTS AND VARIABLE INITIALIZATIONS
//The following code imports necessary dependencies and initializes
//variables used in the server middleware.
//////////////////////////////////////////////////////////////////////////
import session from 'express-session';
import path from 'path';
import express from 'express';
import passportConfig from '.passport/config';
import authRoute from './routes/authRoutes';
const PORT = process.env.PORT || process.env.LOCAL_PORT;
const app = express(); //Instantiate express app
passportConfig(app); //Configure passport

//////////////////////////////////////////////////////////////////////////
//INITIALIZE EXPRESS APP
// The following code uses express.static to serve the React app defined 
//in the client/ directory at PORT. It also writes an express session
//to a cookie, and defines auth routes to support OAuth.
/////////////////////////////////////////////////////////////////////////
app
  .use(express.static(path.join(__dirname,"client/build")))
  .use(session({secret: "speedgolf", 
                resave: false,
                saveUninitialized: false,
                cookie: {maxAge: 1000 * 60}}))
  .use(authRoute)
  .listen(PORT, () => console.log(`Listening on ${PORT}`));