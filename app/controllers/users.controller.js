const db = require('../models');
const Users = db.user;
const Op = db.Sequelize.Op;
const uploadFile = require("../middleware/upload");

const fs = require('fs')
// Create and Save a new Users
exports.create = (req, res) => {
	// Validate request

	if (!req.body.name) {
		res.status(400).send({
			message: 'Content can not be empty name!'
		});
		return;
	}
	if (!req.body.phone) {
		res.status(400).send({
			message: 'Content can not be empty phone!'
		});
		return;
	}

	if (!req.body.email) {
		res.status(400).send({
			message: 'Content can not be empty email!'
		});
		return;
	}

	if (!req.body.username) {
		res.status(400).send({
			message: 'Content can not be empty username!'
		});
		return;
	}

	if (!req.body.password) {
		res.status(400).send({
			message: 'Content can not be empty password!'
		});
		return;
	}
	if (!req.body.repassword) {
		res.status(400).send({
			message: 'Content can not be empty repassword!'
		});
		return;
	}

	if (!req.body.email) {
		res.status(400).send({
			message: 'Content can not be empty email!'
		});
		return;
	}
	if (req.body.repassword != req.body.password) {
		res.status(400).send({
			message: ' confirm password  not correct !'
		});
		return;
	}

	// Create a Users
	const users = {
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		username: req.body.username,
		password: req.body.password,
		address: 'address',
		description: 'description ',
		instagram: '@instagram ',
		facebook: '@facebook ',
		twitter: '@twitter '
	};

	console.log(users);
	// Save Users in the database
	Users.create(users)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the users.'
			});
		});
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
	const title = req.query.title;
	var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

	Users.findAll({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving Users.'
			});
		});
};

exports.findAll_name_date = (req, res) => {
	const title = req.query.title;
	var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
	/*   {
		where: condition,
		attributes: [ 'username', 'createdAt' ]
	} */
	Users.findAll({ attributes: [ 'id', 'name', 'createdAt' ,'photo'] })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving Users.'
			});
		});
};

// Find a single Users with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Users.findByPk(id)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error retrieving Users with id=' + id
			});
		});
};

exports.getListFiles = (req, res) => {
	console.log("getListFiles")
	const directoryPath = __basedir + "/resources/static/assets/uploads/";
  
	fs.readdir(directoryPath, function (err, files) {
	  if (err) {
		res.status(500).send({
		  message: "Unable to scan files!",
		});
	  }
  
	  let fileInfos = [];
	  const baseUrl = "http://localhost:8080/files/";
	  files.forEach((file) => {
		fileInfos.push({
		  name: file,
		  url: baseUrl + file,
		});
	  });
  
	  res.status(200).send(fileInfos);
	});
  };
  
exports.uploadphoto = async (req, res) => {
    const id = req.params.id;
	var imagedata = '';
	try {
		await  uploadFile(req, res);

	const chars = req.file.originalname.split('.');
	console.log(	__basedir + '/resources/static/assets/uploads/img/profil/img'+id+"."+chars[1] )
	var values = {photo: 'img'+id+"."+chars[1] };
	var condition = { 	where: { id: id } }; 
	options = { multi: true }

	Users.update(values, condition , options)	.then((num) => {
		if (num == 1) {
			Users.findByPk(id)
				.then((data) => {
					res.send(data);
				})
				.catch((err) => {
					res.status(500).send({
						message: 'Error retrieving Users with id=' + id
					});
				});
		} else {
			res.send({
				message: `Cannot update Users with id=${id}. Maybe Users was not found or req.body is empty!`
			});
		}
	})
	.catch((err) => {
		res.status(500).send({
			message: 'Error updating Users with id=' + id
		});
	});
	/* 	if (req.file == undefined) {
		  return res.status(400).send({ message: "Please upload a file!" });
		} */
	//+ req.file.originalname ${req.file.originalname}
	/* 	res.status(200).send({
		  message: "Uploaded the file successfully: " ,
		}); */
	  } catch (err) {
		console.log("err")
		  console.log(err)
		res.status(500).send({
		  message: `Could not upload the file: . ${err}`,
		});
	  }

};



exports.findOneByUserNameAndpwd = (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	var condition = { username: { [Op.eq]: `${username}` }, password: { [Op.eq]: `${password}` } };
	/*   {
		where: condition,
		attributes: [ 'username', 'createdAt' ]
	} */

	Users.findAll({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving Users.'
			});
		});
};

// Update a Users by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Users.update(req.body, {
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				Users.findByPk(id)
					.then((data) => {
						res.send(data);
					})
					.catch((err) => {
						res.status(500).send({
							message: 'Error retrieving Users with id=' + id
						});
					});
			} else {
				res.send({
					message: `Cannot update Users with id=${id}. Maybe Users was not found or req.body is empty!`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error updating Users with id=' + id
			});
		});
};

// Delete a Users with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Users.destroy({
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'Users was deleted successfully!'
				});
			} else {
				res.send({
					message: `Cannot delete Users with id=${id}. Maybe Users was not found!`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Could not delete Users with id=' + id
			});
		});
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
	Users.destroy({
		where: {},
		truncate: false
	})
		.then((nums) => {
			res.send({ message: `${nums} Userss were deleted successfully!` });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while removing all Userss.'
			});
		});
};
