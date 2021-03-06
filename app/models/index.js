const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const fs = require('fs');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorsAliases: false,

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle
	}
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.videos = require('./videos.model.js')(sequelize, Sequelize);
db.events = require('./events.model.js')(sequelize, Sequelize);
db.reqevents = require('./req-events.model.js')(sequelize, Sequelize);
db.user = require('./users.model.js')(sequelize, Sequelize);

module.exports = db;
