module.exports = (app) => {
  const lunchat = require("./controller");

  var router = require("express").Router();

  //stores
  router.get("/", lunchat.getAllStore);
  router.post("/", lunchat.addNewStore);
  router.get("/search", lunchat.findStore); //shall be before :id route
  router.get("/:id", lunchat.findStoreById);
  router.put("/:id", lunchat.updateStoreById);
  router.delete("/:id", lunchat.removeStore);

  //menus
  router.get("/0/menus/search", lunchat.findMenu);
  router.get("/:id/menus", lunchat.getAllStoreMenu);
  router.post("/:id/menus", lunchat.addStoreNewMenu);
  router.get("/:id/menus/:id2", lunchat.getStoreMenuById);
  router.put("/:id/menus/:id2", lunchat.updateStoreMenuById);
  router.delete("/:id/menus/:id2", lunchat.removeStoreMenu);

  app.use("/api/stores", router);
};
