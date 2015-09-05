
export default function(options, utils, modules) {

  const $data    = Symbol("data");
  const $org     = Symbol("org");
  const $project = Symbol("job");
  const $build   = Symbol("build");

  return function(org, project, build) {

    class Job {

      constructor(data) {
        this[$data]    = data;
        this[$org]     = org;
        this[$project] = project;
        this[$build]   = build;

        this.id = this[$data].id;
      }

      unblock(callback) {
        utils.req("PUT", `organizations/${this[$org].name}/projects/${this[$project]}/builds/${this[$build].number}/jobs/${this.id}/unblock`, null, callback);
      }

    }

    return Job;

  }

}
