/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('api', {
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
    moduleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'module_id'
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
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'url'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'name'
    },
    method: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'method'
    },
    description: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'description'
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
    tableName: 'api'
  });

  Model.associate = function() {
  }

  return Model;
};
