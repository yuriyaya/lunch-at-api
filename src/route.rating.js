module.exports = (app) => {
  const ratings = require("./controller.rating");

  var routerRating = require("express").Router();

  //store_ratings
  routerRating.get("/:id/ratings", ratings.getAllStoreRatings);
  routerRating.post("/:id/ratings", ratings.addStoreNewRating);
  routerRating.get("/0/ratings/search", ratings.findStoreRating);
  routerRating.delete("/:id/ratings/:id2", ratings.removeStoreRating);

  //menus_ratings
  routerRating.get("/:id/menus/:id2/ratings", ratings.getAllStoreMenuRatings);
  routerRating.post("/:id/menus/:id2/ratings", ratings.addStoreMenuNewRating);
  routerRating.get("/0/menus/0/ratings/search", ratings.findStoreMenuRating);
  routerRating.delete(
    "/:id/menus/:id2/ratings/:id3",
    ratings.removeStoreMenuRating
  );

  app.use("/api/stores", routerRating);
};
