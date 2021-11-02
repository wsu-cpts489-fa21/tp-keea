//////////////////////////////////////////////////////////////////////////
//GithubStrategy.js
//The following code sets up the app with OAuth authentication using
//the 'github' strategy in passport.js.
//////////////////////////////////////////////////////////////////////////
import passportGithub from 'passport-github'; 
import User from '../models/User.js';

const githubStrategy = new passportGithub.Strategy ({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.DEPLOY_URL + "/auth/github/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log("User authenticated through GitHub. In passport callback.");
    //Our convention is to build userId from displayName and provider
    const userId = `${profile.username}@${profile.provider}`;
    //See if document with this unique userId exists in database 
    let currentUser = await User.findOne({"accountData.id": userId});
    if (!currentUser) { //Add this user to the database
        currentUser = await new User({
          accountData: {id: userId},
          identityData: {displayName: profile.displayName,
                         profilePic: profile.photos[0].value},
          speedgolfData: {bio: "",
                          homeCourse: "",
                          personalBest: {},
                          clubs: {},
                          clubComments: ""}
      }).save();
    }
    return done(null,currentUser);
}

);

export default githubStrategy;