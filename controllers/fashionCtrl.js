/**
 * Created by qmh on 2016/6/3.
 */

var express=require('express');
var router=express.Router();
var fashionM=require('../models/fashionMdl');
var bodyParser = require('body-parser');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    res.header('Access-Control-Allow-Origin', '*');
    //res.header('Content-Type', 'application/json;charset=utf-8');
    //res.writeHead(200, { "Content-Type": "text/plain" });
    //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //bodyParser.json();

    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router.post('/getFashionList',function(req,res){
    fashionM.getFashionList([req.body.pageIndex,req.body.pageSize],function(err,rows){
        if(!err){
            var obj={};
            obj.fashionList=rows[0];
            obj.isAddMore=rows[1][0]["isAddMore"];
            rows[1]=rows[1][0];
            res.json(obj);
        }
    });
});

router.post('/getFashionDetail',function(req,res){
    fashionM.getFashionDetail([req.body.fashionid],function(err,rows){
        if(!err){
            res.json(rows[0]);
        }
    });
});

module.exports = router;