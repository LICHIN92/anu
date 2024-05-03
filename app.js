const express = require('express')
const app = express()
const port = 3001
const connectDB=require('./Config/db.js');
const userRouter = require('./Routes/userRoutes.js');
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/user',userRouter)
connectDB()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})