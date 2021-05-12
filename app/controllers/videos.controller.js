const db = require("../models");
const Videos = db.videos;
const Op = db.Sequelize.Op;



// Create and Save a new Users
exports.create = (req, res) => {
  // Validate request

  if (!req.body.url) {
    res.status(400).send({
      message: "Content can not be empty url!"
    });
    return;
  }

  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty title!"
    });
    return;
  }
  if (!req.body.type) {
    res.status(400).send({
      message: "Content can not be empty type!"
    });
    return;
  }
  if (!req.body.desc) {
    res.status(400).send({
      message: "Content can not be empty desc!"
    });
    return;
  }
  
  // Create a Users
  const users = {
    url: req.body.url,
    title: req.body.title,
    desc: req.body.desc,
    type: req.body.type,
  };



  // Save Users in the database
  Videos.create(users)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the users."
      });
    });
};


// Retrieve all Videos from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Videos.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Videos."
      });
    });
};






