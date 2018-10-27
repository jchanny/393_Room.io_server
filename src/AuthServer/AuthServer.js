//By Jeremy Chan + Chris Zhang
//EECS 393 final project
//Authentication Server that handles all backend tasks
const http = require('http');
const port = 3000;

function errorHandler(message, err){
    console.log(message + err);
}

//takes user_id arg, returns corresponding group #
function findUser(user_id){
}

//takes in raw request header, determines which user to get
function findUserFromRequest(request, response){
    var user_id;
    return findUser(user_id);
}

function validateUser(user_id, password){
    
}

//takes in raw request header, validates with info supplied from that
function validateUserFromRequest(request, response){
    var user_id;
    var password;
    validateUser(user_id, password);
}
						  
    
//reads request header, determines which method to call
function processRequest(request, response){
    var operation = ;
    switch(operation){
    case 'FIND_USER':
	findUserFromRequest(request, response);
	break;
    case 'VALIDATE_USER':
	validateUserFromRequest(request, response);
    default:
	response.write('403 Operation Forbidden.');
	response.end();
    }
}

function handleResponse(request, response){
    processRequest(request);
}

const server = http.createServer(handleResponse);

server.listen(port, function(err){
    if(err){
	return errorHandler('Error: ', err);
    }

    console.log('Server running on port ' + port);
});

