const db = require('../models');

const Absence = db.absences;

exports.create = async (req, res) => {
  const absence = {
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    workingDays: req.body.workingDays,
    status: req.body.status,
    userId: req.body.userId,
  };
  await Absence.create(absence).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Error creating Absence',
    });
  });
};

exports.findAll = async (req, res) => {
  await Absence.findAll({ include: [{ model: db.users }] }).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Error getting Absences',
    });
  });
};

exports.findOne = async (req, res) => {
  const { id } = req.params;

  await Absence.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Couldn't find Absence with id=${id}.`,
        });
      }
    }).catch((err) => {
      res.status(500).send({
        message: err.message || `Error getting Absence with id=${id}`,
      });
    });
};

exports.findParams = async (req, res) => {
  const {
    startDate,
    endDate,
    status,
    userId,
  } = req.body;

  const whereObj = {};
  if (startDate) { whereObj.startDate = startDate; }
  if (endDate) { whereObj.endDate = endDate; }
  if (status) { whereObj.status = status; }
  if (userId) { whereObj.userId = userId; }

  await Absence.findAll({
    where: whereObj,
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Couldn\'t find Absence with params introduced.',
        });
      }
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Error getting Absence with params introduced.',
      });
    });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const {
    startDate, endDate, workingDays, status,
  } = req.body;

  const user = await Absence.findByPk(id);
  if (!user) {
    return res.status(404).json({ message: 'Absence not found' });
  }
  await Absence.update(
    {
      startDate, endDate, workingDays, status,
    },
    { where: { id } },
  );
  return res.status(200).json({ message: 'Absence updated succesfully' });
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  await Absence.destroy({
    where: { id },
  }).then((num) => {
    if (num === 1) {
      res.send({
        message: 'Absence was deleted successfully',
      });
    } else {
      res.send({
        message: `Cannot delete Absence with id=${id}. Maybe Absence was not found`,
      });
    }
  }).catch(() => {
    res.status(500).send({
      message: `Could not delete Absence with id=${id}`,
    });
  });
};
