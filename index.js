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

db.sequelize.sync({force: false}).then(() => {
  console.log('Sync OK');
}).catch((err) => {
  console.log('Sync failed: %s', err);
});

require('./routes/users.routes')(app);

app.listen(port, () => {
  console.log('app runing on port %d', port);
});
