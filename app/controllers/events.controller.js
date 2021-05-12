const db = require("../models");
const Events = db.events;
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
  // Create a events
  const events = {
    title: req.body.title,
  };



  // Save events in the database
  Events.create(events)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Events."
      });
    });
};
// Retrieve all Events from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Events.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Events."
      });
    });
};






