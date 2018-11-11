//Adapter for MySQL that returns promises
//Jeremy Chan + Chris Zhang

"use strict";

var mysql = require('mysql');

class Database{


	constructor(connectionObj){
		this.db = mysql.createConnection(connectionObj);
	}

	connectToDatabase(){
		return new Promise((resolve, reject) => {
			this.db.connect(function(err){
				if(err)
					reject(err);
				resolve();
			});
		});
	}

	query(queryString, args){
		return new Promise((resolve, reject) => {
			this.db.query(queryString, args, function(err, results){
				if(err)
					reject(err);
				resolve(results);
			});
		});
	}

	close(){
		return new Promise((resolve, reject) => {
			this.db.end(err=>{
				if(err)
					return reject(err);
				resolve();
			});
		});
	}
		
}

module.exports = Database;
			

	
	

	
