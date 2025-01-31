import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import userModel from '../models/User.js'

const triggerEmail = async (userEmail, uId) => {
    try
    {
        // =================send verification email==========
        // create transporeter from nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, // or 'STARTTLS'
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        // create token
        const token = jwt.sign({uId : uId}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: "Email Verification",
            html: `<p></p>Please click on the link to verify your email: <a href='${verificationLink}'>verify email</a></p>`
        }

        await transporter.sendMail(mailOptions)

        // =================send verification email==========
    }
    catch(error)
    {
        console.log("Error sending email : ", error.message)
    }
}

export default triggerEmail