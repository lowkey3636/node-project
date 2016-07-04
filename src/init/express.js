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
                  const  ret = fn(req,res,next);
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