const db = require('../models');

const Absence = db.absences;

exports.create = (req, res) => {
  const absence = {
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    workingDays: req.body.workingDays,
    status: req.body.status,
  };
  Absence.create(absence).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Error creating Absence',
    });
  });
};

exports.findAll = (req, res) => {
  Absence.findAll().then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Error getting Absences',
    });
  });
};

exports.findOne = (req, res) => {
  const { id } = req.params;

  Absence.findByPk(id)
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

exports.update = (req, res) => {
  const { id } = req.params;
  const {
    startDate, endDate, workingDays, status,
  } = req.body;

  const user = Absence.findByPk(id);
  if (!user) {
    return res.status(404).json({ message: 'Absence not found' });
  }
  Absence.update(
    {
      startDate, endDate, workingDays, status,
    },
    { where: { id } },
  );
  return res.status(200).json({ message: 'Absence updated succesfully' });
};

exports.delete = (req, res) => {
  const { id } = req.params;

  Absence.destroy({
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
