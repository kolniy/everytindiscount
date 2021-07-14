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

export { me, packagetypes }