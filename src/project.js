
export default function(options, utils, modules) {

  const $data    = Symbol("data");
  const $org     = Symbol("org");
  const $build   = Symbol("build");
  const $job     = Symbol("job");
  const $baseURL = Symbol("baseURL");

  const $processBuild = Symbol("processBuild");

  return function(org) {

    class Project {

      constructor(data) {
        this[$data]  = data;
        this[$org]   = org;
        this[$build] = modules.build(org, this);

        this.name = this[$data].slug;

        this[$processBuild] = function(build) {
          let job = modules.job(org, this, new this[$build](build));
          build.jobs = (build.jobs||[]).map(j => new job(j));
          return build;
        }

        this[$baseURL] = `organizations/${this[$org].name}/projects/${this.name}`;
      }

      delete(callback) {
        utils.req("DELETE", this[$baseURL], null, callback);
      }

      listBuilds(callback) {
        utils.req("GET", `${this[$baseURL]}/builds`, null, (err, builds) => {
          if(err) return callback(err);
          builds = builds.map(this[$processBuild].bind(this));
          utils.wrapResult(this[$build], callback)(null, builds);
        });
      }

      getBuild(number, callback) {
        utils.req("GET", `${this[$baseURL]}/builds/${number}`, null, (err, build) => {
          if(err) return callback(err);
          build = this[$processBuild].bind(this)(build);
          utils.wrapResult(this[$build], callback)(null, build);
        });
      }

      createBuild(data, callback) {
        utils.req("POST", `${this[$baseURL]}/builds`, data, utils.wrapResult(this[$build], callback));
      }

    }

    return Project;

  }

}
