//Test suite for Auth server
//Jeremy Chan + Chris Zhang
const assert = require('assert');
const AuthServer = require('../src/AuthServer/AuthServer.js');
const mysql = require('mysql');


describe('Checking test environment is setup correctly.', function(){
	it('Verifying a test database named "test" running on port 3306, root user, password of "a" exists.', function(){
		var connection = AuthServer.connectToDatabase(3306, 'root', 'a', 'test');
		assert.notEqual(connection, null);
		connection.close();
	});
																		  
});

describe('test connectToDatabase()', function(){
	
	it('Should not accept port number that is same as server', function(){
		//need to wrap around a function if checking throw value
		assert.throws(function(){
			AuthServer.connectToDatabase(3000, 'root', 'a', 'test');
		},Error, 'Database and Auth Server cannot be hosted on same port!');
		
	});

	//need to figure out how to correctly throw
	it("Should throw error if database doesn't exist", function(){
	
	});

	it("Should throw error if login credentials don't exist", function(){
	
	});
	
});


// describe('test addUser()', function(){

// 	var connection = AuthServer.connectToDatabase(3306, 'root', 'a', 'test');

// 	it("addUser() should be able to be called if no database connection exists", function(){
// 	});
	

	
// 	it("User should be added successfully if doesn't exist.", function(){
// 		AuthServer.addUser(connection, 4444, 1, 'blah', function(){
// 			connection.query('SELECT group_id FROM AuthDatabase WHERE user_id = 4444', []).then()
			
// 		});
// 	});
	
// 	it("Should not add a user if user already exists in database.", function(){
// 	});

// 	it("Should not add user if user_id provided is not an integer.", function(){
// 	});

// });

// describe('test deleteUser()', function(){
	
// 	it("deleteUser() should be able to be called if no database connection exists", function(){
		
// 	});

// 	it("deleteUser() should delete the user from the database.", function(){
// 	});

// 	it("deleteUser() should not delete nonexistent users.", function(){
// 	});

// 	it("Calling deleteUser() on non int input should throw error.", function(){
// 	});
	
// });

describe('test getUserGroup()', function(){

	var connection = AuthServer.connectToDatabase(3306, 'root', 'a', 'test');
	
	it("getUserGroup() should be able to be called if no database connection exists", function(){
	});

	it("getUserGroup() should return group number of given user_id", function(){
		AuthServer.getUserGroup(connection, 111, function(result){
			assert.equals(result, 2222);
		});
	});

	it("getUserGroup() should return -1 if user_id not in database", function(){
		AuthServer.getUserGroup(connection, 0000222, function(result){
			assert.equals(result, -1);
		});
	});

	it("getUserGroup() should not accept invalid input.", function(){
		AuthServer.getUserGroup(connection, '111', function(result){
			assert.equal(result, 'Input argument is of wrong type.');
		});
	})

	connection.close();
});


// describe('test validateCredentials()', function(){

// 	it("validateCredentials() should be able to be called if no database connection exists", function(){
// 	});
	
// });
	
