import mongoose from "mongoose";

const orderSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    productId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    }],
    amountPaid:{
        type:mongoose.Schema.Types.Number,
        required:true
    },
    couponUsed:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'coupon'
    },
    orderedTime:{
        type:mongoose.Schema.Types.Date,
        default:Date.now()
    }
})


export const orderModel=mongoose.model('Order',orderSchema)