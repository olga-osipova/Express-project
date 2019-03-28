var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: "testpassword",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  
  var sql1 = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), favorite_product VARCHAR(255))";
  
  con.query(sql1, function (err, result) {
    if (err) throw err;
    console.log("Users table created");
  });
  
  var sql2 = "INSERT INTO users (name, favorite_product) VALUES ?";
  
  var values1 =  [
  [ 'John', 154],
  [ 'Peter', 154],
  [ 'Amy', 155],
  [ 'Hannah', ""],
  [ 'Michael', ""] 
];
  
  con.query(sql2, [values1], function (err, result) {
    if (err) throw err;
    console.log("Number of user records inserted: " + result.affectedRows);
});

var sql3 = "CREATE TABLE products (id VARCHAR(255), name VARCHAR(255))";

 con.query(sql3, function (err, result) {
    if (err) throw err;
    console.log("Products table created");
  });
  
 var sql4 =  "INSERT INTO products (id, name) VALUES ?";
 
 var values2 = [
 [154, 'Chocolate Heaven'],
 [155, 'Tasty Lemons'],
 [156, 'Vanilla Dreams'] 
 ];
  
 con.query(sql4, [values2], function (err, result) {
    if (err) throw err;
    console.log("Number of product records inserted: " + result.affectedRows);
}); 
  
  
  var sql5 = "SELECT users.name AS user, products.name AS favorite FROM users INNER JOIN products ON users.favorite_product = products.id";
  con.query(sql5, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});