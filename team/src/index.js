import express from "express";
import cors from "cors";
import routes from "./routes/index";

import swaggerDocs from "./api-docs/swagger";

import passport from "./middlewares/Oauth";

import Oauthroute from "./routes/auth";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

swaggerDocs(app);

app.get("/", (_, res) => {
  res.status(200).json("Welcome to our Ecommerce App");
});
app.use("/", routes);

// route for signin with google
app.use(passport.initialize());
app.use("/", Oauthroute);
app.get("/welcome", (_, res) => {
  res
    .status(200)
    .json("Welcome to our Ecommerce app! Login with google successful");
});

export default app;





PORT=5000

DB_HOST='trumpet.db.elephantsql.com'
DB_USERNAME='nqhcrazp'
DB_PASSWORD='LZ9w038v819k2sCP4CDz-xw-8YNxXvXQ'
DEV_DATABASE='nqhcrazp'
TEST_DATABASE='e_commerce_test'




DEV_DATABASE_URL=postgres://postgres:eskidah12@127.0.0.1:5432/e_commerce_dev 
TEST_DATABASE_URL=postgres://postgres:eskidah12@127.0.0.1:5432/ e_commerce_test



client_id='143007919739-13o8dsavu99cdlv0nl9uvgn0ma7bposh.apps.googleusercontent.com'
client_secret='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'

JWT_SECRET="mysecret"