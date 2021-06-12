module.exports = (app) => {
	const events = require('../controllers/events.controller.js');

	var router = require('express').Router();

	// Create a new events
	router.post('/', events.create);

	// Retrieve all events
	router.get('/', events.findAll);

	// Delete a users with id
	router.delete('/:id', events.delete);
	// Update a Tutorial with id
	router.put('/:id', events.update);

	app.use('/api/v1/events', router);
};
