
export default function(options, utils, modules) {

  const $data    = Symbol('data');
  const $org     = Symbol('org');
  const $baseURL = Symbol('baseURL');

  const fieldMap = {
    id: 'id',
    name: 'name',
    state: 'connection_state',
    ip: 'ip_address',
    version: 'version',
    metaData: function(data) {
      let d = {};
      data.meta_data.forEach(k => {
        let t = k.split('=');
        d[t[0]] = t[1];
      });
      return d;
    }
  };

  return function(org) {

    class Agent {

      constructor(data) {
        this[$data] = data;
        this[$org]  = org;

        utils.mapFields.call(this, data, fieldMap);

        this[$baseURL] = `organizations/${this[$org].name}/agents/${this.id}`;
      }

      stop(callback) {
        utils.req("PUT", `${this[$baseURL]}/stop`, null, callback);
      }

    }

    return Agent;

  }

}
