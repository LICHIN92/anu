// import USER from "../models/userModel.js";
// import bcrypt from 'bcrypt';
// import generateToken from "../utilt/generateToken.js";

// const doSignup = async (req, res) => {
//     console.log('dosignup');
//     console.log(req.body);
//     const { firstname, lastname, email, mobile, password } = req.body;
//     try {
//         const saltRound = 10;
//         const hash = await bcrypt.hash(password, saltRound);
//         const newUser = new USER({
//             firstname: firstname,
//             lastname: lastname,
//             email: email,
//             mobile: mobile,
//             password: hash
//         });
//         await newUser.save();
//         console.log('successfully signed up');
//         res.send(req.body);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error);
//     }
// };


// const doLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body
//         const user = await USER.find({ email: email })
//         if (user) {
//             const passwordmatch = await bcrypt.compare(password, user.password)
//             if (passwordmatch) {
//                 const token = generateToken(email)

//             } else {
//                 res.send("password id wrong")
//                 return
//             }
//         } else {
//             res.send('not exist')
//         }
//     }
//     catch (error) {
//         console.log(error);
//     }
// }
// export default { doSignup, doLogin }


import bcrypt from "bcrypt";
import User from "../models/userModel.js";

import {generateToken} from "../utilt/generateToken.js";

 export const signup = async (req, res) => {
    console.log(req.body);

  try {
    const { email, password, firstName, lastName } = req.body;
    console.log(email);
    const userExist = await User.findOne({ email });
    console.log(userExist);
    if (userExist) {
      return res.send("User is already exist");
    }
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      firstName,
      lastName,
      hashPassword,
    });
    const newUserCreated = await newUser.save();

    if (!newUserCreated) {
      return res.send("user is not created");
    }

    const token = generateToken(email);
    res.cookie("token", token);
    res.send("Signed successfully!");
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).send("Internal Server Error");
  }
};

// signin

 export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send("User not found");
    }

    const matchPassword = await bcrypt.compare(password, user.hashPassword);

    if (!matchPassword) {
      return res.send("Password is not correct");
    }

    const token = generateToken(email);
    res.cookie("token", token);
    res.send("Logged in!");
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).send("Internal Server Error");
  }
};


