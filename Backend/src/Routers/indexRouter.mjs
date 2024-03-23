import { Router, response } from "express";
import { userRouter } from "./userRouter.mjs";
import { productRouter } from "./productRouter.mjs";
import { adminRouter } from "./adminRouter.mjs";
import { currentTime, optGenerator } from "../utils/middleware.mjs";
import { otpSender } from "../utils/emailsender.mjs";
import { userModel } from "../ModelSchema/userModel.mjs";
import { adminModel } from "../ModelSchema/adminModel.mjs";
import { orderRouter } from "./orderRouter.mjs";
import { wishlistRouter } from "./wishliastRouter.mjs";

export const indexRouter = Router()

indexRouter.post('/api/emailverify', async (request, response) => {
  const { query: { email, type } } = request
  const otp = optGenerator()
  const date = currentTime()
  const finduser = (type == 'user') ? await userModel.findOne({ email: email }) : await adminModel.findOne({ email: email })
  console.log(finduser);
  if (!finduser)
    return response.status(404).send({ message: "User not found" })
  const otpstatus = otpSender({
    name: (type == 'user') ? finduser.username : finduser.adminUser,
    subject: (type == 'user') ? `User login Authentication forgot password of PrintLe at ${currentTime()}` : `Admin login Authentication forgot password of PrintLe at ${currentTime()}`,
    email: finduser.email, purpose: `Otp Verification at  `,
    text:`Dear  ${(type == 'user') ? finduser.username : finduser.adminUser}\n
         Your Login otp is ${otp}`
  },
    
    otp)
  return otpstatus ? response.send(`${otp}`) : response.send("Enter a valid email")
})

indexRouter.use(userRouter)
indexRouter.use(productRouter)
indexRouter.use(adminRouter)
indexRouter.use(orderRouter)
indexRouter.use(wishlistRouter)