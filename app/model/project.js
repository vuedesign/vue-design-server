/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('project', {
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
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'description'
    },
    thumb: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'thumb'
    },
    logo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'logo'
    },
    tagId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'tag_id'
    },
    apiPrefixUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'api_prefix_url'
    },
    package: {
      type: DataTypes.STRING(5000),
      allowNull: true,
      field: 'package'
    },
    gitUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'git_url'
    },
    metaTitle: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'meta_title'
    },
    metaKeyword: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'meta_keyword'
    },
    metaDescription: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'meta_description'
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
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at',
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at',
      defaultValue: DataTypes.NOW
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deleted_at',
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'project'
  });

  Model.associate = function() {

  }

  return Model;
};
