/**
 * Created by chenzhe on 16/7/3.
 */
'use strict';

module.exports =  function (done) {

    /*
     $.method('user.add').check({
     name :{required:true};
     email : {required: true}
     });*/

    $.method('user.test').register( async function(params,callback) {
        const result = await $.post('/api/merchant/test',params);
        if(result){
            return result.data;
        }
        return ;
    });

    $.method('user.login').register( async function(params,callback) {
        const result = await $.post('/api/user/login',params);
        if(result){
            return result.data;
        }
        return ;
    });

    $.method('user.getLoginUserByToken').register(   async function(params,callback){
        const result = await $.post('/api/user/getLoginUser',params);
        return result.data;
    });

    done();
}