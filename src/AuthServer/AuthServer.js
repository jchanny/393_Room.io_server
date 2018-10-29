//By Jeremy Chan + Chris Zhang
//EECS 393 final project
//Authentication Server that handles all backend tasks
const http = require('http');
const port = 3000;

function errorHandler(message, err){
    console.log(message + err);
}

function connectToDatabase(){
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


const server = http.createServer(handleResponse());

server.listen(port, function(err){
    if(err){
		return errorHandler('Error: ', err);
    }

    console.log('Server running on port ' + port);
});

