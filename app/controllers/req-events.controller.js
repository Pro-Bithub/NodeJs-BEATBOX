const db = require('../models');
const Reqevents = db.reqevents;
const Op = db.Sequelize.Op;
const Events = db.events;
// Create and Save a new Users
exports.create = (req, res) => {
	// Validate request
	if (!req.body.name) {
		res.status(400).send({
			message: 'Content can not be empty name!'
		});
		return;
	}
	if (!req.body.email) {
		res.status(400).send({
			message: 'Content can not be empty email!'
		});
		return;
	}

	if (!req.body.eventname) {
		res.status(400).send({
			message: 'Content can not be empty eventname!'
		});
		return;
	}

	if (!req.body.date) {
		res.status(400).send({
			message: 'Content can not be empty date!'
		});
		return;
	}

	if (!req.body.city) {
		res.status(400).send({
			message: 'Content can not be empty city!'
		});
		return;
	}

	if (!req.body.country) {
		res.status(400).send({
			message: 'Content can not be empty country!'
		});
		return;
	}

	// Create a reqevents
	const reqevents = {
		name: req.body.name,
		email: req.body.email,
		eventname: req.body.eventname,
		date: req.body.date,
		city: req.body.city,
		country: req.body.country
	};

	// Save reqevents in the database
	Reqevents.create(reqevents)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the reqevents.'
			});
		});
};
// Retrieve all reqevents from the database.
exports.findAll = (req, res) => {
	const title = req.query.title;
	var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

	Reqevents.findAll({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving reqevents.'
			});
		});
};

// Update a Users by the id in the request
exports.reqevent = (req, res) => {
	const msg = req.params.msg;
	const id = req.params.id;

	Reqevents.findByPk(id)
		.then((data) => {
			/* 		const Eventsindb = data;
			Eventsindb.response = msg; */

			const Eventsindb = {
				response: msg
			};

			console.log('Eventsindb');
			console.log(Eventsindb);
			Reqevents.update(Eventsindb, {
				where: { id: id }
			})
				.then((num) => {
					if (num == 1) {
						if (msg == 'accepted') {
							const events = {
								title: data.eventname,
								desc: '...',
								createdby: data.name
							};
							Events.create(events)
								.then((data) => {
									res.send(data);
								})
								.catch((err) => {
									res.status(500).send({
										message: err.message || 'Some error occurred while creating the Events.'
									});
								});
						}
						res.send({
							message: 'reqevent  was updated successfully!'
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
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error retrieving Users with id=' + id
			});
		});
};
