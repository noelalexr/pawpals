import dotenv from "dotenv";
import Developer from "../models/developerSchema.js";

dotenv.config();

const verifyDeveloper = async (req, res, next) => {
    try {
        const developer = await Developer.findById(req.user.userId);

        if (!developer || developer.role !== "developer") {
            return res.status(403).json({ error: "Access denied: Developers only" });
        }

        req.developer = developer; //gets the devs info

        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { verifyDeveloper };