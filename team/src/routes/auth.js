import passport from "passport";

import express from "express";

const Oauthroute = express.Router();

Oauthroute.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false
  })
);

Oauthroute.get(
  "/auth/google/redirect",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `https://localhost:5000/login`
  }),
  (req, res) => {
    res.redirect(req.user); // req.user has the redirection_url
    // res.redirect("https://www.linkedin.com/in/olivier-ganishuri-279aaa240/");
  }
);

export default Oauthroute;
