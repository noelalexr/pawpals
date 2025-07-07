import dotenv from "dotenv";
import kennelModel from "../models/kennelSchema.js";
import petModel from "../models/petSchema.js";
import developerModel from "../models/developerSchema.js";
import sendEmail from "../services/mailService.js";
import cloudinary from "../configs/cloudinary.js";

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

        res.json(record);

        sendEmail(
            `PawPals Tech Team`,
            record.email,
            `Welcome to PawPals!`,
            `Hello ${record.name},\n\nWe are happy to let you know that your account has been verified and approved! You may now start listing your available pets for adoption\nThank you and welcome to the PawPals system,\nPawPals Tech Team`
        ).catch((err) => console.error("Failed to send approval email:", err.message));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const rejectKennel = async (req, res) => {
  const id = req.params.id;
  const role = req.user.role?.toLowerCase();

  try {
    if (role !== "developer") {
      return res.status(403).json({ error: "Access denied: Developers only" });
    }

    const record = await kennelModel.findById(id);
    if (!record) {
      return res.status(404).json({ error: "Kennel not found" });
    }

    const pets = await petModel.find({ kennel: id });

    // CASE 1: PENDING kennel with no pets → simple delete
    if (!record.isApproved && pets.length === 0) {
      kennelModel.findByIdAndDelete(id).catch(console.error); // non-blocking delete
      sendEmail(
        "PawPals Tech Team",
        record.email,
        "Update on Request to PawPals",
        `Hello ${record.name},\n\nWe regret to inform you that your account was not approved to join PawPals. You are welcome to re-apply again with updated documents.\n\nPawPals Tech Team`
      ).catch(console.error);
      return res.status(200).json({ message: "Kennel rejected and deleted (no pets)" });
    }

    // CASE 2: PENDING kennel with pets → delete pets + images
    if (!record.isApproved && pets.length > 0) {
      await Promise.all(
        pets.map(async (pet) => {
          for (const pet of pets) {
            const { primary, secondary, tertiary } = pet.images || {};

            // Gather all images into one array
            const allImages = [
                ...(primary ? [primary] : []),
                ...(Array.isArray(secondary) ? secondary : []),
                ...(tertiary ? [tertiary] : []),
            ];

            // Delete valid public_id images
            await Promise.all(
                allImages
                .filter((img) => img?.public_id)
                .map((img) =>
                    cloudinary.uploader.destroy(img.public_id).catch((err) =>
                    console.warn(`Failed to delete image ${img.public_id}:`, err.message)
                    )
                )
            );

            // Delete the Cloudinary folder
            const folder = `pets/${pet.name?.toLowerCase().replace(/\s+/g, "-")}-${pet._id}`;
            try {
                await cloudinary.api.delete_folder(folder);
            } catch (folderErr) {
                console.warn(`Failed to delete folder '${folder}':`, folderErr?.message || folderErr);
            }

            // Delete the pet from the database
            await petModel.findByIdAndDelete(pet._id);
        }
        }
        )
        
      );

      kennelModel.findByIdAndDelete(id).catch(console.error);
      sendEmail(
        "PawPals Tech Team",
        record.email,
        "Account and Pets Removed from PawPals",
        `Hello ${record.name},\n\nWe regret to inform you that your account and listed pets have been removed due to non-compliance. You may reapply with complete documentation.\n\nPawPals Tech Team`
      ).catch(console.error);

      return res.status(200).json({ message: "Kennel and pets removed." });
    }

    // CASE 3: ALREADY APPROVED kennel → demote only
    if (record.isApproved === true) {
      sendEmail(
        "PawPals Tech Team",
        record.email,
        "Account Deactivation Notice",
        `Hello ${record.name},\n\nYour account has been deactivated. Please renew your documents before reapplying.\n\nPawPals Tech Team`
      ).catch(console.error);

      sendEmail(
        "PawPals Tech Team",
        process.env.EMAIL_USER,
        `${record.name}'s Account Has Been Deactivated`,
        `Hi team,\n\nWe have deactivated ${record.name}'s account. Please follow up as needed.`
      ).catch(console.error);

      const updated = await kennelModel.findByIdAndUpdate(id, { isApproved: false }, { new: true });
      return res.status(200).json({ message: "Kennel has been deactivated", data: updated });
    }
  } catch (error) {
    console.error("Reject error:", error);
    res.status(500).json({ error: error.message });
  }
};

const listPendingKennels = async (req, res) => {


    try {
        const id = req.user.userId
        const developer = await developerModel.findById(id);

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
        const id = req.user.userId
        const developer = await developerModel.findById(id);

        if (!developer || developer.role?.toLowerCase() !== "developer") {
        return res.status(403).json({ error: "Access denied: Developers only" });
        }

        const kennels = await kennelModel.find({}, "-password"); // get all kennels
        res.status(200).json(kennels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {rejectKennel, approveKennel, listPendingKennels, listAllKennels}