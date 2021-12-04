module.exports = (app) => {
  const ratings = require("./controller.rating");

  var routerRating = require("express").Router();

  //store_ratings
  routerRating.get("/:id/ratings", ratings.getAllStoreRatings);
  routerRating.post("/:id/ratings", ratings.addStoreNewRating);
  routerRating.get("/0/ratings/search", ratings.findStoreRating);
  routerRating.delete("/:id/ratings/:id2", ratings.removeStoreRating);

  app.use("/api/stores", routerRating);
};