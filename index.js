require("./fruit");
var express = require('express');
var mongoose = require('mongoose');
var Fruit = mongoose.model('Fruit');
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

mongoose.connect('mongodb://localhost/myproject');

app.get('/', function (req, res) {
  res.json({welcome : 'Hello World, Xinlai He!'});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/list', function (req, res) {
  Fruit.find({},function(err, data){
  	if(err) console.log(err);
  	else res.json(data);
  });
  console.log("get item list");
});

app.post('/list', function(req, res) {
	var fruit = new Fruit(req.body);
	fruit.save(function(err, response){
		if(err) console.log(err);
		else res.json(response);
	});
  console.log("new item added");
});

app.put('/list/:id', function(req, res){
  var id = req.params.id;
  var name = req.body.name;
  Fruit.findByIdAndUpdate(id, {$set:{name : name}}, function(err, response){
    if(err) console.log(err);
    else res.json(response);
  });
  console.log("item updated");
});

app.delete('/list/:id', function(req, res){
  var id = req.params.id;
  Fruit.findByIdAndRemove(id, function(err, response){
    if(err) console.log(err);
    else res.json(response);
  });
  console.log("item deleted");
});
