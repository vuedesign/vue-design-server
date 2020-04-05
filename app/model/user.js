/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    uuid: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      field: 'uuid'
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'username'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'email'
    },
    phone: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'phone'
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'password'
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
    tableName: 'user'
  });

  Model.associate = function() {

  }

  return Model;
};
