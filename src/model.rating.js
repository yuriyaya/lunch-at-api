const dbConn = require("../conf/db");
const db = dbConn.init();
dbConn.open(db);

const Ratings = function () {};

Ratings.getAllStoreRatings = (id, result) => {
  db.query(`SELECT * FROM store_ratings WHERE store_id=${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("store ratings: ", res);
    result(null, res);
  });
};

module.exports = Ratings;
