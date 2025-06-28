import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Developer from "../models/developerSchema.js";

dotenv.config();

const verifyDeveloper = async (req, res, next) => {
    try{
        if(!req.cookies.token) {
            return res.status(401).json({ error: "Unauthorized Access" });
        }

        const token = req.cookies.token;

        if(!token) {
            return res.status(401).json({ error: "Unauthorized Access" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const developer = await Developer.findById(decoded.id);

        if(!developer || developer.role !== "developer"){
            return res.status(403).json({ error: "Access denied: Developers only" });
        }

        req.developer = developer; //gets the devs info

        next();
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

export { verifyDeveloper };