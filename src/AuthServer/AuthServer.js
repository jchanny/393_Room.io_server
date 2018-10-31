//By Jeremy Chan + Chris Zhang
//EECS 393 final project
//Authentication Server that handles all backend tasks
const http = require('http');
const mysql = require('mysql');
const port = 3000;

function errorHandler(message, err){
    console.log(message + err);
}


function addUser(user_id, group_id, password, connectionObj){
	connectionObj.query('INSERT INTO AuthDatabase VALUES(?, ?, ?)', [user_id, group_id, password], function(err){
		if(err) throw err;
	});

}

function deleteUser(user_id, connectionObj){
	connectionObj.query('DELETE FROM AuthDatabase WHERE user_id = ?', [user_id], function(err, results){
		if(err) throw err;
		else{
			if(results.length == 0)
				return -1;
			else
				return return 1;
		}
	});
}

function getUserGroup(user_id, connectionObj, resultStore, returnCallback){
	 connectionObj.query('SELECT group_id FROM AuthDatabase WHERE user_id = ?', [user_id], function(err, results){
		if(err) throw err;
		else{
			//result doesn't exist
			if(results.length == 0)
				return returnCallback(resultStore, -1);
			else
				return returnCallback(resultStore, results[0].group_id);
		}
	 });

}

//returns 0 if user doesn't exist, -1 if password wrong, 1 if correct
function validateCredentials(user_id, password, connectionObj, returnCallback){
	connectionObj.query('SELECT password FROM AuthDatabase WHERE user_id = ?', [user_id], function(err, results){

		if(err) throw err;
		else{
			if(results.length == 0)
				returnCallback(0);
			else{
				if(results[0].password === password)
					returnCallback(1);
				else
					returnCallback(-1);
			}
				
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

	var connection = connectToDatabase(3306, 'root', 'a', 'test');
}

main();


module.exports.connectToDatabase = connectToDatabase;


