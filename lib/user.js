const crypto = require('./crypto');
const request = require('request-promise');

function createUser(user, callback) {
	let options = {
		method: 'POST',
		uri: 'http://127.0.0.1:5984/users/',
		body: {
			'username': user.username,
			'password': crypto.dataToHex(user.password[0]),
			'balance': 100
		},
		json: true
	}

	return request(options)
		.then(res => {
			return res;
		})
		.catch(err => {
			console.log('Error creating user: ', err);
		});
}

function getAllUsers() {
	let options = {
		method: 'GET',
		uri: 'http://127.0.0.1:5984/users/_all_docs?include_docs=true'
	}

	return request(options)
		.then(res => {
			return JSON.parse(res).rows
		})
		.catch(err => {
			console.log('error getting users: ', err);
		});
}

function getUserByID(id) {
	let options = {
		method: 'GET',
		uri: 'http://127.0.0.1:5984/users/' + id
	}

	return request(options);
}

function getUserByUsername(username) {
	return getAllUsers()
		.then(users => {
			for( var user in users ) {
				if(users[user].doc.username === username) {
					return users[user].doc;
				}
			}
		});
}

function transferTo(user, to, ammount) {
	if(Number(user.balance) - Number(ammount) < 0) {
		return false;
	}

	return getUserByID(to)
		.then(res => {
			let data = JSON.parse(res);
			data.balance = Number(data.balance) + Number(ammount);
			return data;
		})
		.then(user => {
			return updateUser(user);
		})
		.then(res => {
			console.log('tranfer #1 response: ', res);
		})
		.then(() => {
			user.balance = Number(user.balance) - Number(ammount);
			return updateUser(user);
		})
		.then(res => {
			user._rev = res.rev;
		})
		.catch(err => {
			console.log(err);
		});
}

function updateUser(user) {
	let options = {
		method: 'PUT',
		uri: 'http://127.0.0.1:5984/users/' + user._id,
		body: user,
		json: true
	}

	return request(options);
}

function userExists(username) {
	return getAllUsers()
		.then(users => {
			for( var user in users ) {
				if(users[user].doc.username === username) {
					return true;
				}
			}
			return false;
		});
}

module.exports = {
	createUser,
	getAllUsers,
	getUserByID,
	getUserByUsername,
	transferTo,
	updateUser,
	userExists
}
