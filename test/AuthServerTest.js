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

describe('connectToDatabase()', function(){
	
	
	it('connectToDatabase should return a connection object', function(){
		assert.equal(AuthServer.connectToDatabase(3306, '','','empty'),
					 {
						 port : 3999,
						 user : '',
						 password : '',
						 dbName : 'empty'
					 });
	});
	
});




