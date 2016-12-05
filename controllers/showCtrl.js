/**
 * Created by qmh on 2016/6/3.
 */

var express=require('express');
var router=express.Router();
var showM=require('../models/showMdl');
var bodyParser = require('body-parser');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router.post('/getShowList',function(req,res){
    showM.getShowList([req.body.pageIndex,req.body.pageSize],function(err,rows){
        if(!err){
            var obj={};
            obj.showList=rows[0];
            obj.isAddMore=rows[1][0]["isAddMore"];
            rows[1]=rows[1][0];
            res.json(obj);
        }
    });
});

router.post('/getShowDetail',function(req,res){
    showM.getShowDetail([req.body.showid],function(err,rows){
        if(!err){
            var obj={};
            obj.show=rows[0][0];
            obj.commentlist=rows[1];
            res.json(obj);
        }
    });
});

module.exports = router;