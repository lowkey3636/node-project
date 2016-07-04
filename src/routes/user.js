/**
 * Created by chenzhe on 16/7/2.
 */

'use strict';


module.exports = function (done){

    $.router.post('/api/login1',async function(req,res,next){

        var request = require('request');
        request('http://rrweb.cn/', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body) // 打印google首页
            }
        });
        const  user = await $.method('user.get').call(req.body);
        if(!user) {
            return res.json({code : -1,msg:'用户不存在'});
        }

        res.json({success: "123"});
    });

    $.router.get('/',async function(req,res,next){
        res.render("test",{title:'文章列表'});
    });

    $.router.post('/api/logout',async function(req,res,next){

    });

    
    $.router.post('/api/signup',async function(req,res,next){
        const  user = await $.method('user.add').call(req.body);
        res.json({success: true});
    });


    done();
};
