module.exports = (app) => {
	const users = require('../controllers/users.controller.js');

	var router = require('express').Router();

	// Create a new users
	router.post('/', users.create);

	/* // Retrieve all users
  router.get("/", users.findAll); */
	// Retrieve all users
	router.get('/', users.findAll_name_date);

	// Retrieve a single users with id
	router.get('/:id', users.findOne);
	router.post('/ByUserNameAndpwd', users.findOneByUserNameAndpwd);
	// Delete a users with id
	router.delete('/:id', users.delete);
	// Update a Tutorial with id
	router.put('/:id', users.update);
	// Delete all users
	router.delete('/', users.deleteAll);

	app.use('/api/v1/users', router);
};
