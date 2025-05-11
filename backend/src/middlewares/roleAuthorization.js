exports.roleAuthorization = ([...alloweUser]) => {
    return (req, res, next) => {
        if(!alloweUser.includes(req.user.role)) {
            return res.status(403).json({message:"Access denied."});
        }
        next();
    }
}