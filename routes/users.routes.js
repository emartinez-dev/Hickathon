module.exports = (app) => {
  const Users = require('../controller/users.controller');
  const router = require('express').Router();

  router.post('/create', Users.create);
  router.get('/all', Users.findAll);

  app.use('/api/users', router);
};
