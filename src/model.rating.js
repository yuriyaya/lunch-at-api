const dbConn = require("../conf/db");
const db = dbConn.init();
dbConn.open(db);

const Ratings = function () {};

Ratings.getAllStoreRatings = (id, result) => {
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

Ratings.addStoreNewRating = (newStoreRating, result) => {
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

Ratings.removeStoreRating = (id, result) => {
  db.query("DELETE FROM store_ratings WHERE id = ?", id, (err, res) => {
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

module.exports = Ratings;
