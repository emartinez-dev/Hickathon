const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

db.sequelize.sync().then(() => {
  console.log('Sync OK');
}).catch((err) => {
  console.log('Sync failed: %s', err);
});

app.get('/', (request, response) => {
  response.json({
    info: 'Express API running!',
  });
});

app.listen(port, () => {
  console.log('app runing on port %d', port);
});
