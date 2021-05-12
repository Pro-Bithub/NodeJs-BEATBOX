module.exports = app => {
  const videos = require("../controllers/videos.controller.js");

  var router = require("express").Router();

 // Create a new videos
 router.post("/", videos.create);

  // Retrieve all videos
  router.get("/", videos.findAll);

  app.use('/api/v1/videos', router);
};
