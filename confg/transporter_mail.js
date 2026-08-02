const nodeMailer=require("nodemailer");
const email_user_name = process.env.VERIFYNG_USER_NAME;
const email_password = process.env.VERIFYING_PASSWORD;

const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: email_user_name,
        pass:email_password,
        },
    });
module.exports=transporter;