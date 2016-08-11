'use strict';
//默认配置
module.exports = function(set, get, has){

    //服务器监听端口
   set('web.port',3000);

   set('db.mongodb','mongodb://120.25.225.227/test');

   set('db.serverUrl','http://120.25.225.227:8080');


}
