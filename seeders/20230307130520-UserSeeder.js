"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        username: "admin",
        fullname: "Muhammad Lazuardi Timur",
        email: "admin@gmail.com",
        password:
          "$2a$12$nNW7oDhxFUTRa75CtSiaLuQhKw9VPKwk59xtd1YM7pZsX07Ph/TYW",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
