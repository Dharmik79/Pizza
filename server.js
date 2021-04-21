const express=require('express');
const app=express();
const PORT=3000;
const ejs=require('ejs');
const expressLayout=require('express-ejs-layouts');
const path=require('path');


app.get('/',async(req,res)=>{
    res.render('home')
});

// set Template engine
app.use(expressLayout); 

app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs');


// Assests
app.use(express.static('public'))
app.listen(PORT,()=>{
    console.log(`server is started at ${PORT}`);
})