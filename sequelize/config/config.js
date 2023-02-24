const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

module.exports = {
  development: {
    url: `${process.env.DEV_DATABASE_URL}`,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    "models-path": "./models",
    "migrations-path": "./migrations",
  },
  test: {
    url: `${process.env.TEST_DATABASE_URL}`,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    "models-path": "./models",
    "migrations-path": "./migrations",
  },
  production: {
    url: `${process.env.DATABASE_URL}`,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    "models-path": "./models",
    "migrations-path": "./migrations",
  },
};
