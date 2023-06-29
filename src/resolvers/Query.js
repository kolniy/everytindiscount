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

const getPackagesInClientDashboard = async (parent, { packageTypeId, queryString }, { prisma }, info) => {
     const queryWhereCondition = queryString.length > 0 ? {
        AND: [
            {
                packagetypeId: packageTypeId
            },
            {
                packagename: {
                    contains: queryString,
                    mode: 'insensitive'
                }
            }
        ]
    } : {
        packagetypeId: packageTypeId
     }

     const packagesByPackageTypeIdAndName = await prisma.package.findMany({
        where: queryWhereCondition
    })

    return packagesByPackageTypeIdAndName
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

const adminAccounts = async (parent, args, { userId }, info) => {

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(user.role !== "admin"){
        throw new Error("not authorized")
    }

    const admins = await prisma.user.findMany({
        where: {
            role:'admin'
        }
    })

    return admins
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
            createdat:'asc'
        }
    })
    return transactions
}

const getUserTransactions = async (parent, args, { userId }, info) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })


    if(!user){
        throw new Error("not authorized")
    }

    const adminUserTransactions = await prisma.transaction.findMany({
        where: {
            userid: userId
        },
        orderBy: {
            createdat: 'asc'
        }  
    })
    return adminUserTransactions
}

export { me, packagetypes, 
    packages, singlePackage,
    adminTransactionCount, adminUsersCount,
    adminSaleSum, adminPackagesCount,
    transactions, adminAccounts,
    getUserTransactions,
    getPackagesInClientDashboard
}