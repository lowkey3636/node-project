/**
 * Created by chenzhe on 16/7/2.
 */

'use strict';

module.exports = function (done){



    $.router.get('/',async function(p){
         return p.view('test',{title:"内容111222  "});
    });

    $.router.get('/login',async function(p){
        var params = {};
        params.loginName = "tt";
        params.password = '123';
        const tokenInfo = await $.method('user.login').call(params);
        //"wdkkfront-"
        p.req.session.user = "wdkkfront-"+tokenInfo.id;
        return p.success("ok");
    });
    //http://localhost:3000/getLogin?token=f6d61160-bd39-40b1-bad8-4a2e3be98586
    $.router.get('/getLogin',async function(p){
        var params = {};
        params.token = p.req.param('token');
        console.log(p.token);
        const user = await $.method('user.getLoginUserByToken').call(params);
        return p.success(user);
    });
    $.router.get('/get', async function(p){
        var params = {};
        params.token = p.loginUser;
        const user = await $.method('user.getLoginUserByToken').call(params);
        return p.success(user);
    });

    $.router.get('/logout',async function(p){
        delete p.req.session.user;
        return p.success("ok")
    });



    done();
};
