/**
 * Created by chenzhe on 16/7/2.
 */

'use strict';


module.exports = function (done){

    $.router.get('/',function(req,res,next){

        res.end('123321');

    });

    done();
};
