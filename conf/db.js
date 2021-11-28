const mysql = require("mysql");

const dbConnection = {
  init: function () {
    return mysql.createConnection({
      host: process.env.host,
      port: process.env.port,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database,
    });
  },
  open: function (con) {
    con.connect((err) => {
      if (err) {
        console.log("MySQL connection fail : ", err);
      } else {
        console.log("MySQL Connected!!!");
      }
    });
  },
  close: function (con) {
    con.end((err) => {
      if (err) {
        console.log("MySQL close fail : ", err);
      } else {
        console.log("MySQL Terminated...");
      }
    });
  },
};

module.exports = dbConnection;
