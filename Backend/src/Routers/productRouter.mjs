import { Router, request, response } from "express";
import { imagePathArray, multiupload, pathSingleImage, upload } from "../utils/middleware.mjs";
import { brandModel, categoryModel, productModel } from "../ModelSchema/productModel.mjs";
import multer from "multer";

export const productRouter = Router()



//Adding the product with the admin id
//http://localhost:3020/api/product
productRouter.post('/api/product', multiupload, imagePathArray, async (request, response) => {
    const { body } = request;
    const product = { ...body, imageUrl: request.filepaths, mainImage: request.mainImage }
    const newproduct = new productModel(product)
    try {
        await newproduct.save()
        console.log("Successfully saved");
        response.send(newproduct)
    }
    catch (error) {
        console.log(error);
        response.sendStatus(400)
    }
})

//get a product
//http://localhost:3020/api/productCategory?category=Mobilecase
productRouter.get('/api/productCategory', async (request, response) => {
    const { query: { category } } = request
    if (!category)
        return response.status(400).send({ message: "Category is not given" })
    try {
        const categoryValue = await productModel.find({ category: category })
        if (categoryValue.length > 0)
            return response.send(categoryValue)
        else
            return response.status(404).send({ message: "No data under this category" })

    }
    catch (error) {
        response.send({ error: error })
    }
})
//Get all the products
//http://localhost:3020/api/product
productRouter.get('/api/product', async (request, response) => {
    try {
        const allProduct = await productModel.find()
        return response.send(allProduct)
    }
    catch (error) {
        return response.sendStatus(400)
    }
})

//Get the product by the id
//http://localhost:3020/api/productId?id=cjnadvbqoie
productRouter.get('/api/productID', async (request, response) => {
    const { query: { id } } = request
    if (!id)
        return response.status(400).send({ message: "Id not mentioned" })
    try {
        const findProduct = await productModel.findById(id)
        if (findProduct)
            return response.send(findProduct)
        return response.status(404).send({ message: "Product not found" })

    }
    catch (error) {
        console.log(error);
        return response.sendStatus(400)
    }

})

//Filter by the search
//http://localhost:3020/api/productSearch?search=36
productRouter.get('/api/productSearch', async (request, response) => {
    const { query: { search } } = request
   try{
    const foundProduct = await productModel.find({
        $or: [
            {category: { $regex: search, $options: "i" }},
            {vatriety: { $regex: search, $options: "i" }},
            {brand: { $regex: search, $options: "i" }},
            {modelName: { $regex: search, $options: "i" }},
            {description: { $regex: search, $options: "i" }},
            {productName: { $regex: search, $options: "i" }}
        ]
    })
    if(foundProduct.length>0)
      return  response.send(foundProduct)
    return response.status(404).send({message:"Products doesn't match"})

   }
   catch(error){
    console.log(error);
    return response.sendStatus(400)
   }
})



//update object with images
productRouter.put('/api/product', multiupload, imagePathArray, async (request, response) => {
    const { body } = request;  
    const product = { ...body,_id:body.id, imageUrl: request.filepaths, mainImage: request.mainImage }
    try {
       const updatedvalue= await productModel.findByIdAndUpdate(body.ig,product,{new:true})
        console.log("Updated saved");
        console.log(updatedvalue);
        response.send(updatedvalue)
    }
    catch (error) {
        console.log(error);
        response.sendStatus(400)
    }
})


//delete a image in the product
//http://localhost:3020/api/productImage/65f2f2c60da2e6f1ea69f1e0?img=http://localhost:3020/images/formland2_1710420678111.jpeg
productRouter.delete('/api/productImage/:pid', async (request, response) => {
    const { query: { img }, params: { pid } } = request;
    try {
        const findProduct = await productModel.findById(pid);
        if (!findProduct) {
            return response.status(404).json({ message: "Product not found" });
        }
        const length=findProduct.imageUrl.length
        // Filter out the specified image URL from the imageUrl array
        const newImageUrl = findProduct.imageUrl.filter(value => value !== img);
        findProduct.imageUrl = newImageUrl;
        if(length==findProduct.imageUrl.length)
          return response.status(404).send({message:"Image is not there"})
        // Save the updated product
        const savedProduct = await findProduct.save();
        return response.json(savedProduct);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Internal server error" });
    }
});


