const http = require('http');
const AuthServer = require('../AuthServer/AuthServer.js');
const port = 8080;
const mongoPort = 27017;
const MongoClient = require('mongodb').MongoClient;
const connStr = 'mongodb://localhost:27017';

//returns true if user_id, password match a user in Auth Database
async function checkCredentials(user_id, password){
    if(typeof user_id != 'string' || typeof password != 'string')
	return 'Input argument is of wrong type';
    
    return await AuthServer.validateCredentials(user_id, password, function(res){
	try{
	    if(res === "User doesn't exist")
		return "User doesn't exist";
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
async function createNewUser(user_id, password, group_id, callback){
    if(typeof user_id != 'string' || typeof password != 'string' || typeof group_id != 'string')
	return 'Input argument is of wrong type';

    var doesUserAlreadyExist = await AuthServer.checkIfUserExists(user_id);
    if(doesUserAlreadyExist){
	return 'User already exists, please select another username.';
    }

    var successAdd = await AuthServer.addUser(user_id, group_id, password, function(result){return result;});

    if(successAdd == 0){
    	return callback('User added successfully.');
    }
    else{
    	return console.log('An error occured.');
    }
}

//returns JSON object representing group data
//need to specify a callback to store return value
async function fetchGroupData(group_id, callback){
    if(typeof group_id != 'string')
	return 'Input argument is of wrong type.';

    return await MongoClient.connect(connStr, function(err, client){
	if(err) throw err;
	
	const db = client.db('test');
	
	var res =  db.collection("OperationalDatabase").find({group_id : group_id}).toArray(function(error, result){
	    if(error) throw error;
	    client.close();
	    callback(result[0]);
	});

    });
    
}


async function registerUser(user_id, password, group_id, name, email){
    return await createNewUser(user_id, password, group_id, async function(result){
	
	var userDataObj = {
	    user_id : user_id,
	    name : name,
	    email : email,
	    member_group_id : group_id,
	    involved_tabs : [],
	    notifications : []
	};

	var groupObject = {
	    group_id : group_id,
	    group_admin_user_id : user_id,
	    members : [userDataObj],
	    groupTasks : [],
	    messages : []
	};
	
	await MongoClient.connect(connStr, function(err,client){
	    if(err) throw err;

	    const db = client.db('test');
	    db.collection("OperationalDatabase").insertOne(groupObject, function(error, results){
		if(error) throw error;
		else
		    client.close();
	    });
	    
	});

    });
    
}

//main function that handles user registration
// //writes response to socket
// async function registerUser(user_id, password, group_id, name, email){
  
//     try{
// 	var response = await createNewUser(user_id, password, group_id);

// 	if(response === 'User already exists, please select another username.'){
// 	    //respond with user already exists
// 	}
// 	else if(response === 'User added successfully.'){
// 	    var userDataObj = {
// 		user_id : user_id,
// 		name : name,
// 		email : email,
// 		member_group_id : group_id,
// 		involved_tabs : [],
// 		notifications : []
// 	    };

// 	    var groupObject = await fetchGroupData(group_id);

// 	    //if group_id is new
// 	    if(groupObject === {}){
// 		groupObject =  {
// 		    group_id : group_id,
// 		    group_admin_user_id : user_id,
// 		    members : [userDataObj],
// 		    groupTasks : [],
// 		    messages : []
// 		};
		
// 	    }
// 	    else{
// 		groupObject.members.push(userDataObj);
// 	    }

// 	    //write to OpDB
// 	    await MongoClient.connect(connStr, function(err,client){
// 		if(err) throw err;

// 		const db = client.db('test');
// 		db.collection("OperationalDatabase").insertOne(groupObject, function(error, result){
// 		    if(error) throw error;
// 		    client.close();
// 		    return result;
// 		});
// 	    });

// 	    return groupObject;
// 	}
//     }
//     catch(err)
//     {
// 	//respond with server error occured
//     }
// }

//main function that handles user login, fetches data
async function loginUser(user_id, password){
    //check credentials
    
    //fetch group Data
}

async function main(){
    var result = await fetchGroupData("test", function(res){console.log(res);});
 
}
main();
// //returns user data json field 
// async function getUserData(user_id){
//     if(typeof user_id != 'string')
// 	return 'Input argument is of wrong type';

//     var group = await AuthServer.getUserGroup(user_id, function(results){
// 	return results;
//     });

//     if(group == 'User does not exist'){
// 	return 'User does not exist';
//     }

//     var groupData = await fetchGroupData(group);

//     var memberDataList = groupData[members];
//     return memberDataList.find(x => x["user_id"] === user_id);

// }


module.exports.checkCredentials = checkCredentials;
module.exports.createNewUser = createNewUser;
module.exports.fetchGroupData = fetchGroupData;
module.exports.registerUser = registerUser;
//module.exports.getUserData = getUserData;
//module.exports.createGroup = createGroup;
