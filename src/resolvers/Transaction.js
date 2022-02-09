import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const packageplan = async (parent, args, context, info) => {
    if(parent.planid === null) return null
    const packageplan = await prisma.package_Plan.findUnique({
        where: {
            id: parent.planid
        }
    })
    return packageplan
}

const transactionby = async (parent, args, context, info) => {
    const transactionby = await prisma.user.findUnique({
        where: {
            id: parent.userid
        }
    })
    return transactionby
}

export { packageplan, transactionby }