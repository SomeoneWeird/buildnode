
export default function (options, utils, modules) {
  const $data = Symbol('data')
  const $build = Symbol('build')

  const fieldMap = {
    id: 'id',
    name: 'name',
    slug: 'slug'
  }

  function Pipeline (org) {
    return class Pipeline {

      constructor (data) {
        this.organization = org

        this[$data] = data
        this[$build] = modules.build(org, this)

        utils.mapFields.call(this, data, fieldMap)

        this.baseURL = `organizations/${this.organization.name}/pipelines/${this.slug}`
      }

      get data () {
        return this[$data]
      }

      update (data, callback) {
        utils.req('PATCH', this.baseURL, data, utils.wrapResult(Pipeline, callback))
      }

      delete (callback) {
        utils.req('DELETE', this.baseURL, null, callback)
      }

      listBuilds (callback) {
        utils.req('GET', `${this.baseURL}/builds`, null, utils.wrapResult(this[$build], callback))
      }

      getBuild (number, callback) {
        utils.req('GET', `${this.baseURL}/builds/${number}`, null, utils.wrapResult(this[$build], callback))
      }

      createBuild (data, callback) {
        utils.req('POST', `${this.baseURL}/builds`, data, utils.wrapResult(this[$build], callback))
      }

    }
  }
  return Pipeline
}
