// import { PrismaClient } from "@prisma/client"
// const prisma = new PrismaClient()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
 
const updatePlans = async () => {
    await prisma.package_Plan.updateMany({
        data: {
            packagetypeid:"6177d52300982ecf00b6a04d"
        },
        where: {
            packageid:"61787fec005809d900beaa1c"
        }
    })
    console.log("done")
}

updatePlans()

