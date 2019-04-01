const { ApolloServer, gql } = require('apollo-server')

// Require the module
const createGraphQLLogger = require('graphql-log')
const resolvers = require('./resolvers')
const config = require('./config')

// PTV REST/Swagger data
const DeparturesAPI = require('./ptv/departures/api')
const StopsAPI = require('./ptv/stops/api')
const DirectionsAPI = require('./ptv/directions/api')
const DisruptionsAPI = require('./ptv/disruptions/api')

// Create a logger
const logExecutions = createGraphQLLogger();

// Wrap your resolvers
logExecutions(resolvers);

const typeDefs = gql`
  type Stop {
    stop_id: ID!
    stop_suburb: String
    route_type: Int
    stop_longitude: Float
    stop_latitude: Float
    departures: [Departure]
    stop_name: String
    directions: [Direction]
  }

  type Stops {
    stops: [Stop]
  }

  type Direction {
    direction_id: Int
    direction_name: String
    route_id: String
    route_type: String
  }

  type Directions {
    directions: [Direction]
  }

  type Disruption {
    disruption_id: Int
    title: String
    url: String
    description: String
    disruption_status: String
    disruption_type: String
    published_on: String
    last_updated: String
    from_date: String
    to_date: String
    colour: String
    display_on_board: Boolean
    display_status: Boolean
  }
  
  type Departure {
    stop_id: ID!
    route_id: Int
    route_type: Int
    stop_suburb: String
    stop_name: String
    run_id: Int
    direction_id: Int
    departure_sequence: Int
    disruptions: [Disruption]
    scheduled_departure_utc: String
    estimated_departure_utc: String
    platform_number: Int
    direction_name: String
  }

  type Departures {
    stop: Stop
    departures: [Departure]
    directions: [Direction]
  }

  type Query {
    stops(search_term: String): [Stop]
    stop(stop_id: Int): Stop
    departures(stop_id: Int): [Departure]
  }

  schema {
    query: Query
  }
`;

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    introspection: true,
    playground: config.IS_DEBUG,
    debug: config.IS_DEBUG,
    dataSources: () => {
      return {
        departuresAPI: new DeparturesAPI(),
        disruptionsAPI: new DisruptionsAPI(),
        stopsAPI: new StopsAPI(),
        directionsAPI: new DirectionsAPI()
      }
    }
 });


// const handler = (event, context, callback) => {
//   const handler = server.createHandler({
//     cors: {
//       origin: '*',
//       credentials: true,
//       allowedHeaders: '*',
//       headers: true
//     }
//   });

//   // Debug
//   if (config.IS_DEBUG) {
//     console.log(event)
//     console.log(context)
//   }
  

//   // tell AWS lambda we do not want to wait for NodeJS event loop
//   // to be empty in order to send the response
//   context.callbackWaitsForEmptyEventLoop = false

//   // process the request
//   return handler(event, context, callback)
// }

// exports.handler = handler

  // This `listen` method launches a web-server.  Existing apps
  // can utilize middleware options, which we'll discuss later.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
