
import request from "request";

export default function(options) {

  let {
    domain = "api.buildkite.com",
    version = "v1",
    secure = true,
    accessToken,
    email,
    password
  } = options;

  let auth = {};

  if(accessToken) {
    auth.bearer = accessToken;
  } else {
    auth.user = email;
    auth.pass = password;
  }

  let baseUrl = `http${secure == true ? 's' : ''}://${domain}/${version}/`;

  function req(method, endpoint, body, callback) {

    let url = `${baseUrl}${endpoint}`;

    request({
      url,
      auth,
      body,
      method,
      json: true
    }, function(err, data, body) {
      return callback(err, body);
    });

  }

  function wrapResult(Fn, callback) {
    return function(err, result) {
      if(err) return callback(err);
      if(result && result.error) return callback(result);
      if(!result || (result && result.message == 'Not Found')) return callback();
      if(Array.isArray(result)) {
        return callback(null, result.map(r => new Fn(r)));
      } else {
        return callback(null, new Fn(result));
      }
    }
  }

  return {
    req,
    wrapResult
  };

}
