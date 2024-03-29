import { Router, request, response } from "express";
import {
    imagePathArray,
    multiupload,
    pathSingleImage,
    upload,
} from "../utils/middleware.mjs";
import {
    brandModel,
    categoryModel,
    productModel,
} from "../ModelSchema/productModel.mjs";
import multer from "multer";
import {
    deleteImageFromFileSystem,
    deletemiddleware,
    deletemiddlewareQuery,
} from "../utils/imagedeletingMiddle.mjs";

export const productRouter = Router();

//Adding the product with the admin id
//http://localhost:3020/api/product
productRouter.post(
    "/api/product",
    multiupload,
    imagePathArray,
    async (request, response) => {
        const { body } = request;
        console.log(body);
        const product = {
            ...body,
            imageUrl: request.filepaths,
            mainImage: request.mainImage,
        };
        const newproduct = new productModel(product);
        try {
            await newproduct.save();
            console.log("Successfully saved");
            response.send(newproduct);
        } catch (error) {
            console.log(error);
            response.sendStatus(400);
        }
    }
);

//get a product
//http://localhost:3020/api/productCategory?category=Mobilecase
productRouter.get("/api/productCategory", async (request, response) => {
    const {
        query: { category },
    } = request;
    if (!category)
        return response.status(400).send({ message: "Category is not given" });
    try {
        const categoryValue = await productModel.find({ category: category });
        if (categoryValue.length > 0) return response.send(categoryValue);
        else
            return response
                .status(404)
                .send({ message: "No data under this category" });
    } catch (error) {
        response.send({ error: error });
    }
});
//Get all the products
//http://localhost:3020/api/product
productRouter.get("/api/product", async (request, response) => {
    try {
        const allProduct = await productModel.find();
        return response.send(allProduct);
    } catch (error) {
        return response.sendStatus(400);
    }
});

//Get the product by the id
//http://localhost:3020/api/productId?id=cjnadvbqoie
productRouter.get("/api/productID", async (request, response) => {
    const {
        query: { id },
    } = request;
    if (!id) return response.status(400).send({ message: "Id not mentioned" });
    try {
        const findProduct = await productModel.findById(id);
        if (findProduct) return response.send(findProduct);
        return response.status(404).send({ message: "Product not found" });
    } catch (error) {
        console.log(error);
        return response.sendStatus(400);
    }
});

//Filter by the search
//http://localhost:3020/api/productSearch?search=36
productRouter.get("/api/productSearch", async (request, response) => {
    const {
        query: { search },
    } = request;
    try {
        const foundProduct = await productModel.find({
            $or: [
                { category: { $regex: search, $options: "i" } },
                { vatriety: { $regex: search, $options: "i" } },
                { brand: { $regex: search, $options: "i" } },
                { modelName: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { productName: { $regex: search, $options: "i" } },
            ],
        });
        if (foundProduct.length > 0) return response.send(foundProduct);
        return response.status(404).send({ message: "Products doesn't match" });
    } catch (error) {
        console.log(error);
        return response.sendStatus(400);
    }
});

//updateing the MainImage
productRouter.put(
    "/api/mainImage/:pid",
    upload.single("mainImage"),
    pathSingleImage,
    deletemiddleware,
    async (request, response) => {
        const {
            imagepath,
            params: { pid },
            body,
        } = request;
        console.log(body.url);
        try {
            //updateing the image
            const findProduct = await productModel.findByIdAndUpdate(
                pid,
                { mainImage: imagepath },
                { new: true }
            );
            if (findProduct) return response.send(findProduct);
            return response.status(404).send({ message: "Admin not found" });
        } catch (error) {
            return response.status(400).send(error);
        }
    }
);
//chaging the subImage

//update object without images
productRouter.put("/api/product/:id", async (request, response) => {
    const {
        body,
        params: { id },
    } = request;
    try {
        const updatedvalue = await productModel.findByIdAndUpdate(id, body, {
            new: true,
        });
        console.log("Updated saved");
        console.log(updatedvalue);
        response.send(updatedvalue);
    } catch (error) {
        console.log(error);
        response.sendStatus(400);
    }
});

//delete a product
productRouter.delete(`/api/product/:id`, async (request, response) => {
    const {
        params: { id },
    } = request;
    try {
        const deleted = await productModel.findByIdAndDelete(id);
        if (deleted) return response.send({ message: "Deleted" });
        return response.status(404).send({ message: "Id not found" });
    } catch (error) {
        return response.sendStatus(400);
    }
});
//Add the Main image
productRouter.put(
    "/api/addSubImage/:pid",
    upload.single("mainImage"),
    pathSingleImage,
    async (request, response) => {
        const {
            imagepath,
            params: { pid },
        } = request;
        try {
            const findProduct = await productModel.findById(pid);
            if (!findProduct)
                return response.status(404).send({ message: "Product not found" });
            const imgeurl = findProduct.imageUrl.concat(imagepath);
            const updated = await productModel.findByIdAndUpdate(
                pid,
                { imageUrl: imgeurl },
                { new: true }
            );
            return response.send(updated);
        } catch (error) {
            return response.status(400).send({ message: error });
        }
    }
);

//Change a sub  image in the product
//http://localhost:3020/api/productImage/65f2f2c60da2e6f1ea69f1e0
productRouter.put(
    "/api/productImage/:pid",
    upload.single("mainImage"),
    pathSingleImage,
    deletemiddleware,
    async (request, response) => {
        const {
            body,
            params: { pid },
            imagepath,
        } = request;
        const img = body.url;
        try {
            const findProduct = await productModel.findById(pid);
            if (!findProduct) {
                return response.status(404).json({ message: "Product not found" });
            }
            const length = findProduct.imageUrl.length;
            // Filter out the specified image URL from the imageUrl array
            const newImageUrl = findProduct.imageUrl
                .filter((value) => value !== img)
                .concat(imagepath);
            console.log(newImageUrl);
            findProduct.imageUrl = newImageUrl;
            // Save the updated product
            const savedProduct = await findProduct.save();
            return response.json(savedProduct);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: "Internal server error" });
        }
    }
);

