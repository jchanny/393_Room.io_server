//Test suite for Auth server
//Jeremy Chan + Chris Zhang
const assert = require('assert');
const AuthServer = require('../src/AuthServer/AuthServer.js');
const expect = require('expect');

describe('test checkIfUserExists()', function(){
    it('Should return error if user_id not int', function(){
	AuthServer.checkIfUserExists("fsfd", function(result){
	    assert.equal(result, 'Input argument is of wrong type.');
	});
    });

    it("Should return false if user doesn't exist", async function(){
	try{
	    var result = await AuthServer.checkIfUserExists(999999);
	    return assert.equal(result, false);
	}catch(err){
	    console.log(err);
	    return assert.fail();
	}
    });

        it("Should return true if user does exist", async function(){
	try{
	    var result = await AuthServer.checkIfUserExists(111);
	    return assert.equal(result, true);
	}catch(err){
	    console.log(err);
	    return assert.fail();
	}
    });
});

describe('test validateCredentials()', function(){

    it("Should return error if user_id not int", function(){
	AuthServer.validateCredentials("999", "dsf", function(result){
	    assert.equal(result, 'Input argument is of wrong type.');
	});
    });

    it("Should return error if password not string", function(){
	AuthServer.validateCredentials(999, 222, function(result){
	    assert.equal(result, 'Input argument is of wrong type.');
	});
    });

    
    it("validateCredentials should throw User doesn't exist if user doesn't exist", async function(){
	try{
	    await AuthServer.validateCredentials(9999, "dsf", function(result){
		return assert.equal(result, "User doesn't exist");
	    });
	}
	catch(err){
	    console.log(err);
	    return assert.fail();
	}
    });
    

    it("should return true if password and user_id are match", async function(){
	try{
	    await AuthServer.validateCredentials(111, "a", function(result){
		return assert.equal(result, true);
	    });
	}
	catch(err){
	    console.log(err);
	    return assert.fail();
	}
    });
  

    it("Should return false if password doesn't match", async function(){
	try{
    	    await AuthServer.validateCredentials(111, "b", function(result){
    		return assert.equal(result, false);
    	    });
	}
	catch(err){
	    console.log(err);
	    return assert.fail();
	}
    });

});

describe('test addUser()', function(){
    it('Error should be thrown if user_id not int', function(){
	AuthServer.addUser( "1112", 222, "a", function(result){
	    assert.equal(result, 'Input argument is of wrong type.');
	    
	});
    });

    it('Error should be thrown if group_id not int', function(){
	AuthServer.addUser( 1112, "222", "a", function(result){
	    assert.equal(result, 'Input argument is of wrong type.');
	    
	});
    });

    it('Error should be thrown if password not string', function(){
	 AuthServer.addUser( 1112, 222, 1, function(result){
	     assert.equal(result, 'Input argument is of wrong type.');
	     
	});
    });

    it('Error should be thrown if user already exists', async function(){
	try{
	await AuthServer.addUser( 111, 2222, "a", function(result){
	    return assert.equal(result, 'User already exists');

	});
	}catch(err){
	    console.log(err);
	    return assert.fail();
	}
    });

    it("User should be successfully added if doesn't exist already", async function(){
	try{
	    await AuthServer.addUser( 333, 1010, "a", function(result){
		return assert.equal(result, 0);
	    });
	}catch(err){
	    console.log(err);
	    return assert.fail();
	}
    });
    
});

describe('test deleteUser()', function(){
    it('Error should be thrown if user_id not an int', function(){
	AuthServer.deleteUser( "333", function(result){
	    assert.equal(result, 'Input argument is of wrong type');
	    
	});
    });

    it('0 should be returned if user deleted successfully', async function(){
	try{
	    await AuthServer.deleteUser(333, function(result){
		return assert.equal(result, 0);
	    });
	}catch(err){
	    console.log(err);
	    return assert.fail();
	}
	    
    });

    it('1 should be returned if attempt to delete nonexistent user', async function(){
	try{
	    await AuthServer.deleteUser(4444, function(result){
		return assert.equal(result, 0);
	    });
	}catch(err){
	    console.log(err);
	    return assert.fail();
	}
    });
    
 });

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

     it("should return 'User does not exist' if user doesn't exist", async function(){
	 try{
	     await AuthServer.getUserGroup(22229, function(results){
		 return assert.equal(results, 'User does not exist');
	     });
	 }
	 catch(err){
	     console.log(err);
	      return assert.fail();
	 }
     });


    it("getUserGroup() should not accept invalid input.", function(){
    	return AuthServer.getUserGroup('111', function(result){
    	    assert.equal(result, 'Input argument is of wrong type.');
    	});
    })

 });




