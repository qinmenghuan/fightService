/**
 * Created by qmh on 2016/6/3.
 */

var express=require('express');
var router=express.Router();
var productM=require('../models/productMdl');
var bodyParser = require('body-parser');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router.post('/getProductList',function(req,res){
    productM.getProductList([req.body.pageIndex,req.body.pageSize,req.body.category,req.body.search],function(err,rows){
        if(!err){
            var obj={};
            obj.itemList=rows[0];
            obj.isAddMore=rows[1][0]["isAddMore"];
            rows[1]=rows[1][0];
            res.json(obj);
        }
    });
});

router.post('/getProductDetail',function(req,res){
    productM.getProductDetail([req.body.productid],function(err,rows){
        if(!err){
            res.json(rows[0]);
        }
    });
});

router.post('/createCart',function(req,res){
    var values = [req.body.customerid,req.body.productid,req.body.quantity,req.body.size,req.body.color, new Date(), new Date()];

    productM.createCart(values,function(err,insertId){
        if(!err){
            res.json(insertId);
        }
    });
});

router.post('/getCartList',function(req,res){
    productM.getCartList([req.body.pageIndex,req.body.pageSize,req.body.customerid],function(err,rows){
        if(!err){
            var obj={};
            obj.itemList=rows[0];
            obj.isAddMore=rows[1][0]["isAddMore"];
            rows[1]=rows[1][0];
            res.json(obj);
        }
    });
});

router.post('/createOrder',function(req,res){
    var values = [0,req.body.expresscost,req.body.amount,req.body.customerid,req.body.addressid ,new Date(), new Date()];

    productM.createOrder(values,req.body.cartids,function(err,insertId){
        if(!err){
            res.json(insertId);
        }
    });
});

router.post('/getOrder',function(req,res){
    productM.getOrder(req.body.orderid,function(err,rows){
        if(!err){
            var obj={};
            obj=rows[0][0];
            obj.productList=rows[1];
            res.json(obj);
        }
    });
});

router.post('/confirmOrder',function(req,res){
     var values = [req.body.addressid,req.body.comment,new Date(),req.body.orderid];
    productM.confirmOrder(values,function(err,rows){
        if(!err){
            res.json(rows);
        }
    });
});

module.exports = router;