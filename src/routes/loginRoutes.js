const express = require('express'); 
let alert = require('alert'); 

// Taking in Locally defined user and admin data
let user = require('../data/user');
let admin = require('../data/admin');
const Signupdata = require('../model/Signup');

// Acquiring Cloud Database Model defined
// const Signupdata = require("../model/Signupdata");

const loginRouter = express.Router();

function router(nav){

// Login Form rendering
loginRouter.get('/',function(req,res){
    res.render('login',{nav,title:'Login'});  
})

// User Authentication
loginRouter.get("/check",function(req,res){
    var checkuser = {
        "userid":req.param("userid"),
        "pwdid":req.param("pwdid")
    };
    
    console.log(checkuser);
    var flag=false;
    var adminflag = false;

    // Checking already existing locally available users and admin
    // Signupdata.find().then(function(checkuser){
    for(let i=0;i<admin.length;i++){
        if(checkuser.userid==admin[i].userid && checkuser.pwdid==admin[i].pwdid){
            console.log(`Admin input is :${checkuser}`)
            adminflag=true;
            break;
        }
        else{
            adminflag=false;
        }
    };

    for(let i=0;i<user.length;i++){
        
        if((checkuser.userid==user[i].userid && checkuser.pwdid==user[i].pwdid))
        {
            console.log('User input is '+ checkuser)
            flag=true;
            break;
        }
        else{
                flag=false;
            }
    };

        console.log(`User flag is :${flag}`);
        console.log(`Admin flag is :${adminflag}`);

        if(flag==true){
            alert("User Verified");
            res.redirect("/newhome")
        }
        else if (adminflag==true){
            alert("Hello Admin");
            res.redirect("/home")
        }
        else{
            alert("User Verification Failed");
            res.redirect("/signup");
        }

        });

    // });
  return loginRouter

}


module.exports = router;