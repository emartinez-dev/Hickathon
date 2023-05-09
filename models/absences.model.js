const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Absence = sequelize.define('absences', {
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    workingDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'denied'),
      default: 'pending',
      allowNull: false,
    },
  });
  return Absence;
};
