//By Jeremy Chan + Chris Zhang
//EECS 393 final project
//Authentication Server that handles all backend tasks
const http = require('http');
const mysql = require('mysql');
const port = 3000;

function errorHandler(message, err){
    console.log(message + err);
}

function addUser(user_id, group_id){
}

function deleteUser(user_id){
}

function getUserGroup(user_id){
}

function checkIfUserExists(user_id){
}

function validateCredentials(user_id, password){
	
}

//creates connection and tests to make sure connection can be established
var connectToDatabase = function(dbPort, dbUser, dbPassword, db){
	if(dbPort === port){
		console.log('Database and Auth Server cannot be hosted on same port!');
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
			console.error('Error connecting to database: ' + err);
			process.exit(1) ;
		}
		console.log('Connected to database: ' + db);
	});

	return connection;
}

function handleResponse(){
	
}


const server = http.createServer(handleResponse());

function main(){
	
	server.listen(port, function(err){
		if(err){
			return errorHandler('Error: ', err);
		}

		console.log('Server running on port ' + port);
	});

}


module.exports.connectToDatabase = connectToDatabase;
