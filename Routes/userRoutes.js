import express from "express";
import {signin, signup} from '../Controller/userController.js'
const userRouter = express.Router();

userRouter.post("/signup",signup);
userRouter.post("/signin", signin);

export default userRouter;