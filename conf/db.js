const mysql = require("mysql");
const utilFunc = require("../src/utils");

const dbConnection = {
  init: function () {
    return mysql.createPool({
      connectionLimit: 10,
      host: process.env.host,
      port: process.env.port,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database,
      dateStrings: "date",
    });
  },
};

module.exports = dbConnection;
