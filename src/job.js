
export default function (options, utils, modules) {
  const $data = Symbol('data')
  const $org = Symbol('org')
  const $pipeline = Symbol('pipeline')
  const $build = Symbol('build')
  const $artifact = Symbol('artifact')
  const $baseURL = Symbol('baseURL')

  const fieldMap = {
    id: 'id',
    name: 'name',
    command: 'command'
  }

  return function (org, pipeline, build) {
    return class Job {

      constructor (data) {
        this[$data] = data
        this[$org] = org
        this[$pipeline] = pipeline
        this[$build] = build
        this[$artifact] = modules.artifact(org, pipeline, build, this)

        utils.mapFields.call(this, data, fieldMap)

        this[$baseURL] = `organizations/${this[$org].name}/pipelines/${this[$pipeline].name}/builds/${this[$build].number}/jobs/${this.id}`
      }

      unblock (callback) {
        utils.req('PUT', `${this[$baseURL]}/unblock`, null, callback)
      }

      getLog (callback) {
        utils.req('GET', `${this[$baseURL]}/log`, null, callback)
      }

      listArtifacts (callback) {
        utils.req('GET', `${this[$baseURL]}/artifacts`, null, utils.wrapResult(this[$artifact], callback))
      }
    }
  }
}
