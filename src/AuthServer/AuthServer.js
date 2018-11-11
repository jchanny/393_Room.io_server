//By Jeremy Chan + Chris Zhang
//EECS 393 final project
//Authentication Server that handles all verification+authentication tasks
//Middleware for communicating with Authentication database
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
function addUser(user_id, group_id, password, connectionObj, callback){
	connectionObj.query('INSERT INTO AuthDatabase VALUES(?, ?, ?)', [user_id, group_id, password], function(err){
		if(err) throw err;
		else
			callback;
	});

}


//removes user from Auth Databases
//returns -1 if user doens't exist, 1 if deletion was successful
function deleteUser(user_id, connectionObj, callback){
 connectionObj.query('DELETE FROM AuthDatabase WHERE user_id = ?', [user_id], function(err, results){
		if(err) throw err;
		else{
			if(results.length == 0)
				callback(-1);
			else
				callback(1);
		}
	});
}

function getUserGroup(db, user_id, callback){
	var result;

	db.query('SELECT group_id FROM AuthDatabase WHERE user_id = ?', [user_id]).then(function(results){
		if(results.length == 0){
			callback(-1);
		}
		else{
			callback(results[0].group_id);
		}
	}).catch(function(err){
		console.log(error);
	});
}

// //returns -1 if user_id not in AuthDatabase, group_number otherwise
// function getUserGroup(user_id, connectionObj, callback){
// 	var result;
	
// 	connectionObj.query('SELECT group_id FROM AuthDatabase WHERE user_id = ?', [user_id], function(err, results){
// 		if(err) throw err;
// 		else{
// 			//result doesn't exist
// 			if(results.length == 0)
// 				callback(-1);
// 			else
// 				callback(results[0].group_id);
// 		}
// 	});
// }

//creates connection and tests to make sure connection can be established
var connectToDatabase = function(dbPort, dbUser, dbPassword, db){
	if(dbPort === port){
		throw new Error('Database and Auth Server cannot be hosted on same port!');
	}

	//for now mysql password is 'a'
	var connectionObj = {
		port : dbPort,
		user : dbUser,
		password : dbPassword,
		database : db
	};

	var connection = mysql.createConnection(connectionObj);
	connection.connect(function(err){
		if(err){
			throw new Error('Error connecting to database: ' + err.code);
		}
		console.log('Connected to database: ' + db);
	});

	return connection;
}


//will process request, TBD
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

	var connection = new Database({
		port : 3306,
		user : 'root',
		password : 'a',
		database : 'test'
	});

	var db = new ;
	// var connection = connectToDatabase(3306, 'root', 'a', 'test'); 
	getUserGroup(db,111, function(results){
		console.log(results);
	});

}

main();

module.exports.connectToDatabase = connectToDatabase;
module.exports.getUserGroup = getUserGroup;
module.exports.addUser = addUser;

