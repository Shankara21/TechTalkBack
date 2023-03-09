require("dotenv").config();
const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  DB_DIALECT = mysql,
} = process.env;
module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "iot_prod",
    password: "123456",
    database: "techtalk",
    host: "192.168.9.47",
    dialect: "mysql",
  },
};
