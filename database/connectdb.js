require("dotenv").config();
const { sequelize } = require("../sequelize/models");

const connectDb = async () => {
  console.log("checking datbase connection");

  try {
    await sequelize.authenticate();
    console.log("db connected successful");
  } catch (error) {
    console.log("db connection failed", error.message);
  }
};

module.exports = connectDb;
