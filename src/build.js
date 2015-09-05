
export default function(options, utils) {

  const $data    = Symbol("data");
  const $org     = Symbol("org");
  const $project = Symbol("project");


  return function(org, project) {

    class Build {

      constructor(data) {
        this[$data]    = data;
        this[$org]     = org;
        this[$project] = project;

        [ 'id', 'number', 'jobs', 'state', 'message', 'branch' ].forEach(k => {
          this[k] = this[$data][k];
        });
      }

      cancel(callback) {
        utils.req("PUT", `organizations/${this[$org].name}/projects/${this[$project].name}/builds/${this.number}/cancel`, null, utils.wrapResult(this[$build], callback));
      }

      rebuild(callback) {
        utils.req("PUT", `organizations/${this[$org].name}/projects/${this[$project].name}/builds/${this.number}/rebuild`, null, utils.wrapResult(this[$build], callback));
      }

    }

    return Build;

  }

}
