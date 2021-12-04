const LunchAt = require("./model");

exports.getAllStore = (req, res) => {
  LunchAt.getAllStore((err, data) => {
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

  LunchAt.addNewStore(store, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while adding the store.",
      });
    else res.send(data);
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

  LunchAt.updateStoreById(req.params.id, new LunchAt(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Store with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Store with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.removeStore = (req, res) => {
  LunchAt.removeStore(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found store with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete store with id " + req.params.id,
        });
      }
    } else res.send({ message: `store was deleted successfully!` });
  });
};

exports.findStoreById = (req, res) => {
  LunchAt.findStoreById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found store with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving store with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.findStore = (req, res) => {
  LunchAt.findStore(req.query, (err, data) => {
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

exports.getAllStoreMenu = (req, res) => {
  LunchAt.getAllStoreMenu(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stores.",
      });
    else res.send(data);
  });
};

exports.addStoreNewMenu = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const menu = {
    store_id: req.params.id,
    name: req.body.name,
  };

  LunchAt.addStoreNewMenu(menu, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while adding the store.",
      });
    else res.send(data);
  });
};

exports.updateStoreMenuById = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  LunchAt.updateStoreMenuById(req.params.id2, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found menu with id ${req.params.id2}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating menu with id " + req.params.id2,
        });
      }
    } else res.send(data);
  });
};

exports.getStoreMenuById = (req, res) => {
  LunchAt.getStoreMenuById(req.params.id, req.params.id2, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stores.",
      });
    else res.send(data);
  });
};

exports.removeStoreMenu = (req, res) => {
  LunchAt.removeStoreMenu(req.params.id2, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found store with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete store with id " + req.params.id,
        });
      }
    } else res.send({ message: `store was deleted successfully!` });
  });
};

exports.findMenu = (req, res) => {
  LunchAt.findMenu(req.query, (err, data) => {
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
