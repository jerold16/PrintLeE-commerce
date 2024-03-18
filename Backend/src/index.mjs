import express from 'express'
import cors from 'cors'
import { indexRouter } from './Routers/indexRouter.mjs'
import mongoose from 'mongoose'
import { logreading, optGenerator } from './utils/middleware.mjs'
const app =express()
app.use(express.json())
app.use(cors())
const PORT=process.env.PORT ||3020

mongoose.connect('mongodb://127.0.0.1:27017/PrintLe')
.then((res)=>console.log(`Connected the mongodb `))
.catch((err)=>console.log(`Error acquired : ${err}`))
//Making the static folder
app.use(express.static('static'))


app.use(logreading)
app.use(indexRouter)

app.listen(PORT,()=>{
    console.log(`Running on the server ${PORT}`);
})