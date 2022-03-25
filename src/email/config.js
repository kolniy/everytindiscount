import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: process.env.MAILHOST,
    port: process.env.MAILPORT,
    secure:true,
    auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASSWORD
    }
})

// transporter.verify(function (error, success) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Server is ready to take our messages");
//     }
// });

export default transporter