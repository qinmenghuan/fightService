/**
 * Created by qmh on 2016/6/3.
 */

var db=require('../db.js');

exports.getFashionList=function (inParams,done){
    db.get().query("CALL sp_getFashionList(?,?)",inParams,function(err,rows){
        if(err){
            return done(err);
        }
        done(null,rows);
    });
};

exports.getFashionDetail=function(inParams,done){
  db.get().query("CALL sp_getFashionDetail(?)",inParams,function(err,rows){
      if(err){
          return done(err);
      }
      done(null,rows[0]);
  });
};