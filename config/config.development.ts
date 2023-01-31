/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default () => ({
  database: {
    dialect: process.env.DB_DIALECT || 'Postgres',
    host: process.env.DB_HOST || 'localhost',
    port:  process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || ' ',
    database: process.env.DB_NAME_DEVELOPMENT || 'ToDo',
  },
});