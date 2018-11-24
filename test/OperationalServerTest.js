const assert = require('assert');
const AuthServer = require('../src/AuthServer/AuthServer.js');
const OpServer = require('../src/OperationalServer/OperationalServer.js');

describe('test checkCredentials()' ,function(){
    it("Should return error if user_id not string", function(){
	OpServer.checkCredentials(11111, "aaaas", function(result){
	    assert.equal(result, 'Input argument is of wrong type.');
	});
    });

    it("Should return error if password not string", function(){
	OpServer.checkCredentials("1111", 11, function(result){
	    assert.equal(result, 'Input argument is of wrong type.');
	});
    });

    it("Should return true if credentials are valid", async function(){
	try{
	    var result = await OpServer.checkCredentials("111", "a");
	    return assert.equal(result, true);
	}
	catch(err){
	    console.log(err);
	    return assert.fail();
	}
    });

    it("Should return false if credentials are not valid", async function(){
	try{
	    var result = await OpServer.checkCredentials("111", "b");
	    return assert.equal(result, false);
	}
	catch(err){
	    console.log(err);
	    return assert.fail();
	}
    });

    it("Should return user doesn't exist if user doesn't exist", async function(){
	try{
	    var result = await OpServer.checkCredentials("999", "a");
	    return assert.equal(result, "User doesn't exist");
	}catch(err){
	    console.log(err);
	    return assert.fail();
	}
    });
});

describe('test createNewUser()', function(){
    it('should throw error if user_id not string', function(){
	OpServer.createNewUser(111222, "a", "222", function(result){
	    assert.equal(result, 'Input argument is of wrong type.');
	});
    });

    it('should throw error if group_id not string', function(){
	OpServer.createNewUser("11122", "a", 222, function(result){
	    assert.equal(result, 'Input argument is of wrong type.');
	});
    });

    it('should throw error if password not string', function(){
	OpServer.createNewUser("111222", 22, "222", function(result){
	    assert.equal(result, 'Input argument is of wrong type.');
	});
    });

    it('Should return error if username already exists', async function(){
	try{
	    var result = await OpServer.createNewUser("111", "fdsd", "2222");
	    return assert.equal(result, 'User already exists, please select another username.');
	}
	catch(err){
	    console.log(err);
	    return assert.fail();
	}
	
    });

    it('Should add user to AuthDatabase if unique user_id', async function(){
	try{
	    await OpServer.createNewUser("333", "fff", "bob");
	    var result = await AuthServer.checkIfUserExists("333");
	    return assert.equal(result, true);
	}
	catch(err){
	    console.log(err);
	    return assert.fail();
	}
    });

    
    
});

