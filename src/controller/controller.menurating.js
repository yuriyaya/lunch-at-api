const { request } = require("express");
const MenuRating = require("../model/model.menurating");

exports.getAllMenuRatings = (req, res) => {
  MenuRating.getAllMenuRatings(req.params.id_menu, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving store_ratings.",
      });
    else res.send(data);
  });
};

exports.addMenuRating = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const menuRating = {
    menu_id: req.params.id_menu,
    rating: req.body.rating,
    comment: req.body.comment,
    datetime: req.body.datetime,
  };

  MenuRating.addMenuRating(menuRating, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while adding the store.",
      });
    else res.send(data);
  });
};

exports.deleteMenuRating = (req, res) => {
  MenuRating.deleteMenuRating(req.params.id_mrate, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found store with id ${req.params.id_mrate}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete store rating with id " + req.params.id_mrate,
        });
      }
    } else
      res.send({
        message: `menu rating id ${req.params.id_mrate} was deleted successfully!`,
      });
  });
};

exports.searchMenuRating = (req, res) => {
  MenuRating.searchMenuRating(req.query, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found menu rating with ${req.query[0]}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving menu rating with name " + req.query[0],
        });
      }
    } else res.send(data);
  });
};
