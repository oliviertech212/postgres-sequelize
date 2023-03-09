"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Articles", "createdAt", "created_at");
    await queryInterface.renameColumn("Articles", "updatedAt", "updated_at");

    await queryInterface.renameColumn("Comments", "createdAt", "created_at");
    await queryInterface.renameColumn("Comments", "updatedAt", "updated_at");

    await queryInterface.renameColumn("Likes", "createdAt", "created_at");
    await queryInterface.renameColumn("Likes", "updatedAt", "updated_at");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Articles", "created_at", "createdAt");
    await queryInterface.renameColumn("Articles", "updated_at", "updatedAt");

    await queryInterface.renameColumn("Comments", "created_at", "createdAt");
    await queryInterface.renameColumn("Comments", "updated_at", "updatedAt");

    await queryInterface.renameColumn("Likes", "created_at", "createdAt");
    await queryInterface.renameColumn("Likes", "updated_at", "updatedAt");
  },
};
