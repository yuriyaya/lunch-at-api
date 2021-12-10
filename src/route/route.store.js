module.exports = (app) => {
  const store = require("../controller/controller.store");

  var storeRouter = require("express").Router();

  //stores
  // GET      /api/stores             현재 모든 식당 목록
  // POST     /api/stores             식당 정보 추가
  // GET      /api/store/:id_store    id_store의 식당 정보
  // PUT      /api/store/:id_store    id_store의 식당 정보 업데이트
  // DELETE   /api/store/:id_store    id_store의 식당 삭제
  // GET      /api/stores/search?name=x                 식당 이름으로 검색
  // GET      /api/stores/search?category=x&distance=x  식당 카테고리 or 거리 검색
  // GET      /api/stores/namelist        식당 이름 목록 - UI 자동완성용
  // GET      /api/stores/categorylist    카테고리 목록 - UI용

  storeRouter.get("/stores", store.getAllStore);
  storeRouter.post("/stores", store.addNewStore);
  storeRouter.get("/store/:id_store", store.getStoreById);
  storeRouter.put("/store/:id_store", store.updateStoreById);
  storeRouter.delete("/store/:id_store", store.deleteStore);
  storeRouter.get("/stores/search", store.searchStore);
  storeRouter.get("/stores/namelist", store.getAllStoreNameList);
  storeRouter.get("/stores/categorylist", store.getAllStoreCategoryList);

  app.use("/api", storeRouter);
};
