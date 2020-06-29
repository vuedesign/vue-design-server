/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('page', {
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
    htmlTag: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'html_tag'
    },
    tagId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'tag_id'
    },
    projectId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'project_Id'
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
    options: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'options'
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
    }
  }, {
    tableName: 'page'
  });

  Model.associate = function() {

  }

  return Model;
};
