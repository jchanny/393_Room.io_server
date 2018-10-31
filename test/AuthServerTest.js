//Test suite for Auth server
//Jeremy Chan + Chris Zhang
const assert = require('assert');
const AuthServer = require('../src/AuthServer/AuthServer.js');
const mysql = require('mysql');


describe('Checking test environment is setup correctly.', function(){
	it('Verifying a test database named "test" running on port 3306, root user, password of "a" exists.', function(){
		var connection = AuthServer.connectToDatabase(3306, 'root', 'a', 'test');
		assert.notEqual(connection, null);
		connection.end();
	});
																			  
});

describe('test connectToDatabase()', function(){
	
	it('Should not accept port number that is same as server', function(){
		//need to wrap around a function if checking throw value
		assert.throws(function(){
			AuthServer.connectToDatabase(3000, 'root', 'a', 'test')
		},Error, 'Database and Auth Server cannot be hosted on same port!');
	});

	//need to figure out how to correctly throw
	it("Should throw error if database doesn't exist", function(){
		assert.throws(function(){
			AuthServer.connectToDatabase(3306, 'root', 'a', 'thisShouldntExist')
		}, Error, 'Error connecting to database: ER_BAD_DB_ERROR');
	});

	it("Should throw error if login credentials don't exist", function(){
		assert.throws(function(){
			AuthServer.connectToDatabase(3306, 'bleh', '', 'test')
		}, Error, 'Error connecting to database: ER_ACCESS_DENIED_ERROR');
	});
	
});


describe('test addUser()', function(){

	it("addUser() should be able to be called if no database connection exists", function(){
	});
	
	it("Should create Authentication table if none exist already", function(){
		
	});

	
});

describe('test deleteUser()', function(){
	
	it("deleteUser() should be able to be called if no database connection exists", function(){
	});
	
});

describe('test getUserGroup()', function(){

	it("getUserGroup() should be able to be called if no database connection exists", function(){
	});
	
});


describe('test validateCredentials()', function(){

	it("validateCredentials() should be able to be called if no database connection exists", function(){
	});
	
});
	
