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
        } else {
            await sendEmail(
                `PawPals Tech Team`,
                record.email,
                `Update on PawPals Account`,
                `Hello ${record.name},\n\nWe regret to inform you that your account has been deactivated and removed from the PawPals. You are welcome to re-apply again, please make sure all your documents are renewed and their copies uploaded to your Google Drive.\n\nIf you wish to appeal or ask for more information about your removal, please send us an email at:
                ${process.env.EMAIL_USER}\n\nThank you again for working with us at PawPals,\nPawPals Tech Team`
            );
        }

        await kennelModel.findByIDAndDelete(id);
         res.status(200).json({message: "Kennel has been rejected and removed from database, please have them reapply again with the correct documents"})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {rejectKennel, approveKennel}