
export default function(options, utils, modules) {

  const $data    = Symbol("data");
  const $org     = Symbol("org");
  const $build   = Symbol("build");
  const $job     = Symbol("job");
  const $baseURL = Symbol("baseURL");

  return function(org) {

    class Project {

      constructor(data) {
        this[$data]  = data;
        this[$org]   = org;
        this[$build] = modules.build(org, this);

        this.name = this[$data].slug;

        this[$baseURL] = `organizations/${this[$org].name}/projects/${this.name}`;
      }

      delete(callback) {
        utils.req("DELETE", this[$baseURL], null, callback);
      }

      getBuild(number, callback) {
        console.log(`${this[$baseURL]}/builds/${number}`);
        utils.req("GET", `${this[$baseURL]}/builds/${number}`, null, (err, result) => {
          if(err) return callback(err);
          let build = new this[$build](result);
          let job = modules.job(org, this, build);
          build.jobs = build.jobs.map(j => new job(j));
          return callback(null, build);
        });
      }

      createBuild(data, callback) {
        utils.req("POST", `${this[$baseURL]}/builds`, data, utils.wrapResult(this[$build], callback));
      }

    }

    return Project;

  }

}
