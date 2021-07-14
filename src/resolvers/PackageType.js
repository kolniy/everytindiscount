const createdby = async (parent, args, { prisma }, info) => {
    const createdby = await prisma.package_Type.findUnique({
        where: {
            id: parent.id
        }
    }).createdby()

    return createdby
}

export { createdby }