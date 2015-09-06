
export default function(options, utils, modules) {

  const $data    = Symbol("data");
  const $project = Symbol("project");
  const $agent   = Symbol("agent");
  const $baseURL = Symbol("baseURL");

  class Organisation {

    constructor(data) {
      this[$data]    = data;
      this[$project] = modules.project(this);
      this[$agent]   = modules.agent(this);

      this.name = this[$data].slug;

      this[$baseURL] = `organizations/${this.name}`;
    }

    listProjects(callback) {
      utils.req("GET", `${this[$baseURL]}/projects`, null, utils.wrapResult(this[$project], callback));
    }

    getProject(name, callback) {
      utils.req("GET", `${this[$baseURL]}/projects/${name}`, null, utils.wrapResult(this[$project], callback));
    }

    createProject(data, callback) {
      utils.req("POST", `${this[$baseURL]}/projects`, data, utils.wrapResult(this[$project], callback));
    }

    listAgents(callback) {
      utils.req("GET", `${this[$baseURL]}/agents`, null, utils.wrapResult(this[$agent], callback));
    }

    getAgent(id, callback) {
      utils.req("GET", `${this[$baseURL]}/agents/${id}`, null, utils.wrapResult(this[$agent], callback));
    }

    createAgent(name, callback) {
      utils.req("POST", `${this[$baseURL]}/agents`, {
        name
      }, utils.wrapResult(this[$agent], callback));
    }

  }

  return Organisation;

}
