const nodemailer=require('nodemailer');
const { auth } = require('../secret');

module.exports.sendmail=async function sendmail(str,data){
    // console.log(data);
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth:{
            user:auth.user,
            pass:auth.pass
        }
    });
    var sub,htmlele;
    if(str=="Signup"){
        sub="Verify Password";
        htmlele=`<h3> Verify your password by clicking below <br> ${data.link} </h3>`
    }
    else{
        sub="Reset Password";
        htmlele=`<h3> Click on the link below to verify your password<br>${data.link}</h3>`
    }
    // console.log(sub,htmlele);
    try{
        const info = await transporter.sendMail({
            from: auth.user, // sender address
            to: data.email, // list of receivers
            subject: sub, // Subject line
            html:htmlele // html body
        });
        console.log("Message sent: %s", info.messageId);
    }
    catch(err){
        console.log(err.message);
        // return err;
    }
}