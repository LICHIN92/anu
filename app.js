// const express = require('express')
// const app = express()
// const port = 3001
// const connectDB=require('./Config/db.js');
// const userRouter = require('./Routes/userRoutes.js');
// app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.use('/user',userRouter)
// connectDB()

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })


import express from "express";
import connectDB from "./Config/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/userRoutes.js";
import instructorRouter from "./Routes/instructorRoutes.js";
const app = express();

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;
connectDB()
app.use("/api/v1/user", userRouter);
app.use("/api/v1/user", instructorRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);});