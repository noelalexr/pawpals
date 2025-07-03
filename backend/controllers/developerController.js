import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotEnv from "dotenv";

//schemas
import Developer from "../models/developerSchema.js";
import Kennel from "../models/kennelSchema.js";

// registration
const registerDev = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingDev = await Developer.findOne({ email });

    if (existingDev) {
      return res.status(400).json({ message: "Developer already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newDeveloper = new Developer({
      name,
      email,
      password: hashedPassword,
    });

    await newDeveloper.save();

    res.status(201).json({ message: "Developer registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// login
const loginDev = async (req, res) => {
  const { email, password } = req.body;

    try {
        const developer = await Developer.findOne({ email });

    if (!developer) {
      return res.status(404).json({ message: "Developer not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, developer.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: developer._id, role: "developer", userType: "developer" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
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