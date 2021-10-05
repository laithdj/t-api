const jwt = require('jsonwebtoken')

module.exports = {
    generateToken: async(user) => {
        return await jwt.sign({
            fullName: user.fullName,
            _id: user._id,
            role: user.role
        }, process.env.JWT_SECRET_KEY,{expiresIn: process.env.JWT_TOKEN_EXPIRYTIME})

    }
}