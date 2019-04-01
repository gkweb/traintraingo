const { RESTDataSource } = require('apollo-datasource-rest')
const ptvSig = require('ptv-api-signature')
const config = require('./../../config/index')

class StopsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = config.BASE_URL
  }

  /**
   * Gets stop by search term
   * @param {String} search_term 
   */
  async getStopsBySearchTerm(search_term = '') {
    return await this.get(`${this.baseURL}${ptvSig.pathWithSig(`/v3/search/${search_term.toLowerCase()}`, [{ name: 'route_types', value: '0' }, { name: 'max_results', value: 10 }], config.DEV_ID, config.DEV_KEY)}`)
  }

  /**
   * Search for stops based on search term
   * @param {String} search_term
   */
  async getStopById (stop_id) {
    return await this.get(`${this.baseURL}${ptvSig.pathWithSig(`/v3/stops/${stop_id}/route_type/0/`, [{ name: 'max_results', value: 10 }], config.DEV_ID, config.DEV_KEY)}`)
  }

}

module.exports = StopsAPI
