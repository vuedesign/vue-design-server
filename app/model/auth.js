/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('auth', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'token'
    },
    userId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      field: 'user_id'
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
    tableName: 'auth'
  });

  Model.associate = function() {

  }

  return Model;
};
