import dotenv from "dotenv";
import Developer from "../models/developerSchema.js";

dotenv.config();

const verifyDeveloper = async (req, res, next) => {
    try {
<<<<<<< HEAD
        const developer = await Developer.findById(decoded.id);
=======
        const developer = await Developer.findById(req.user.userId);
>>>>>>> c6d0c6fadd578c968b1dc6d96234ed20bdf811c8

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