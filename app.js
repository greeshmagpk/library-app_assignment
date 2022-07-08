const express = require("express");
const app = new express();
 var favicon = require('serve-favicon');
 var path = require('path');
const bodyParser = require("body-parser");


    // Defining different Navigations for user, admin and Authentication page
    const nav = [
        {link:'/newhome',name:'Home'},
        {link:'/newhome/books',name:'Books'},
        {link:'/newhome/authors',name:"Authors"},
        {link:'/login',name:"Log Out"}
    ];
    const navauth =[
        {link:'/signup',name:"Sign Up"},
        {link:'/login',name:"Log In"}
    ];

    const adminnav =[
        {link:'/home',name:'Home'},
        {link:'/books',name:'Books'},
        {link:'/authors',name:"Authors"},
        {link:'/addBook',name:"Add Book"},
        {link:'/addAuthor',name:"Add Author"},
        {link:'/login',name:"Log Out"}
    ]
    // Acquiring all the routes defined
    const booksRouter =require("./src/routes/bookRoutes")(adminnav)
    const authorRouter =require("./src/routes/authorRoutes")(adminnav)
    const addauthorRouter =require("./src/routes/addauthorRoutes")(adminnav)
    const addbookRouter =require("./src/routes/addbookRoutes")(adminnav)
    const homeRouter = require('./src/routes/homeRoutes') (adminnav)
    const signupRouter =require("./src/routes/signupRoutes")(navauth)
    const loginRouter =require("./src/routes/loginRoutes")(navauth)
    const newuserRouter = require('./src/routes/newuserRoutes')(nav)
    const newuserBookRouter = require('./src/routes/addbookRoutes')(nav)
    const newuserAuthorRouter = require('./src/routes/authorRoutes')(nav)
    // app.use(bodyParser.json());
    app.use(favicon(path.join(__dirname+'/public/images/favicon.ico')));
    app.use(express.static('./public'));
    app.use(express.urlencoded({extended:true}));
    
    app.set('view engine','ejs');
    app.set("views",__dirname+"/src/views");
    
    app.use('/signup',signupRouter);
    app.use('/login',loginRouter);
    app.use('/books',booksRouter);
    app.use('/authors',authorRouter);
    app.use('/addAuthor',addauthorRouter);
    app.use('/addBook',addbookRouter);
    app.use('/home',homeRouter); 
    // Router for New Users
    app.use('/newhome',newuserRouter); 
    app.use('/newhome/books',newuserBookRouter); 
    app.use('/newhome/authors',newuserAuthorRouter); 
    
    
    app.get('/',(req,res)=>{
        res.render("index",{title:"Reader's Corner",navauth});
    });
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
    console.log(`Our Library app is running on http://localhost:${PORT}`);
    });