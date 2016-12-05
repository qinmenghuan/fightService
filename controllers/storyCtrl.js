/**
 * Created by qmh on 2016/6/3.
 */

var express=require('express');
var router=express.Router();
var storyM=require('../models/storyMdl');
var bodyParser = require('body-parser');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// 234we
router.get('/getStoryList',function(req,res){
    storyM.getStoryList([req.query.pageIndex,req.query.pageSize ],function(err,rows){
        if(!err){
            var obj={};
            obj.fashionList=rows[0];
            obj.isAddMore=rows[1][0]["isAddMore"];
            rows[1]=rows[1][0];
            res.json(obj);
        }
    });
});

module.exports = router;