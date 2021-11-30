module.exports = (app) => {
  const lunchat = require("./controller");

  var router = require("express").Router();

  router.get("/", lunchat.getAllStore);
  router.post("/", lunchat.addNewStore);
  router.get("/search", lunchat.findStore); //shall be before :id route
  router.get("/:id", lunchat.findStoreById);
  router.put("/:id", lunchat.updateStoreById);
  router.delete("/:id", lunchat.removeStore);

  app.use("/api/stores", router);
};
