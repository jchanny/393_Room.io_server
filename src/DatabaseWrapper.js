//Adapter for MySQL that returns promises
//Jeremy Chan + Chris Zhang

"use strict";

var mysql = require('mysql');

class Database{


	constructor(connectionObj){
		this.db = mysql.createConnection(connectionObj);
	}

	query(queryString, args){
		return new Promise(function(resolve, reject){
			console.log(this.db);
			this.db.query(queryString, args, function(err, results){
				console.log(queryString);
				console.log(results);
				if(err){
					reject(err);
				}
				else{
					resolve;
				}
			});
		});
	}

	close(){
		return new Promise(function(resolve, reject){
			this.db.end(function(err){
				if(err)
					return reject(err);
				else
					resolve();
			});
		});
	}
		
}

module.exports = Database;
			

	
	

	
