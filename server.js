//////////////////////////////////////////////////////////////////////////
//IMPORTS AND VARIABLE INITIALIZATIONS
//The following code imports necessary dependencies and initializes
//variables used in the server middleware.
//////////////////////////////////////////////////////////////////////////
//import path from 'path';
import { URL } from 'url';
import express from 'express';
import passportConfig from './passport/config.js';
import authRoute from './routes/authRoutes.js';
const PORT = process.env.PORT || process.env.LOCAL_PORT;
const app = express(); //Instantiate express app
const buildPath = (PORT === process.env.PORT) ?
  new URL('client/build/', import.meta.url).pathname :
  (new URL('client/build/', import.meta.url).pathname).substring(1);
  

//////////////////////////////////////////////////////////////////////////
//INITIALIZE EXPRESS APP
// The following code uses express.static to serve the React app defined 
//in the client/ directory at PORT.
/////////////////////////////////////////////////////////////////////////

passportConfig(app); //Configure session and passport
app
  .use(express.static(buildPath))
  .use(authRoute)
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
  