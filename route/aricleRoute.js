const { Article } = require("../sequelize/models");

const Router = require("express");

const Articleroute = Router();

Articleroute.get("/articles", async (req, res) => {
  console.log(Article);
  try {
    const users = await Article.findAll();
    // return the list of users
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
})

  // get all users
  .get("/article/:id", async (req, res) => {
    try {
      const users = await Article.findAll({
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
  })
  // create a new user
  .post("/articles", async (req, res) => {
    try {
      const { image, title, content, user_id } = req.body;

      // create a new user record in the database
      const article = await Article.create({
        image,
        title,
        content,
        user_id,
      });

      // return the newly created user
      res.status(201).json({ status: "success", post: article });
    } catch (error) {
      // handle errors
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  })

  // delete user
  .delete("/delete/:id", async (req, res) => {
    try {
      const user = await Article.destroy({
        where: {
          user_id: `${req.params.id}`,
        },
      });

      // return the list of users
      res.status(204).json({ status: "success", post: user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

  // update user

  .put("/update/:id", async (req, res) => {
    try {
      // update  user record in the database

      const { image, title, content, user_id } = req.body;

      const article = await Article.create(
        {
          image,
          title,
          content,
          user_id,
        },
        { where: { user_id: req.params.id } }
      );

      // return the newly created user
      res.status(201).json({ status: "success", post: article });
    } catch (error) {
      // handle errors
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

module.exports = Articleroute;
