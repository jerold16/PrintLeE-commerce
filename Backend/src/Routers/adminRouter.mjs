import { Router, request, response } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { adminCreationvalidation } from "../utils/validationSchema.mjs";
import { adminModel } from "../ModelSchema/adminModel.mjs";
import { comparePassword, hashpassword } from "../utils/hashpassword.mjs";
import { currentTime, findAdminbyId, optGenerator } from "../utils/middleware.mjs";
import { adminAccountCreationChecker, successMailSender } from "../utils/emailsender.mjs";

export const adminRouter=Router()

//Admin mail check
adminRouter.post('/api/adminCheck',(request,response)=>{
    const otp=optGenerator()
    const maildata={
           name:"Jerold",
           otp:otp,
           text:`Dear Jerold\n
           Admin registeration will be continued only if u share this OTP : ${otp} to the person,\n
           If it's not you , don't share the OTP!!!`
    }
    adminAccountCreationChecker(maildata)
    response.send({message:"Message has been sended to the admin wait for the OTP",otp:otp})
})
//Admin Creation
adminRouter.post('/api/admin',checkSchema(adminCreationvalidation),async (request,response)=>{
    const {body:admin}=request
    
    // const admin=matchedData(request)  matched fields from the validator
    const error=validationResult(request) //checking error
    if(!error.isEmpty()){
        return response.send({error:error.array()})  //sending the error as a response
    }
    const newadmin=new adminModel(request.body);   //create a admin database model
    newadmin.password=hashpassword(newadmin.password)
    const maildata={
        name:newadmin.adminUser,
        email:newadmin.adminUser,
        purpose:"Admin registeration",
        subject:"Admin registeration for the PrintLe"
    }
    const maildataadmin={
        name:"Jerold",
        text:`Dear Jerold\n
        Admin login has been created in the name of ${newadmin.adminUser} 
        \n email :${newadmin.email} 
        \n password: ${request.body.password} \n phone : ${newadmin.phone} `
 }
    try{
        const savedadmin = await newadmin.save();  //saving the  value to the database
        successMailSender(maildata)     
        adminAccountCreationChecker(maildataadmin)
        response.status(201).send(savedadmin)
    }
    catch(error){
        console.log(error);
        return response.sendStatus(500)
    }  
})

//admin update
//writen a middleware to check the id is present or not 
adminRouter.put('/api/admin/:id',findAdminbyId,async (request,response)=>{
    const {body,params:{id}}=request
    console.log(body);
    body.password=hashpassword(body.password)
    body.lastUpdate=currentTime()
 
    // const oldadmin=await adminModel.updateOne({_id:id},{...body})
    //updateOne return the condition is passed or not (first parameter the condition, second the value to be updated)
    try{
        const oldadmin =await adminModel.findByIdAndUpdate({_id:id},body,{new:true})
    successMailSender(maildata)
    console.log(oldadmin);
    return response.send(oldadmin)
    }
    catch(error){
        console.log(error);
        return response.sendStatus(500)
        
    }
    //updatebyIdandUpdate return the value which is stored in the database
    //(first parameter be the ID , second the body to be updated,third parameter we given true inorder to get the new value to be return are else we will get the previous value in the return)
   
})


//Forget password by email and password
//http://localhost:3020/api/adminPassword
adminRouter.put('/api/adminPassword',async (request,response)=>{
    const {body}=request
    if(!body.email||!body.password){
        response.sendStatus(400)
    }
    const hashedPassword=hashpassword(body.password)
    const admin = await adminModel.findOneAndUpdate({email:body.email},{password:hashedPassword})
    if(admin){
        const maildata={
            name:admin.adminUser,
            email:admin.email,
            purpose:"Admin Password updated",
            subject:"Admin Password reset for the PrintLe"
        }
        successMailSender(maildata)
        response.send(admin)}
        else
         return response.sendStatus(404)
   
})


//get the admin by the email or number and password
//http://localhost:3020/api/admin?emailNum=9791582480&password=jerold12
adminRouter.get('/api/admin',async(request,response)=>{
    const {query:{emailNum,password}}=request
    const parsenum=parseInt(emailNum)
    console.log(parsenum);
    try{
        const finduser=(isNaN(parsenum)) ? await adminModel.findOne({email:emailNum}): await adminModel.findOne({phone:emailNum})
        // console.log(comparePassword(password,finduser.password));
        return (finduser) ? (
            //i have to give conditions for the admin not found and the incorrect password both also
             comparePassword(password,finduser.password) ? response.send(finduser) : response.status(400).send("Password missMatch")
        ): response.status(404).send("Admin not found")
    }
    catch(error){
        console.log("Error in the Admin login method",error);
        response.sendStatus(400)
    }
})



//Forgot password login by email only 
adminRouter.get('/api/adminLogInEmail',async(request,response)=>{
    const {query:{email}}=request
    if(!email)
     return response.sendStatus(400)
    const finduser=await adminModel.findOne({email:email})
    return (finduser) ? response.send(finduser) : response.sendStatus(404)
})

//Delete the admin
adminRouter.delete('/api/admin/:id',async(request,response)=>{
    const {params:{id}}=request
    if(!id)
     return response.sendStatus(400)
    const deleted=await adminModel.findByIdAndDelete(id);
    return (!deleted) ?
       response.status(404).send({message:"Admin not found in the database"})
    : response.status(200).send({message:"Deleted successfuly"}) 
    
})