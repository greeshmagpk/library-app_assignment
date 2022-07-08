const express = require('express'); 
const newuserRouter = express.Router();
const Bookdata = require('../model/Bookdata');
newuserRouter.use(express.static('./public'));
const Authordata = require('../model/Authordata');

function router(nav){
newuserRouter.get('/',function(req,res){

  res.render('home', {
      nav,
      title:"Library App"
    });
  
})

newuserRouter.get('/books',function(req,res){

    Bookdata.find()
        .then(function(books){
          res.render("books",{
            nav,
            title:"Books",
            books,
            user:false,
          });
        })
        
    
  })

  newuserRouter.get('/books/:id',function(req,res){
    const id=req.params.id;
     Bookdata.findOne({_id:id})
     .then(function(book){
       res.render('book',{
         nav,
         title:"Book",
         book,
         user:false,
       });
     })
    
   });

   newuserRouter.get('/authors',function(req,res){
    Authordata.find()
    .then(function(authors){
      res.render("authors",{
        nav,
        title:"Authors",
        authors,
        user:false
      });
    })  
  });

  newuserRouter.get('/authors/:id',function(req,res){
    const id=req.params.id;
    Authordata.findOne({_id:id})
     .then(function(author){
       res.render('author',{
         nav,
         title:"Author",
         author,
         user:false,
       });
     })
    
   });

return newuserRouter
}

module.exports = router;