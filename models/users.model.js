const { DataTypes } = require('sequelize');
const crypto = require('crypto');

const sha256 = (x) => crypto.createHash('sha256').update(x, 'utf-8').digest('hex');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('password', sha256(value));
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('employee', 'manager'),
      default: 'employee',
      allowNull: false,
    },
    remainingDays: {
      type: DataTypes.INTEGER,
      defaultValue: 23,
      allowNull: false,
    },
  });
  return User;
};
