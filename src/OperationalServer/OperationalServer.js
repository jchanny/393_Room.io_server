const http = require('http');
const AuthServer = require('../AuthServer/AuthServer.js');
const port = 8080;

function errorHandler(message, err){
	console.log(message + err);
}

//send verification email to email_address
function sendVerificationEmail(email_address){

}

//returns true if user_id, password match a user in Auth Database
function checkCredentials(user_id, password){
	return AuthServer.validateCredentials(user_id, password);
}

function fetchData(user_id, group_id){
	
}

function modifyData(group_id, payload){
	
}

function pushData(group_id){
}

function getGroupMembers(group_id){
}

function addUserToGroup(user_id, group_id){
}

function removeUserFromGroup(user_id, group_id){
}

function createGroup(group_owner){
}

function deleteGroup(group_owner, group_id){
}

function sendDataToClients(group_id){
}


function processRequest(request, response){
	var operation = ;
	switch(operation){
	case '':
		
		break;
	}
}

function handleResponse(request, response){
	processRequest(request);
}

const server = http.createServer(handleResponse());

server.listen(port, function(err){
	if(err){
		return errorHandler('Error: ', err);
	}
	console.log('Server running on port ' + port);
});
