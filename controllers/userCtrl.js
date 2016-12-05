/**
 * Created by qmh on 2016/6/2.
 */

var express = require('express');
var router = express.Router();
var userM = require('../models/userMdl');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    res.header('Access-Control-Allow-Origin', '*');
    //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// define the home page route
router.get('/', function(req, res) {
    res.send('Birds home page');
});

// define the about route
router.get('/about', function(req, res) {
    res.send('About birds');
});

// define the about route
router.get('/login', function(req, res) {
    // any logic goes here
    userM.getAll(function(err,rows){
        if(!err) {
            res.json(rows);
        }
    });
    //res.send('About birds');
});

// define the about route
router.post('/info', function(req, res) {
    // any logic goes here
    userM.getAll(function(err,rows){
        if(!err) {
            res.json(rows);
        }
    });
    //res.send('About birds');
});

module.exports = router;