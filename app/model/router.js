/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('router', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    uuid: {
      type: DataTypes.STRING(36),
      allowNull: false,
      field: 'uuid'
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
      field: 'path'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
      field: 'name'
    },
    parentId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'parent_id'
    },
    menuType: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'menu_type'
    },
    order: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'order'
    },
    projectId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'project_id'
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'user_id'
    },
    isDelete: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'is_delete'
    },
    createdAt: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'updated_at'
    },
    deletedAt: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'deleted_at'
    }
  }, {
    tableName: 'router'
  });

  Model.associate = function() {

  }

  return Model;
};
