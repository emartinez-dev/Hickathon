const db = require('../models');

const User = db.users;

exports.create = (req, res) => {
  const user = {
    login: req.body.login,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    remainingDays: req.body.remainingDays,
  };
  User.create(user).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Error creating User',
    });
  });
};

exports.findAll = (req, res) => {
  User.findAll().then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Error getting Users',
    });
  });
};

exports.findOne = (req, res) => {
  const { id } = req.params;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Couldn't find User with id=${id}.`,
        });
      }
    }).catch((err) => {
      res.status(500).send({
        message: err.message || `Error getting User with id=${id}`,
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const {
    login, firstName, password, lastName, role, remainingDays,
  } = req.body;

  const user = User.findByPk(id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  User.update(
    {
      login, firstName, password, lastName, role, remainingDays,
    },
    { where: { id } },
  );
  return res.status(200).json({ message: 'User updated succesfully' });
};

exports.delete = (req, res) => {
  const { id } = req.params;

  User.destroy({
    where: { id },
  }).then((num) => {
    if (num === 1) {
      res.send({
        message: 'User was deleted successfully',
      });
    } else {
      res.send({
        message: `Cannot delete User with id=${id}. Maybe User was not found`,
      });
    }
  }).catch(() => {
    res.status(500).send({
      message: `Could not delete User with id=${id}`,
    });
  });
};
