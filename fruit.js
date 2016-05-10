var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var FruitSchema = new Schema({
	name : String
});

module.exports = mongoose.model("Fruit", FruitSchema);