import { request, response } from "express";
import { adminModel } from "../ModelSchema/adminModel.mjs";
import { userModel } from "../ModelSchema/userModel.mjs";
import multer from "multer"
import path from "path";
import { log } from "console";
import { body } from "express-validator";
export const logreading=(request,response,next)=>{
    console.log(`${request.method} :: ${request.protocol}://${request.get('host')}${request.url} `);
    next()

}
export const userPresence=async(request,response,next)=>{
    const {params:{id}}=request;
    if(!id)
     return response.sendStatus(400)
    try{
        const finduser= await userModel.findById(id)
       if(finduser){
        next()
       }
       else{
        return response.status(404).send("Finished in the middleware itself")
       }
    }
    catch(error){
        console.log(error);
        return response.sendStatus(500)
    }
}
export const LoginCrediential=(request,response,next)=>{
    const {query:{emailNum,password}}=request
    if(!emailNum&&!password)
       return response.status(400).send("Email and password is missing")
    if(!emailNum||!password)
       return response.status(400).send("Email or password is missing")
    next()
}
export const findAdminbyId=async (request,response,next)=>{
    const {params:{id}}=request;
    try{
        const findadmin=await adminModel.findById(id)
        if(findadmin)
          {
            request.findadmin=findadmin
            next()
          }
        else
          response.sendStatus(404)

    }
    catch(error){
        console.log("Error in the admin find by id middleware");
        return response.sendStatus(500)
    }
}


//Get a current time
export const currentTime=()=>{
    const date=new Date();
    return date.toLocaleString()
}

//getnerate a otp 
export const optGenerator=()=>{
    const otp=Math.floor(Math.random()*89999)+10000
    return otp
}

//Image storage
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'static/images')
    },
    //Editing the file name of the image
    filename:(req,file,cb)=>{
        cb(null,path.basename(file.originalname.replace(/ /g,""),path.extname(file.originalname))+"_"+Date.now()+path.extname(file.originalname))
    },
  //path.basename(file.orginalname,path.extname(file.originalname)) == the name of the file we uploaded
  //path.extname(file.originalname) ==> to get the extension
})
//Product upload


export const upload=multer({
    storage:storage,
    limits:{
        fileSize:1*1024*1024
    }
})
export const multiupload=upload.fields([{name:'mainImage'},{name:'pictures'}])

//For the Product uploading
export const imagePathArray=(request,response,next)=>{
    console.log("Hellow");
    console.log(request.body);
    console.log(request.files);
    if(request.files.mainImage[0]!=undefined){
        const mainImage=request.files.mainImage[0]
        const mainImagepath=`${request.protocol}://${request.get('host')}/images/${mainImage.filename}`
        request.mainImage=mainImagepath
    }
   if(request.files.pictures!=undefined){
    const allFiles=request.files.pictures
    const imgpath= allFiles.map((file)=>{
    return `${request.protocol}://${request.get('host')}/images/${file.filename}`} )
    request.filepaths=imgpath
   }
    next()
}

export const pathSingleImage =(request,response,next)=>{
    const image = request.file
    request.imagepath= `${request.protocol}://${request.get('host')}/images/${image.filename}`
    next()
}