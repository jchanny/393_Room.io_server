const http = require('http');
const AuthServer = require('../AuthServer/AuthServer.js');
const port = 8080;
const mongoPort = 27017;
const MongoClient = require('mongodb').MongoClient;
const connStr = 'mongodb://localhost:27017';

//returns true if user_id, password match a user in Auth Database
async function checkCredentials(user_id, password,callback){
    if(typeof user_id != 'string' || typeof password != 'string')
	return callback('Input argument is of wrong type.');
    
    return await AuthServer.validateCredentials(user_id, password, function(res){
	try{
	    if(res === "User doesn't exist")
		return callback("User doesn't exist");
	    if(res === true)
		return callback(true);
	    else
		return callback(false);
	}catch(err){
	    throw new Error(err);
	}
    });
}

//adds new user to the Auth Database and creates a new user JSON field
async function createNewUser(user_id, password, group_id, callback){
    if(typeof user_id != 'string' || typeof password != 'string' || typeof group_id != 'string')
	return callback('Input argument is of wrong type.');

    var doesUserExist = await AuthServer.checkIfUserExists(user_id, function(result){
	return result;
    });

    if(doesUserExist)
	return callback('User already exists.');

    var successAdd = await AuthServer.addUser(user_id, group_id, password, function(result){return result;});

    if(successAdd == 0){
    	return callback('User added successfully.');
    }
    else{
    	return callback('An error occured.');
    }
}

//returns JSON object representing group data
//need to specify a callback to store return value
async function fetchGroupData(group_id, callback){
    if(typeof group_id != 'string')
	return callback('Input argument is of wrong type.');

    return await MongoClient.connect(connStr, function(err, client){
	if(err) throw err;
	
	const db = client.db('test');
	
	db.collection("OperationalDatabase").find({group_id : group_id}).toArray(function(error, result){
	    if(error) throw error;
	    client.close();
	    callback(result[0]);
	});

    });
    
}

//for modifying groupdata
async function modifyGroupData(group_id, payload, callback){
    if(payload){
	return await MongoClient.connect(connStr, function(err, client){
	    if(err) throw err;
	    const db = client.db('test');

	    db.collection("OperationalDatabase").remove({group_id : group_id});
	    db.collection("OperationalDatabase").insertOne(payload, function(err, results){
		if(err) throw error;
		client.close();
		callback('Success');
	    });
	});
    }
    else
	return callback('No payload.');
}

//function adds user to AuthDB and adds appropriate fields to OperationalDB
async function registerUser(user_id, password, group_id, name, email, callback){

    if(typeof user_id!= 'string' || typeof password != 'string' || typeof group_id != 'string' || typeof name != 'string' || typeof email != 'string')
	return callback('Input argument is of wrong type.');
    
    //add user to authDB
    var result = await createNewUser(user_id, password, group_id, async function(result){
	return result;
    });

    //check to make sure user doesn't exist
    if(result === 'User already exists.')
	return callback('User already exists.');
   
    var userDataObj = {
	user_id : user_id,
	name : name,
	email : email,
	member_group_id : group_id,
	involved_tabs : [],
	notifications : []
    };

    //check if group already exists
   return await fetchGroupData(group_id, function(groupPayload){
	var groupObject;

	//if group exists
	if(groupPayload){
	    groupObject = groupPayload;
	    groupObject.members.push(userDataObj);
	    MongoClient.connect(connStr, function(err,client){
		if(err) throw err;

		const db = client.db('test');
		//replace document
		db.collection("OperationalDatabase").remove({group_id : group_id});
		db.collection("OperationalDatabase").insertOne(groupObject, function(error, results){
		    if(error) throw error;
		    else
			client.close();
		});
		
	    });
	    return callback('');
	}
       else{
	   //create new group
	    groupObject = {
		group_id : group_id,
		group_admin_user_id : user_id,
		members : [userDataObj],
		groupTasks : [],
		messages : []
	    };

	    MongoClient.connect(connStr, function(err,client){
		if(err) throw err;

		const db = client.db('test');
		db.collection("OperationalDatabase").insertOne(groupObject, function(error, results){
		    if(error) throw error;
		    else
			client.close();
		});		
	    });
	   return callback('');
	}		
    });

    return callback('Does not matter.');
}



//main function that handles user login, fetches data
//use callback to capture group data payload
async function loginUser(user_id, password, callback){
    var result = await checkCredentials(user_id, password);

    if(result === "User doesn't exist"){
	return callback("User doesn't exist.");
    }
     if(result === false)
	 return callback("Invalid credentials.");
    
    //find user group
    var group;
    await AuthServer.getUserGroup(user_id, function(res){
	group = res;
    });
    return await fetchGroupData(group, function(result){
	callback(result);
    });
    
}

module.exports.checkCredentials = checkCredentials;
module.exports.createNewUser = createNewUser;
module.exports.fetchGroupData = fetchGroupData;
module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
module.exports.modifyGroupData = modifyGroupData;
