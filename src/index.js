import fs from "fs"
import path from "path"
import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import { execute, subscribe } from "graphql"
import { SubscriptionServer } from "subscriptions-transport-ws"
import { makeExecutableSchema } from "@graphql-tools/schema"
import express from 'express'
import http from 'http'
import {
    ApolloServerPluginLandingPageGraphQLPlayground
  } from "apollo-server-core";
import { PrismaClient } from "@prisma/client"
import { getUserIdFromAuthHeader } from "./utilities/getUserIdFromAuthHeader"
import * as Query from "./resolvers/Query"
import * as Mutation from "./resolvers/Mutation"
import * as User from "./resolvers/User"
import * as PackageType from "./resolvers/PackageType"
import * as Package from "./resolvers/Package"
import * as PackagePlan from "./resolvers/PackagePlan"
import * as Transaction from "./resolvers/Transaction"

import "regenerator-runtime/runtime"

const prisma = new PrismaClient()

const PORT = process.env.PORT || 4000

const resolvers = {
    Query,
    Mutation,
    User,
    PackageType,
    Package,
    PackagePlan,
    Transaction
}


async function startApolloServer(typeDefs, resolvers) {

    const app = express()
    const httpServer = http.createServer(app)

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const subScriptionServer = SubscriptionServer.create({
        schema,
        execute,
        subscribe
    }, {
        server: httpServer,
        path:'/graphql/subscription'
    })


    const server = new ApolloServer({
        schema: schema,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
            [ApolloServerPluginDrainHttpServer({ httpServer })],
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subScriptionServer.close()
                        }
                    }
                }
            }
          ],
        context: ({ req }) => {
            return {
                ...req,
                prisma,
                userId: req && req.headers.authorization ? 
                getUserIdFromAuthHeader(req) : null
            }
        },
        introspection: true
    })

    app.use('/index', async (req, res) => {
        res.send("Hello there")
    })

    await server.start()
    server.applyMiddleware({
        app,
        path:'/graphql'
    })

    await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

}


startApolloServer(fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8'), resolvers)