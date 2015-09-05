
export default function(options, utils, modules) {

  const $data = Symbol('data');
  const $org  = Symbol('org');

  return function(org) {

    class Agent {

      constructor(data) {
        this[$data] = data;
        this[$org]  = org;

        [ 'id', 'name', 'connection_state', 'ip_address', 'version', 'meta_data' ].forEach(k => {
          this[k] = this[$data][k];
        });
      }

      stop(callback) {
        utils.req("PUT", `organizations/${this[$org].name}/agents/${this.id}/stop`, null, callback);
      }

    }

    return Agent;

  }

}
