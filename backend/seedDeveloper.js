import bcrypt from "bcrypt";
import developerModel from "./models/developerSchema.js";

export const seedDeveloper = async () => {
    const devEmail = "dev@email.com";
    const devPassword = "devpassword123";

    const exists = await developerModel.findOne({ email: devEmail });
    if (exists) {
        console.log("🟡 Developer account already exists");
        return;
    }

    const hashedPassword = await bcrypt.hash(devPassword, 10);

    await developerModel.create({
        name: "Dev User",
        email: devEmail,
        password: hashedPassword,
        role: "develoepr"
    });

    console.log("✅ Developer account created");
};
