const createdpackagetype = async (parent, args, { prisma }, info ) => {
    const createdpackageType = await prisma.package_Type.findMany({
        where: {
            createdbyid: parent.id
        }
    })
    return createdpackageType
}

export { createdpackagetype }