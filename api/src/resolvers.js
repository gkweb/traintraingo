/**
 * Helper to extract all direction id's in given departure result
 * @param {Array} departures 
 */
const extractDirectionIdFromDepartures = (departures) => (
  departures.reduce((accumulator, curVal) => {
    if (accumulator.indexOf(curVal.direction_id) === -1) accumulator.push(curVal.direction_id)
    return accumulator
  }, [])
)

/**
 * Helper to extract all direction id's in given departure result
 * @param {Array} departures 
 */
const extractRouteIdFromDepartures = (departures) => (
  departures.reduce((accumulator, curVal) => {
    if (accumulator.indexOf(curVal.route_id) === -1) accumulator.push(curVal.route_id)
    return accumulator
  }, [])
)

/**
 * Helper to extract stop data from departures API with expand=all activated on api
 * @param {Array} departures 
 */
const extractStopFromDepartures = (departures) => {
  const id = departures.departures[0].stop_id // Grab stop id from first dep
  return departures.stops[id]
}

/**
 * Helper to extract stop data from departures API with expand=all activated on api
 * @param {Array} departures
 */
const extractDirectionsFromDepartures = (departures) => {
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
const extractDirectionByDirectionId = (direction_id, directions) => (
  directions.filter((val) => (
    val.direction_id === direction_id
  ))
)

const resolvers = {
  Query: {
    // Query for stop id
    stops: async (_, { search_term }, { dataSources }) => {
      const stops = await dataSources.stopsAPI.getStopsBySearchTerm(search_term)
      return stops.stops
    },
    // Query for stop id
    stop: async (_, { stop_id }, { dataSources }) => {
      // Stitch together some sane data
      
      let departures = await dataSources.departuresAPI.getDeparturesById(stop_id)
      let stop = {
        ...extractStopFromDepartures(departures),
        directions: [],
        departures: []
      }

      stop.directions = extractDirectionsFromDepartures(departures) || []

      // 1 - Stitch up departure data for easy UI consumption
      for (let dep = 0; dep < departures.departures.length; dep++) {
        console.log("Direction ID:")
        console.log(departures.departures[dep].direction_id)
        departures.departures[dep].direction_name = departures.directions[departures.departures[dep].direction_id].direction_name
        departures.departures[dep].disruptions = []

        // Loop over disruptions data
        for (let dis = 0; dis < departures.departures[dep].disruption_ids.length; dis++) {
          departures.departures[dep].disruptions.push(departures.disruptions[departures.departures[dep].disruption_ids[dis]])
        }
      }

      stop.departures = departures.departures

      return {
        ...stop,
        directions: departures.directions,
        departures: departures.departures
      }
    }
  }
}

if (module) module.exports = resolvers