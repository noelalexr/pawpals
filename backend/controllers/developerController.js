import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotEnv from "dotenv";

//schemas
import Developer from "../models/developerSchema.js";
import Kennel from "../models/kennelSchema.js";

//registration
const registerDev = async (req, res) => {
    const { name, email, password } = req.body;

    try{
        //if dev exist
        const existingDev = await Developer.findOne({ email });

        if(existingDev){
            return res.status(400).json({ message: "Developer already exists" })
        }

        //hash pass
        const hashedPassword = await bcrypt.hash(password, 12);

        //create new Dev (I didnt add the "role" key since we decided that the default value is "developer" on the dev model)
        const newDeveloper = new Developer({
            name,
            email,
            password: hashedPassword
        });

        //save to db
        await newDeveloper.save();

        //generate JWT token for the new dev
        const token = jwt.sign(
            { id: newDeveloper._id, role: "developer", userType: "developer" },
            process.env.JWT_SECRET,
            { expiresIn: "1d"}
        );

        // store token in httpOnly cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, //1 day
        });

        res.status(201).json({ message: "Developer registered successfully" });
    }catch(err){
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

//login
const loginDev = async (req, res) => {
    const { email, password } = req.body;

    try {
        const developer = await Developer.find({ email });

        if(!developer){
            return res.status(404).json({ message: "Developer not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, developer.password);
        if(!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        //JWT token for the dev login
        const token = jwt.sign(
            { id: developer._id, role: "developer", userType: "developer" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, //1 day
        });

        res.status(200).json({ message: "Login successful" });   
    }catch(err){
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

//approve or reject a kennel
const reviewKennel = async (req, res) => {
    try{
        const kennelID = req.params.id;
        const { isApproved } = req.body; //from the kennel data

        if(typeof isApproved !== "boolean"){
            return res.status(400).json({ message: "isApproved must be a boolean." });
        }

        const kennel = await Kennel.findById(kennelID);
        if(!kennel){
            return res.status(404).json({ message: "Kennel not found" });
        }

        // update isApproved from the kennel schema
        kennel.isApproved = isApproved;
        await kennel.save();

        return res.status(200).json({
            message: `Kennel has been ${isApproved ? "approved" : "not approved"}.`,
            kennelId: kennel._id,
            isApproved: kennel.isApproved
        });
    }catch(err){
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

export { registerDev, loginDev, reviewKennel };