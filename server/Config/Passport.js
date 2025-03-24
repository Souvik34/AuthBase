const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             callbackURL: "/api/v1/auth/google/callback",
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 let user = await UserModel.findOne({ email: profile.emails[0].value });

//                 if (!user) {
//                     user = new UserModel({
//                         name: profile.displayName,
//                         email: profile.emails[0].value,
//                         password: "oauth_google", // No real password needed
//                     });
//                     await user.save();
//                 }

//                 const token = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, {
//                     expiresIn: "24h",
//                 });

//                 return done(null, { user, token });
//             } catch (error) {
//                 return done(error, null);
//             }
//         }
//     )
// );

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "/api/v1/auth/github/callback",
            scope: ["user:email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let email = profile.emails ? profile.emails[0].value : null;
                if (!email) return done(new Error("Email not found"), null);

                let user = await UserModel.findOne({ email });

                if (!user) {
                    user = new UserModel({
                        name: profile.displayName || profile.username,
                        email,
                        password: "oauth_github", // No real password needed
                    });
                    await user.save();
                }

                const token = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: "24h",
                });

                return done(null, { user, token });
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
