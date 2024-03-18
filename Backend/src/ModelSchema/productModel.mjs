import mongoose from "mongoose"
const productImage=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        
    },
    imageUrl:{
        type:String,
        required:true
    }
})
const productSchema=new mongoose.Schema({
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'admin'
    },
    productName:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    quantity:{
        type:mongoose.Schema.Types.Number
    },
    price:{
        type:mongoose.Schema.Types.Number,
        require:true
    },
    description:{
        type:mongoose.Schema.Types.String
    },
    category:{
        type:mongoose.Schema.Types.String
    },
    vatriety:{
        type:mongoose.Schema.Types.String
    },
    brand:{
        type:mongoose.Schema.Types.String
    },
    modelName:{
        type:mongoose.Schema.Types.String
    },
    mainImage:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    imageUrl:[
       
    ]
})

const categorySchema=new mongoose.Schema({
    category:{
        type:mongoose.Schema.Types.String
    },
    image:{
        type:mongoose.Schema.Types.String
    }
})
const brandSchema=new mongoose.Schema({
    brand:{
        type:mongoose.Schema.Types.String
    },
    image:{
        type:mongoose.Schema.Types.String
    }
})

export const categoryModel=mongoose.model('categories',categorySchema)
export const brandModel=mongoose.model('brands',brandSchema)
export const imageUrlModel=mongoose.model('imageUrl',productImage)
export const productModel=mongoose.model('product',productSchema)