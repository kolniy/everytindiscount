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
    // await prisma.transaction.updateMany({
    //     data: {
    //         isseen: false
    //     }
    // })
    // console.log('i done finish')
}

handleUpdate()

const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: "mail.okedtv.com",
    port: 465,
    secure:true,
    auth: {
        user: "customerservice@okedtv.com",
        pass: "UgOV!-tO]vQp"
    }
})

const sendMail = async () => {
    await transporter.sendMail({
        from: 'noreply@everytindiscount.com',
        to: 'kolniysoft@gmail.com',
        subject: `Password Reset`,
        // html:html
        text: 'Testing the mail client'
      })
}

sendMail()