const { RESTDataSource } = require('apollo-datasource-rest')
const ptvSig = require('ptv-api-signature')
const config = require('./../../config/index')

class DirectionsAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = config.BASE_URL
  }

  async getDirectionsByRouteId(route_id) {
    return await this.get(`${this.baseURL}${ptvSig.pathWithSig(`/v3/directions/route/${route_id}`, [{ name: 'max_results', value: 20 }], config.DEV_ID, config.DEV_KEY)}`)
  }

  async getDirectionsByDirectionId(direction_id) {
    return await this.get(`${this.baseURL}${ptvSig.pathWithSig(`/v3/directions/${direction_id}`, [{ name: 'max_results', value: 20 }], config.DEV_ID, config.DEV_KEY)}`)
  }

}

module.exports = DirectionsAPI
