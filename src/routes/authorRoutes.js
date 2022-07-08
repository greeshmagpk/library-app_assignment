const express = require("express");
const Authordata = require("../model/Authordata");
const authorRouter =express.Router();
const multer = require('multer');
const path = require('path');
let authors = require("../data/author");

require("dotenv")
  .config();


// Multer Setting Up
const storage=multer.diskStorage({
    //destination for files
    destination:function(request,file,cb){
      cb(null,'../library/public/uploads/images');
    },
    //Add back the extensions
    filename:function(request,file, cb){
     // Defining file name+timestamp+.file-extension
      cb(null,file.fieldname+Date.now()+path.extname(file.originalname));
    }
  })
  
  //Upload parameters for multer
  
  const upload = multer({ 
    storage: storage,
    limits:{
      fileSize: 1000000     //upto 1MB files only
    },
    fileFilter:function(req,file,cb){
      checkFileType(file, cb);
    }
  });
  
  
  //Checking file types we are inputing
  
  function checkFileType(file, cb){
  
    // Only Image type extension
    const filetypes = /jpeg|jpg|png|gif/; 
    //Checking extension
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
    //Check mime
    const mimetype=filetypes.test(file.mimetype);
    if(mimetype&&extname){
      return cb(null, true);
    }else{
      cb('Error: Only Images allowed');
    }
  }



function router(nav){
   
    // All the Authors Routing    
    authorRouter.get('/',(req,res)=>{
        Authordata.find()
        .then(function(authors){
            res.render("authors",{nav,
            title:'Authors',
            authors,
            user:true
        });
        })

        
    });
   
    // Single Author Routing
    authorRouter.get('/:id',(req,res)=>{
        const id =req.params.id;
        Authordata.findOne({_id:id})
        .then(function(author){
            res.render("author",{nav,
            title:"Author",
            author,
            user:true
        });
        })
    });
   
    authorRouter.post('/delete', function (req, res) {

        const id = req.body.id;  
    
        Authordata.findOneAndDelete({ _id: id })
            .then(function () {
    
                res.redirect('/authors')
    
            })  
    })
    
    
    
    //router to edit author
    authorRouter.post('/edit', function (req, res) {
    
        Authordata.findById(req.body.id, function(err, data){
            if (err) {
                throw err;
            }
            else {
                res.render('editauthor', {nav, data})
            }
        })
    })
    
    authorRouter.post('/update',upload.single('image'), function (req, res) {

        Authordata.findByIdAndUpdate(req.body.id, { $set: req.body }, function (err, data) {
            if (err) {
                res.json({ status: "Failed" });
            }
            else if (data.n == 0) {
                res.json({ status: "No match Found" });
            }
            else {
                res.redirect("/authors")
            }
    
        })  
    })
    return authorRouter
}

module.exports =router;