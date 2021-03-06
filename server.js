const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
	origin: 'http://localhost:4200'
};

global.__basedir = __dirname;

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./app/models');

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to beatboxer platforme  application by Hazem Lassoued.' });
});
app.use('/resources/static/assets/uploads/img/profil', express.static('./resources/static/assets/uploads/img/profil'));
require('./app/routes/videos.routes')(app);
require('./app/routes/events.routes')(app);
require('./app/routes/req-events.routes')(app);

require('./app/routes/users.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
