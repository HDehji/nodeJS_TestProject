const express = require('express');
const config = require('./config');
const app = express();
const{check,validationResult}=require('express-validator');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash');
const mongoose = require('mongoose');
var MongoDBStore = require('connect-mongodb-session')(session);
const passport=require('passport');
require('dotenv').config();

mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => console.log('Connected!'));

global.config=require('./config');


app.use(express.static(__dirname + "/public")); 
app.use(express.urlencoded({extends:false}));
app.use(methodOverride('method'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie:{ expires : new Date(Date.now()+1000*3600*24*100) },
  store:new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/connect_mongodb_session_test',
    collection: 'mySessions'
  }),
}));
app.use(flash());
//passport
require('./passport/passport-local')
app.use(passport.initialize())
app.use(passport.session())

app.use((req,res,next)=>{
  res.locals={errors:req.flash("errors"),req:req}
  next();
})

app.use('/',require('./routes/index'));

app.set('view engin','ejs');

app.listen(config.port,()=>{
    console.log(`server is running on port ${config.port}`);
});