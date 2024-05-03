const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret_key = process.env.SECRET_KEY;

const generateToken = (email) => {
//   return jwt.sign({ data: email, succes: true }, secret_key, {
//     expiresIn: "1d",
//   });
return jsonWebToken({data:email},secret_key,{expiresIn:"1d"})
};
module.exports=generateToken
1