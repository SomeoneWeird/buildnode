
export default function(options, utils, modules) {

  const $data    = Symbol("data");
  const $org     = Symbol("org");
  const $build   = Symbol("build");
  const $job     = Symbol("job");
  const $baseURL = Symbol("baseURL");

  const $processBuild = Symbol("processBuild");

  const fieldMap = {
    id: 'id',
    name: 'name',
    slug: 'slug'
  };

  return function(org) {

    class Pipeline {

      constructor(data) {
        this[$data]  = data;
        this[$org]   = org;
        this[$build] = modules.build(org, this);

        utils.mapFields.call(this, data, fieldMap);

        this[$baseURL] = `organizations/${this[$org].name}/pipelines/${this.slug}`;
      }

      update(data, callback) {
        utils.req("PATCH", this[$baseURL], data, utils.wrapResult(Pipeline, callback));
      }

      delete(callback) {
        utils.req("DELETE", this[$baseURL], null, callback);
      }

      listBuilds(callback) {
        utils.req("GET", `${this[$baseURL]}/builds`, null, utils.wrapResult(this[$build], callback));
      }

      getBuild(number, callback) {
        utils.req("GET", `${this[$baseURL]}/builds/${number}`, null, utils.wrapResult(this[$build], callback));
      }

      createBuild(data, callback) {
        utils.req("POST", `${this[$baseURL]}/builds`, data, utils.wrapResult(this[$build], callback));
      }

    }

    return Pipeline;

  }

}
