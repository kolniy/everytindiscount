// import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient()

const me = async (parent, args, { prisma, userId }, info) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    return user
}

const packagetypes = async (parent, args, { prisma }, info) => {
    const packagetypes = await prisma.package_Type.findMany()
    return packagetypes
}

const packages = async (parent, args, { prisma }, info) => {
    const packagesByPackageTypeId = await prisma.package.findMany({
        where: {
           packagetypeId: args.packageTypeId
        }
    })

    return packagesByPackageTypeId
}

export { me, packagetypes, packages }