
export default function(options, utils, modules) {

  const $data    = Symbol('data');
  const $org     = Symbol('org');
  const $baseURL = Symbol('baseURL');

  return function(org) {

    class Agent {

      constructor(data) {
        this[$data] = data;
        this[$org]  = org;

        [ 'id', 'name', 'connection_state', 'ip_address', 'version', 'meta_data' ].forEach(k => {
          this[k] = this[$data][k];
        });

        this[$baseURL] = `organizations/${this[$org].name}/agents/${this.id}`;
      }

      stop(callback) {
        utils.req("PUT", `${this[$baseURL]}/stop`, null, callback);
      }

    }

    return Agent;

  }

}
