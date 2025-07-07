import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

//schemas
import Developer from "../models/developerSchema.js";

dotenv.config();

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

        res.status(201).json({ message: "Developer registered successfully" });
    }catch(err){
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

//login
const loginDev = async (req, res) => {
    const { email, password } = req.body;

    try {
        const developer = await Developer.findOne({ email });

        if(!developer){
            return res.status(404).json({ message: "Developer not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, developer.password);
        if(!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        //JWT token for the dev login
        const token = jwt.sign(
            { userId: developer._id, name: developer.name, role: developer.role },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 2 * 60 * 60 * 1000 // 2 hours
        });

        res.status(200).json({ message: "Login successful" });   
    }catch(err){
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const logoutDev = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });

        res.json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const validateDev = (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
        return res.status(401).json({ valid: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ valid: true, user: decoded });
    } catch (error) {
        res.status(401).json({ valid: false });
    }
};

export { registerDev, loginDev, logoutDev, validateDev };