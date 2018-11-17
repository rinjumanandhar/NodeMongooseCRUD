const mongoose = require('mongoose');

//Connect to mongoDb
mongoose.connect('mongodb://rinju:nepal4321@ds024748.mlab.com:24748/mydb');

//Create Schema and Model

const Schema = mongoose.Schema;
 
const mySchema = new Schema({
	
	username: {type: String, required: true, max: 100},
    age: {type: Number, required: true},
    date: {type: Date,default: Date.now()}
});

const MyModel = mongoose.model('MyModel', mySchema);
module.exports = MyModel;

