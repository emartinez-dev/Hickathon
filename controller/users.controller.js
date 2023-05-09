const db = require('../models');

const User = db.users;
const { Op } = db.Sequelize;

exports.create = (req, res) => {
  const user = {
    login: req.body.login,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    remainingDays: req.body.remainingDays,
  };
  User.create(user).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Error creating User',
    });
  });
};

exports.findAll = (req, res) => {
  User.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Error getting Users',
    });
  });
};
