
export default function (options, utils, modules) {
  const $data = Symbol('data')
  const $artifact = Symbol('artifact')

  const fieldMap = {
    id: 'id',
    name: 'name',
    command: 'command'
  }

  function Job (org, pipeline, build) {
    return class Job {

      constructor (data) {
        this.organization = org
        this.pipeline = pipeline
        this.build = build

        this[$data] = data
        this[$artifact] = modules.artifact(org, pipeline, build, this)

        utils.mapFields.call(this, data, fieldMap)

        this.baseURL = `organizations/${this.organization.name}/pipelines/${this.pipeline.name}/builds/${this.build.number}/jobs/${this.id}`
      }

      get data () {
        return this[$data]
      }

      unblock (callback) {
        utils.req('PUT', `${this.baseURL}/unblock`, null, callback)
      }

      getLog (callback) {
        utils.req('GET', `${this.baseURL}/log`, null, callback)
      }

      listArtifacts (callback) {
        utils.req('GET', `${this.baseURL}/artifacts`, null, utils.wrapResult(this[$artifact], callback))
      }
    }
  }
  return Job
}
