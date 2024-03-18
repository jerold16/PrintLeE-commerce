import mongoose from "mongoose";
import { currentTime } from "../utils/middleware.mjs";

const adminSchema=new mongoose.Schema({
    adminUser:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    email:{
        type:String,
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
    createdDate:{
        type:mongoose.Schema.Types.Date,
        default:Date.now()
    },
    lastUpdate:{
        type:mongoose.Schema.Types.Date,
        default:Date.now()
    }
})


const couponSchema=new mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.String,
        require:true
    },
    discountPercent:{
        type:mongoose.Schema.Types.Number,
        require:true
    },
})
export const adminModel=mongoose.model('admin',adminSchema)
export const couponModel=mongoose.model('coupon',couponSchema)