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

    $.method('user.add').register(   function (params,callback) {

        params.name = params.name.toLowerCase();
        {
            const user =  $.method('user.get').call({name:params.name});
            if(user) return callback(new Error('user already exists'));
        }
        {
            const user =  $.method('user.get').call({eamil:params.email});
            if(user) return callback(new Error('user already exists'));
        }
        params.password = $.utils.encryptPassword(params.password.toString());
        const user =  $.model.User(params);
        user.save(callback);
    });

    $.method('user.update').register(   function(params,callback){
        const user =  $.method('user.get').call(params);
        if(!user){
            return callback(new Error('user does not exists'))
        }
        $.model.User.update({_id:user._id},{$set:update},callback);
    });



    $.method('user.get').register(    function(params,callback){
        const query = {};
        if (params._id){
            query._id = params._id;
        } else if(params.name){
            query.name = params.name;
        } else if(params.eamil){
            query.email = params.eamil;
        } else {
            return callback(new Error('missing parameter _id|name|email'));
        }
        $.model.User.findOne(query,callback);
    });

    done();
}