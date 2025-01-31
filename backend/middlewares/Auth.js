import jwt from 'jsonwebtoken'
import userModel from '../models/User.js'

const isAuthenticated = async (req, res, next) => {
    try
    {
        const { crudToken } = req.cookies

        if(!crudToken)
        {
            return res.status(404).json({
                success : false,
                message : "Login first"
            })
        }

        const decoded = jwt.verify(crudToken, process.env.JWT_SECRET)
        req.user = await userModel.findById(decoded.id)
        next()
    }
    catch(error)
    {
        res.status(400).json({
            success : false,
            message : "Invalid or expired token"
        })
    }
}

export default isAuthenticated