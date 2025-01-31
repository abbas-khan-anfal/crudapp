import express from 'express'
import { findAndSendEmailVerification, getUser, login, logout, signup, verifyEmail } from '../controllers/User.js'
import isAuthenticated from '../middlewares/Auth.js'


const router = express.Router()

// route for signup user
router.post('/signup', signup)

// route for login user
router.post('/login', login)

// route for get user
router.get('/getuser', isAuthenticated, getUser)

// route to logout user
router.get('/logout', logout)

// route for forgot user password
router.post('/forgotpassword', findAndSendEmailVerification)

// route verify email
router.get('/verifyemail', verifyEmail)

export default router