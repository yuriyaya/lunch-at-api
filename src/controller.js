const LunchAt = require("./model");

exports.getAllStore = (req, res) => {
  LunchAt.getAllStore((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};
