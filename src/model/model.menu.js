const utilFunc = require("../utils");
const dbConn = require("../../conf/db");
const dbPool = dbConn.init();

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

Menu.addStoreNewMenu = (newMenu, result) => {
  utilFunc.printLog(newMenu);
  dbPool.query("INSERT INTO menus SET ?", newMenu, (err, res) => {
    if (err) {
      utilFunc.printLog("error: " + err);
      result(err, null);
      return;
    }

    utilFunc.printLog("added menu: " + { id: res.insertId, ...newMenu });
    result(null, { id: res.insertId, ...newMenu });
  });
};

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

Menu.updateMenuById = (id_menu, req_menu, result) => {
  dbPool.query(
    "UPDATE menus SET name = ?, store_id = ? WHERE id = ?",
    [req_menu.name, req_menu.store_id, id_menu],
    (err, res) => {
      if (err) {
        utilFunc.printLog("error: " + err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      utilFunc.printLog("updated menu: " + { id: id_menu, ...req_menu });
      result(null, { id: id_menu, ...req_menu });
    }
  );
};

Menu.deleteMenu = (id_menu, result) => {
  dbPool.query("DELETE FROM menus WHERE id = ?", id_menu, (err, res) => {
    if (err) {
      utilFunc.printLog("error: " + err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    utilFunc.printLog("deleted menus with id: " + id_menu);
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

  dbPool.query(sql, (err, res) => {
    if (err) {
      utilFunc.printLog("error: " + err);
      result(err, null);
      return;
    }

    if (res.length) {
      utilFunc.printLog("found menu: " + res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Menu.getStoreAllMenu = (id, result) => {
  dbPool.query(
    `SELECT DISTINCT name FROM menus WHERE store_id=${id} ORDER BY name ASC`,
    (err, res) => {
      if (err) {
        utilFunc.printLog("error: " + err);
        result(null, err);
        return;
      }

      utilFunc.printLog("menus: " + res);
      result(null, res);
    }
  );
};

Menu.getAllMenuStore = (result) => {
  dbPool.query(
    `SELECT stores.id, stores.name, menus.id as mid, menus.name as mname FROM stores RIGHT OUTER JOIN menus ON stores.id = menus.store_id ORDER BY menus.name ASC`,
    (err, res) => {
      if (err) {
        utilFunc.printLog("error: " + err);
        result(null, err);
        return;
      }

      utilFunc.printLog("menus-stores: " + res);
      result(null, res);
    }
  );
};

Menu.getAllMenuRatingList = (result) => {
  dbPool.query(
    `SELECT mr.id, mr.store_id, mr.name AS mname, mr.menu_id, mr.avg_rate, mr.max_rate, mr.min_rate, mr.rate_cnt, stores.name, stores.category, stores.loc_quick, stores.link, stores.distance FROM (SELECT * FROM menus LEFT JOIN (SELECT menu_ratings.menu_id, AVG(menu_ratings.rating) AS avg_rate, MAX(menu_ratings.rating) AS max_rate, MIN(menu_ratings.rating) AS min_rate, COUNT(menu_ratings.rating) as rate_cnt FROM menu_ratings GROUP BY menu_ratings.menu_id) AS r ON menus.id=r.menu_id) as mr LEFT JOIN stores ON mr.store_id = stores.id`,
    (err, res) => {
      if (err) {
        utilFunc.printLog("error: " + err);
        result(null, err);
        return;
      }

      utilFunc.printLog("menus-stores: " + res);
      result(null, res);
    }
  );
};

Menu.getStoreMenuRatingList = (id, result) => {
  dbPool.query(
    `SELECT menus.store_id, menus.name, menu_ratings.id, menu_ratings.menu_id, menu_ratings.rating, menu_ratings.comment, menu_ratings.datetime FROM menus RIGHT OUTER JOIN menu_ratings ON menus.id = menu_ratings.menu_id WHERE menus.store_id = ${id} ORDER BY menus.name ASC, menu_ratings.datetime DESC`,
    (err, res) => {
      if (err) {
        utilFunc.printLog("error: " + err);
        result(null, err);
        return;
      }

      utilFunc.printLog("menus-stores: " + res);
      result(null, res);
    }
  );
};

module.exports = Menu;
