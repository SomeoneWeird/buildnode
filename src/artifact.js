
export default function(options, utils, modules) {
  
  const $data    = Symbol("build");
  const $org     = Symbol("org");
  const $project = Symbol("project");
  const $build   = Symbol("build");
  const $job     = Symbol("job");

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
      }

    }

    return Artifact;

  }

}
