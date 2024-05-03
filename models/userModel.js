const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
    lastname:{
        type:String,
        required:true,
        minLength:1,
        maxLength:20
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true, 
        // maxLength:8,
        // minLength:8
    }
})

const USER=mongoose.model("user",userSchema)

module.exports=USER