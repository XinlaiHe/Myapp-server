require("./fruit");
var express = require('express');
var mongoose = require('mongoose');
var Fruit = mongoose.model('Fruit');
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));


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
  console.log("connected");
});

app.post('/list', function(req, res) {
  console.log(req.body);
	var fruit = new Fruit(req.body);
	fruit.save(function(err, response){
		if(err) console.log(err);
		else res.json(fruit);
	});
});