const dbConn = require("../conf/db");
const db = dbConn.init();

const LunchAt = function (store) {
  this.name = store.name;
  this.category = store.category;
  this.loc_quick = store.loc_quick;
  this.link = store.link;
  this.distance = store.distance;
};

dbConn.open(db);

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

module.exports = LunchAt;
