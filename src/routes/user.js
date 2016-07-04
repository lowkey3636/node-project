/**
 * Created by chenzhe on 16/7/2.
 */

'use strict';


module.exports = function (done){

    $.router.post('/api/login',async function(req,res,next){

        const  user = await $.method('user.get').call(req.body);
        if(!user) {
            return res.json({code : -1,msg:'用户不存在'});
        }

        res.json({success: true});
    });
    $.router.post('/api/logout',async function(req,res,next){

    });
    $.router.post('/api/signup',async function(req,res,next){
        const  user = await $.method('user.add').call(req.body);
        res.json({success: true});
    });


    done();
};
