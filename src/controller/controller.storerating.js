const { request } = require("express");
const RatingsModel = require("../model/model.storerating");

exports.getAllStoreRatings = (req, res) => {
  RatingsModel.getAllStoreRatings(req.params.id_store, (err, data) => {
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
    store_id: req.params.id_store,
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

exports.deleteStoreRating = (req, res) => {
  RatingsModel.deleteStoreRating(req.params.id_srating, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found store with id ${req.params.id_srating}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete store rating with id " + req.params.id_srating,
        });
      }
    } else
      res.send({
        message: `store rating ${req.params.id_srating} was deleted successfully!`,
      });
  });
};

exports.searchStoreRating = (req, res) => {
  RatingsModel.searchStoreRating(req.query, (err, data) => {
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
