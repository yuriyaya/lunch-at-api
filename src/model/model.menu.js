const utilFunc = require("../utils");
const dbConn = require("../../conf/db");
const dbPool = dbConn.init();
// dbConn.open(db);

const Menu = function () {};

Menu.getAllStoreMenu = (id, result) => {
  dbPool.query(`SELECT * FROM menus WHERE store_id=${id}`, (err, res) => {
    if (err) {
      utilFunc.printLog("error: " + err);
      result(null, err);
      return;
    }

    utilFunc.printLog("menus: " + res);
    result(null, res);
  });
};

// Menu.addStoreNewMenu = (newMenu, result) => {
//   utilFunc.printLog(newMenu);
//   db.query("INSERT INTO menus SET ?", newMenu, (err, res) => {
//     if (err) {
//       utilFunc.printLog("error: " + err);
//       result(err, null);
//       return;
//     }

//     utilFunc.printLog("added menu: " + { id: res.insertId, ...newMenu });
//     result(null, { id: res.insertId, ...newMenu });
//   });
// };

Menu.getMenuById = (id_menu, result) => {
  dbPool.query(`SELECT * FROM menus WHERE id=${id_menu}`, (err, res) => {
    if (err) {
      utilFunc.printLog("error: " + err);
      result(null, err);
      return;
    }

    utilFunc.printLog("menus: " + res);
    result(null, res);
  });
};

// Menu.updateMenuById = (id_menu, req_menu, result) => {
//   db.query(
//     "UPDATE menus SET name = ?, store_id = ? WHERE id = ?",
//     [req_menu.name, req_menu.store_id, id_menu],
//     (err, res) => {
//       if (err) {
//         utilFunc.printLog("error: " + err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       utilFunc.printLog("updated menu: " + { id: id_menu, ...req_menu });
//       result(null, { id: id_menu, ...req_menu });
//     }
//   );
// };

// Menu.deleteMenu = (id_menu, result) => {
//   db.query("DELETE FROM menus WHERE id = ?", id_menu, (err, res) => {
//     if (err) {
//       utilFunc.printLog("error: " + err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     utilFunc.printLog("deleted menus with id: " + id_menu);
//     result(null, res);
//   });
// };

// Menu.findMenu = (keyword, result) => {
//   let sql = "SELECT * from menus ";
//   if (keyword["name"]) {
//     //name search
//     const existingParams = ["name"].filter((field) => keyword[field]);
//     if (existingParams.length) {
//       sql += " WHERE ";
//       sql += existingParams
//         .map((field) => `${field} LIKE "%${keyword[field]}%"`)
//         .join(" AND ");
//     }
//   }

//   db.query(sql, (err, res) => {
//     if (err) {
//       utilFunc.printLog("error: " + err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       utilFunc.printLog("found menu: " + res);
//       result(null, res);
//       return;
//     }

//     result({ kind: "not_found" }, null);
//   });
// };

module.exports = Menu;
