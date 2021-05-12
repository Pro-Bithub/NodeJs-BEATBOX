module.exports = app => {
  const events = require("../controllers/events.controller.js");

  var router = require("express").Router();


// Create a new events
router.post("/", events.create);

  // Retrieve all events
  router.get("/", events.findAll);

  app.use('/api/v1/events', router);
};
