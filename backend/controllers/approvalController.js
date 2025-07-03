import dotenv from "dotenv";
import kennelModel from "../models/kennelSchema.js";
import sendEmail from "../services/mailService.js";

dotenv.config();

const approveKennel = async (req, res) => {
    const id = req.params.id;
    const role = req.user.role?.toLowerCase();
    try{
        if (role !== "developer") {
           return res.status(403).json({ error: "Access denied: Developers only" }); 
        }

        const record = await kennelModel.findByIdAndUpdate(id, {isApproved: true}, { new: true });
        if (!record) {
            return res.status(404).json({ error: "Kennel not found" });
        }
        await sendEmail(
            `PawPals Tech Team`,
            record.email,
            `Welcome to PawPals!`,
            `Hello ${record.name},\n\nWe are happy to let you know that your account has been verified and approved! You may now start listing your available pets for adoption\nThank you and welcome to the PawPals system,\nPawPals Tech Team`
        );
        res.json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const rejectKennel = async (req, res) => {
    const id = req.params.id;
    const role = req.user.role?.toLowerCase();
    try{
        if (role !== "developer") {
           return res.status(403).json({ error: "Access denied: Developers only" }); 
        }

        const record = await kennelModel.findById(id);
        if (!record) {
            return res.status(404).json({ error: "Kennel not found" });
        }

        if (record.isApproved == false) {
            await sendEmail(
                `PawPals Tech Team`,
                record.email,
                `Update on Request to PawPals`,
                `Hello ${record.name},\n\nWe regret to inform you that your account was not approved to join the PawPals system. You are welcome to re-apply again, please make sure all your documents are not expired and are uploaded.\n\nIf you wish to appeal or ask for more information, please send us an email at:
                ${process.env.EMAIL_USER}\n\nThank you again for your request to join PawPals,\nPawPals Tech Team`
            );

            await kennelModel.findByIDAndDelete(id);
            return res.status(200).json({ message: "Kennel has been rejected and removed from the database." });
        } else {
            await sendEmail(
                `PawPals Tech Team`,
                record.email,
                `Update on PawPals Account`,
                `Hello ${record.name},\n\nWe regret to inform you that your account has been deactivated and pets delisted. Please make sure all your documents are renewed and uploaded to your Google Drive.\n\nIf you wish to ask for more information about your deactivation, please send us an email at:
                ${process.env.EMAIL_USER}\n\nThank you again for working with us at PawPals,\nPawPals Tech Team`
            );

            await sendEmail(
                `PawPals Tech Team`,
                process.env.EMAIL_USER,
                `${record.name}'s Account Has Been Deactivated`,
                `Hi team,\n\nWe have just deactivated ${record.name}'s account, please coordinate with them any files or information that needs updating!`
            );

            res.status(200).json({message: "Kennel has been deactivated"})
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const listPendingKennels = async (req, res) => {


    try {
        const developer = await developerModel.findById(req.userId);

        if (!developer || developer.role?.toLowerCase() !== "developer") {
        return res.status(403).json({ error: "Access denied: Developers only" });
    }

        const kennels = await kennelModel.find({ isApproved: false });
        res.status(200).json(kennels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const listAllKennels = async (req, res) => {
    try {
        const developer = await developerModel.findById(req.userId);

        if (!developer || developer.role?.toLowerCase() !== "developer") {
        return res.status(403).json({ error: "Access denied: Developers only" });
        }

        const kennels = await kennelModel.find(); // get all kennels
        res.status(200).json(kennels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {rejectKennel, approveKennel, listPendingKennels, listAllKennels}