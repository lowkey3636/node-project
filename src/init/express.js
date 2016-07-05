'use strict';

import path from 'path';
import express from  'express';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import multiparty from 'connect-multiparty';


module.exports = function (done){
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(multiparty());

    const  router = express.Router();

    // promise 对象的catch 异常. router async funciton 的作用
    const routerWrap = {};
    ['get','head','post','put','del','delete'].forEach(method =>{
       routerWrap[method] = function (path, ...fnList){
           fnList = fnList.map(fn => {
              return function (req ,res,next){

                  var p = initP(req ,res,next);

                  const  ret = fn(p);
                  if(ret.catch){
                      ret.catch(next);
                  }
              }
           });
           router[method](path,...fnList);
       }
    });
    $.router = routerWrap;

    app.use(router);
    app.use('/static',serveStatic(path.resolve(__dirname,'../../static')));
    app.set("view engine","ejs");
    app.listen($.config.get('web.port'),(err) => {
        done(err);
    });

};


function initP(req ,res,next){
    var p = {};
    p.req = req;
    p.res = res;
    p.next = next;
    initJSONAndView(p);
    return p;
}
function initJSONAndView(p){
    p.error = function (msg,data) {
        initDefaultJSON(p,-1,msg,data);
    };
    p.success = function (msg,data) {
        initDefaultJSON(p,0,msg,data);
    };
    p.jsonResult = function (code,msg,data){
        initDefaultJSON(p,code,msg,data);
    }
    p.view = function (path,model) {
        p.res.render(path,model);
    };
}
function initDefaultJSON(p,code,msg,data){
    if(typeof msg != 'string'){
        data = msg;
        msg = "";
    }
    p.res.json({code:0,msg:msg,data:data});
}