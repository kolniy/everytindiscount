const { PrismaClient } = require('@prisma/client')
const shortId = require("shortid")

const prisma = new PrismaClient()

const handleUpdate = async () => {
    await prisma.user.update({
        data: {
            referedby : '0SyssiU1P'
        },
        where: {
            email:'kolaniyi3@gmail.com'
        }
    })
}

handleUpdate()
