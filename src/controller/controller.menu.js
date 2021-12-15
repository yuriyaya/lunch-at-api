const Menu = require("../model/model.menu");

exports.getAllStoreMenu = (req, res) => {
  Menu.getAllStoreMenu(req.params.id_store, (err, data) => {
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
    store_id: req.params.id_store,
    name: req.body.name,
  };

  Menu.addStoreNewMenu(menu, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while adding the store.",
      });
    else res.send(data);
  });
};

exports.getMenuById = (req, res) => {
  Menu.getMenuById(req.params.id_menu, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stores.",
      });
    else res.send(data);
  });
};

exports.updateMenuById = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Menu.updateMenuById(req.params.id_menu, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found menu with id ${req.params.id_menu}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating menu with id " + req.params.id_menu,
        });
      }
    } else res.send(data);
  });
};

exports.deleteMenu = (req, res) => {
  Menu.deleteMenu(req.params.id_menu, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found menu with id ${req.params.id_menu}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete menu with id " + req.params.id_menu,
        });
      }
    } else res.send({ message: `menu was deleted successfully!` });
  });
};

exports.findMenu = (req, res) => {
  Menu.findMenu(req.query, (err, data) => {
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

exports.getStoreAllMenu = (req, res) => {
  Menu.getStoreAllMenu(req.params.id_store, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving store's all menu.",
      });
    else res.send(data);
  });
};

exports.getAllMenuStore = (req, res) => {
  Menu.getAllMenuStore((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving menu-store.",
      });
    else res.send(data);
  });
};

exports.getAllMenuRatingList = (req, res) => {
  Menu.getAllMenuRatingList((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving menu-store.",
      });
    else res.send(data);
  });
};

exports.getStoreMenuRatingList = (req, res) => {
  Menu.getStoreMenuRatingList(req.params.id_store, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving menu-store.",
      });
    else res.send(data);
  });
};
