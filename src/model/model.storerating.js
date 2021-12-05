const dbConn = require("../../conf/db");
const db = dbConn.init();
dbConn.open(db);

const StoreRatings = function () {};

StoreRatings.getAllStoreRatings = (id, result) => {
  db.query(
    `SELECT * FROM store_ratings WHERE store_id=${id} ORDER BY datetime DESC`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("store ratings: ", res);
      result(null, res);
    }
  );
};

StoreRatings.addStoreNewRating = (newStoreRating, result) => {
  db.query("INSERT INTO store_ratings SET ?", newStoreRating, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("added store: ", { id: res.insertId, ...newStoreRating });
    result(null, { id: res.insertId, ...newStoreRating });
  });
};

StoreRatings.deleteStoreRating = (id_srating, result) => {
  db.query("DELETE FROM store_ratings WHERE id = ?", id_srating, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted store_ratings with id: ", id_srating);
    result(null, res);
  });
};
4;

StoreRatings.searchStoreRating = (keyword, result) => {
  let sql =
    "SELECT store_id, AVG(rating) AS avg_rating FROM store_ratings GROUP BY store_id HAVING avg_rating >=";
  if (keyword["ratings"]) {
    sql += `${keyword["ratings"]}`;
  }
  console.log(sql);
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

module.exports = StoreRatings;
