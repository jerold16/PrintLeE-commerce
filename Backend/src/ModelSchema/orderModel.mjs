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

const wishListSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
})

wishListSchema.index({ userId: 1, productId: 1 }, { unique: true });



export const wishListModal=mongoose.model('Wishlist',wishListSchema)
export const orderModel=mongoose.model('Order',orderSchema)