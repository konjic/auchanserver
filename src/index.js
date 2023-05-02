const dotenv = require('dotenv').config()
const express = require('express');

const userRouter = require('../src/routes/users')

const connectDB = require('../config/connectDb.js')

const app = express()
const cors =require("cors") 
app.use(cors())
app.use(express.json())


app.use('/auth', userRouter)

connectDB()

app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    res.send('Hey this is my API running 🥳a')
  })


app.listen(5000, ()=>{console.log("test")})

if(process.env.NODE_ENV ==='production'){
    console.log("sida")
    const path = require('path')

    app.use(express.static(path.join(__dirname, '../client', 'build')));
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
    })
}