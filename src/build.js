
export default function (options, utils, modules) {
  const $data = Symbol('data')
  const $artifact = Symbol('artifact')
  const $job = Symbol('job')

  function Build (org, pipeline) {
    return class Build {

      constructor (data) {
        this.organization = org
        this.pipeline = pipeline

        this[$data] = data
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

        this.baseURL = `organizations/${this.organization.slug}/pipelines/${this.pipeline.slug}/builds/${this.number}`
      }

      get data () {
        return this[$data]
      }

      cancel (callback) {
        utils.req('PUT', `${this.baseURL}/cancel`, null, utils.wrapResult(Build, callback))
      }

      rebuild (callback) {
        utils.req('PUT', `${this.baseURL}/rebuild`, null, utils.wrapResult(Build, callback))
      }

      listArtifacts (callback) {
        utils.req('GET', `${this.baseURL}/artifacts`, null, utils.wrapResult(this[$artifact], callback))
      }

      getArtifact (id, callback) {
        utils.req('GET', `${this.baseURL}/artifacts/${id}`, null, utils.wrapResult(this[$artifact], callback))
      }

    }
  }
  return Build
}
