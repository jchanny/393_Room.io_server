//By Jeremy Chan + Chris Zhang
//EECS 393 final project
//Authentication Server that handles all verification+authentication tasks
//Middleware for communicating with Authentication database
const mysql = require('mysql');
const http = require('http');
const Database = require('../DatabaseWrapper.js');
const port = 3000;

function errorCallback(err){
	throw err;
}

function errorHandler(message, err){
    console.log(message + err);
}

//adds user to to Auth Database
//Assumption: Auth Database was set up correctly and will only allow unique entries to be added
function addUser(db, user_id, group_id, password, callback){
	db.query('INSERT INTO AuthDatabase VALUES(?, ?, ?)', [user_id, group_id, password]).then(
		function(){
			callback();
		}).catch(function(err){
			console.log(err.code);
		});
}


//removes user from Auth Databases
//returns -1 if user doens't exist, 1 if deletion was successful
function deleteUser(db, user_id, callback){
	db.query('DELETE FROM AuthDatabase WHERE user_id = ?', [user_id]).then(function(results){
		if(results.length == 0)
			callback(-1);
		else
			callback(1);
	}).catch(function(err){
		console.log(err.code);
	});
}

function getUserGroup(db, user_id, callback){

	db.query('SELECT group_id FROM AuthDatabase WHERE user_id = ?', [user_id]).then(function(results){
		if(results.length == 0){
			callback(-1);
		}else{
			callback(results[0].group_id);
		}
	}).catch(function(err){
		console.log(error.code);
	});
	
}

//creates connection and tests to make sure connection can be established
var connectToDatabase = function(port, user, password, dbName){
	var db = new Database({
		port : port,
		user : user,
		password : password,
		database : dbName
	});
	
	db.connectToDatabase().then(function(){
		console.log('Connected to database ' + dbName);
	}).catch(function(err){
		console.log(err.code);
	});

	return db;
	
}


function handleResponse(){
}

function main(){
	const server = http.createServer(handleResponse());
	
	server.listen(port, function(err){
		if(err){
			return errorHandler('Error: ', err);
		}

		console.log('Server running on port ' + port);
	});


	var connection = connectToDatabase(3306, 'root', 'a', 'test');
	getUserGroup(connection, 111, function(data){
		console.log(data);
	});

}

main();

module.exports.connectToDatabase = connectToDatabase;
module.exports.getUserGroup = getUserGroup;
module.exports.addUser = addUser;

