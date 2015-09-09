
export default function(options, utils, modules) {

  const $data     = Symbol("data");
  const $org      = Symbol("org");
  const $project  = Symbol("project");
  const $artifact = Symbol("artifact");
  const $baseURL  = Symbol("baseURL");

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

        this[$baseURL] = `organizations/${this[$org].name}/projects/${this[$project].name}/builds/${this.number}`;
      }

      cancel(callback) {
        utils.req("PUT", `${this[$baseURL]}/cancel`, null, utils.wrapResult(Build, callback));
      }

      rebuild(callback) {
        utils.req("PUT", `${this[$baseURL]}/rebuild`, null, utils.wrapResult(Build, callback));
      }

      listArtifacts(callback) {
        utils.req("GET", `${this[$baseURL]}/artifacts`, null, utils.wrapResult(this[$artifact], callback));
      }

      getArtifact(id, callback) {
        utils.req("GET", `${this[$baseURL]}/artifacts/${id}`, null, utils.wrapResult(this[$artifact], callback));
      }

    }

    return Build;

  }

}
