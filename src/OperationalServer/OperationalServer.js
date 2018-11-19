const http = require('http');
const AuthServer = require('../AuthServer/AuthServer.js');
const port = 8080;
const mongoPort = 27017;
const MongoClient = require('mongodb').MongoClient;
const connStr = 'mongodb://localhost:27017';


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
	return console.log('User added successfully.');
    }
    else{
	return console.log('An error occured.');
    }
}

function fetchGroupData(group_id){
    return {};
}

function fetchData(user_id, group_id){
    
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
async function getUserData(user_id){
    if(typeof user_id != 'number')
	return 'Input argument is of wrong type';

    var group = await AuthServer.getUserGroup(user_id, function(results){
	return results;
    });

    if(group == 'User does not exist'){
	return 'User does not exist';
    }

    var groupData = fetchGroupData(group);
    
    var memberDataList = groupData[members];
    return memberDataList.find(x => x.user_id === user_id);
    
}

async function createGroup(group_owner, group_id, group_name){
    if(typeof group_owner != 'number' || typeof group_id != 'number' || typeof group_name != 'string')
	return 'Input argument is of wrong type.';
    
    var group_owner_json = {
	"user_id" : group_owner,
	"member_group_id" : group_id,
	"admined_group_id" : group_id,
	"involved_tabs" : [],
	"notifications" : []
    };
    
    var document = {
	"group_id" : group_id,
	"group_name" : group_name,
	"group_admin_user_id" : group_owner,
	"members" : [group_owner_json],
	"group_tasks" : [],
	"messages" : []
    };
    
   return MongoClient.connect(connStr, function(err, client){
	if(err) throw err;
	
	const db = client.db('test');
	
	db.collection("OperationalDatabase").insert(document, function(error, result){
	    if(error) throw error;
	    client.close();
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
module.exports.createNewUser = createNewUser;
module.exports.getUserData = getUserData;
module.exports.createGroup = createGroup;
