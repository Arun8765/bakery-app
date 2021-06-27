const express = require('express')
const mongoose = require("mongoose")
const {UserModel} = require('./database')

const app = express()

//load static files
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//routing
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/front-end.html')
})

app.get('/contact',(req,res)=>{
    res.sendFile(__dirname + '/public/contacts.html')
})

app.get('/about',(req,res)=>{
    res.sendFile(__dirname+'/public/about.html')
})

app.get('/sign',(req,res)=>{
    res.sendFile(__dirname + '/public/user-signin.html')
})

app.post('/signup',(req,res)=>{
    //res.json(req.body)   //body is json-ised
    const userdetails = req.body;

    const newuser = {
        name :  userdetails["username"],
        password : userdetails["password"],
        contactno : userdetails["contactno"]
    }

    UserModel.insertMany(newuser,(err,result)=>{
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send(result);
        }
    })

})

app.post('/signin',(req,res)=>{
    const userdetails = req.body;

    console.log(UserModel.find({name:userdetails["username"]}))

})

//listening at port 7000
app.listen(7000,()=>{
    console.log('port 7000 ....')
})