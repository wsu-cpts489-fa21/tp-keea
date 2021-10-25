import passport from 'passport';
import session from 'express-session';
import githubStrategy from './githubStrategy.js'

const passportConfig = (app) => {

    passport.use(githubStrategy);  

    passport.serializeUser((user, done) => {
        console.log("In serializeUser.");
        //Note: The code does not use a back-end database. When we have back-end 
        //database, we would put user info into the database in the callback 
        //above and only serialize the unique user id into the session
        let userObject = {
            id: user.username,
            provider : user.provider,
            profileImageUrl : user.photos[0].value
        };
        done(null, userObject);
    });
    
    passport.deserializeUser((user, done) => {
        console.log("In deserializeUser.");
        //TO DO: Look up the user in the database and attach their data record to
        //req.user. For the purposes of this demo, the user record received as a param 
        //is just being passed through, without any database lookup.
        done(null, user);
    }); 

    app.use(session({secret: process.env.SESSION_SECRET, 
                resave: false,
                saveUninitialized: false,
                cookie: {maxAge: 1000 * 60}}))
  
        .use(passport.initialize())
        .use(passport.session());
}

  export default passportConfig;