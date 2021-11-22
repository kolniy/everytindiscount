import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

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

const singlePackage = async (_, { packageId }, { prisma }, info) => {
    const foundPackage = await prisma.package.findUnique({
        where: {
            id: packageId
        }
    })
    return foundPackage
}

const adminTransactionCount = async (parent, args, { userId }, info) => {

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(user.role !== "admin"){
        throw new Error("not authorized")
    }

    const transactionCount = await prisma.transaction.count()
    return transactionCount
}

const adminUsersCount = async (parent, args, { userId }, info) => {

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(user.role !== "admin"){
        throw new Error("not authorized")
    }

    const usersCount = await prisma.user.count()
    return usersCount
}

const adminSaleSum = async (parent, args, { userId }, info) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(user.role !== "admin"){
        throw new Error("not authorized")
    }

    const transationSum = await prisma.transaction.aggregate({
        _sum: {
            amount: true
        }
    })
   
    return transationSum._sum.amount
}

const adminPackagesCount = async (parent, args, { userId }, info) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(user.role !== "admin"){
        throw new Error("not authorized")
    }

    const packagesCount = await prisma.package.count()
    return packagesCount
}

const transactions = async (parent, args, { userId }, info) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(user.role !== "admin"){
        throw new Error("not authorized")
    }

    const transactions = await prisma.transaction.findMany({
        orderBy: {
            createdat:'desc'
        }
    })
    return transactions
}

export { me, packagetypes, 
    packages, singlePackage,
    adminTransactionCount, adminUsersCount,
    adminSaleSum, adminPackagesCount,
    transactions
}