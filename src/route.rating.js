module.exports = (app) => {
  const ratings = require("./controller.rating");

  var routerRating = require("express").Router();

  //store_ratings
  routerRating.get("/:id/ratings", ratings.getAllStoreRatings);

  app.use("/api/stores", routerRating);
};