//Delete the Sub image
//http://localhost:3020/api/productImage/65f2f2c60da2e6f1ea69f1e0?url=http://
productRouter.delete(
    "/api/DeleteSub/:pid",
    deletemiddlewareQuery,
    async (request, response) => {
        const {
            query: { url },
            params: { pid },
        } = request;
        const img = url;
        try {
            const findProduct = await productModel.findById(pid);
            if (!findProduct) {
                return response.status(404).json({ message: "Product not found" });
            }
            const length = findProduct.imageUrl.length;
            // Filter out the specified image URL from the imageUrl array
            const newImageUrl = findProduct.imageUrl.filter((value) => value !== img);
            console.log(newImageUrl);
            findProduct.imageUrl = newImageUrl;
            // Save the updated product
            const savedProduct = await findProduct.save();
            return response.json(savedProduct);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: "Internal server error" });
        }
    }
);

//Changing the main image in the Product
// productRouter.post('/api/productimg/',upload.single('mainImage'),pathSingleImage,(request,response)=>{
//     const {params:{pid},imagepath}=request
//     console.log(imagepath);
//     return response.send(imagepath)
// })

//Adding the Category
//end point /api/category
productRouter.post(
    "/api/category",
    upload.single("image"),
    pathSingleImage,
    async (request, response) => {
        const { body } = request;
        body.image = request.imagepath;
        if (!body) return response.status(400).send({ message: "Body is empty" });
        const newCategory = new categoryModel(body);
        try {
            const savedCategory = await newCategory.save();
            return response.send(savedCategory);
        } catch (error) {
            return response.status(400).send({ message: "Error in the Save method" });
        }
    }
);
//update the category

productRouter.put(
    "/api/category",
    upload.single("image"),
    pathSingleImage,
    async (request, response) => {
        const { body } = request;
        body.image = request.imagepath;
        if (!body) return response.status(400).send({ message: "Body is empty" });
        try {
            const savedCategory = await categoryModel.findByIdAndUpdate(
                body.id,
                { image: body.image, category: body.category },
                { new: true }
            );
            return response.send(savedCategory);
        } catch (error) {
            return response.status(400).send({ message: "Error in the Save method" });
        }
    }
);

//get all the category
productRouter.get("/api/category", async (request, response) => {
    const getCategory = await categoryModel.find({});
    if (getCategory) return response.send(getCategory);
    return response.status(404).send({ message: "Emtpy category" });
});

//delete the data
productRouter.delete("/api/category/:id", async (request, response) => {
    const {
        params: { id },
    } = request;
    try {
        const status = await categoryModel.findByIdAndDelete(id);
        if (status)
            return response.status(200).send({ message: "Deleted successfully" });
        return response.status(404).send({ message: "Category not present" });
    } catch (error) {
        return response.sendStatus(400);
    }
});

//Adding the Brand
//http://localhost:3020/api/brand
productRouter.post(
    "/api/brand",
    upload.single("image"),
    pathSingleImage,
    async (request, response) => {
        const { body ,imagepath} = request;
        console.log(body);
        body.image = imagepath;
        if (!body) return response.status(400).send({ message: "Body is empty" });
        const newBrand = new brandModel(body);
        try {
            const savedBrand = await newBrand.save();
            return response.send(savedBrand);
        } catch (error) {
            return response
                .status(400)
                .send({ message: "Error in the Save method of Brand" });
        }
    }
);

//Changing the Photo in the Brand
productRouter.put(
    "/api/brand",upload.single("image"),pathSingleImage,async (request, response) => {
        try {
            const { body } = request;
            body.image = request.imagepath;
            if (!body) return response.status(400).send({ message: "Body is empty" });

            const savedBrand = await brandModel.findByIdAndUpdate(body.id,{ image: body.image},
                { new: true }
            );
            console.log(body.image);
            console.log(savedBrand);
            return response.send(savedBrand);
        } catch (error) {
            return response
                .status(400)
                .send({ message: "Error in the Update method of Brand" });
        }
    }
);
//get all the Brand
productRouter.get("/api/brand", async (request, response) => {
    const allBrand = await brandModel.find({});
    if (allBrand) return response.send(allBrand);
    return response.status(404).send({ message: "No brand is registered" });
});
//get the brand based on the category
productRouter.get('/api/brandCategory/:category',async(request,response)=>{
    const {params:{category}}=request
    try{
        const getBrand=await brandModel.find({category:category})
        if(getBrand)
          return response.status(200).send(getBrand)
        return response.status(404).send({message:"No Brand is under the Category"})
    }
    catch(error){
        return response.status(400).send(error)
    }
})
//delete the Brand by id
//http://localhost:3020/api/brand/65f6e1946c815b6ad0a1fc7b
productRouter.delete("/api/brand/:id", async (request, response) => {
    const {params: { id },} = request;
    const findproduct=await brandModel.findById(id)
    const filename = findproduct.image.slice(
        `${request.protocol}://${request.get("host")}/images/`.length
    );
    deleteImageFromFileSystem(filename)
    const deleted = await brandModel.findByIdAndDelete(id);
    if (deleted) return response.send({ message: "Brand has been deleted" });
    return response.status(404).send({ message: "Brand not found" });
});
