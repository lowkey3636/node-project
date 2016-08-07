'use strict';

import  crypto from  'crypto';
import  rp from "request-promise";

module.exports = function (done){
    initAes();

    const prefix = $.config.get('db.serverUrl');
    var promise = new Promise(function(resolve, reject) {

            resolve('val')
    });
    $.post = function (path,p){
        var options = {
            method: 'POST',
            uri: 'http://120.25.225.227:8080'+path,
            body: $.aes.encry( JSON.stringify(p))
        };
        return rp(options).then(function(body,err){
            try{
                body = $.aes.decry(body);
                body = JSON.parse(body);
                return body;
            }catch (e){
                console.log(e);
                return null;
            }
        }).catch(function (err) {
            console.log(err);
            return null;
          }
        );
    }


    done();
};

function initAes(){
    $.aes = {};
    var key = "smkldospdosldaaa";
    var iv = "0392039203920300";
    $.aes.encry = function(data){
        return encryption(data,key,iv);
    };
    $.aes.decry = function(data){
        return decryption(data,key,iv);
    };
}
//data 是准备加密的字符串,key是你的密钥
function encryption(data,key,iv) {


    var clearEncoding = 'utf8';
    var cipherEncoding = 'base64';
    var cipherChunks = [];
    var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    cipher.setAutoPadding(true);

    cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
    cipherChunks.push(cipher.final(cipherEncoding));

    return cipherChunks.join('');
}
//data 是你的准备解密的字符串,key是你的密钥
function decryption(data,key,iv) {

    var clearEncoding = 'utf8';
    var cipherEncoding = 'base64';
    var cipherChunks = [];
    var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    decipher.setAutoPadding(true);

    cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
    cipherChunks.push(decipher.final(clearEncoding));

    return cipherChunks.join('');
}
