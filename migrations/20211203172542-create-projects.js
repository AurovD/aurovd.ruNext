'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.createTable('Projects', {
    //   id: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER
    //   },
    //   title: {
    //     type: Sequelize.STRING
    //   },
    //   description: {
    //     type: Sequelize.TEXT
    //   },
    //   link: {
    //     type: Sequelize.STRING
    //   },
    //   github: {
    //     type: Sequelize.STRING
    //   },
    //   task: {
    //     type: Sequelize.STRING
    //   },
    //   images: {
    //     type: Sequelize.JSON
    //   },
    //   createdAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE
    //   },
    //   updatedAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE
    //   }
    // });
    await queryInterface.addColumn(
        'Projects', // table name
        'task', // new field name
        {
          type: Sequelize.STRING
        },
    )
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Projects');
  }
};