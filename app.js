const express = require('express')
const app = express()
const path = require('path')
const userModel = require('./models/user');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('./models/user');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine' ,'ejs')
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.render('index')
})
//Here check out in the main project it was post or get
app.post('/create', async (req,res)=>{
    let {name,email,image} = req.body
    let createdUser = await userModel.create({
        name,
        email,
        image
    })
    res.redirect('/read');
    // res.send(createdUser);
})
app.get('/delete/:id', async (req,res)=>{
    let user = await userModel.findOneAndDelete({_id:req.params.id});
    res.redirect('/read');
})
app.get('/edit/:id', async (req,res)=>{
    let user = await userModel.findOne({_id: req.params.id})
    res.render('edit',{user});
})

app.post('/update/:id',async (req,res)=>{
    let {name,email,image} = req.body;
    let user = await  userModel.findOneAndUpdate({_id: req.params.id},{name,email,image},{new:true})
    //Here this user come to frontent in value field
    res.redirect('/read')
});
app.get('/read',async (req,res)=>{
    let user = await userModel.find();
    res.render('read',{user})
})

app.listen(3000);