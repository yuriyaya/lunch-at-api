const utilFunc = require("../utils");
const dbConn = require("../../conf/db");
const dbPool = dbConn.init();

const MenuRatings = function () {};

MenuRatings.getAllMenuRatings = (id, result) => {
  dbPool.query(
    `SELECT * FROM menu_ratings WHERE menu_id=${id} ORDER BY datetime DESC`,
    (err, res) => {
      if (err) {
        utilFunc.printLog("error: " + err);
        result(null, err);
        return;
      }

      utilFunc.printLog("menu ratings: " + res);
      result(null, res);
    }
  );
};

MenuRatings.addMenuRating = (newRating, result) => {
  dbPool.query("INSERT INTO menu_ratings SET ?", newRating, (err, res) => {
    if (err) {
      utilFunc.printLog("error: " + err);
      result(err, null);
      return;
    }

    utilFunc.printLog(
      "added menu_ratings: " + { id: res.insertId, ...newRating }
    );
    result(null, { id: res.insertId, ...newRating });
  });
};

MenuRatings.deleteMenuRating = (id, result) => {
  dbPool.query("DELETE FROM menu_ratings WHERE id = ?", id, (err, res) => {
    if (err) {
      utilFunc.printLog("error: " + err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    utilFunc.printLog("deleted menu_ratings with id: " + id);
    result(null, res);
  });
};
4;

MenuRatings.searchMenuRating = (keyword, result) => {
  let sql =
    "SELECT menu_id, AVG(rating) AS avg_rating FROM menu_ratings GROUP BY menu_id HAVING avg_rating >=";
  if (keyword["ratings"]) {
    sql += `${keyword["ratings"]}`;
  }
  dbPool.query(sql, (err, res) => {
    if (err) {
      utilFunc.printLog("error: " + err);
      result(err, null);
      return;
    }

    if (res.length) {
      utilFunc.printLog("found menu_ratings: " + res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

module.exports = MenuRatings;
