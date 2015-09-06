
export default function(options, utils, modules) {

  const $data     = Symbol("data");
  const $org      = Symbol("org");
  const $project  = Symbol("job");
  const $build    = Symbol("build");
  const $artifact = Symbol("artifact");
  const $baseURL  = Symbol("baseURL");

  return function(org, project, build) {

    class Job {

      constructor(data) {
        this[$data]     = data;
        this[$org]      = org;
        this[$project]  = project;
        this[$build]    = build;
        this[$artifact] = modules.artifact(org, project, build, this);

        this.id = this[$data].id;

        this[$baseURL] = `organizations/${this[$org].name}/projects/${this[$project].name}/builds/${this[$build].number}/jobs/${this.id}`;
      }

      unblock(callback) {
        utils.req("PUT", `${this[$baseURL]}/unblock`, null, callback);
      }

      getLog(callback) {
        utils.req("GET", `${this[$baseURL]}/log`, null, callback);
      }

      listArtifacts(callback) {
        utils.req("GET", `${this[$baseURL]}/artifacts`, null, utils.wrapResult(this[$artifact], callback));
      }

    }

    return Job;

  }

}
