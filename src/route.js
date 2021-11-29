module.exports = (app) => {
  const lunchat = require("./controller");

  var router = require("express").Router();

  router.get("/", lunchat.getAllStore);

  router.post("/", lunchat.addNewStore);

  router.put("/:id", lunchat.updateStoreById);

  router.delete("/:id", lunchat.removeStore);

  app.use("/api/stores", router);
};
