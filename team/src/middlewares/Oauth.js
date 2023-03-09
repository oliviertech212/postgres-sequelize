// /* eslint-disable import/no-extraneous-dependencies */

import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../database/models";

dotenv.config();

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      callbackURL: `http://localhost:5000/auth/google/redirect`,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      clientID: process.env.client_id,
      clientSecret: process.env.client_secret
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Access Token: ", accessToken);
      // console.log("Refresh Token: ", refreshToken);
      // console.log("Profile: ", profile);
      // console.log("Callback: ", done);

      try {
        const userEmail = profile.emails && profile.emails[0].value;

        const users = await User.findAll({});

        console.log("alll users", users);

        const user = await User.findOne({ where: { email: userEmail } });
        let redirectUrl = "";
        if (user) {
          const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
            expiresIn: "1h"
          });

          redirectUrl = `http://localhost:5000/welcome`;
          return done(null, redirectUrl);
        }
        if (!user) {
          const newUser = await User.create({ email: userEmail });
          const token = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET, {
            expiresIn: "1h"
          });
          redirectUrl = `http://localhost:5000/welcome`;
          return done(null, redirectUrl);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
