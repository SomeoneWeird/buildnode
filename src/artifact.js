
export default function(options, utils, modules) {
  
  const $data    = Symbol("build");
  const $org     = Symbol("org");
  const $project = Symbol("project");
  const $build   = Symbol("build");
  const $job     = Symbol("job");
  const $baseURL = Symbol("baseURL");

  return function(org, project, build, job) {

    class Artifact {

      constructor(data) {
        this[$data]    = data;
        this[$project] = project;
        this[$build]   = build;
        this[$job]     = job;

        [ 'id', 'job_id', 'path', 'file_size', 'sha1sum' ].forEach(k => {
          this[k] = this[$data][k];
        });

        this[$baseURL] = `organizations/${this[$org].name}/projects/${this[$project].name}/builds/${this[$build].number}/artifacts/${this.id}`;
      }
    }

    return Artifact;

  }

}
