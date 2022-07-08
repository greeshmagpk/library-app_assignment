const express=require('express');
const addbookRouter=express.Router();
const Bookdata=require('../model/Bookdata')
const multer = require('multer');
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
addbookRouter.get('/',function(req,res){
   Bookdata.find({}, (err, items) => {
      if (err) {
          console.log(err);
          res.status(500).send('An error occurred', err);
      }
      else {
          //res.render('imagesPage', { items: items });
          res.render('addBook',{
            nav,
            title:'Add Book'
            })
      }
  });
})
addbookRouter.post('/add',upload.single('image'), function(req,res){
  // res.send("Hey I am Added");
   var item={
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    //image: req.file.image,
    image: req.body.image,
    about: req.body.about
  }
  Bookdata.create(item, (err, item) => {
    if (err) {
        console.log(err);
    }
    else {
      var book=Bookdata(item);
      book.save();
      res.redirect('/books');
    }
});
 

});

return addbookRouter;
}

module.exports=router;