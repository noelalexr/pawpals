import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = (req, res, next) => {
    try{
        if(!req.cookies.token) {
            return res.status(401).json({ error: "Unauthorized Access" });
        }

        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({ error: "Unauthorized Access" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        //user info
        req.userId = decoded.id;

        next();
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

export { auth };