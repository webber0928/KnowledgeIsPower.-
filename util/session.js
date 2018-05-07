const async           = require('async')

module.exports = {
  is_user_token: function(token) {
    return token.type >= TOKEN_TYPE_USER;
  },
  checkUserClientAuthorization: function(token){
    return new Promise(function(resolve, reject){
      Models.User.getByUserName(token.username)
        .then(function(user){
          if(!user) return reject('INVALID_TOKEN');

          if(!user.settings.access_list){
            return resolve(true);
          }

          Models.UserClient.checkAuthorized(token.user_id, token.uc_id)
            .then(function(result){
              if(!result){
                return reject('UNAUTHORIZED_USER_CLIENT');
              }else{
                return resolve(true);
              }
            }).catch(reject);
        }).catch(reject);
    });
  },
  checkPrivilege: function(access_token, method, path, callback) {
    var me = this;
    async.waterfall(
      [
        function(callback) {
          getTokenInfo(access_token, function(error, data) {
            if (error) {
              callback(error, null);
            } else {
              callback(null, data);
            }
          });
        },
        function(token, callback) {
          Models.Client.checkPrivilege(token.app_id, method, path)
            .then(function(data) {
              if (!data) return callback(new Error("CLIENT_NO_PRIV"));
              return callback(null, {
                token: token,
                client: data
              });
            })
            .catch(function(err) {
              callback(err);
            });
        },
        function(result, callback) {
          if (!result.token.username) return callback(null, result);
          Models.User.getByUserName(result.token.username)
            .then(function(user) {
              if (!user) return callback(new Error("INVALID_TOKEN"));
              if (user.credential !== result.token.cred_ver)
                return callback(new Error("INVALID_TOKEN"));
              return callback(null, result);
            })
            .catch(callback);
        }
      ],
      function(err, result) {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  }
};
