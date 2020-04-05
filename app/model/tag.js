/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('tag', {
    tagId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'tag_id'
    },
    tagName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'tag_name'
    },
    tagType: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'tag_type'
    },
    tagDescription: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'tag_description'
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
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
    tableName: 'tag'
  });

  Model.associate = function() {

  }

  return Model;
};
