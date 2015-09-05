
import utils        from "./utils";
import organisation from "./organisation";
import project      from "./project";
import build        from "./build";
import agent        from "./agent";
import job          from "./job";

export default function(options = {}) {

  let {
    accessToken,
    email,
    password
  } = options;

  if(!accessToken && (!email || !password)) {
    throw new Error("Either an accessToken, or email + password is required to use the Buildkite API");
  }

  utils = utils(options);

  let modules = {};

  modules.organisation = organisation(options, utils, modules);
  modules.project      = project(options, utils, modules);
  modules.build        = build(options, utils, modules);
  modules.agent        = agent(options, utils, modules);
  modules.job          = job(options, utils, modules);

  function listOrganisations(callback) {
    utils.req("GET", "organizations", null, utils.wrapResult(modules.organisation, callback));
  }

  function getOrganisation(name, callback) {
    utils.req("GET", `organizations/${name}`, null, utils.wrapResult(modules.organisation, callback));
  }

  return {
    listOrganisations,
    getOrganisation
  };

}
