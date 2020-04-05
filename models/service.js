/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('service', {
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
    htmlTag: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'html_tag'
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'name'
    },
    desrcription: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'desrcription'
    },
    tagId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'tag_id'
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
    options: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    },
    deletedAt: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'deleted_at'
    }
  }, {
    tableName: 'service'
  });

  Model.associate = function() {

  }

  return Model;
};
