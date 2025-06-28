import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import kennelModel from "../models/kennelSchema.js";
import sendEmail from "../services/mailService.js";

dotenv.config();

const register = async (req, res) => {
    const payload = req.body
    const devEmail = process.env.EMAIL_USER
    try{
        const hashedPassword = await bcrypt.hash(payload.password, 10);
        const savedUser = await kennelModel.create({
            name: payload.name,
            email: payload.email,
            password: hashedPassword,
            location: {
                fullAddress: payload.location.fullAddress,
                citySort: payload.location.citySort,
            },
            contact: payload.contact,
            website: payload.website,
            socialLinks: {
                facebook: payload.socialLinks?.facebook,
                instagram: payload.socialLinks?.instagram,
                tiktok: payload.socialLinks?.tiktok,
            },
            documents: payload.documents
        });

        await sendEmail(
            `PawPals Tech Team`,
            savedUser.email,
            `Request to Join PawPals`,
            `Hello ${savedUser.name},\n\nThank you for your request to join us at PawPals. Your account information and documents will need to verified before we can officially welcome you. Please give us 2-5 business days to verify and create your account.\nWe'll send you an email about your status within that timeframe.\nThank you again for your request to join,\nPawPals Tech Team`
        );

        await sendEmail(
            `PawPals Tech Team`,
            process.env.EMAIL_USER,
            `${savedUser.name} from ${savedUser.location.citySort} Needs Approval`,
            `Hi team,\n\nWe have a new request to join from ${savedUser.name} that needs verification and approval!`
        );

        res.status(200).json({message: `Emails have been sent to ${payload.email} and ${devEmail}`})
    } catch(error) {
        res.status(500).json({error: error.message});
    }
};

const login = async (req, res) => {
    const payload = req.body;
    try{
        const user = await kennelModel.findOne({email: payload.email});
        if(!user){
            return res.status(400).json({error: "Invalid credentials"});
        };

        const passwordMatched = await bcrypt.compare(payload.password, user.password);
        if(!passwordMatched) {
            return res.status(400).json({error: "Invalid Credentials"});
        };

        //Generate Token
        const token = jwt.sign({userId: user._id, name: user.name}, process.env.JWT_SECRET, {expiresIn: "30m"});

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 86400000 //1 day
        });

        res.json({message: "Login successful"});
    }catch(error){
        res.status(400).json({error: error.message});
    }
};

const logout = async (req, res) => {
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

const validate = (req, res) => {
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

export {register, login, logout, validate};