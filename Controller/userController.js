const USER = require("../models/userModel");
const bcrypt = require('bcrypt');
const generateToken = require("../utilt/generateToken");

// const doSignup = async (req, res) => {
//     console.log('dosignup');
//     console.log(req.body);
//     const { firstname, lastname, email, mobile, password } = req.body
//     try {
//         const saltRound = 10
//         bcrypt.hash(saltRound, password, async (err, hash) => {
//             if (hash) {
//                 await USER({ firstname: firstname, lastname: lastname, email: email, mobile: mobile, password: hash })
//                     .save().then(resp => {
//                         res.send(req.body)
//                         console.log('succesfully signed')
//                         .catch(er=>{
//                             console.log();
//                         })
//                     }).catch(err => {
//                         console.log(err);
//                     })
//             }
//         })

//     } catch (error) {
//         console.log(error);
//     }

// }

const doSignup = async (req, res) => {
    console.log('dosignup');
    console.log(req.body);
    const { firstname, lastname, email, mobile, password } = req.body;
    try {
        const saltRound = 10;
        const hash = await bcrypt.hash(password, saltRound);
        const newUser = new USER({
            firstname: firstname,
            lastname: lastname,
            email: email,
            mobile: mobile,
            password: hash
        });
        await newUser.save();
        console.log('successfully signed up');
        res.send(req.body);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};


const doLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await USER.find({ email: email })
        if (user) {
            const passwordmatch = await bcrypt.compare(password, user.password)
            if (passwordmatch) {
                const token = generateToken(email)

            } else {
                res.send("password id wrong")
                return
            }
        } else {
            res.send('not exist')
        }
    }
    catch (error) {
        console.log(error);
    }
}
module.exports = { doSignup, doLogin }