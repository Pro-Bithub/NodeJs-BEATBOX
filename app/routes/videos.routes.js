module.exports = app => {
  const videos = require("../controllers/videos.controller.js");

  var router = require("express").Router();



  // Retrieve all videos
  router.get("/", videos.findAll);

  app.use('/api/v1/videos', router);
};
