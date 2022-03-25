import transporter from "./config";

const passwordResetEmail = async (to) => {
    const html = `<div style="width:100%;
    height:100%;
     background-color:'#c4c4c4';">
       <div style="width:80%;
       margin: 0 auto;
       height:100%; margin-top:20px">
           <p>
              welcome to
              Your registration was successful.
           </p>
       </div>
   </div>`

   await transporter.sendMail({
    from: 'customerservice@everytindiscount.com',
    to: to,
    subject: `Password Reset`,
    html:html
  })
}