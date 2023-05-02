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

app.listen(5000, ()=>{console.log("test")})

if(process.env.NODE_ENV ==='production'){
    console.log("sida")
    const path = require('path')

    app.use(express.static(path.join(__dirname, '../client', 'build')));
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
    })
}