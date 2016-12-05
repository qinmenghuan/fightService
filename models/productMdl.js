/**
 * Created by qmh on 2016/6/3.
 */

var db=require('../db.js');

exports.getProductList=function (inParams,done){
    db.get().query("CALL sp_getProductList(?,?,?,?)",inParams,function(err,rows){
        if(err){
            return done(err);
        }
        done(null,rows);
    });
};

exports.getProductDetail=function(inParams,done){
  db.get().query("CALL sp_getProductDetail(?)",inParams,function(err,rows){
      if(err){
          return done(err);
      }
      done(null,rows[0]);
  });
};

exports.createCart = function(inParams, done) {
    // var values = [userId, text, new Date().toISOString()];

    db.get().query('INSERT INTO ec_cart (customerid, productid, quantity, size, color, orderid,createtime,updatetime) VALUES(?, ?,?, ?,?,0,?,?)', inParams, function(err, result) {
        if (err) {
            return done(err)
        }
        done(null, result.insertId);
    });
};

exports.getCartList=function (inParams,done){
    db.get().query("CALL sp_getCartList(?,?,?)",inParams,function(err,rows){
        if(err){
            return done(err);
        }
        done(null,rows);
    });
};

exports.createOrder = function(inParams,cartids, done) {
    db.get().query('INSERT INTO ec_orderinfo ( integral, expresscost, amount, customerid,addressid, createtime,updatetime,payflag) VALUES(?,?, ?, ?,?,?,?,0)', inParams, function(err, result) {
        if (err) {
            return done(err)
        }
        // 更新订单号
        db.get().query('UPDATE ec_orderinfo SET orderno =orderid+10000000 where orderid=?  ',[result.insertId], function(err, result1) {
            if (err) {
                return done(err);
            }
        });
        db.get().query('UPDATE ec_cart SET orderid =? WHERE find_in_set(cartid ,?); ',[result.insertId,cartids], function(err, result1) {
            if (err) {
                return done(err);
            }

            done(null, result.insertId);
        });
    });
};

exports.getOrder=function (orderid,done){
    db.get().query("CALL sp_getOrder(?)",orderid,function(err,rows){
        if(err){
            return done(err);
        }
        done(null,rows);
    });
};

exports.confirmOrder=function (inParams,done){
    db.get().query("UPDATE ec_orderinfo SET addressid=? ,comment=? ,updatetime=? where orderid=?",inParams,function(err,rows){
        if(err){
            return done(err);
        }
        done(null,true);
    });
};