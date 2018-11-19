//Test suite for Auth server
//Jeremy Chan + Chris Zhang
const assert = require('assert');
const AuthServer = require('../src/AuthServer/AuthServer.js');
const expect = require('expect');


// describe('Checking test environment is setup correctly.', function(){
//     var connection = AuthServer.connectToDatabase(3306, 'root', 'a', 'test');
    
//     it('Verifying a test database named "test" running on port 3306, root user, password of "a" exists.', function(){
// 	assert.notEqual(connection, null);
//     });

// });

// describe('test validateCredentials()', function(){

//     it("Should return error if user_id not int", function(done){
// 	AuthServer.validateCredentials(connection, "999", "dsf", function(result){
// 	    assert.equal(result, 'Input argument is of wrong type.');
// 	    done();
// 	});
//     });

//     it("Should return error if password not string", function(done){
// 	AuthServer.validateCredentials(connection, 999, 222, function(result){
// 	    assert.equal(result, 'Input argument is of wrong type.');
// 	    done();
// 	});
//     });
    
//     it("validateCredentials should throw User doesn't exist if user doesn't exist", function(done){
// 	AuthServer.validateCredentials(connection, 9999, "dsf", function(result){
// 	    assert.equal(result, "User doesn't exist");
// 	    done();
// 	});
//     });

//     it("Should return true if password and user_id are a match", function(done){
// 	AuthServer.validateCredentials(connection, 111, "a", function(result){
// 	    assert.equal(result, true);
// 	    done();
// 	});
//     });

//     it("Should return false if password doesn't match", function(done){
// 	AuthServer.validateCredentials(connection, 111, "b", function(result){
// 	    assert.equal(result, false);
// 	    done();
// 	});
//     });

// });

// describe('test addUser()', function(){
//     it('Error should be thrown if user_id not int', function(done){
// 	AuthServer.addUser(connection, "1112", 222, "a", function(result){
// 	    assert.equal(result, 'Input argument is of wrong type.');
// 	    done();
// 	});
//     });

//     it('Error should be thrown if group_id not int', function(done){
// 	AuthServer.addUser(connection, 1112, "222", "a", function(result){
// 	    assert.equal(result, 'Input argument is of wrong type.');
// 	    done();
// 	});
//     });

//     it('Error should be thrown if password not string', function(done){
// 	 AuthServer.addUser(connection, 1112, 222, 1, function(result){
// 	     assert.equal(result, 'Input argument is of wrong type.');
// 	     done();
// 	});
//     });

//     it('Error should be thrown if user already exists', function(done){
// 	 AuthServer.addUser(connection, 111, 2222, "a", function(result){
// 	     assert.equal(result, 'User already exists');
// 	     done();
// 	});
//     });

//     it("User should be successfully added if doesn't exist already", function(done){
// 	 AuthServer.addUser(connection, 333, 1010, "a", function(result){
// 	     assert.equal(result, 0);
// 	     done();
// 	 });
//     });
    
// });

// describe('test deleteUser()', function(){
//     it('Error should be thrown if user_id not an int', function(done){
// 	AuthServer.deleteUser(connection, "333", function(result){
// 	    assert.equal(result, 'Input argument is of wrong type');
// 	    done();
// 	});
//     });

    
// });

 describe('test getUserGroup()', function(){

     it("getUserGroup() should return correct group_id of user", async function(){
	 try{
	     await AuthServer.getUserGroup(111, function(result){
		 return assert.equal(result, 2222);
	     });
	 }
	 catch(err){
	     console.log(err);
	     return assert.fail();
	 }
     });
	
//     it("getUserGroup() should not be able to be called if no database connection exists", function(done){
//     	done();
     
//     });

	 

//     it("getUserGroup() should return User does not exist if user_id not in database", function(done){
//     	return AuthServer.getUserGroup(connection, 0000222, function(result){
//     	    assert.equals(result, 'User does not exist');
//     	    done();
//     	});
//     });

//     it("getUserGroup() should not accept invalid input.", function(done){
//     	return AuthServer.getUserGroup(connection, '111', function(result){
//     	    assert.equal(result, 'Input argument is of wrong type.');
//     	    done();
//     	});
//     })

 });

// describe('test connectToDatabase()', function(){
    
//     it('Should not accept port number that is same as server', function(done){
// 	//need to wrap around a function if checking throw value
// 	assert.throws(function(){
// 	    AuthServer.connectToDatabase(3000, 'root', 'a', 'test');
// 	},Error, 'Database and Auth Server cannot be hosted on same port!');
// 	done();
	
//     });

//     //need to figure out how to correctly throw
//     it("Should throw error if database doesn't exist", function(done){
// 	done();
	
//     });

//     it("Should throw error if login credentials don't exist", function(done){
// 	done();
	
//     });

//     it("Should throw error if AuthDatabase doesn't exist", function(done){
// 	done();
//     });
    
// });




