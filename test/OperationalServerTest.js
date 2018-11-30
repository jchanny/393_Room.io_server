const assert = require('assert');
const AuthServer = require('../src/AuthServer/AuthServer.js');
const OpServer = require('../src/OperationalServer/OperationalServer.js');
const MongoClient = require('mongodb').MongoClient;
const connStr = 'mongodb://localhost:27017';

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

describe('test fetchGroupData', function(){
    it('return error if group_id is not string', async function(){
	var result = await OpServer.fetchGroupData(1112);
	return assert.equal(result, 'Input argument is of wrong type.');
    });

    it('returns {} if group_id does not correspond to valid group', async function(){
	var result = await OpServer.fetchGroupData("bob");
	console.log(result);
    });

    it('returns correct group data if group corresponds to valid group', async function(){
	var testObj = {
		group_id : "bobson",
		group_admin_user_id : "999",
		members : [{user_id : "999"}],
		groupTasks : [],
		messages : []
	};
	
	await MongoClient.connect(connStr, function(err, client){
	    db.collection("OperationalDatabase").insertOne(testObj);

	    client.close();
	});

	var result = await OpServer.fetchGroupData("bobson");
	return assert.equal(result, testObj);
    });
});

describe('test registerUser', function(){
    it('return that input arg is wrong type if user_id not string', function(){
	assert.fail();
    });

    it('return input arg is wrong if password not string', function(){
	assert.fail();
    });

    it('return input arg is wrong if group_id not string', function(){
	assert.fail();
    });

    it('return user already exists if user_id not unique', function(){
    });
    
    describe('Create new group w/user as admin if group_id does not already exist', function(){
	it('there should be no other members in this group', function(){
	});

	it('user should be admin of the group', function(){
	});

	assert.fail();
    });

    describe('Add user data to an existing group if it already exists', function(){
	it('number of keys of the groupData object should not have changed', function(){
	});
	
	it('new user data should be added', function(){
	    //check that members[1] is there
	});
    });
});

