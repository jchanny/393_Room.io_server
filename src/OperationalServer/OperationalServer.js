const http = require('http');
const AuthServer = require('../AuthServer/AuthServer.js');
const port = 8080;
const AuthDB;

function errorHandler(message, err){
    console.log(message + err);
}


//returns true if user_id, password match a user in Auth Database
function checkCredentials(db, user_id, password){
    return AuthServer.validateCredentials(db, user_id, password, function(result){
	if(result === "User doesn't exist"){
	    //figure out what to do if user doesn't exist
	}
	else if(result == true)
	    return true;
	else
	    return false;
    });
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
    //	var operation = ;
    //	switch(operation){
    //	case '':
    
    //		break;
    //	}
}

function handleResponse(request, response){
    processRequest(request);
}

function main(){
    
    const server = http.createServer(handleResponse());

    server.listen(port, function(err){
	if(err){
	    return errorHandler('Error: ', err);
	}
	console.log('Server running on port ' + port);
    });

}
