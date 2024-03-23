import { Router, request, response } from "express";
import { wishListModal } from "../ModelSchema/orderModel.mjs";
import { userModel } from "../ModelSchema/userModel.mjs";

export const wishlistRouter = Router()



wishlistRouter.post('/api/addWishlist', async (request, response) => {
    const { body } = request;
    console.log(body);
    try {
        const findUser = await userModel.findById(body.userId);
        if (findUser.wishlist.includes(body.productId)) {
            const index = findUser.wishlist.indexOf(body.productId);
            findUser.wishlist.splice(index, 1); // Remove the product from wishlist
            await findUser.save(); // Wait for the save operation to complete
            return response.send({ message: "Removed from the wishlist" });
        } else {
            findUser.wishlist.push(body.productId); // Add the product to wishlist
            await findUser.save(); // Wait for the save operation to complete
            return response.send({ message: "Added to the wishlist" });
        }
    } catch (error) {
        return response.send({ error: error });
    }
});


//Get the wishlisted products
//http://localhost:3020/api/wishList/65fd1ac1750a8ee42e07994a 
wishlistRouter.get('/api/wishList/:uid',async(request,response)=>{
    const {params:{uid}}=request
    try{
        const findUser=await userModel.findById(uid).populate('wishlist')
        if(findUser)
          return response.send(findUser.wishlist)
        return response.status(404).status({message:"User not found"})
    }
    catch(error){
        return response.status(400).send({error:error})
    }
})

//Add to the Cart List
wishlistRouter.post(`/api/cartList`,async(request,response)=>{
})
