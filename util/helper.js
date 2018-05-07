
var _    = require('lodash');

module.exports = {
    getSiteByToken: function(token){
        var start = token.lastIndexOf('(');
        var end   = token.lastIndexOf(')');
        if(start<0 || end<0) return false;
        var region = this.parseRegion(token.substring(start+1, end));
        return [region.env, '-', region.site].join('');
    },
    parseRegion: function(token){
        token = token.toLowerCase();
        if(token === 'mp' || token === 'www')
          return {env:'mp', site:'us'};
    
        if(token.indexOf('http') === 0){
          var info = url.parser(token);
          var its = _.split(info.host, '.');
    
          // special case for cn
          var is_cn = (its[0] === 'www' && its[its.length-1] === 'cn');
          return (is_cn ? {env:'mp', site:'cn'} : this.parseRegion(its[0]));
        }
        var regex = /(?:(mp|qa|rd))-([a-z0-9]+)(-)?/;
        var ret = regex.exec(token);
        var env  = _.get(ret, 1);
        var site = _.get(ret, 2);
        if(!_.isEmpty(env) && !_.isEmpty(site))
          return {env:env, site:site};
    
        var regex = /(?:(mp|qa|rd))\(([a-z0-9]+)\)/;
        var ret = regex.exec(token);
        var env  = _.get(ret, 1);
        var site = _.get(ret, 2);
        if(!_.isEmpty(env) && !_.isEmpty(site))
          return {env:env, site:site};
    
        var len = token.length;
        if(len > 2 && token.substring(len-2) === 'qa')
          return {env:'qa', site:token.substring(0, len-2)};
    
        var regex = /v\d+/;
        var env = regex.test(token) ? 'rd' : 'mp';
    
        return {env:env, site:token};
      },
};