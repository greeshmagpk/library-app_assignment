const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://greeshmagpk:library1234@library.crony.mongodb.net/library');
const Schema = mongoose.Schema;
const LoginSchema = new Schema({
        username : String,
        password : String
});

var login = mongoose.model('login',LoginSchema);

module.exports = login;