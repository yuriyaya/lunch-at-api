const Store = require("../model/model.store");

exports.getAllStore = (req, res) => {
  Store.getAllStore((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stores.",
      });
    else res.send(data);
  });
};

exports.addNewStore = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const store = {
    name: req.body.name,
    category: req.body.category,
    loc_quick: req.body.loc_quick,
    link: req.body.link,
    distance: req.body.distance,
  };

  Store.addNewStore(store, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while adding the store.",
      });
    else res.send(data);
  });
};

exports.getStoreById = (req, res) => {
  Store.getStoreById(req.params.id_store, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found store with id ${req.params.id_store}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving store with id " + req.params.id_store,
        });
      }
    } else res.send(data);
  });
};

exports.updateStoreById = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Store.updateStoreById(req.params.id_store, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Store with id ${req.params.id_store}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Store with id " + req.params.id_store,
        });
      }
    } else res.send(data);
  });
};

exports.deleteStore = (req, res) => {
  Store.deleteStore(req.params.id_store, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found store with id ${req.params.id_store}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete store with id " + req.params.id_store,
        });
      }
    } else
      res.send({
        message: `store ${req.params.id_store} was deleted successfully!`,
      });
  });
};

exports.searchStore = (req, res) => {
  Store.searchStore(req.query, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found store with ${req.query[0]}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving store with name " + req.query[0],
        });
      }
    } else res.send(data);
  });
};
