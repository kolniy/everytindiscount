import fs from "fs"
import path from "path"
import { ApolloServer } from "apollo-server"
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

const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8'),
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
      ],
    context: ({ req }) => {
        return {
            ...req,
            prisma,
            userId: req && req.headers.authorization ? 
            getUserIdFromAuthHeader(req) : null
        }
    }
})

server.listen({
    port: PORT
})
        .then(({ url }) => console.log(`server is running on ${url}`) )