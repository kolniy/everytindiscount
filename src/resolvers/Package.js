import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const packagetype = async (parent, args, {  }, info ) => {

    const packagetype = await prisma.package.findUnique({
        where: {
            id: parent.id
        }
    }).packagetype()

    return packagetype

}

const createdBy = async (parent, args, { prisma }, info) => {
    const user = await prisma.package.findUnique({
        where: {
            id: parent.id
        }
    }).createdby()

    return user
}

const packageplan = async (parent, args, { prisma }, info) => {

    const packageplan = await prisma.package_Plan.findMany({
        orderBy:[
            {
                planname:'asc'
            }
        ],
        where: {
            packageid: parent.id
        },
    })

    return packageplan

}

export { packagetype, packageplan, createdBy }