"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Users", "userId", "user_id");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Users", "user_id", "userId");
  },
};
