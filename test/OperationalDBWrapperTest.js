const assert = require('assert');
const AuthServer = require('../src/AuthServer/AuthServer.js');
const OpServer = require('../src/OperationalServer/OperationalDBWrapper.js');
const MongoClient = require('mongodb').MongoClient;
const connStr = 'mongodb://localhost:27017';

describe('test returnContinuation', function(){
    assert.equal(OpServer.returnContinuation(1), 1);
});

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
	    await OpServer.registerUser("nogroup", "a", "newgroupA", "irrelelvant", "email", async function(result){
		await MongoClient.connect(connStr, function(err, client){
		    if(err) throw err;
		    const db = client.db('test');
		    db.collection("OperationalDatabase").find({group_id : "newgroupA"}).toArray(function(error, results){
			client.close();
		    });
		});
	    });
	}catch(e){
	    console.log(e);
	    return assert.fail();
	}
    });

    it("Add user to existing group", async function(){
	try{
	   return await OpServer.registerUser("nogroupA", "a", "newgroupA", "irrelelvant", "email", async function(result){
		return await MongoClient.connect(connStr, function(err, client){
		    if(err) throw err;
		    const db = client.db('test');
		    db.collection("OperationalDatabase").find({group_id : "newgroupA"}).toArray(function(error, results){
			client.close();
		    });
		});
	    });
	}catch(e){
	    console.log(e);
	    return assert.fail();
	}
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
	    if(typeof result === 'undefined')
		return assert.equal(true, true);
	    else
		return assert.fail();
	});
    });

    it('returns correct group data if group corresponds to valid group', async function(){
	return await OpServer.fetchGroupData("newgroupA", async function(result){
	    try{
		return await MongoClient.connect(connStr, function(err, client){
		    if(err) throw err;
		    const db = client.db('test');
		    db.collection("OperationalDatabase").find({group_id:"newgroupA"}).toArray(function(error, results){
			client.close();
		    });
		});
	    }
	    catch(e){
		console.log(e);
		return assert.fail();
	    }
	});
    });
});

describe('test modifyGroupData', function(){
    it('Should return error if group_id not string', function(){
	OpServer.modifyGroupData(111,{}, function(result){
	    assert.equal(result, 'Input argument is of wrong type.');
	});
    });

    it('Should return error if payload is empty', function(){
	OpServer.modifyGroupData("bbb", null, function(result){
	    assert.equal(result,'No payload.');
	});
    });

    it('Should replace data correctly.', async function(){
	try{
	    return await OpServer.modifyGroupData("newgroup", {"group_id" : "newgroup","result":"oneliner"}, async function(result){
		if(result === 'Success'){
		    return await OpServer.fetchGroupData("newgroup", function(results){
			if(results)
			    return assert.equal(1,1);
			else
			    return assert.fail();
		    });
		}
		else{
		    return assert.fail();
		}
	    });
	}
	catch(e){
	    console.log(e);
	    assert.fail();
	}
    });
});

describe('test loginUser', function(){
    it('Should throw error if user_id is not a string', function(){
	OpServer.loginUser(111, "2222", function(result){
	    assert.equal(result, 'Input argument is of wrong type.');
	});
    });

    it('Should throw error if password is not string', function(){
	OpServer.loginUser("111", 2222, function(result){
	    assert.equal(result, 'Input argument is of wrong type.');
	});
    });

    it('Should return user does not exist if user does not exist', async function(){ 
	try{
	    return await OpServer.loginUser("doesntExist","bleh", function(result){
		assert.equal(result, "User doesn't exist.");
	    });
	}
	catch(e){
	    console.log(e);
	    assert.fail()
	}
    });

    it('Should say invalid credentials if credentials do not match', async function(){
	try{
	    return await OpServer.loginUser("111", "b", function(result){
		assert.equal(result, "Invalid credentials.");
	    });
	}
	catch(e){
	    console.log(e);
	    assert.fail();
	}
    });
    
    it('Should return group data if user entered correct credentials', async function(){
	try{
	    return await OpServer.loginUser("nogroupA", "newgroup", function(result){
		if(result){
		    return assert.equal(true, true);
		}
		else
		    return assert.fail();
	    });
	}catch(e){
	    console.log(e);
	    assert.fail();
	}
    })
});
