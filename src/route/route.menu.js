module.exports = (app) => {
  const menu = require("../controller/controller.menu");

  var routerMenu = require("express").Router();

  //menus
  // GET    /api/store/:id_store/menus      - id_store의 식당 메뉴 전체 목록
  // POST   /api/store/:id_store/menus      - id_store의 식당 메뉴 추가
  // GET    /api/menu/:id_menu              - id_menu 메뉴 정보
  // PUT    /api/menu/:id_menu              - id_menu 메뉴 정보 업데이트
  // DELETE /api/menu/:id_menu              - id_menu 메뉴 삭제
  // GET    /api/menus/search?name=x        - 메뉴 이름으로 검색(전체 식당)
  // GET    /api/store/:id_store/menulist   - id_store의 식당 메뉴 목록 - UI용

  routerMenu.get("/store/:id_store/menus", menu.getAllStoreMenu);
  // routerMenu.post("/store/:id_store/menus", menu.addStoreNewMenu);
  routerMenu.get("/menu/:id_menu", menu.getMenuById);
  // routerMenu.put("/menu/:id_menu", menu.updateMenuById);
  // routerMenu.delete("/menu/:id_menu", menu.deleteMenu);
  // routerMenu.get("/menus/search", menu.findMenu);

  app.use("/api", routerMenu);
};
