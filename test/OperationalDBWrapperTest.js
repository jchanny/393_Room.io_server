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

describe('test registerUser', function(){
    it('return error if user_id not string', function(){
	return OpServer.registerUser(999, "222", "2222", "bob","d", function(result){
	    return assert.equal(result, 'Input argument is of wrong type');
	});

    });

    it('return error if password not string', function(){
	return OpServer.registerUser("fsdf",222,"2222","bob","d", function(result){
	    return assert.equal(result, 'Input argument is of wrong type');
	});

    });

    it('return error if group_id not string', function(){
	return OpServer.registerUser("fsdf","222",2222,"bob","d", function(result){
	    return assert.equal(result, 'Input argument is of wrong type');
	});

    });

    it('return error if name not string', function(){
	return OpServer.registerUser("fsdf","222",2222,"bob","d", function(result){
	    return assert.equal(result, 'Input argument is of wrong type');
	});

    });

    it('return error if email not string', function(){
	return OpServer.registerUser("fsdf","222","2222","bob", false, function(result){
	    return assert.equal(result, 'Input argument is of wrong type');
	});

    });

    it('Should check if user already exists', async function(){
	var result = await OpServer.registerUser("111", "a", "2222", "bob","test");
	return assert.equal(result, 'User already exists.');
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
	
    });
});

