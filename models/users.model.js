const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
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
