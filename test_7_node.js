var express = require('express'); 
var mysql = require('mysql');
var app = express();

app.use(express.static('test7'));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies


var http = require('http');
var fs = require('fs');


var connection = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: "testpassword",
  database: "mydb"
});
connection.connect();



app.get('/', function(req, res) {
	
	fs.readFile('test_7.html', 'utf8', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
	
});

//Fetch all of the users

app.get('/api', function(req, res){
	   
	var query = connection.query('select * from users', function(err, result) {
    if (err) {
       console.error(err);
       return res.send(err);
    } else {
	   console.log(result);
       return res.send(result);
    }
    }); 	   
      
 });  
 
 
//Insert a new user 
 
app.post('/add', function(req, res){
	 
console.log(req.body);

if (Object.keys(req.body)) {
	
	var keys = Object.keys(req.body);
	var keys_list = keys.toString();
	
	var values = [];
	var values_list;
	
	for (var num in keys) {
		
		console.log('Key number ' + num + ': ' + keys[num]);		
		console.log('Value number ' + num + ': ' + req.body[keys[num]]);
		
		values.push("\'" + req.body[keys[num]] + "\'");		
	}
	
	values_list = values.toString();
}


var sql = 'INSERT INTO users (' + keys_list + ') VALUES (' + values_list + ')';
  
  connection.query(sql, function (err, result) {
    if (err) {
		console.error(err);
		return res.send(err);			
	}
	
	else {
	   console.log("1 record inserted:");
	   console.log(result);
       return res.send(result);
    }    
	
	
 });

	      
 }); 
 
 
 
//Update a user
 app.post('/change', function(req, res){
	 
console.log(req.body);

if (Object.keys(req.body)) {
	
	var keys = Object.keys(req.body);
		
	var values = [];
	var values_list;
	var id;
	
	for (var num in keys) {
		
		console.log('Key number ' + num + ': ' + keys[num]);		
		console.log('Value number ' + num + ': ' + req.body[keys[num]]);
		
		if (num==0) {
		    id = keys[num] + "=\'" + req.body[keys[num]] + "\'";	
		}
		else  {
		    values.push(keys[num] + "=\'" + req.body[keys[num]] + "\'");	
		}
				
	}	
	
	values_list = values.toString();
}
 
var sql = 'UPDATE users SET ' + values_list + ' WHERE ' + id;
  
  connection.query(sql, function (err, result) {
    if (err) {
		console.error(err);
		return res.send(err);			
	}
	
	else {
	   console.log("1 record updated:");
	   console.log(result);
       return res.send(result);
    }    
	
	
 });

	      
 }); 
 
 
 //Delete a user
 app.post('/delete', function(req, res){
	 
console.log(req.body);

if (Object.keys(req.body)) {
	
	var keys = Object.keys(req.body);		
	var id;
	
	for (var num in keys) {
		
		console.log('Key number ' + num + ': ' + keys[num]);		
		console.log('Value number ' + num + ': ' + req.body[keys[num]]);
		
		if (num==0) {
		    id = keys[num] + "=\'" + req.body[keys[num]] + "\'";	
		}						
	}		
}
 
var sql = 'DELETE FROM users WHERE ' + id;
  
  connection.query(sql, function (err, result) {
    if (err) {
		console.error(err);
		return res.send(err);			
	}
	
	else {
	   console.log("1 record deleted:");
	   console.log(result);
       return res.send(result);
    }  	
	
 });

	      
 }); 
 
 
app.listen(8080);