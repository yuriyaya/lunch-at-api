const { request } = require("express");
const RatingsModel = require("./model.rating");

exports.getAllStoreRatings = (req, res) => {
  RatingsModel.getAllStoreRatings(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving store_ratings.",
      });
    else res.send(data);
  });
};

exports.addStoreNewRating = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const storeRating = {
    store_id: req.body.store_id,
    rating: req.body.rating,
    comment: req.body.comment,
    datetime: req.body.datetime,
  };

  RatingsModel.addStoreNewRating(storeRating, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while adding the store.",
      });
    else res.send(data);
  });
};

exports.removeStoreRating = (req, res) => {
  RatingsModel.removeStoreRating(req.params.id2, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found store with id ${req.params.id2}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete store rating with id " + req.params.id2,
        });
      }
    } else res.send({ message: `store rating was deleted successfully!` });
  });
};

exports.findStoreRating = (req, res) => {
  RatingsModel.findStoreRating(req.query, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found store rating with ${req.query[0]}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving store rating with name " + req.query[0],
        });
      }
    } else res.send(data);
  });
};

exports.getAllStoreMenuRatings = (req, res) => {
  RatingsModel.getAllStoreMenuRatings(req.params.id2, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving menu_ratings.",
      });
    else res.send(data);
  });
};

exports.addStoreMenuNewRating = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const menuRating = {
    menu_id: req.body.menu_id,
    rating: req.body.rating,
    comment: req.body.comment,
    datetime: req.body.datetime,
  };

  RatingsModel.addStoreMenuNewRating(menuRating, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while adding the store.",
      });
    else res.send(data);
  });
};

exports.removeStoreMenuRating = (req, res) => {
  RatingsModel.removeStoreMenuRating(req.params.id3, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found store with id ${req.params.id3}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete store rating with id " + req.params.id3,
        });
      }
    } else res.send({ message: `store rating was deleted successfully!` });
  });
};

exports.findStoreMenuRating = (req, res) => {
  RatingsModel.findStoreMenuRating(req.query, (err, data) => {
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
