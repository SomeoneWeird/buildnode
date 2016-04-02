
export default function(options, utils, modules) {

  const $data     = Symbol("data");
  const $pipeline = Symbol("pipeline");
  const $agent    = Symbol("agent");
  const $baseURL  = Symbol("baseURL");

  class Organisation {

    constructor(data) {
      this[$data]     = data;
      this[$pipeline] = modules.pipeline(this);
      this[$agent]    = modules.agent(this);

      this.name = this[$data].slug;

      this[$baseURL] = `organizations/${this.name}`;
    }

    listPipelines(callback) {
      utils.req("GET", `${this[$baseURL]}/pipelines`, null, utils.wrapResult(this[$pipeline], callback));
    }

    getPipeline(name, callback) {
      utils.req("GET", `${this[$baseURL]}/pipelines/${name}`, null, utils.wrapResult(this[$pipeline], callback));
    }

    createPipeline(data, callback) {
      utils.req("POST", `${this[$baseURL]}/pipelines`, data, utils.wrapResult(this[$pipeline], callback));
    }

    listAgents(callback) {
      utils.req("GET", `${this[$baseURL]}/agents`, null, utils.wrapResult(this[$agent], callback));
    }

    getAgent(id, callback) {
      utils.req("GET", `${this[$baseURL]}/agents/${id}`, null, utils.wrapResult(this[$agent], callback));
    }

  }

  return Organisation;

}
