import passport from 'passport';
import session from 'express-session';
import githubStrategy from './githubStrategy.js';
import localStrategy from './localStrategy.js';
import User from '../models/User.js';

const passportConfig = (app) => {

    passport.use(githubStrategy);  
    passport.use(localStrategy);

    passport.serializeUser((user, done) => {
        console.log("In serializeUser.");
        console.log("Contents of user param: " + JSON.stringify(user));
        done(null,user.accountData.id);
    });
        
    passport.deserializeUser(async (userId, done) => {
        console.log("In deserializeUser.");
        let thisUser;
        try {
          thisUser = await User.findOne({"accountData.id": userId});
          console.log("User with id " + userId + 
            " found in DB. User object will be available in server routes as req.user.")
          done(null,thisUser);
        } catch (err) {
          done(err);
        }
      });
      

    app.use(session({secret: process.env.SESSION_SECRET, 
                resave: false,
                saveUninitialized: false,
                cookie: {maxAge: 1000 * 60}}))
  
        .use(passport.initialize())
        .use(passport.session());
}

  export default passportConfig;