const db = require('../models');
const Events = db.events;
const Op = db.Sequelize.Op;

// Create and Save a new Users
exports.create = (req, res) => {
	// Validate request
	if (!req.body.title) {
		res.status(400).send({
			message: 'Content can not be empty title!'
		});
		return;
	}
	// Create a events
	const events = {
		title: req.body.title,
		desc: req.body.desc
	};

	// Save events in the database
	Events.create(events)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Events.'
			});
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	Events.destroy({
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'Events was deleted successfully!'
				});
			} else {
				res.send({
					message: `Cannot delete Events with id=${id}. Maybe Events was not found!`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Could not delete Events with id=' + id
			});
		});
};

// Update a Users by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Events.update(req.body, {
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				Events.findByPk(id)
					.then((data) => {
						res.send(data);
					})
					.catch((err) => {
						res.status(500).send({
							message: 'Error retrieving Events with id=' + id
						});
					});
			} else {
				res.send({
					message: `Cannot update Events with id=${id}. Maybe Events was not found or req.body is empty!`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error updating Events with id=' + id
			});
		});
};

// Retrieve all Events from the database.
exports.findAll = (req, res) => {
	const title = req.query.title;
	var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

	Events.findAll({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving Events.'
			});
		});
};
