const express = require('express');
const path = require('path');
const expbar = require('express-handlebars'); 
const cars = require('./entities/Cars');
const travelLogs = require('./entities/TravelLogs');
const borrowLogs = require('./entities/BorrowLogs');
const users = require('./entities/Users');
const app = express();


//Handlebars Middlewarek
app.engine('handlebars', expbar({
    defaultLayout:'main'
}));
app.set('view engine','handlebars');


//body pasrser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//set dynamic
app.get('/', (req,res) => res.render('index',{
    title: 'BLOCKCHAIN FRONTEND', cars, travelLogs,borrowLogs,users
}));


app.use('', require ('./routes/api/api'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log("Server Started on Port:"+ PORT));