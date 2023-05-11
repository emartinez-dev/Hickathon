const db = require('../models');

const User = db.users;

exports.create = async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    remainingDays: req.body.remainingDays,
  };
  const exists = await User.findAll({ where: { email: user.email } });
  if (exists.length > 0) {
    res.status(200).send({ message: 'User already registered' });
  } else {
    User.create(user).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Error creating User',
      });
    });
  }
};

exports.findAll = async (req, res) => {
  await User.findAll().then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Error getting Users',
    });
  });
};

exports.findOne = async (req, res) => {
  const { id } = req.params;

  await User.findByPk(id)
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

exports.findParams = async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    role,
    remainingDays,
  } = req.body;

  const whereObj = {};
  if (email) { whereObj.email = email; }
  if (firstName) { whereObj.firstName = firstName; }
  if (lastName) { whereObj.lastName = lastName; }
  if (role) { whereObj.role = role; }
  if (remainingDays) { whereObj.remainingDays = remainingDays; }

  await User.findAll({
    where: whereObj,
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Couldn\'t find User with params introduced.',
        });
      }
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Error getting User with params introduced.',
      });
    });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const {
    email, firstName, password, lastName, role, remainingDays,
  } = req.body;

  const user = User.findByPk(id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  await User.update(
    {
      email, firstName, password, lastName, role, remainingDays,
    },
    { where: { id } },
  );
  return res.status(200).json({ message: 'User updated succesfully' });
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  await User.destroy({
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
