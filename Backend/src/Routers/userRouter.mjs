import { Router, request, response } from "express";
import { addressModel, userModel } from "../ModelSchema/userModel.mjs";
import { comparePassword, hashpassword } from "../utils/hashpassword.mjs";
import { successMailSender } from "../utils/emailsender.mjs";
import { currentTime } from "../utils/middleware.mjs";
import { adminModel } from "../ModelSchema/adminModel.mjs";

export const userRouter=Router()

//user creation
//http://localhost:3020/api/user
userRouter.post('/api/user',async (request,response)=>{
    const {body}=request
    console.log(body);
    const newuser=new userModel(body)
    newuser.createdAt=currentTime()
    newuser.lastupdate=currentTime()
    newuser.password=hashpassword(body.password)
    const maildata={
        name:newuser.username,
        email:newuser.email,
        subject:"User Registeration",
        purpose:"user registeration"
    }
    await newuser.save().then(()=>{
        successMailSender(maildata)
        response.send(newuser)
    }).catch((error)=>{
        if (error.code === 11000 && error.name === 'MongoServerError') {
            // Extract the field causing the duplicate key error
            const field = Object.keys(error.keyPattern)[0];
            if (field === 'email') {
                console.log('Duplicate email error:', error);
                return response.status(400).send({message:"Email is already registered"})
                // Handle the duplicate email error appropriately
            }
            if(field=='phone'){
                console.log('Duplicate email error:', error);
                return response.status(400).send({message:"Phone number is already registered"})
            }
        } else {
            // Handle other types of errors
            console.log('Other error:', error);
            return response.sendStatus(500)
        }
    })
})
//Get all the user 
userRouter.get('/api/alluser',async (request,response)=>{
    const alluser =await userModel.find().populate('address')
    console.log(alluser);
    response.send(alluser)
})
// Get user by email and password (Login)
// path for this is http://localhost:3020/api/user?emailNum=9791582480&password=maddy12


userRouter.get('/api/user',async (request,response)=>{
    console.log("ENtered get method");
    const {query:{ emailNum,password}}=request
    if(emailNum&&password){
        console.log("Entered in the condition");
        const parseNum=parseInt(emailNum)     
        try{
            const finduser=(isNaN(parseNum))? await userModel.findOne({email:emailNum}) : await userModel.findOne({phone:emailNum})
            console.log(finduser);
            if(!finduser)
            return response.status(404).send({message:"Email or number not registered"})

            if(finduser && comparePassword(password,finduser.password)){
            return response.send(finduser)}
            else
            return response.status(400).send({message:"Password mismatch"})
        }
        catch(error){
            response.sendStatus(500)
        }    
     }
    else 
    return response.sendStatus(400)
})
//Get user by user id
userRouter.get('/api/userId/:id',async(request,response)=>{
    const {params:{id}}=request;
    if(!id)
     return response.sendStatus(400)
    try{
        const finduser= await userModel.findById(id)
        finduser.populate('address')
        console.log(finduser);
       return (finduser)?  response.send(finduser): response.sendStatus(404)
    }
    catch(error){
        console.log(error);
        return response.sendStatus(500)
    }
})

//Find the user and admin by the email
// http://localhost:3020/api/userEmail?email=jeroldraja12@gmail.com&type=user
userRouter.get('/api/userEmail',async(request,response)=>{
    const {query:{email,type}}=request
    if(!email||!type)
      return response.status(400).send({message:'Email or type not mentioned'})
    
    const finduser = (type=='user')?await userModel.findOne({email:email}).populate('address') :await adminModel.findOne({email:email});
    if(finduser)
      return response.status(201).send(finduser)
    else 
    return response.sendStatus(404)
})


//Delete the user using the id
//http://localhost:3020/api/user/65eeb044603c8c18e28e5748
userRouter.delete('/api/user/:id',async (request,response)=>{
    const {params:{id}}=request
    console.log(id);
    if(!id)
       return response.sendStatus(400)
    const deleted= await userModel.findByIdAndDelete(id)
    const addressdelete=await addressModel.findOneAndDelete({userId:id})
    return deleted&&addressdelete ? 
    response.status(201).send({message: "Object deleted successfully"})
     : response.status(404).send({message: "Id not found"})
})



//Add the Address to the User,userPresence
//http://localhost:3020/api/userAddress/
userRouter.post('/api/userAddress/',async(request,response)=>{
    const {body}=request
    console.log(body);
        try{
            const newaddress = new addressModel(body)
            const id= newaddress.userId
            newaddress.save()
            const getuser=await userModel.findById(id)
            if(getuser){
            getuser.address.push(newaddress)
            getuser.lastupdate=currentTime()
            getuser.save()
            return response.send(getuser)   
          }
            else
            return response.status(404).send("user not found")   
        }
        catch(error){
            console.log(error);
            return response.sendStatus(500)
        }    
})

//updateaddress
//http://localhost:3020/api/userAddress/65eed30c189a929deea03e80
userRouter.put('/api/userAddress/:id',async(request,response)=>{
    const {body,params:{id}}=request
    if(!id)
      return response.sendStatus(400)
    console.log("Hellow");
    const updatedAddress= await addressModel.findByIdAndUpdate(id,body,{new:true})
    if(updatedAddress)
      return response.send(updatedAddress)
    return response.sendStatus(404)


})

//Get the address of the User id
userRouter.get('/api/userAddress/:id',async(request,response)=>{
    const {params:{id}}=request
    console.log(id);
    if(!id)
      return response.sendStatus(400)
    const userAddress=await userModel.findById(id).populate('address')
    console.log(userAddress);
    return userAddress ? 
    response.send(userAddress.address) 
    : response.status(404).send("User id not found")
 
})

//UserUpdate
//http://localhost:3020/api/user we can update the password also
userRouter.put('/api/user',async(request,response)=>{
    const {body}=request
    if(!body)
      return response.sendStatus(400)
    if(body.password)
       body.password=hashpassword(body.password)
    const userUpdate= await userModel.findByIdAndUpdate(body.id,body,{new:true}).populate('address')
    if(userUpdate)
     return response.send(userUpdate)
    return response.sendStatus(404)
})

//make a address default 
//http://localhost:3020/api/defaultAddress?Uid=65eed2f7189a929deea03e7e&Aid=65eed30c189a929deea03e80
userRouter.put('/api/defaultAddress',async(request,response)=>{
   const {query:{Uid,Aid}}=request
   if(!Uid||!Aid)
     return response.sendStatus(400)
   const findUser=await userModel.findById(Uid).populate('address')
   if(findUser){
      findUser.address.forEach(async(address)=>{
        if(address.id==Aid){
           const updatedAddress=await addressModel.findByIdAndUpdate(Aid,{defaultStatus:true}) 
        }
      })
      findUser.save()
      return response.send(findUser)
   }
   return response.sendStatus(404)  
})

//Get a default Address
userRouter.get('/api/defaultAddress',async(request,response)=>{
    const {query:{Uid}}=request
    if(!Uid)
      return response.sendStatus(400)
    const finduser=await userModel.findById(Uid).populate('address')
    if(finduser){
    //    const defaultAddress= finduser.address.filter((value)=>value.defaultStatus===true)
    //    console.log( finduser.address.filter((value)=>value.defaultStatus===true));
       console.log(finduser.address);
       return response.send(finduser.address.find((address)=>address.defaultStatus===true))
    }
    return response.sendStatus(404) 
})