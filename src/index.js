
import Utils from './utils'
import organization from './organization'
import pipeline from './pipeline'
import build from './build'
import agent from './agent'
import job from './job'
import artifact from './artifact'

export default function (options = {}) {
  let {
    domain = 'api.buildkite.com',
    version = 'v2',
    secure = true,
    accessToken,
    email,
    password
  } = options

  if (!accessToken && (!email || !password)) {
    throw new Error('Either an accessToken, or email + password is required to use the Buildkite API')
  }

  const utils = Utils({
    domain,
    version,
    secure,
    accessToken,
    email,
    password
  })

  let modules = {}

  modules.organization = organization(options, utils, modules)
  modules.pipeline = pipeline(options, utils, modules)
  modules.build = build(options, utils, modules)
  modules.agent = agent(options, utils, modules)
  modules.job = job(options, utils, modules)
  modules.artifact = artifact(options, utils, modules)

  function listorganizations (callback) {
    utils.req('GET', 'organizations', null, utils.wrapResult(modules.organization, callback))
  }

  function getorganization (name, callback) {
    utils.req('GET', `organizations/${name}`, null, utils.wrapResult(modules.organization, callback))
  }

  modules.listorganizations = listorganizations
  modules.getorganization = getorganization

  return modules
}
