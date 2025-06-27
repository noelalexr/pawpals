const verifyDeveloper = (req, res, next) => {
    if(req.userType !== "developer") {
        return res.status(403).json({ message: "Access denied. Developer role required." })
    }
    next(); //moves on to the next middleware or route
}

export default verifyDeveloper;