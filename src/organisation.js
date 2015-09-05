
export default function(options, utils, modules) {

  const $data    = Symbol("data");
  const $project = Symbol("project");
  const $agent   = Symbol("agent");

  class Organisation {

    constructor(data) {
      this[$data]    = data;
      this[$project] = modules.project(this);
      this[$agent]   = modules.agent(this);

      this.name = this[$data].slug;
    }

    listProjects(callback) {
      utils.req("GET", `organizations/${this.name}/projects`, null, utils.wrapResult(this[$project], callback));
    }

    getProject(name, callback) {
      utils.req("GET", `organizations/${this.name}/projects/${name}`, null, utils.wrapResult(this[$project], callback));
    }

    createProject(data, callback) {
      utils.req("POST", `organizations/${this.name}/projects`, data, utils.wrapResult(this[$project], callback));
    }

    listAgents(callback) {
      utils.req("GET", `organizations/${this.name}/agents`, null, utils.wrapResult(this[$agent], callback));
    }

    getAgent(id, callback) {
      utils.req("GET", `organizations/${this.name}/agents/${id}`, null, utils.wrapResult(this[$agent], callback));
    }

    createAgent(name, callback) {
      utils.req("POST", `organizations/${this.name}/agents`, {
        name
      }, utils.wrapResult(this[$agent], callback));
    }

  }

  return Organisation;

}
