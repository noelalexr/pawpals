import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

// DB and Routes
import connectDB from "./configs/db.js";
import developerRoute from "./routes/developerRoute.js";
import authRoute from "./routes/authRoute.js";
import petRoute from "./routes/petRoute.js";
import cityRoutes from "./routes/cityRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(helmet());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/dev", developerRoute);     // developer tools
app.use("/api/auth", authRoute);         // auth (register/login)
app.use("/api/pets", petRoute);          // pet routes
app.use("/api/cities", cityRoutes);      // city list

// Error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
});

// Start server
connectDB();
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
