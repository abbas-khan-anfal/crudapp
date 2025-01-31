import userModel from '../models/User.js'
import bcrypt from 'bcrypt'
import sendCookie from '../utils/sendCookie.js'
import nodemailer from 'nodemailer'
import triggerEmail from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken'

// function for signup user
const signup = async (req, res, next) => {
    try
    {
        const { username, email, password } = req.body
        let user = await userModel.findOne({email})

        if(user)
        {
            return res.status(400).json({
                success :false,
                message : "User already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        user = await userModel.create({username, email, password : hashedPassword})

        res.status(200).json({
            success :true,
            message : "Signup successfull"
        })
    }
    catch(error)
    {
        res.status(500).json({
            success :false,
            message : error.message
        })
    }
}

// function for login user
const login = async (req, res, next) => {
    try
    {
        const { email, password } = req.body
        let user = await userModel.findOne({email})

        if(!user)
        {
            return res.status(400).json({
                success :false,
                message : "Incorrect email & password"
            })
        }

        const isMatchPassword = await bcrypt.compare(password, user.password)

        if(!isMatchPassword)
        {
            return res.status(404).json({
                success :false,
                message : "Incorrect password"
            })
        }

        sendCookie(res, user, "Login successfull", 200)
    }
    catch(error)
    {
        res.status(500).json({
            success :false,
            message : error.message
        })
    }
}

// function for get user
const getUser = async (req, res, next) => {
    try
    {
        res.status(200).json({
            success : true,
            user : req.user
        })
    }
    catch(error)
    {
        res.status(500).json({
            success :false,
            message : error.message
        })
    }
}

// function for logout
const logout = async (req, res, next) => {
    try
    {
        res.status(200)
        .cookie('crudToken', "", {
            httpOnly: true,
            expires: new Date(Date.now()),
        })
        .json({
            success : true,
            user : "Logout successfull"
        })
    }
    catch(error)
    {
        res.status(500).json({
            success :false,
            message : error.message
        })
    }
}

// function to find email when forgot password and send email verification
const findAndSendEmailVerification = async (req, res, next) => {
    try
    {
        const { email } = req.body
        const user = await userModel.findOne({email})

        if(!user)
        {
            return res.status(400).json({
                success :false,
                message : "Incorrect email"
            }) 
        }

        // =================send verification email==========
        await triggerEmail(email, user._id)
        // =================send verification email==========

        res.status(200).json({
            success :true,
            message : "Verification email sent"
        })

    }
    catch(error)
    {
        res.status(500).json({
            success :false,
            message : error.message
        })
    }
}

// function verify email and change password
const verifyEmail = async (req, res, next) => {
    try
    {
        const { token } = req.query

        if(!token)
        {
            return res.status(400).json({
                success :false,
                message : "Token not exist"
            }) 
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.uId)

        if(!user)
        {
            return res.status(400).json({
                success :false,
                message : "Invalid or expired token"
            }) 
        }

        res.status(200).json({
            success :true,
            message : "Email verification successfull",
            user
        })
    }
    catch(error)
    {
        res.status(500).json({
            success :false,
            message : error.message
        })
    }
}


// // function verify email and change password
// const verifyEmailAndChangePassword = async (req, res, next) => {
//     try
//     {
//         const { password, uId } = req.body
//         const user = await userModel.findById(uId)

//         if(!user)
//         {
//             return res.status(400).json({
//                 success :false,
//                 message : "Invalid or expred token"
//             }) 
//         }

//         const hashedPassword = await bcrypt.hash(password, 10)
//         user.password = hashedPassword
//         await user.save()

//         res.status(200).json({
//             success :true,
//             message : "Email verification successfull"
//         })

//     }
//     catch(error)
//     {
//         res.status(500).json({
//             success :false,
//             message : error.message
//         })
//     }
// }

export { signup, login, getUser, logout, findAndSendEmailVerification, verifyEmail }