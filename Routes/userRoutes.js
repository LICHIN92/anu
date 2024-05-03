const express=require('express')
const { doSignup, doLogin } = require('../Controller/userController')
const userRouter=express.Router()

userRouter.post('/',doSignup)
userRouter.post('/',doLogin)

module.exports=userRouter