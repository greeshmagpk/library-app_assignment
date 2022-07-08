const express=require('express');
const addauthorRouter = express.Router();
const multer = require('multer');
const Authordata = require('../model/Authordata');
const path = require('path');

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
    
  addauthorRouter.get('/',function(req,res){
    
    res.render("addauthor",
    {
    nav,
    title:'Library'
   
  });
  });
 addauthorRouter.post('/',upload.single('image'),function(req,res){
    
   var authoritem = {
    author: req.body.author,
    book: req.body.book,
    languages: req.body.languages,
    authorimage:req.body.authorimage,
    aboutauthor:req.body.aboutauthor
    
   }
   Authordata.create(authoritem, function(err, authoritem) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(authoritem);
    var author = Authordata(authoritem);
    author.save();
    
    res.redirect('/authors');
    }
   
  });
});
  
  return addauthorRouter;
}
  module.exports = router;