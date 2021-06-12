module.exports = (app) => {
	const reqevents = require('../controllers/req-events.controller.js');

	var router = require('express').Router();

	// Create a new reqevents
	router.post('/', reqevents.create);

	// Retrieve all reqevents
	router.get('/', reqevents.findAll);
	router.get('/msg/:msg/:id', reqevents.reqevent);

	app.use('/api/v1/req-events', router);
};
