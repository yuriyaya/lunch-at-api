const dbConn = require("../conf/db");
const db = dbConn.init();

const LunchAt = function (store) {
  this.name = store.name;
  this.category = store.category;
  this.loc = store.loc;
  this.link = store.link;
  this.distance = store.distance;
};

dbConn.open(db);

LunchAt.getAllStore = (result) => {
  db.query("SELECT * FROM store", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("stores: ", res);
    result(null, res);
  });
};

module.exports = LunchAt;
