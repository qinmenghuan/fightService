/**
 * Created by qmh on 2016/6/1.
 */

var db = require('./db');
var express=require("express");
var app=express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/user', require('./controllers/userCtrl'));
app.use('/',require('./controllers/fashionCtrl'));
app.use('/',require('./controllers/showCtrl'));
app.use('/',require('./controllers/productCtrl'));
app.use('/',require('./controllers/storyCtrl'));

app.use(express.static('images'));
app.use(express.static('www'));
// Connect to MySQL on start
//
db.connect(db.MODE_TEST, function(err) {
    if (err) {
        console.log('Unable to connect to MySQL.');
        process.exit(1);
    } else {
        app.listen(8889, function() {
            console.log('Listening on port 8889...');
        })
    }
});