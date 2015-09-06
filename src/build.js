
export default function(options, utils, modules) {

  const $data     = Symbol("data");
  const $org      = Symbol("org");
  const $project  = Symbol("project");
  const $artifact = Symbol("artifact");

  return function(org, project) {

    class Build {

      constructor(data) {
        this[$data]     = data;
        this[$org]      = org;
        this[$project]  = project;
        this[$artifact] = modules.artifact(org, project, this);

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

      listArtifacts(callback) {
        utils.req("GET", `organizations/${this[$org].name}/projects/${this[$project].name}/builds/${this.number}/artifacts`, null, utils.wrapResult(this[$artifact], callback));
      }

      getArtifact(id, callback) {
        utils.req("GET", `organizations/${this[$org].name}/projects/${this[$project].name}/builds/${this.number}/artifacts/${id}`, null, utils.wrapResult(this[$artifact], callback));
      }

    }

    return Build;

  }

}
