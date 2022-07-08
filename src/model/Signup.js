const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://greeshmagpk:library1234@library.crony.mongodb.net/library');
const Schema = mongoose.Schema;
const SignupSchema = new Schema({
    
        name: String,
        userid: {type: String,required:true },
        pwdid: {type: String,required:true }
  });

var Signup = mongoose.model('signup',SignupSchema);

module.exports = Signup;