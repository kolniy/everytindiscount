// import { PrismaClient } from "@prisma/client"
// const prisma = new PrismaClient()

const packagetype = async (parent, args, { prisma }, info ) => {
    const packagetype = await prisma.package.findUnique({
        where: {
            id: parent.id
        }
    }).packagetype()

    return packagetype

}

const packageplan = async (parent, args, { prisma }, info) => {
    const packageplan = await prisma.package_Plan.findMany({
        where: {
            packageid: parent.id
        }
    })

    return packageplan

}

export { packagetype, packageplan }