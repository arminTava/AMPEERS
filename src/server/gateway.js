'use strict'

const Fastify = require('fastify')
const GQL = require('fastify-gql')
const schema = require("./schema.graphql")
const data = require("./data")
const findContractComponent = require("./helper")

const server = Fastify()

const resolvers = {
    Query: {
      readContract: async (_, { contractId }) => {
        const element = data[`${contractId}`];
        if (!element) return null;
        return JSON.stringify(element);
      },
      readContractComponent: async (_, { contractComponentId }) => {
        const element = findContractComponent(data,contractComponentId )
        if (!element) return null;
        return JSON.stringify(element);
      }

    },
  };

  server.register(GQL, { schema, resolvers })

  server.get('/readContract', async function (req, reply) {
    const id = req.query.id;
    const query = `{ readContract(contractId:${id}) }`
    return reply.graphql(query)
  })
  server.get('/readContractComponent', async function (req, reply) {
    const id = req.query.id;
    const query = `{ readContractComponent(contractComponentId:${id}) }`
    return reply.graphql(query)
  })

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})