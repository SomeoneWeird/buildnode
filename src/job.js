
export default function(options, utils, modules) {

  const $data     = Symbol("data");
  const $org      = Symbol("org");
  const $project  = Symbol("job");
  const $build    = Symbol("build");
  const $artifact = Symbol("artifact");

  return function(org, project, build) {

    class Job {

      constructor(data) {
        this[$data]     = data;
        this[$org]      = org;
        this[$project]  = project;
        this[$build]    = build;
        this[$artifact] = modules.artifact(org, project, build, this);

        this.id = this[$data].id;
      }

      unblock(callback) {
        utils.req("PUT", `organizations/${this[$org].name}/projects/${this[$project].name}/builds/${this[$build].number}/jobs/${this.id}/unblock`, null, callback);
      }

      listArtifacts(callback) {
        utils.req("GET", `organizations/${this[$org].name}/projects/${this[$project].name}/builds/${this[$build].number}/jobs/${this.id}/artifacts`, null, utils.wrapResult(this[$artifact], callback));
      }

    }

    return Job;

  }

}
