module.exports = (app) => {
  const lunchat = require("./controller");

  var router = require("express").Router();

  router.get("/", lunchat.getAllStore);

  app.use("/api/store", router);
};
