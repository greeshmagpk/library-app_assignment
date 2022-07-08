const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://greeshmagpk:library1234@library.crony.mongodb.net/library');
const Schema = mongoose.Schema;
const BookSchema = new Schema({
    title : String,
    author : String,
    genre : String,
    image :  String,
    about:String
    
   });

var Bookdata = mongoose.model('bookdata',BookSchema);

module.exports = Bookdata;