//By Jeremy Chan + Chris Zhang
//EECS 393 final project
//Authentication Server that handles all verification+authentication tasks
//Middleware for communicating with Authentication database
const mysql = require('mysql');
const http = require('http');
const Database = require('../DatabaseWrapper.js');
const defaultDBObject = {
	port : 3306,
	user : 'root',
	password : 'a',
	database : 'test'
};

const port = 3000;
const INVALID_ARGUMENT_TYPE = 'Input argument is of wrong type.';

//returns true if user exists, false otherwise
async function checkIfUserExists(user_id){
    if(typeof user_id != 'string')
	return callback(INVALID_ARGUMENT_TYPE);
    
    var db = new Database(defaultDBObject);
    var results = await db.query('SELECT * FROM AuthDatabase WHERE user_id = ?', [user_id]);
    
    db.close();
    if(results.length != 0)
	return true;
    else
	return false;
}

//checks against auth server to see if user exists
//returns true if user password matches, false if no, throws error if not exist
async function validateCredentials(user_id, password, callback){
    if(typeof user_id != 'string' || typeof password != 'string')
	return callback(INVALID_ARGUMENT_TYPE);

    var db = new Database(defaultDBObject);
    
    var results = await db.query('SELECT password FROM AuthDatabase WHERE user_id = ?',[user_id]);
    
    db.close();
    
    if(results.length == 0){
	return callback("User doesn't exist");
    }else{
	var pw = results[0].password;
	if(pw === password){
	    return callback(true);
	}
    }
    return callback(false);
}

//async function that returns user group from AuthDB
async function getUserGroup(user_id, callback){
    if(typeof user_id != 'string')
	return callback(INVALID_ARGUMENT_TYPE);
    
    var db  =  new Database(defaultDBObject);

    var results = await db.query('SELECT group_id FROM AuthDatabase WHERE user_id = ?', [user_id]);

    db.close();

    if(results.length == 0){
	return callback('User does not exist');
    }else{
	return callback(results[0].group_id);
    }
        
}

//adds user to to Auth Database
//0 will be returned if successful
async function addUser(user_id, group_id, password, callback){
    if(typeof user_id != 'string' || typeof group_id != 'string' || typeof password != 'string')
	return callback(INVALID_ARGUMENT_TYPE);

    var db = new Database(defaultDBObject);
    
    try{
	var userExists = await checkIfUserExists(user_id);
	console.log("user exists" + userExists);
	if(userExists){
	    db.close();
	    return callback('User already exists');
	}
	else{
	    var results = await db.query('INSERT INTO AuthDatabase VALUES(?, ?, ?)', [user_id, group_id, password])
	    
	    db.close();
	    
	    return callback(0);
	}
    }
    catch(err){
	console.log(err);
	throw new Error();
    }
    
}

//removes user from Auth Databases
//returns 1 if user doens't exist, 0 if deletion was successful
async function deleteUser(user_id, callback){
    if(typeof user_id != 'string')
	return callback(INVALID_ARGUMENT_TYPE);

    var db = new Database(defaultDBObject);
    var userExists = await checkIfUserExists(user_id);
    if(!userExists)
	return callback(1);
    
    var result = await db.query('DELETE FROM AuthDatabase WHERE user_id = ?', [user_id]);

    db.close();
    
    return callback(0);
    
}


module.exports.getUserGroup = getUserGroup;
module.exports.addUser = addUser;
module.exports.validateCredentials = validateCredentials;
module.exports.deleteUser = deleteUser;
module.exports.checkIfUserExists = checkIfUserExists;
