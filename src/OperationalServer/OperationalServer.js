const http = require('http');
const AuthServer = require('../AuthServer/AuthServer.js');
const port = 8080;
const mongoPort = 27017;
const MongoClient = require('mongodb').MongoClient;
const connStr = 'mongodb://localhost:27017/test';


//returns true if user_id, password match a user in Auth Database
async function checkCredentials(user_id, password){
    if(typeof user_id != 'number' || typeof password != 'string')
	return 'Input argument is of wrong type';
    
   return await AuthServer.validateCredentials(user_id, password, function(res){
	try{
	    if(res === true)
		return true;
	    else
		return false;
	}catch(err){
	    throw new Error(err);
	}
    });
}

//adds new user to the Auth Database and creates a new user JSON field
async function createNewUser(user_id, password, email, name, group_id){
    if(typeof user_id != 'number' || typeof password != 'string' || typeof group_id != 'number')
	return 'Input argument is of wrong type';

    var doesUserAlreadyExist = await AuthServer.checkIfUserExists(user_id);
    if(doesUserAlreadyExist){
	return 'User already exists, please select another username.';
    }

    var successAdd = await AuthServer.addUser(user_id, group_id, password);

    if(successAdd == 0){
	var userDoc = {
	    "user_id" : user_id,
	    "name" : name,
	    "email" : email,
	    "member_group_id" : group_id,
	    "involved_tabs" : [],
	    "notifications" : []
	};
    }
    else{
	return console.log('An error occured.');
    }
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

//returns user data json field 
function getUserData(user_id){
    
}

function createGroup(group_owner, group_id, group_name){
    var group_owner_json = getUserData(group_owner);
    
    var document = {
	"group_id" : group_id,
	"group_name" : group_name,
	"group_admin_user_id" : group_owner,
	"members" : [group_owner_json],
	"group_tasks" : [],
	"messages" : []
    };
    
    MongoClient.connect(connStr, function(err, db){
	if(err) throw err;
	
	var collection = db.collection('OperationalDatabase');
	
	collection.insert(document, function(error, result){
	    if(error) throw error;
	    db.close();
	});
    });
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

module.exports.checkCredentials = checkCredentials;
