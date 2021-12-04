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
