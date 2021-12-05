const dbConn = require("../../conf/db");
const db = dbConn.init();
dbConn.open(db);

const MenuRatings = function () {};

MenuRatings.getAllMenuRatings = (id, result) => {
  db.query(
    `SELECT * FROM menu_ratings WHERE menu_id=${id} ORDER BY datetime DESC`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("menu ratings: ", res);
      result(null, res);
    }
  );
};

MenuRatings.addMenuRating = (newRating, result) => {
  db.query("INSERT INTO menu_ratings SET ?", newRating, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("added store: ", { id: res.insertId, ...newRating });
    result(null, { id: res.insertId, ...newRating });
  });
};

MenuRatings.deleteMenuRating = (id, result) => {
  db.query("DELETE FROM menu_ratings WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted store_ratings with id: ", id);
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

module.exports = MenuRatings;
