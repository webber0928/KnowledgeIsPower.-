"use strict";

console.log('----This Demo8');

const { dialogflow } = require("actions-on-google");
const app = dialogflow({ debug: false });
const helper       = require('../util/helper');
const token        = require('../util/session.js');

module.exports = app;

module.exports.checkGoogleHomeOAuth = (req, res, next) => {
    var _err_fn = function(err){
        console.log(err)
        console.log('======================')
    //   res.data = {
    //     requestId: req.body.requestId || "",
    //     payload: {
    //       errorCode: ghome_lib.error_to_ghome_error(err),
    //       debugString: (err && err.error) || (err && err.toString && err.toString()) || ''
    //     }
    //   };
      return response.send('json', res);
    }
    // var access_token = req.headers['Authorization'] || req.headers['authorization'];
    var access_token = req.body.originalDetectIntentRequest.payload.user.accessToken;
    // access_token = (access_token && access_token.split(' ')[1]) || req.query.access_token;
    
    if(!access_token){
      return _err_fn('INVALID_TOKEN');
    }
    // return next();
    //if token is on the other site => check site, post to the correct site
    var token_site = helper.getSiteByToken(access_token);
    if(token_site && token_site!='rd-rdsg'){
      var openapi_site_url = ['https://', helper.get_openapi_url_by_site(token_site)].join('');
      _.unset(req.headers, 'host');
      req.headers['content-type'] = "application/json";
      req.headers['content-length'] = req.body.length;
      request({
        body: JSON.stringify(req.body),
        headers: req.headers,
        uri: [openapi_site_url, req.url].join(''),
        method: req.method
      }, function(err, _res){
        if (!err && _res.statusCode == 200) {
          res.data = JSON.parse(_res.body);
          return response.send('json', res);
        }else{
          return _err_fn(err);
        }
      });
    }else{
        console.log('L999999999')
        // return next();
        checkToken(req, access_token)
        .then(function(result){
            console.log('L8888888', result)
        //   next();
          return next();
        }).catch(function(err){
          return _err_fn(err);
        });
    }
  }

module.exports.pretreat = function (req, res, next){
    console.log('AAAAA')
    app.intent('Help', (conv, params, granted) => {
        console.log(conv.user)
        conv.ask('localhost Help');
    });
    return next();
};

function checkToken(req, access_token){
    return new Promise(function(resolve, reject){
      if(!access_token) return reject('INVALID_TOKEN');
      console.log(access_token, req.method, req.route)
    //   return resolve('Hello');
      token.checkPrivilege(access_token, req.method, req.route, function(err, result){
        // token.checkPrivilege(access_token, req.method, req.route.path, function(err, result){
        if(err) return reject(err);
  
        req._token = result.token;
        req._client = result.client;
  
        //if token is user level
        //if(token.is_user_token(result.token) && req._client.client_type != 'server'){
        if(token.is_user_token(result.token) && (req._client.client_type != 'server' || req._client.type != const_cfg.CLIENT_TYPE.THIRD_PARTY)){
          token.checkUserClientAuthorization(result.token)
            .then(function(){
              return resolve();
            }).catch(reject);
        }else{
          return resolve();
        }
  
      })
    });
  }