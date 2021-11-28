const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.send("lunch-at service REST API back-end");
});

app.get("/api/test", (req, res) => {
  res.json({ name: "test API", version: "0.1.211128" });
});

app.listen(3000, () => console.log("server running"));
