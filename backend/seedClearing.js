import dotenv from "dotenv";
import bcrypt from "bcrypt";
import connectDB from "./configs/db.js";

import Developer from "./models/developerSchema.js";
import Kennel from "./models/kennelSchema.js";
import Pet from "./models/petSchema.js";

connectDB();
dotenv.config();

const seedClear = async () => {
    try{
        await Kennel.deleteMany();
        console.log("All kennels have been deleted")

        await Pet.deleteMany();
        console.log("All Pets have been deleted")

        await Developer.deleteOne({ email: "dev@pawpals.com" });
        console.log("Temporary Developer accounts has been deleted")
        
        process.exit();
    } catch (err) {
        console.log("Seeding failed", err.message);
        process.exit(1);
    }
};

seedClear();