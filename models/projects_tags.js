'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projects_Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Projects_Tags.belongsTo(models.Projects);
      Projects_Tags.belongsTo(models.Tags);
    }
  }
  Projects_Tags.init({
    ProjectId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Projects_Tags',
  });
  return Projects_Tags;
};