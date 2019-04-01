const { RESTDataSource } = require('apollo-datasource-rest')
const ptvSig = require('ptv-api-signature')
const config = require('./../../config/index')

class DisruptionsAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = config.BASE_URL
  }

  async getDisruptionByRouteIdAndStopId(route_id, stop_id) {
    return await this.get(`${this.baseURL}${ptvSig.pathWithSig(`/v3/disruptions/route/${route_id}/stop/${stop_id}`, [{ name: 'max_results', value: 20 }], config.DEV_ID, config.DEV_KEY)}`)
  }

  async getDisruptionByDisruptionId(disruption_id) {
    return await this.get(`${this.baseURL}${ptvSig.pathWithSig(`/v3/disruptions/${disruption_id}`, [{ name: 'max_results', value: 20 }], config.DEV_ID, config.DEV_KEY)}`)
  }

}

module.exports = DisruptionsAPI