//Changing the main image in the Product
// productRouter.post('/api/productimg/',upload.single('mainImage'),pathSingleImage,(request,response)=>{
//     const {params:{pid},imagepath}=request
//     console.log(imagepath);
//     return response.send(imagepath)
// })

//Adding the Category
//end point /api/category
productRouter.post('/api/category',upload.single('image'),pathSingleImage,async(request,response)=>{
    const {body}=request
    body.image=request.imagepath
    if(!body)
       return response.status(400).send({message:"Body is empty"})
    const newCategory=new categoryModel(body)
    try{
        const savedCategory = await newCategory.save()
        return response.send(savedCategory)
    }
    catch(error){
        return response.status(400).send({message:"Error in the Save method"})
    }
})
//update the category

productRouter.put('/api/category',upload.single('image'),pathSingleImage,async(request,response)=>{
    const {body}=request
    body.image=request.imagepath
    if(!body)
       return response.status(400).send({message:"Body is empty"})
    try{
        const savedCategory = await categoryModel.findByIdAndUpdate(body.id,{image:body.image,category:body.category},{new:true})
        return response.send(savedCategory)
    }
    catch(error){
        return response.status(400).send({message:"Error in the Save method"})
    }
})

//get all the category
productRouter.get('/api/category',async(request,response)=>{
  const getCategory= await categoryModel.find({})
  if(getCategory.length>0)
    return response.send(getCategory)
  return response.status(404).send({message:"Emtpy category"})
})

//delete the data
productRouter.delete('/api/category/:id',async(request,response)=>{
    const {params:{id}}=request
    try{
        const status=await categoryModel.findByIdAndDelete(id)
        if(status)
        return response.status(200).send({message:"Deleted successfully"})
       return response.status(404).send({message:"Category not present"})
    }
    catch(error){
        return response.sendStatus(400)
    }

})

//Adding the Brand
//http://localhost:3020/api/brand
productRouter.post('/api/brand',upload.single('image'),pathSingleImage,async(request,response)=>{
    const {body}=request
    body.image=request.imagepath
    if(!body)
       return response.status(400).send({message:"Body is empty"})
    const newBrand=new brandModel(body)
    try{
        const savedBrand = await newBrand.save()
        return response.send(savedBrand)
    }
    catch(error){
        return response.status(400).send({message:"Error in the Save method of Brand"})
    }
})

//Changing the Photo in the Brand
productRouter.put('/api/brand',upload.single('image') ,pathSingleImage,async(request,response)=>{
    try{
    const {body}=request
    body.image=request.imagepath
    if(!body)
       return response.status(400).send({message:"Body is empty"})
    
        const savedBrand = await brandModel.findByIdAndUpdate(body.id,{image:body.image,brand:body.brand},{new:true})
        return response.send(savedBrand)
    }
    catch(error){
        return response.status(400).send({message:"Error in the Update method of Brand"})
    }
})
//get all the Brand 
productRouter.get('/api/brand',async(request,response)=>{
    const allBrand =await brandModel.find({})
    if(allBrand.length>0)
      return response.send(allBrand)
    return response.status(404).send({message:"No brand is registered"})
})
//delete the Brand by id
//http://localhost:3020/api/brand/65f6e1946c815b6ad0a1fc7b
productRouter.delete('/api/brand/:id',async(request,response)=>{
    const {params:{id}}=request
    const deleted=await brandModel.findByIdAndDelete(id)
    if(deleted)
     return response.send({message:"Brand has been deleted"})
    return response.status(404).send({message:"Brand not found"})
})