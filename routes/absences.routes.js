module.exports = (app) => {
  const Absences = require('../controller/absences.controller');
  const router = require('express').Router();

  router.get('/', Absences.findAll);
  router.post('/create', Absences.create);
  router.get('/:id', Absences.findOne);
  router.put('/:id', Absences.update);
  router.delete('/:id', Absences.delete);

  app.use('/api/absences', router);
};
