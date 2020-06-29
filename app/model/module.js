/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('module', {
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
    description: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'description'
    },
    fileMap: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'file_map',
      set: function(value) {
        const data = JSON.stringify(value);
        this.setDataValue('fileMap', data);
      },
      get: function() {
        const fileMap = this.getDataValue('fileMap');
        if (!fileMap) {
          return '';
        }
        return JSON.parse(fileMap);
      }
    },
    isMenu: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'is_menu'
    },
    parentId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'parent_id'
    },
    projectId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'project_id'
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'user_id'
    },
    isDelete: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
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
    tableName: 'module'
  });

  Model.associate = function() {
    app.model.Module.hasMany(app.model.File, {
      foreignKey: 'moduleId'
    });
  }

  return Model;
};
