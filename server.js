require('dotenv').config()
const express = require('express');
const app = express();
const PORT = 3000;
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const session= require('express-session');
const flash = require('express-flash');
const MongoDbStore=require('connect-mongodb-session')(session);



// DataBase Connection
const url = 'mongodb://localhost:27017/pizza_';
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
});
const conncetion = mongoose.connection;

conncetion.once('open', () => {
    console.log("DataBase connected");
}).catch(err => {
    console.log("Database Connection Failed");
})

//Session Store
let mongoStore=new MongoDbStore({

    uri:'mongodb://localhost:27017/pizza_',
    collection:'session',
});


// Session config
// Middleware 

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store:mongoStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Time is given to cookies in miliseconds for 24 hours
    }

}))

// Global middlware

app.use((req,res,next)=>{
    res.locals.session =req.session,
    next()
})


app.use(flash())
app.use(express.json())

// set Template engine
app.use(expressLayout);

app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs');

require('./routes/web')(app);



// Assests
app.use(express.static('public'))
app.listen(PORT, () => {
    console.log(`server is started at ${PORT}`);
})