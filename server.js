const express = require('express');
const app = express();
var bodyParser=require('body-parser');
const port = 3000;
const mysql = require('mysql');
var opn= require('opn');



// Setting up the public directory
// Configuration

app.use(bodyParser.urlencoded({    //obligatoire 
    extended: true
 }));
 
app.use(bodyParser.json());

app.use(express.static('public'));

//connect with database

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
  });

  //display data of products

app.get('/productList', function(req, res, next) {

    
    con.query("SELECT * FROM produit", function (err, result, fields) {
    
      console.log(result);
      res.send(result);
      res.end();
      
});
});

  //add product

  app.post('/productadd', function(req, res, next) {

    var nom = req.body.nom;
    var idcategorie = req.body.idcategorie;
    var prix = req.body.prix;
    
    con.query("insert into produit (nom, prix, idcategorie) values ('"+nom+"', "+ prix+", "+ idcategorie +")", function (err, result, fields) {
    
      console.log(result);
      res.send(result);
      
});
});

//delete product
app.delete('/productdelete', function(req, res, next) {

    var id = req.body.id;

  con.query("DELETE FROM produit WHERE id = '" +id+ "'", function (err, result, fields) {
  
    console.log(result);
    res.send(result);
    res.send('bien')
});
});

//update
app.put('/productupdate', function(req, res, next) {

  var id = req.body.id;
  var nom = req.body.nom;
  var prix = req.body.prix;
  var idcategorie = req.body.idcategorie;
  
  
  con.query("update produit set nom = '"+nom+"',prix= '"+prix+"',idcategorie='"+idcategorie+"' where id = '"+id+"' ", function (err, result, fields) {
  
    console.log(result);
    res.send(result);
    
});
});

app.listen(port, () => {console.log('listening on port ${port}!');
//opn("http://localhost:3000/vue/index.html");
});