/**
 * Created by chenzhe on 16/7/2.
 */

'use strict';


module.exports = function (done){

    $.router.get('/',function(req,res,next){

        res.end(test());

    });


    function test(){
        return "no 11";
    };
    done();
};
