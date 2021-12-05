module.exports = (app) => {
  const menuRating = require("../controller/controller.menurating");

  var menuRatingRouter = require("express").Router();

  //menus_ratings
  // GET     /api/menu/:id_menu/menu_ratings     id_menu의 메뉴 평점 목록
  // POST    /api/menu/:id_menu/menu_ratings     id_menu의 메뉴 평점 정보 추가
  // DELETE  /api/menu_ratings/:id_mrate         id_mrate의 메뉴 평점 삭제
  // GET     /api/menu_rating/search?rating=x   x 평점 이상 메뉴 목록

  menuRatingRouter.get(
    "/menu/:id_menu/menu_ratings",
    menuRating.getAllMenuRatings
  );
  // menuRatingRouter.post(
  //   "/menu/:id_menu/menu_ratings",
  //   menuRating.addMenuRating
  // );
  // menuRatingRouter.delete(
  //   "/menu_rating/:id_mrate",
  //   menuRating.deleteMenuRating
  // );
  // menuRatingRouter.get("/menu_ratings/search", menuRating.searchMenuRating);

  app.use("/api", menuRatingRouter);
};
