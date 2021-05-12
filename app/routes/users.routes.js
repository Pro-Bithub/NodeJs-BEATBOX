module.exports = app => {
  const users = require("../controllers/users.controller.js");

  var router = require("express").Router();



  // Retrieve all users
  router.get("/", users.findAll);

  app.use('/api/v1/users', router);
};
