const dbConn = require("../../conf/db");
const db = dbConn.init();
dbConn.open(db);

const Menu = function () {};

Menu.getAllStoreMenu = (id, result) => {
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

Menu.addStoreNewMenu = (newMenu, result) => {
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

Menu.getMenuById = (id_menu, result) => {
  db.query(`SELECT * FROM menus WHERE id=${id_menu}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("menus: ", res);
    result(null, res);
  });
};

Menu.updateMenuById = (id_menu, req_menu, result) => {
  db.query(
    "UPDATE menus SET name = ?, store_id = ? WHERE id = ?",
    [req_menu.name, req_menu.store_id, id_menu],
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

      console.log("updated menu: ", { id: id_menu, ...req_menu });
      result(null, { id: id_menu, ...req_menu });
    }
  );
};

Menu.deleteMenu = (id_menu, result) => {
  db.query("DELETE FROM menus WHERE id = ?", id_menu, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted menus with id: ", id_menu);
    result(null, res);
  });
};

Menu.findMenu = (keyword, result) => {
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

module.exports = Menu;
