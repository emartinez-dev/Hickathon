module.exports = (app) => {
  const Users = require('../controller/users.controller');
  const router = require('express').Router();

  router.get('/', Users.findAll);
  router.post('/create', Users.create);
  router.post('/find', Users.findParams);
  router.get('/:id', Users.findOne);
  router.put('/:id', Users.update);
  router.delete('/:id', Users.delete);

  app.use('/api/users', router);
};
