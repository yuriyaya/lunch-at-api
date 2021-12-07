const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api", (req, res) => {
  res.send("lunch-at service REST API back-end");
});

app.get("/api/test", (req, res) => {
  res.json({ name: "test API", version: "0.1.211128" });
});

require("./src/route/route.store.js")(app);
require("./src/route/route.menu")(app);
require("./src/route/route.storerating")(app);
require("./src/route/route.menurating")(app);
app.listen(3000, () => console.log("server running"));
