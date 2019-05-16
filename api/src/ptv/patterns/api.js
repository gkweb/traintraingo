const { RESTDataSource } = require('apollo-datasource-rest')
const ptvSig = require('ptv-api-signature')
const config = require('./../../config/index')

class PatternsAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = config.BASE_URL
  }

  /**
   * Gets stop by run id
   * @param {String} search_term
   */
  async getStopsByRunId(run_id) {
    return await this.get(
      `${this.baseURL}${ptvSig.pathWithSig(
        `/v3/pattern/run/${run_id}/route_type/0`,
        [{ name: 'max_results', value: 10 }, { name: 'expand', value: 'all' }],
        config.DEV_ID,
        config.DEV_KEY
      )}`
    )
  }
}

module.exports = PatternsAPI
