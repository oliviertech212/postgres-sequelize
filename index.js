const express = require("express");

const connectDb = require("./database/connectdb");

const route = require("./route/userRoute");
const Articleroute = require("./route/aricleRoute");

const Commentroute = require("./route/commentRoute");

const app = express();

app.use(express.json());

// user route
app.use("/", route);
app.use("/", Articleroute);
app.use("/", Commentroute);

(async () => {
  await connectDb();
  app.listen(3000, () => {
    console.log("server is running ");
  });
})();
