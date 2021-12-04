const { request } = require("express");
const RatingsModel = require("./model.rating");

exports.getAllStoreRatings = (req, res) => {
  RatingsModel.getAllStoreRatings(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stores.",
      });
    else res.send(data);
  });
};
