import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const singlepackage = async (parent, args, context, info) => {
    const packageByPackagePlan = await prisma.package_Plan.findUnique({
        where: {
            id: parent.id
        }
    }).package()

    return packageByPackagePlan
}

const packagetype = async (parent, args, context, info) => {
    const packageType = await prisma.package_Plan.findUnique({
        where: {
            id: parent.id
        }
    }).packageplan()

    return packageType
}

export { singlepackage, packagetype }