const express = require('express'); 
const signupRouter = express.Router();
// var bodyParser = require('body-parser')
const users = require('../data/user');
const Signupdata = require("../model/Signup");
let alert = require('alert'); 
// const { default: mongoose } = require('mongoose');

function router(nav){
signupRouter.get('/',function(req,res){
    Signupdata.find({}, (err, items) => {
        if (err) {
            console.log(err.code);
            res.status(500).send('Error has occurred', err);          
        }
        else {
            res.render('signup',{nav,title:'Sign Up'});
        }
    })
});

signupRouter.get("/adduser",function(req,res){
    
    let adduser = {
        "name":req.param("name"),
        "userid":req.param("userid"),
        "pwdid":req.param("pwdid")
    };
    
    Signupdata.create(adduser, (err, adduser) => {
        if (err) {
            console.log(err.code);
            res.status(500).send({err: 'Error has occurred'});          
        }
        else {
                alert('Hi');
                let newuser = Signupdata(adduser);
                newuser.save(); //Saving in Database

                users.push(adduser); //Saving in local user.js file in data folder
                console.log(users);
                res.redirect("/login");
       }
    });
});
    return signupRouter
}

module.exports = router;