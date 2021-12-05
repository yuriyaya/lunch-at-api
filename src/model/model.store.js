const utilFunc = require("../utils");
const dbConn = require("../../conf/db");
const dbPool = dbConn.init();
// dbConn.open(db);

const Store = function () {};

Store.getAllStore = (result) => {
  dbPool.query("SELECT * FROM stores", (err, res) => {
    if (err) {
      utilFunc.printLog("error: " + err);
      result(null, err);
      return;
    }

    utilFunc.printLog("stores: " + res);
    result(null, res);
  });
};

// Store.addNewStore = (newStore, result) => {
//   db.query("INSERT INTO stores SET ?", newStore, (err, res) => {
//     if (err) {
//       utilFunc.printLog("error: " + err);
//       result(err, null);
//       return;
//     }

//     utilFunc.printLog("added store: " + { id: res.insertId, ...newStore });
//     result(null, { id: res.insertId, ...newStore });
//   });
// };

Store.getStoreById = (id, result) => {
  dbPool.query(`SELECT * FROM stores WHERE id = ${id}`, (err, res) => {
    if (err) {
      utilFunc.printLog("error: " + err);
      result(err, null);
      return;
    }

    if (res.length) {
      utilFunc.printLog("found store: " + res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

// Store.updateStoreById = (id, store, result) => {
//   db.query(
//     "UPDATE stores SET name = ?, category = ?, loc_quick = ?, link = ?, distance = ?  WHERE id = ?",
//     [
//       store.name,
//       store.category,
//       store.loc_quick,
//       store.link,
//       store.distance,
//       id,
//     ],
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

//       utilFunc.printLog("updated store: " + { id: id, ...store });
//       result(null, { id: id, ...store });
//     }
//   );
// };

// Store.deleteStore = (id, result) => {
//   db.query("DELETE FROM stores WHERE id = ?", id, (err, res) => {
//     if (err) {
//       utilFunc.printLog("error: " + err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     utilFunc.printLog("deleted store with id: " + id);
//     result(null, res);
//   });
// };

// Store.searchStore = (keyword, result) => {
//   let sql = "SELECT * from stores ";
//   if (keyword["name"]) {
//     //name search
//     const existingParams = ["name"].filter((field) => keyword[field]);
//     if (existingParams.length) {
//       sql += " WHERE ";
//       sql += existingParams
//         .map((field) => `${field} LIKE "%${keyword[field]}%"`)
//         .join(" AND ");
//     }
//   } else {
//     //category & distance search
//     const existingParams = ["category", "distance"].filter(
//       (field) => keyword[field]
//     );
//     if (existingParams.length) {
//       sql += " WHERE ";
//       sql += existingParams
//         .map((field) => {
//           if (field === "category") {
//             return `${field} = "${keyword[field]}"`;
//           } else {
//             return `${field} <= ${keyword[field]}`;
//           }
//         })
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
//       utilFunc.printLog("found store: " + res);
//       result(null, res);
//       return;
//     }

//     result({ kind: "not_found" }, null);
//   });
// };

module.exports = Store;
