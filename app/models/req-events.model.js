module.exports = (sequelize, Sequelize) => {
	const Reqevents = sequelize.define('reqevents', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING
		},
		eventname: {
			type: Sequelize.STRING
		},
		date: {
			type: Sequelize.DATE
		},

		city: {
			type: Sequelize.STRING
		},
		country: {
			type: Sequelize.STRING
		},
		response: {
			type: Sequelize.STRING
		}
	});

	return Reqevents;
};
