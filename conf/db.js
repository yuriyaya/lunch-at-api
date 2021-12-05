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

// const dbConnection = {
//   init: function () {
//     return mysql.createConnection({
//       host: process.env.host,
//       port: process.env.port,
//       user: process.env.user,
//       password: process.env.password,
//       database: process.env.database,
//       dateStrings: "date",
//     });
//   },
//   open: function (con) {
//     con.connect((err) => {
//       if (err) {
//         utilFunc.printLog("MySQL connection fail : " + err);
//       } else {
//         utilFunc.printLog("MySQL Connected!!!");
//       }
//     });
//   },
//   close: function (con) {
//     con.end((err) => {
//       if (err) {
//         utilFunc.printLog("MySQL close fail : " + err);
//       } else {
//         utilFunc.printLog("MySQL Terminated...");
//       }
//     });
//   },
// };

module.exports = dbConnection;
