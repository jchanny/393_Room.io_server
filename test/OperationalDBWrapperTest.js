const assert = require('assert');
const AuthServer = require('../src/AuthServer/AuthServer.js');
const OpServer = require('../src/OperationalServer/OperationalDBWrapper.js');
const MongoClient = require('mongodb').MongoClient;
const connStr = 'mongodb://localhost:27017';

//set up test environment, add user called Bob, group 
describe('test checkCredentials()' ,function(){
    it("Should return error if user_id not string", function(){
	OpServer.checkCredentials(11111, "aaaas", function(result){
	   return assert.equal(result, 'Input argument is of wrong type.');
	});
    });

    it("Should return error if password not string", function(){
	 OpServer.checkCredentials("1111", 11, function(result){
	    assert.equal(result, 'Input argument is of wrong type.');
	});
    });

    it("Should return true if credentials are valid", async function(){
	try{
	    await OpServer.checkCredentials("111", "a", function(result){
		return assert.equal(result, true);
	    });

	}
	catch(err){
	    console.log(err);
	    return assert.fail();
	}
    });

    it("Should return false if credentials are not valid", async function(){
	try{
	    await OpServer.checkCredentials("111", "b", function(result){
		return assert.equal(result, false);
	    });

	}
	catch(err){
	    console.log(err);
	    return assert.fail();
	}
    });

    it("Should return user doesn't exist if user doesn't exist", async function(){
	try{
	    await OpServer.checkCredentials("999", "a", function(result){
		return assert.equal(result, "User doesn't exist");
	    });

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
	     await OpServer.createNewUser("111", "fdsd", "2222", function(result){
		return assert.equal(result, 'User already exists.');
	    });

	}
	catch(err){
	    console.log(err);
	    return assert.fail();
	}
	
    });

    it('Should add user to AuthDatabase if unique user_id', async function(){
	try{
	    await OpServer.createNewUser("333", "fff", "bob", async function(result){
		await AuthServer.checkIfUserExists("333", function(result){
	    	    return assert.equal(result, true);
		});
		
	    });

	}
	catch(err){
	    console.log(err);
	    return assert.fail();
	}
    });
    
});

describe('test registerUser', function(){
    it('return error if user_id not string', function(){
	return OpServer.registerUser(999, "222", "2222", "bob","d", function(result){
	    return assert.equal(result, 'Input argument is of wrong type.');
	});

    });

    it('return error if password not string', function(){
	return OpServer.registerUser("fsdf",222,"2222","bob","d", function(result){
	    return assert.equal(result, 'Input argument is of wrong type.');
	});

    });

    it('return error if group_id not string', function(){
	return OpServer.registerUser("fsdf","222",2222,"bob","d", function(result){
	    return assert.equal(result, 'Input argument is of wrong type.');
	});

    });

    it('return error if name not string', function(){
	return OpServer.registerUser("fsdf","222",2222,"bob","d", function(result){
	    return assert.equal(result, 'Input argument is of wrong type.');
	});

    });

    it('return error if email not string', function(){
	return OpServer.registerUser("fsdf","222","2222","bob", false, function(result){
	    return assert.equal(result, 'Input argument is of wrong type.');
	});

    });

    it('Should check if user already exists', async function(){
	await OpServer.registerUser("111", "a", "2222", "bob","test", function(result){
	    return assert.equal(result, 'User already exists.');
	});

    });

    it("Add user if group doesn't exist already", async function(){
	try{
	    await OpServer.registerUser("nogroup", "a", "newgroup", "irrelelvant", "email", function(result){
		
	    });
	}catch(e){
	    console.log(e);
	    return assert.fail();
	}
    });

    it("Add user to existing group", async function(){
	return assert.fail();
    });
    
});

describe('test fetchGroupData', function(){
    it('return error if group_id is not string', function(){
	return OpServer.fetchGroupData(1112, function(result){
    	    assert.equal(result, 'Input argument is of wrong type.');
	});

    });

    it('returns {} if group_id does not correspond to valid group', async function(){
	return await OpServer.fetchGroupData("bob", function(result){
	    return assert.equal(result, 'undefined');
	});
    });

    it('returns correct group data if group corresponds to valid group', async function(){
	return await OpServer.fetchGroupData("newgroup", function(result){
	});
    });
});

describe('test modifyGroupData', function(){
    
});

describe('test loginUser', function(){
    
});
