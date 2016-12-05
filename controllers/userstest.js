/**
 * Created by qmh on 2016/6/1.
 */

//var mongoose = require('mongoose')
var userM = require('../models/userMdl');

module.exports.controller = function(app) {

    /**
     * a home page route
     */
    app.get('/signup', function(req, res) {
        // any logic goes here
        res.render('users/signup')
    });

    /**
     * About page route
     */
    app.get('/login', function(req, res) {
        // any logic goes here
        //userM.getAll(function(err,rows){
        //    if(!err) {
        //        res.json(rows);
        //    }
        //});

        res.render('users/login');
    });

};