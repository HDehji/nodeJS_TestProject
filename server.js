const express = require('express')
const config = require('./config')
const app = express()

global.config=require('./config')

app.use(express.static(__dirname + "/public"))


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(config.port,()=>{
    console.log(`server is running on port ${config.port}`);
})