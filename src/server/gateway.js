'use strict'

import fastify from 'fastify'
import GQL from 'fastify-gql'
import {resolvers} from "resolvers"
import schema from "schema"
import data from "data"

const server = fastify()

export const resolvers = {
    Query: {
      readContract: async (_, { contractId }) => {
        const element = data[`${contractId}`];
        if (!element) return null;
        return element;
      },
      readContractComponent: async (_, { contractComponentId }) => {
      },
    },
  };



fastify.register(GQL, { schema, resolvers })


server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})