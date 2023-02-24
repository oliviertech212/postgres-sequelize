const express = require("express");

require("dotenv").config();

const { sequelize, User } = require("./sequelize/models");

const app = express();

app.use(express.json());

// get all users
app.get("/users", async (req, res) => {
  try {
    // const users = await User.findAll({
    //   attributes: [
    //     ["id", "Id"],
    //     "first_name",
    //     [sequelize.fn("COUNT", sequelize.col("first_name")), "n_id"],
    //   ],
    //   group: ["id"],
    // });
    const users = await User.findAll();
    // return the list of users
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// get all users
app.get("/user/:id", async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        user_id: `${req.params.id}`,
      },
    });

    // return the list of users
    res.json(users);
  } catch (error) {
    // handle errors
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
// create a new user
app.post("/users", async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;

    // create a new user record in the database
    const user = await User.create({
      first_name,
      last_name,
      email,
    });

    // return the newly created user
    res.status(201).json({ status: "success", post: user });
  } catch (error) {
    // handle errors
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// delete user
app.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.destroy({
      where: {
        user_id: `${req.params.id}`,
      },
    });

    // return the list of users
    res.status(204).json({ status: "success", post: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update user

app.put("/update/:id", async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;

    // update  user record in the database
    const user = await User.update(
      {
        first_name,
        last_name,
        email,
      },
      { where: { user_id: req.params.id } }
    );

    // return the newly created user
    res.status(201).json({ status: "success", post: user });
  } catch (error) {
    // handle errors
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const connectDb = async () => {
  console.log("checking datbase connection");

  try {
    await sequelize.authenticate();
    console.log("db connected successful");
  } catch (error) {
    console.log("db connection failed", error);
  }
};

(async () => {
  await connectDb();
  app.listen(3000, () => {
    console.log("server is running ");
  });
})();
