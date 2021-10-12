import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const tokenSecret = process.env.JWTSECRET

const adminSignup = async (parent, { data }, { prisma }, info ) => {
    const userExists = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })

    if(userExists){
        throw new Error("user already exists")
    }

    const salt = await bcrypt.genSalt(8)
    const password = await bcrypt.hash(data.password, salt)

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            role: data.role,
            password: password,
        }
    })

    const payload = {
        userId: user.id
    }

    const token = await jwt.sign(payload, tokenSecret, { expiresIn: 360000})

    return {
        user,
        token 
    }
}

const adminSignin = async (parent, { data }, { prisma }, info) => {
    const user = await prisma.user.findUnique({
        where : {
            email: data.email
        }
    })

    if(!user){
        throw new Error("invalid credentials")
    }

    const valid = await bcrypt.compare(data.password, user.password)

    if(!valid){
        throw new Error("invalid credentials")
    }

    const payload = {
        userId: user.id
    }

    const token = jwt.sign(payload, tokenSecret)

    return {
        user,
        token
    }
}

const createPackageType = async (parent, { data }, { userId, prisma }, info) => {
  
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(user.role !== "admin"){
        throw new Error("not authorized")
    }

    const packagetype = await prisma.package_Type.create({
        data: {
            name: data.name,
            iconname: data.iconname,
            createdby: {
                connect: {
                    id: userId
                }
            }
        }
    })

    const { id, name, iconname, createdat } = packagetype

    return {
        id,
        name,
        iconname,
        createdat
    }
}

const deletePackageType = async (parent, { id }, { prisma, userId }, info) => {
     const validUser = await prisma.user.findUnique({
         where: {
             id: userId
         }
     })

     if(validUser.role !== "admin"){
         throw new Error("not authorized")
     }

     const deletedPackageType = await prisma.package_Type.delete({
         where: {
             id: id
         }
     })

     return deletedPackageType
}

const updatePackageType = async (parent, { id, data }, { prisma, userId }, info) => {
    const validUser = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(validUser.role !== "admin"){
        throw new Error("not authorized")
    }

    let updates = {}
    if(data.name){
        updates['name'] = data.name
    }
    if(data.iconname){
        updates['iconname'] = data.iconname
    }

    const updatedPackageType = await prisma.package_Type.update({
        where: {
            id: id
        },
        data: updates
    })

    return updatedPackageType
}

const resetUserPassword = async (parent, { password }, { prisma, userId }, info) => {
    const validUser = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(!validUser){
        throw new Error("user not found")
    }

    const salt = await bcrypt.genSalt(8)
    const newPassword = await bcrypt.hash(password, salt)

    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            password: newPassword
        }
    })

    return updatedUser
}

const createPackage = async (parent, args, { prisma, userId }, info ) => {

    const { packagename, packageimage, 
        packagediscount, packagedescription, 
        packagelandingpageimage, packagelogo,
         packagetypeId } = args.data

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(user.role !== "admin"){
        throw new Error("not authorized")
    }

    const newpackage = await prisma.package.create({
        data: {
            packagetype: {
                connect: {
                    id: packagetypeId
                }
            },
            createdby: {
                connect:{
                    id: user.id
                }
            },
            packagename: packagename,
            packageimage: packageimage,
            packagediscount:packagediscount,
            packagelandingpageimage: packagelandingpageimage,
            packagedescription: packagedescription,
            packagelogo:packagelogo,

        }
    })

    return newpackage
}

const updatePackage = async (parent, { idOfPackageToBeUpdated, data }, { userId }, info) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(user.role !== "admin"){
        throw new Error("not authorized")
    }

    const packageToBeUpdated = await prisma.package.findUnique({
        where: {
            id: idOfPackageToBeUpdated
        }
     })

     if(!packageToBeUpdated) {
         throw new Error("package not found")
     }

     let update = {}
     if(data.packagename){
         update['packagename'] = data.packagename
     }

     if(data.packageimage){
         update['packageimage'] = data.packageimage
     }

     if(data.packagediscount){
         update['packagediscount'] = data.packagediscount
     }

     if(data.packagedescription){
         update['packagedescription'] = data.packagedescription
     }

     if(data.packagelandingpageimage){
         update['packagelandingpageimage'] = data.packagelandingpageimage
     }

     if(data.packagelogo){
         update['packagelogo'] = data.packagelogo
     }

     const updatedPackage = await prisma.package.update({
         where: {
             id: idOfPackageToBeUpdated
         },
         data : update
     })

     return updatedPackage
}

const deletePackage = async (parent, { idOfPackageToBeDeleted }, { userId }, info ) => {

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(user.role !== "admin"){
        throw new Error("not authorized")
    }

    const deletedPackage = await prisma.package.delete({
       where: {
           id:idOfPackageToBeDeleted
       }
    })
    return deletedPackage
}

const createPackagePlan = async (_, args, { userId }, info) => {
    const {
        planname,
        plandescription,
        planprice,
        idOfPackageToSaveTo
     } = args.data

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(user.role !== "admin"){
        throw new Error("not authorized")
    }

    const newPackagePlan = await prisma.package_Plan.create({
        data: {
            planname: planname,
            plandescription: plandescription,
            planprice:planprice,
            package:{
                connect:{
                    id: idOfPackageToSaveTo
                }
            },
            createdby: {
                connect: {
                    id: user.id
                }
            }
        }
    })

    return newPackagePlan
}

const updatePackagePlan = async ( _, { idOfPackagePlanToUpdated, data }, { userId }, info) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(user.role !== "admin"){
        throw new Error("not authorized")
    }

    const packagePlanToBeUpdated = await prisma.package_Plan.findUnique({
        where: {
            id: idOfPackagePlanToUpdated
        }
    })

    if(!packagePlanToBeUpdated){
        throw new Error("package plan not found")
    }
   
    let updates = {}
    if(data.planname){
        updates['planname'] = data.planname
    }

    if(data.plandescription){
        updates['plandescription'] = data.plandescription
    }

    if(data.planprice){
        updates['planprice'] = data.planprice
    }

    const updatedPackagePlan = await prisma.package_Plan.update({
        where: {
            id: idOfPackagePlanToUpdated
        },
        data: updates
    })

    return updatedPackagePlan
}

const deletePackagePlan = async ( _, args, { userId }, info) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(user.role !== "admin"){
        throw new Error("not authorized")
    }

    const deletedPackagePlan = await prisma.package_Plan.delete({
        where: {
            id: args.idOfPackagePlanToDelete
        }
    })

    return deletedPackagePlan
}

export { adminSignup,
     adminSignin,
    createPackageType, 
    deletePackageType, 
    updatePackageType,
    resetUserPassword,
    createPackage,
    deletePackage,
    updatePackage,
    createPackagePlan,
    updatePackagePlan,
    deletePackagePlan
}