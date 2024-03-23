import nodemailer from 'nodemailer'
import { currentTime } from './middleware.mjs';
import { response } from 'express';
//configuration for the from address
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // or 465 if using SSL
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'pizzashopfranz@gmail.com',
      pass: 'iqye ikmu youm oeyv'
    }
  });
const fromAddress='pizzashopfranz@gmail.com'


//To the otp to the email
export const otpSender=async(data,otp)=>{
    const mailOptions={
        from:fromAddress,
        to:data.email,
        subject:data.subject,
        text:data.text
     }
    try{
        await transporter.sendMail(mailOptions).then(()=>{
            return true;
        })
    }
    catch(error){
        console.log("Error in the Otp mail sender"+error);
        return false
    }
    
}

//to the success message to the user
export const successMailSender = async (data)=>{
    const mailOptions={
        from:fromAddress,
        to:data.email,
        subject:`${data.subject}`,
        text:`Dear ${data.name}\n
        Your ${data.purpose} for the PrintLe has been Successfully completed.`
    }
    try{
        await transporter.sendMail(mailOptions);
        console.log("Success");
    }
    catch(error){
        console.log(error);
    }
}
//admin registeration verification
export const adminAccountCreationChecker=async(data)=>{
    const mailOptions={
        from:fromAddress,
        to:"jeroldraja12@gmail.com",
        subject:`Admin Registeration autherization at ${currentTime()}`,
        text:data.text
    }
    try{
        await transporter.sendMail(mailOptions)
        console.log("Success");
    }
    catch(error){
        console.log("error"+error);
    }
}
//admin registeration details



