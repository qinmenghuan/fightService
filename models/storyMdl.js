/**
 * Created by qmh on 2016/12/5.
 */

var db=require('../db.js');

exports.getStoryList=function (inParams,done){
    db.get().query("CALL sp_getStoryList(?,?)",inParams,function(err,rows){
        if(err){
            return done(err);
        }
        done(null,rows);
    });
};
