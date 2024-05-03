const mongoose  = require("mongoose");
require("dotenv").config();

console.log(process.env.DB_URL);
const connectDB= async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('db connected');
    } catch (error) {
        console.log(error);
    }

}
module.exports= connectDB