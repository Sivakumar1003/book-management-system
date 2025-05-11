const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(' ')[1];
    }

    if(!token) {
        res.status(404).json({message : "No token, Authorization denied."})
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(404).json({message: "Token not valid."})
    }
}