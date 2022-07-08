const express = require("express");
const Bookdata = require("../model/Bookdata");
const booksRouter =express.Router();
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
        
    booksRouter.get('/',(req,res)=>{
        Bookdata.find()
        .then(function(books){
            res.render("books",{nav,
            title:'Books',
            books,
            user:true
            });
        })

    });
    
    booksRouter.get('/:id',(req,res)=>{
        const id =req.params.id;
        Bookdata.findOne({_id:id})
        .then(function(book){

            res.render("book",{nav,

            title:"Book",
            book,
            user:true});
        })
    });

    booksRouter.post('/delete', function (req, res) {

        const id = req.body.id;
        console.log(req.body.id);
        Bookdata.findOneAndDelete({ _id: id })
            .then(function () {

                res.redirect('/books')

            })
    })
    //router to edit book
    booksRouter.post('/edit', function (req, res) {
        
        Bookdata.findById(req.body.id, function (err, data) {
            if (err) {
                throw err;
            }
            else {
                res.render('editbook', { nav,
                    title:"Edit Book",
                    data })
            }
        })
    })
    //router to update book
    booksRouter.post('/update',upload.single('image'), function (req, res) {
        console.log(req.body);
        Bookdata.findByIdAndUpdate(req.body.id, { $set: req.body }, function (err, data) {
            if (err) {
                res.json({ status: "Failed" });
            }
            else if (data.n == 0) {
                res.json({ status: "No match Found" });
            }
            else {
                res.redirect("/books");
            }

        })
    })
    return booksRouter
}

module.exports =router;