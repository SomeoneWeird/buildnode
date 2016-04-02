
export default function (options, utils, modules) {
  const $data = Symbol('data')
  const $org = Symbol('org')
  const $pipeline = Symbol('pipeline')
  const $artifact = Symbol('artifact')
  const $job = Symbol('job')
  const $baseURL = Symbol('baseURL')

  return function (org, pipeline) {
    return class Build {

      constructor (data) {
        this[$data] = data
        this[$org] = org
        this[$pipeline] = pipeline
        this[$artifact] = modules.artifact(org, pipeline, this)
        this[$job] = modules.job(org, pipeline, this)

        const fieldMap = {
          id: 'id',
          number: 'number',
          state: 'state',
          message: 'message',
          branch: 'branch',
          jobs: (data) => {
            return data.jobs.map((j) => new this[$job](j))
          }
        }

        utils.mapFields.call(this, data, fieldMap)

        this[$baseURL] = `organizations/${this[$org].name}/pipelines/${this[$pipeline].slug}/builds/${this.number}`
      }

      cancel (callback) {
        utils.req('PUT', `${this[$baseURL]}/cancel`, null, utils.wrapResult(Build, callback))
      }

      rebuild (callback) {
        utils.req('PUT', `${this[$baseURL]}/rebuild`, null, utils.wrapResult(Build, callback))
      }

      listArtifacts (callback) {
        utils.req('GET', `${this[$baseURL]}/artifacts`, null, utils.wrapResult(this[$artifact], callback))
      }

      getArtifact (id, callback) {
        utils.req('GET', `${this[$baseURL]}/artifacts/${id}`, null, utils.wrapResult(this[$artifact], callback))
      }

    }
  }
}
