
export default function (options, utils, modules) {
  const $data = Symbol('data')
  const $pipeline = Symbol('pipeline')
  const $agent = Symbol('agent')

  const fieldMap = {
    name: 'name',
    slug: 'slug',
    url: 'web_url'
  }

  return class Organization {

    constructor (data) {
      this[$data] = data
      this[$pipeline] = modules.pipeline(this)
      this[$agent] = modules.agent(this)

      utils.mapFields.call(this, data, fieldMap)

      this.baseURL = `organizations/${this.slug}`
    }

    get data () {
      return this[$data]
    }

    listPipelines(callback, page=1, pipelines=[]) {
      utils.req('GET', `${this.baseURL}/pipelines/?per_page=100&page=${page}`, null, utils.wrapResult(this[$pipeline], (err, response) => {
        pipelines = pipelines.concat(response)
        return response.length < 100
          ? callback(err, pipelines)
          : this.listPipelines(callback, page + 1, pipelines)
      }))
    }

    getPipeline (name, callback) {
      utils.req('GET', `${this.baseURL}/pipelines/${name}`, null, utils.wrapResult(this[$pipeline], callback))
    }

    createPipeline (data, callback) {
      utils.req('POST', `${this.baseURL}/pipelines`, data, utils.wrapResult(this[$pipeline], callback))
    }

    listAgents (callback) {
      utils.req('GET', `${this.baseURL}/agents`, null, utils.wrapResult(this[$agent], callback))
    }

    getAgent (id, callback) {
      utils.req('GET', `${this.baseURL}/agents/${id}`, null, utils.wrapResult(this[$agent], callback))
    }

  }
}
