import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const createdpackagetype = async (parent, args, { prisma }, info ) => {
    const createdpackageType = await prisma.package_Type.findMany({
        where: {
            createdbyid: parent.id
        }
    })
    return createdpackageType
}

const createpackage = async (parent, args, {  }, info) => {
    const createdPackages = await prisma.package.findMany({
        where: {
            createdbyid: parent.id
        }
    })
    return createdPackages
}

export { createdpackagetype, createpackage }