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
4;

Ratings.findStoreRating = (keyword, result) => {
  let sql =
    "SELECT store_id, AVG(rating) AS avg_rating FROM store_ratings GROUP BY store_id HAVING avg_rating >=";
  if (keyword["rating"]) {
    sql += `${keyword["rating"]}`;
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

Ratings.getAllStoreMenuRatings = (id, result) => {
  db.query(
    `SELECT * FROM menu_ratings WHERE menu_id=${id} ORDER BY datetime DESC`,
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

Ratings.addStoreMenuNewRating = (newRating, result) => {
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

Ratings.removeStoreMenuRating = (id, result) => {
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

Ratings.findStoreMenuRating = (keyword, result) => {
  let sql =
    "SELECT menu_id, AVG(rating) AS avg_rating FROM menu_ratings GROUP BY menu_id HAVING avg_rating >=";
  if (keyword["rating"]) {
    sql += `${keyword["rating"]}`;
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

module.exports = Ratings;
