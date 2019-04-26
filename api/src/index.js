const { ApolloServer, gql } = require('apollo-server')

// File / path
const fs = require('fs')
const path = require('path')

// Types
const typeDefs = gql(
  fs.readFileSync(path.join(__dirname, './typedefs.gql'), 'utf-8')
)

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
const logExecutions = createGraphQLLogger()

// Wrap your resolvers
logExecutions(resolvers)

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
      directionsAPI: new DirectionsAPI(),
    }
  },
})

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
