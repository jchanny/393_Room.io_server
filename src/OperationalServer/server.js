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

app.listen(port, '0.0.0.0',() =>{
    console.log("Server running on port %s", port);
});
