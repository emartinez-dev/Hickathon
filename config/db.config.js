const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

module.exports = {
  HOST: 'localhost',
  USER: dbUser,
  PASSWORD: dbPassword,
  DB: 'api',
  dialect: 'postgres',
};
