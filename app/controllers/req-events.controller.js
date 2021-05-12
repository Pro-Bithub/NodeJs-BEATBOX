const db = require("../models");
const Reqevents = db.reqevents;
const Op = db.Sequelize.Op;

// Create and Save a new Users
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty title!"
    });
    return;
  }
  // Create a reqevents
  const reqevents = {
    title: req.body.title,
  };



  // Save reqevents in the database
  Reqevents.create(reqevents)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the reqevents."
      });
    });
};
// Retrieve all reqevents from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Reqevents.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reqevents."
      });
    });
};






