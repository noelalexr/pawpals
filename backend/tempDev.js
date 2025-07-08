import dotenv from "dotenv";
import bcrypt from "bcrypt";
import connectDB from "./configs/db.js";
import Developer from "./models/developerSchema.js";

connectDB();
dotenv.config();

const tempDev = async () => {
    await Developer.deleteMany();

    try {
        const hashedPassword = await bcrypt.hash("password123", 10);

        //dev from seed
        const existingDev = await Developer.findOne({ email: "dev@pawpals.com" });

        if (!existingDev) {
            await Developer.create({
                name: "Test Developer",
                email: "dev@pawpals.com",
                password: hashedPassword,
                role: "developer"
            });
        }

        console.log("Temporary Dev has been created, please create a enw account and delete this one")
        process.exit();
    } catch (err) {
        console.log("Temporary Dev failed", err.message);
        process.exit(1);
    }
};

tempDev();