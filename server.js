var cors = require('cors')


  const express = require('express');
const app = express();
app.use(cors())


const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const dbconfig = require('./db_config/db_config');
const port = 4400 ; 
var session = require('express-session');

var fivehour = 3600000 * 5;

 app.use(session({
  secret: 'SoftFlameMTS',
  resave: true,
  saveUninitialized: false,
  cookie: { secure: false, expires :new Date(Date.now() + fivehour), maxAge: fivehour }
}))

 app.use(bodyparser.json({limit: '1000mb'}))
 app.use(bodyparser.urlencoded({ limit: '1000mb', extended: true }))
const studRoutes = require('./routes/student_routes');
 app.use('/student', studRoutes);

const newsRoutes = require('./routes/news_routes');
 app.use('/news', newsRoutes);

mongoose.Promise = global.Promise;
console.log('connectedddddd')

 mongoose.connect(dbconfig.url,{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },(err)=>{
     if(err){
         console.log(err)
     }
     else{
         console.log("connected to DB")
     }
 })

 app.listen(port,()=>{
     console.log("Server started on port no : " , + port)
 })