//////////////////////////////////////////////////////////////////////////
//GithubStrategy.js
//The following code sets up the app with OAuth authentication using
//the 'github' strategy in passport.js.
//////////////////////////////////////////////////////////////////////////
import passportGithub from 'passport-github'; 

const githubStrategy = new passportGithub.Strategy ({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.DEPLOY_URL + "/auth/github/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    // TO DO: If user in profile object isn’t yet in our database, add the user here
    return done(null, profile);
  }
);

export default githubStrategy;