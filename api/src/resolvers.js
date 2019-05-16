const shortid = require('shortid')

/**
 * Helper to extract all direction id's in given departure result
 * @param {Array} departures
 */
const extractDirectionIdFromDepartures = departures =>
  departures.reduce((accumulator, curVal) => {
    if (accumulator.indexOf(curVal.direction_id) === -1)
      accumulator.push(curVal.direction_id)
    return accumulator
  }, [])

/**
 * Helper to extract all direction id's in given departure result
 * @param {Array} departures
 */
const extractRouteIdFromDepartures = departures =>
  departures.reduce((accumulator, curVal) => {
    if (accumulator.indexOf(curVal.route_id) === -1)
      accumulator.push(curVal.route_id)
    return accumulator
  }, [])

/**
 * Helper to extract stop data from departures API with expand=all activated on api
 * @param {Array} departures
 */
const extractStopFromDepartures = departures => {
  const id = departures.departures[0].stop_id // Grab stop id from first dep
  return departures.stops[id]
}

/**
 * Helper to extract stop data from departures API with expand=all activated on api
 * @param {Array} departures
 */
const extractDirectionsFromDepartures = departures => {
  const directions = []

  for (let d = 0; d < departures.directions.length; d++) {
    directions.push(departures.directions[d])
  }

  return directions
}

/**
 * Filter Through directions and extract specific direction data
 * @param {String} direction_id
 * @param {Array} directions
 */
const extractDirectionByDirectionId = (direction_id, directions) =>
  directions.filter(val => val.direction_id === direction_id)

const resolvers = {
  Query: {
    // Query for stop id
    stops: async (_, { search_term }, { dataSources }) => {
      const stops = await dataSources.stopsAPI.getStopsBySearchTerm(search_term)
      return stops.stops
    },
    pattern: async (_, { run_id }, { dataSources }) => {
      const stoppingPattern = await dataSources.patternsAPI.getStopsByRunId(
        run_id
      )

      // 1 - Stitch up departure data for easy UI consumption
      for (let dep = 0; dep < stoppingPattern.departures.length; dep++) {
        stoppingPattern.departures[dep].direction_name =
          stoppingPattern.directions[
            stoppingPattern.departures[dep].direction_id
          ].direction_name

        // Suburb
        stoppingPattern.departures[dep].stop_suburb =
          stoppingPattern.stops[
            stoppingPattern.departures[dep].stop_id
          ].stop_suburb

        // Stop name
        stoppingPattern.departures[dep].stop_name =
          stoppingPattern.stops[
            stoppingPattern.departures[dep].stop_id
          ].stop_name

        stoppingPattern.departures[dep].disruptions = []

        // Loop over disruptions data
        for (
          let dis = 0;
          dis < stoppingPattern.departures[dep].disruption_ids.length;
          dis++
        ) {
          tmpDisruption = {
            ...stoppingPattern.disruptions[
              stoppingPattern.departures[dep].disruption_ids[dis]
            ],
            sid: shortid.generate(),
          }

          stoppingPattern.departures[dep].disruptions.push(tmpDisruption)
        }
      }

      console.log(stoppingPattern)

      return stoppingPattern
    },
    // Query for stop id
    stop: async (_, { stop_id }, { dataSources }) => {
      // Stitch together some sane data

      let departures = await dataSources.departuresAPI.getDeparturesById(
        stop_id
      )
      let stop = {
        ...extractStopFromDepartures(departures),
        directions: [],
        departures: [],
      }

      stop.directions = extractDirectionsFromDepartures(departures) || []

      let tmpDisruption = {}
      // 1 - Stitch up departure data for easy UI consumption
      for (let dep = 0; dep < departures.departures.length; dep++) {
        departures.departures[dep].direction_name =
          departures.directions[
            departures.departures[dep].direction_id
          ].direction_name
        departures.departures[dep].disruptions = []

        // Loop over disruptions data
        for (
          let dis = 0;
          dis < departures.departures[dep].disruption_ids.length;
          dis++
        ) {
          tmpDisruption = {
            ...departures.disruptions[
              departures.departures[dep].disruption_ids[dis]
            ],
            sid: shortid.generate(),
          }

          departures.departures[dep].disruptions.push(tmpDisruption)
        }
      }

      stop.departures = departures.departures

      return {
        ...stop,
        directions: departures.directions,
        departures: departures.departures,
      }
    },
  },
}

if (module) module.exports = resolvers
