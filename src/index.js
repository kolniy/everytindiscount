import fs from "fs"
import path from "path"
import { ApolloServer } from "apollo-server"
import { PrismaClient } from "@prisma/client"
import { getUserIdFromAuthHeader } from "./utilities/getUserIdFromAuthHeader"
import * as Query from "./resolvers/Query"
import * as Mutation from "./resolvers/Mutation"
import * as User from "./resolvers/User"
import * as PackageType from "./resolvers/PackageType"

const prisma = new PrismaClient()

const resolvers = {
    Query,
    Mutation,
    User,
    PackageType
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8'),
    resolvers,
    context: ({ req }) => {
        return {
            ...req,
            prisma,
            userId: req && req.headers.authorization ? 
            getUserIdFromAuthHeader(req) : null
        }
    }
})

server.listen()
        .then(({ url }) => console.log(`server is running on ${url}`) )