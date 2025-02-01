import jwt from 'jsonwebtoken'

// function to send cookie
const sendCookie = (res, user, message, statusCode = 200) => {
    const token = jwt.sign({id : user._id}, process.env.JWT_SECRET)

    res.status(statusCode)
    .cookie('crudToken', token, {
        httpOnly: true,
        secure: true, // Required for HTTPS
        sameSite: 'None', // Required for cross-site cookies
        maxAge: 15 * 24 * 60 * 60 * 1000,
    })
    .json({
        success : true,
        message : message
    })
}

export default sendCookie