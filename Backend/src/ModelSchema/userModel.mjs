import mongoose from "mongoose";
const addressSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    line1:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    line2:{
        type:mongoose.Schema.Types.String,
    },
    state:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    district:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    pincode:{
        type:mongoose.Schema.Types.Number,
        required:true
    },
    defaultStatus:{
        type:Boolean,
        default:false
    }
})
const userSchema=new mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    email:{
        type:mongoose.Schema.Types.String,
        required:true,
        unique:true
    },
    phone:{
        type:mongoose.Schema.Types.Number,
        required:true,
        unique:true
    },
    password:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    createdAt:{
        type:mongoose.Schema.Types.String,
    },
    lastupdate:{
        type:mongoose.Schema.Types.String,
    },
    address:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Address',
            cascade: true
        }
    ]
})

export const userModel=mongoose.model('User',userSchema)
export const addressModel=mongoose.model('Address',addressSchema)