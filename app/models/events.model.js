module.exports = (sequelize, Sequelize) => {
	const Events = sequelize.define('events', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: Sequelize.STRING
		},
		desc: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: 'pending'
		},
		createdby: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: 'ADMIN'
		}
	});

	return Events;
};
