import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

//databases
import connectDB from "./configs/db.js";

//routes
import developerRoute from "./routes/developerRoute.js";
import authRoute from "./routes/authRoute.js";
import petRoute from "./routes/petRoute.js";

dotenv.config();
const app = express();

//middleware
app.use(helmet());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/developers", developerRoute);
app.use("/api/kennels", authRoute);
app.use("/api/pets", petRoute);

//error handling
app.use((err, res) => {
    res.status(err.status || 500).json({  message: err.message });
});

//start server
connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});