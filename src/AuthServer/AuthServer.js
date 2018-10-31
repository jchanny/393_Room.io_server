//By Jeremy Chan + Chris Zhang
//EECS 393 final project
//Authentication Server that handles all verification+authentication tasks
//Middleware for communicating with Authentication database
const http = require('http');
const mysql = require('mysql');
const port = 3000;

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
function deleteUser(user_id, connectionObj){
	connectionObj.query('DELETE FROM AuthDatabase WHERE user_id = ?', [user_id], function(err, results){
		if(err) throw err;
		else{
			if(results.length == 0)
				return -1;
			else
				return 1;
		}
	});
}


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

//returns -1 if user_id not in AuthDatabase, group_number otherwise
function getUserGroup(user_id, connectionObj, callback){
	var result;
	
	connectionObj.query('SELECT group_id FROM AuthDatabase WHERE user_id = ?', [user_id], function(err, results){
		if(err) throw err;
		else{
			//result doesn't exist
			if(results.length == 0)
				callback(-1);
			else
				callback(results[0].group_id);
		}
	});
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

	var connection = connectToDatabase(3306, 'root', 'a', 'test');
	getUserGroup(111, connection, function(result){
		console.log(result);
	});

}

//main();

module.exports.connectToDatabase = connectToDatabase;
module.exports.getUserGroup = getUserGroup;
module.exports.addUser = addUser;

