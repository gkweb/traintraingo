const { RESTDataSource } = require('apollo-datasource-rest')
const ptvSig = require('ptv-api-signature')
const config = require('./../../config/index')

class DeparturesAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = config.BASE_URL
  }

  async getDeparturesById(stop_id, maxResults = 5) {
    return await this.get(
      `${this.baseURL}${ptvSig.pathWithSig(
        `/v3/departures/route_type/0/stop/${stop_id}`,
        [
          { name: 'max_results', value: maxResults },
          { name: 'expand', value: 'all' },
        ],
        config.DEV_ID,
        config.DEV_KEY
      )}`
    )
  }
}

module.exports = DeparturesAPI
