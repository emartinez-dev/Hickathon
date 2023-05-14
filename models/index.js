const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./users.model')(sequelize, Sequelize);
db.absences = require('./absences.model')(sequelize, Sequelize);

db.users.hasMany(db.absences, {
  foreignKey: 'userId',
});

db.absences.belongsTo(db.users, {
  foreignKey: 'userId',
});

module.exports = db;
