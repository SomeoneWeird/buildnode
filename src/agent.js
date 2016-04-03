
export default function (options, utils, modules) {
  const $data = Symbol('data')

  const fieldMap = {
    id: 'id',
    name: 'name',
    state: 'connection_state',
    ip: 'ip_address',
    version: 'version',
    metaData: function (data) {
      let d = {}
      data.meta_data.forEach((k) => {
        let t = k.split('=')
        d[t[0]] = t[1]
      })
      return d
    }
  }

  function Agent (org) {
    return class Agent {

      constructor (data) {
        this[$data] = data

        this.organization = org

        utils.mapFields.call(this, data, fieldMap)

        this.baseURL = `organizations/${this.organization.slug}/agents/${this.id}`
      }

      get data () {
        return this[$data]
      }

      stop (callback) {
        utils.req('PUT', `${this.baseURL}/stop`, null, callback)
      }
    }
  }
  return Agent
}
