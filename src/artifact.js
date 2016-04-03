import request from 'request'

export default function (options, utils, modules) {
  const $data = Symbol('build')

  const fieldMap = {
    id: 'id',
    jobId: 'job_id',
    path: 'path',
    size: 'file_size',
    hash: 'sha1sum'
  }

  function Artifact (org, pipeline, build, job) {
    return class Artifact {

      constructor (data) {
        this[$data] = data

        this.organization = org
        this.pipeline = pipeline
        this.build = build
        this.job = job

        utils.mapFields.call(this, data, fieldMap)

        this.baseURL = `organizations/${this.organization.name}/pipelines/${this.pipeline.slug}/builds/${this.build.number}/artifacts/${this.id}`
      }

      get data () {
        return this[$data]
      }

      download (callback) {
        utils.req('GET', `${this.baseURL}/download`, null, function (err, result) {
          if (err) {
            return callback(err)
          }
          let stream = request(result.url)
          return callback(null, stream)
        })
      }
    }
  }
  return Artifact
}
