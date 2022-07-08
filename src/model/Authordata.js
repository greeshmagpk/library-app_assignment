const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://greeshmagpk:library1234@library.crony.mongodb.net/library');
const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
    author : String,
    book : String,
   languages : String,
    authorimage: String,
    aboutauthor:String
  
});

var Authordata = mongoose.model('authordata',AuthorSchema);

module.exports = Authordata;