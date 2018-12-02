const OpServer = require('./OperationalDBWrapper.js');
const http = require('http');
const express = require('express');
const port = 7070;
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//test function to confirm that server is running
app.get('/test', function(req, res){
    res.send('<h1> Hello Christopher </h1>');
});

//register new user
app.post('/newusers', async function(req, res){
    var postData = req.body;
    var username = postData.desiredUsername;
    var group_id = postData.groupId;
    var password = postData.password;
    var email = postData.email;
    var name = postData.name;

    return await OpServer.registerUser(username, password, group_id, name, email, function(result){
	if(result === 'User already exists.'){
	    res.statusCode = 400;
	    res.send("User already exists.");
	}
	else{
	    res.statusCode = 200;
	    res.send();
	}
    });
});

//handle login
app.post('/users/login', async function(req, res){
    var postData = req.body;
    var username = postData.username;
    var password = postData.password;

    return await OpServer.checkCredentials(username, password, function(result){
	if(result === "User doesn't exist"){
	    res.statusCode = 404;
	    res.send("User doesn't exist");
	}
	else if(result === true){
	    res.statusCode = 200;
	    //now return groupData
	}
	else{
	    res.statusCode = 401;
	    res.send();
	}
	    
    });
});

//retrieve group data
app.get('/groups/*', async function(req, res){
    var fullPath = req.path;
    var groupId = fullPath.split('/groups/').pop();

    return await OpServer.fetchGroupData(groupId, function(result){
	if(result){
	    res.statusCode = 200;
	    res.setHeader('Content-Type','application/json');
	    res.send(JSON.stringify(result));	    
	}else{
	    res.statusCode = 404;
	    res.send("Group doesn't exist.");
	}
    });
});

app.listen(port, '0.0.0.0',() =>{
    console.log("Server running on port %s", port);
});
