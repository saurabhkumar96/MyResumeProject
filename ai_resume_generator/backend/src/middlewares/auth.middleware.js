const jwt = require("jsonwebtoken")
const blacklistToken = require("../models/blacklist.model")

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: "token not provided" })
        }

        const isTokenBlackListed = await blacklistToken.findOne({ token })
        if (isTokenBlackListed) {
            return res.status(401).json({ message: "token is blacklisted" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: "invalid token" })
    }
}

module.exports = { authMiddleware }