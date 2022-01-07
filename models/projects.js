'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      console.log(models)
      Projects.belongsToMany(models.Tags, {
        through: 'Projects_Tags',
        as: 'Tags',
        foreignKey: 'ProjectId'
      });
    }
  }
  Projects.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    link: DataTypes.STRING,
    github: DataTypes.STRING,
    images: {
      type: DataTypes.JSON,
      defaultValue: []
    }
  }, {
    sequelize,
    modelName: 'Projects',
  });
  return Projects;
};