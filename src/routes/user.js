/**
 * Created by chenzhe on 16/7/2.
 */

'use strict';

module.exports = function (done){

    $.router.post('/api/login',async function(p){
        $.request('http://rrweb.cn/', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //console.log(body) // 打印google首页
            }
        });
        const user =  await $.method('user.get').call(p.req.body);
        console.log(user);
        if(!user) {
            return p.error("用户不存在");
        }
        return p.success("成功啦");
    });


    $.router.get('/',async function(p){
         return p.view('test',{title:"模式内容"});
    });
    $.router.get('/test',async function(p){
        return p.success(p.req.session.sessname);
    });

    $.router.post('/api/logout',async function(req,res,next){

    });


    $.router.post('/api/signup',async function(p){
        const  user = await $.method('user.add').call(p.req.body);
        return p.success("ok");
    });


    done();
};
