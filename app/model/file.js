/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('file', {
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
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'name'
    },
    type: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'type'
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'path'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'content'
    },
    isDelete: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'is_delete'
    },
    moduleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'module_id'
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'user_id'
    },
    createdAt: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'created_at'
    },
    deletedAt: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'deleted_at'
    },
    updatedAt: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'updated_at'
    }
  }, {
    tableName: 'file'
  });

  Model.associate = function() {
    app.model.File.belongsTo(app.model.Module);
  }

  return Model;
};
