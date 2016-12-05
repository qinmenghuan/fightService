/**
 * Created by qmh on 2016/6/3.
 */

var db=require('../db.js');

exports.getShowList=function (inParams,done){
    db.get().query("CALL sp_getShowList(?,?)",inParams,function(err,rows){
        if(err){
            return done(err);
        }
        done(null,rows);
    });
};

exports.getShowDetail=function(inParams,done){
  db.get().query("CALL sp_getShowDetail(?)",inParams,function(err,rows){
      if(err){
          return done(err);
      }
      done(null,rows);
  });
};