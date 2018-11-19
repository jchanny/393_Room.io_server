//By Jeremy Chan + Chris Zhang
//EECS 393 final project
//Authentication Server that handles all verification+authentication tasks
//Middleware for communicating with Authentication database
const mysql = require('mysql');
const http = require('http');
const Database = require('../DatabaseWrapper.js');
var db  =  new Database({
	port : 3306,
	user : 'root',
	password : 'a',
	database : 'test'
});

const port = 3000;
const INVALID_ARGUMENT_TYPE = 'Input argument is of wrong type.';

function errorCallback(err){
    throw err;
}

function errorHandler(message, err){
    console.log(message + err);
}

//checks against auth server to see if user exists
//returns true if user password matches, false if no, throws error if not exist
function validateCredentials(db, user_id, password, callback){
    if(typeof user_id != 'number' || typeof password != 'string')
	return callback(INVALID_ARGUMENT_TYPE);

    db.query('SELECT password FROM AuthDatabase WHERE user_id = ?',[user_id]).then(function(results){
	if(results.length == 0){
	    callback("User doesn't exist");
	}else{
	    var pw = results[0].password;
	    if(pw === password)
		callback(true);
	    else
		callback(false);
	}

    }).catch(function(err){
	console.log(err.code);
    });
}

//adds user to to Auth Database
//Assumption: Auth Database was set up correctly and will only allow unique entries to be added
//0 will be returned if successful
function addUser(db, user_id, group_id, password, callback){
    if(typeof user_id != 'number' || typeof group_id != 'number' || typeof password != 'string')
	return callback(INVALID_ARGUMENT_TYPE);
    
    db.query('INSERT INTO AuthDatabase VALUES(?, ?, ?)', [user_id, group_id, password]).then(
	function(){
	    callback(0);
	}).catch(function(err){
	    console.log(err);
	});
}


//removes user from Auth Databases
//returns -1 if user doens't exist, 1 if deletion was successful
function deleteUser(db, user_id, callback){
    if(typeof user_id != 'number')
	return callback(INVALID_ARGUMENT_TYPE);
    
     db.query('DELETE FROM AuthDatabase WHERE user_id = ?', [user_id]).then(function(results){
	if(results.length == 0)
	    return callback(-1);
	else
	    return callback(0);
    }).catch(function(err){
	console.log(err);
    });
}

async function getUserGroup(user_id, callback){

    if(typeof user_id != 'number')
	return INVALID_ARGUMENT_TYPE;

    var results = await db.query('SELECT group_id FROM AuthDatabase WHERE user_id = ?', [user_id]);

    db.close();
    return callback(results[0].group_id);
    // db.query('SELECT group_id FROM AuthDatabase WHERE user_id = ?', [user_id]).then((results)=>{
    // 	if(results.length == 0){
    // 	    return callback('User does not exist');
    // 	}else{
    // 	    return callback(results[0].group_id);
    // 	}
    // }).catch(function(err){
    // 	console.log(error);
    // });
    
}


function main(){

    getUserGroup(111, function(res){
    	console.log(res);
    });

}

//main();

module.exports.getUserGroup = getUserGroup;
module.exports.addUser = addUser;
module.exports.validateCredentials = validateCredentials;
module.exports.deleteUser = deleteUser;
