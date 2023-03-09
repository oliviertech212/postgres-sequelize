const { Comment } = require("../sequelize/models");

const Router = require("express");

const Commentroute = Router();

Commentroute.get("/comments", async (req, res) => {
  console.log(Comment);
  try {
    const users = await Comment.findAll();
    // return the list of users
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
})

  // get all users
  .get("/comment/:id", async (req, res) => {
    try {
      const users = await Comment.findAll({
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
  .post("/comments", async (req, res) => {
    try {
      const { article_id, comment, user_id } = req.body;

      // create a new user record in the database
      const article = await Comment.create({
        article_id,
        comment,
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
      const user = await Comment.destroy({
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
      const { first_name, last_name, email } = req.body;

      // update  user record in the database
      const user = await Comment.update(
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

module.exports = Commentroute;
