require('dotenv').config();
let path = require("path");
let express = require("express");
let userRoute = require('./routes/user');
let blogRoute = require('./routes/blog');
let mongoose = require("mongoose");
let cookieParser = require("cookie-parser");
let Blog = require('./models/blog');
// const { checkauthenticationcookie } = require("./middlewares/authentication");
let { checkauthenticationcookie } = require("./middlewares/authentication");

// let {body,validation} = require("express-validator");



let app = express();
let port = process.env.PORT || 8002;

mongoose.connect(process.env.mongoUrl).then(e => console.log("MongoDB Connected"));

// mongoose.connect(process.env.mongoUrl_local).then(e => console.log("MongoDB Connected"));
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkauthenticationcookie("token"));
app.use(express.static(path.resolve('./public')));

app.use('/public/styles', express.static('public/styles', {
    setHeaders: (res, path, stat) => {
      if (path.endsWith('.css')) {
        res.set('Content-Type', 'text/css');
      }
   }
  }));


app.get('/', async(req,res)=>{
    let allblogs = await Blog.find({});
    res.render('home',{
        user : req.user,
        blogs : allblogs,
    });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute );
app.listen(port,()=>console.log('Server Started at port: ${port}'));

