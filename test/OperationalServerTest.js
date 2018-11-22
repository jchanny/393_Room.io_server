const assert = require('assert');
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

});

describe('test createNewUser()', function(){
    it('should throw error if user_id not string', function(){
	OpServer.createNewUser(111, "a", "222", function(result){
	    assert.equal(result, 'Input argument is of wrong type.');
	});
    });

    it('should throw error if group_id not num', function(){
	OpServer.createNewUser("111", "a", 222, function(result){
	    assert.equal(result, 'Input argument is of wrong type.');
	});
    });

    it('should throw error if password not string', function(){
	OpServer.createNewUser("111", "22", 222, function(result){
	    assert.equal(result, 'Input argument is of wrong type.');
	});
    });

    it('Should return error if username already exists', async function(){
	try{
	    var result = await OpServer.createNewUser("111", "fdsd", "test.test", "f", 2222);
	    return assert.equal(result, 'User already exists, please select another username.');
	}
	catch(err){
	    console.log(err);
	    return assert.fail();
	}
	
    });
    
});

// describe('test fetchGroupData()', function(){
//     it('should throw error if type of user_id not int', function(){
// 	var result = OpServer.getUserData("111");
// 	assert.equal(result, 'Input argument is of wrong type.');
//     });

//     it('Should return group does not exist if group not found',async function(){
// 	try{
// 	    assert.fail();
// 	}catch(err){
// 	    console.log(err);
// 	    assert.fail();
// 	}
//     });
// });

// describe('test getUserData()', function(){
//     it('should throw error if type of user_id not int', function(){
// 	var result = OpServer.getUserData("1111");
// 	assert.equal(result, 'Input argument is of wrong type.');
//     });

//     it('should return user does not exist', async function(){
// 	try{
// 	    var results = await OpServer.getUserData(9999);
// 	    return assert.equal(results, 'User does not exist');
// 	}catch(err){
// 	    console.log(err);
// 	    return assert.fail();
// 	}
//     });

//     it('should return the user data', async function(){
// 	try{
// 	    var results = await OpServer.getUserData(666);
// 	    return assert.equal(results, 
// 		{ "user_id" : 666, "member_group_id" : 666, "admined_group_id" : 666, "involved_tabs" : [ ], "notifications" : [ ] } 
// 	    );
// 	}
// 	catch(err){
// 	    console.log(err);
// 	    return assert.fail();
// 	}
//     })

// });

// describe('test createGroup()', function(){
//     it('should throw error if group_owner not num', function(result){
// 	var result = OpServer.createGroup("f", 1112, "test");
// 	assert.equal(result, 'Input argument is of wrong type.');
//     });

//     it('should throw error if group_id not num', function(result){
// 	var result = OpServer.createGroup(1112, '1112', "test");
// 	assert.equal(result, 'Input argument is of wrong type.');
//     });

//     it('should throw error if group_name not string', function(result){
// 	var result = OpServer.createGroup(1112, 1112, 1112);
// 	assert.equal(result, 'Input argument is of wrong type.');
//     });

//     it('Should add correctly to database', async function(result){
// 	try{
// 	    await OpServer.createGroup(666, 666, "test");
// 	    //need to check against MongoDB
// 	}
// 	catch(err){
// 	    console.log(err);
// 	    assert.fail();
// 	}
//     });
    
// });
