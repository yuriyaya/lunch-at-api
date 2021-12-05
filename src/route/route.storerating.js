module.exports = (app) => {
  const storeRating = require("../controller/controller.storerating");

  var routerStoreRating = require("express").Router();

  //store_ratings
  // GET     /api/store/:id_store/store_ratings    id_store의 식당 평점 목록
  // POST    /api/store/:id_store/store_ratings    id_store의 식당 평점 정보 추가
  // DELETE  /api/store_rating/:id_srating         id_srate의 식당 평점 정보 삭제
  // GET     /api/store_ratings/search?ratings=x   x 평점 이상 식당 목록

  routerStoreRating.get(
    "/store/:id_store/store_ratings",
    storeRating.getAllStoreRatings
  );
  routerStoreRating.post(
    "/store/:id_store/store_ratings",
    storeRating.addStoreNewRating
  );
  routerStoreRating.delete(
    "/store_rating/:id_srating",
    storeRating.deleteStoreRating
  );
  routerStoreRating.get("/store_ratings/search", storeRating.searchStoreRating);

  app.use("/api", routerStoreRating);
};
