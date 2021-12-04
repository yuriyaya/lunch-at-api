const dbConn = require("../conf/db");
const db = dbConn.init();
dbConn.open(db);

const LunchAt = function () {};

LunchAt.getAllStore = (result) => {
  db.query("SELECT * FROM stores", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("stores: ", res);
    result(null, res);
  });
};

LunchAt.addNewStore = (newStore, result) => {
  db.query("INSERT INTO stores SET ?", newStore, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("added store: ", { id: res.insertId, ...newStore });
    result(null, { id: res.insertId, ...newStore });
  });
};

LunchAt.updateStoreById = (id, store, result) => {
  db.query(
    "UPDATE stores SET name = ?, category = ?, loc_quick = ?, link = ?, distance = ?  WHERE id = ?",
    [
      store.name,
      store.category,
      store.loc_quick,
      store.link,
      store.distance,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated store: ", { id: id, ...store });
      result(null, { id: id, ...store });
    }
  );
};

LunchAt.removeStore = (id, result) => {
  db.query("DELETE FROM stores WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted store with id: ", id);
    result(null, res);
  });
};

LunchAt.findStoreById = (id, result) => {
  db.query(`SELECT * FROM stores WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found store: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

LunchAt.findStore = (keyword, result) => {
  let sql = "SELECT * from stores ";
  if (keyword["name"]) {
    //name search
    const existingParams = ["name"].filter((field) => keyword[field]);
    if (existingParams.length) {
      sql += " WHERE ";
      sql += existingParams
        .map((field) => `${field} LIKE "%${keyword[field]}%"`)
        .join(" AND ");
    }
  } else {
    //category & distance search
    const existingParams = ["category", "distance"].filter(
      (field) => keyword[field]
    );
    if (existingParams.length) {
      sql += " WHERE ";
      sql += existingParams
        .map((field) => {
          if (field === "category") {
            return `${field} = "${keyword[field]}"`;
          } else {
            return `${field} <= ${keyword[field]}`;
          }
        })
        .join(" AND ");
    }
  }

  db.query(sql, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found store: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

LunchAt.getAllStoreMenu = (id, result) => {
  db.query(`SELECT * FROM menus WHERE store_id=${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("menus: ", res);
    result(null, res);
  });
};

LunchAt.addStoreNewMenu = (newMenu, result) => {
  console.log(newMenu);
  db.query("INSERT INTO menus SET ?", newMenu, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("added menu: ", { id: res.insertId, ...newMenu });
    result(null, { id: res.insertId, ...newMenu });
  });
};

LunchAt.updateStoreMenuById = (id2, req_menu, result) => {
  db.query(
    "UPDATE menus SET store_id = ?, name = ?  WHERE id = ?",
    [req_menu.store_id, req_menu.name, id2],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated menu: ", { id: id2, ...req_menu });
      result(null, { id: id2, ...req_menu });
    }
  );
};

LunchAt.getStoreMenuById = (id, id2, result) => {
  db.query(
    `SELECT * FROM menus WHERE store_id=${id} AND id=${id2}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("menus: ", res);
      result(null, res);
    }
  );
};

LunchAt.removeStoreMenu = (id2, result) => {
  db.query("DELETE FROM menus WHERE id = ?", id2, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted menus with id: ", id);
    result(null, res);
  });
};

LunchAt.findMenu = (keyword, result) => {
  let sql = "SELECT * from menus ";
  if (keyword["name"]) {
    //name search
    const existingParams = ["name"].filter((field) => keyword[field]);
    if (existingParams.length) {
      sql += " WHERE ";
      sql += existingParams
        .map((field) => `${field} LIKE "%${keyword[field]}%"`)
        .join(" AND ");
    }
  }

  db.query(sql, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found menu: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

module.exports = LunchAt;
