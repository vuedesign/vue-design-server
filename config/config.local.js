exports.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'design_building_dev',
    username: "root",
    password: "wujian798",
    define: {
      freezeTableName: false,
      underscored: true,
      timestamps: false
    },
    timezone: '+08:00' // 保存为本地时区
};
