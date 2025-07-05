import petModel from "../models/petSchema.js"
import cloudinary from "../configs/cloudinary.js";

const createPet = async (req, res) => {
    try {
        const newData = req.body;
        newData.kennel = req.user.userId;

        newData.age = Number(newData.age);
        newData.adoptionFee = Number(newData.adoptionFee);

        const pet = new petModel(newData);
        await pet.save();

        res.status(201).json(pet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const listPet = async (req, res) => {
    try {
        const search = req.query.search?.toString().trim()
        const query = {
            ...(search && {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { breed: { $regex: search, $options: "i" } }
                ]
            })
        };
        const records = await petModel.find(query)
            .populate({
                path: "kennel",
                match: { isApproved: true },
                select: "name location email contact website socialLinks"
            });

        const approvedPets = records.filter(pet => pet.kennel);

        res.json(approvedPets);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

const listMyPets = async (req, res) => {
    try {
        const id = req.user.userId;
        const record = await petModel.find({ kennel: id })
            .populate({
                path: "kennel",
                select: "name location email contact website socialLinks"
            });
        res.json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const readMyPet = async (req, res) => {
    try {
        const id = req.params.id;
        const record = await petModel.findById(id)
            .populate({
                path: "kennel",
                match: { isApproved: true },
                select: "name location email contact website socialLinks"
            });

        if (!record || !record.kennel) {
            return res.status(404).json({ error: "Pet not found or kennel not approved" });
        }
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

const patchPetImages = async (req, res) => {
    try {
        const id = req.params.id;
        const pet = await petModel.findById(id);
        if (!pet) {
            return res.status(404).json({ error: "Pet not found" });
        }

        if (pet.kennel.toString() !== req.user.userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        for (const file of req.files) {
            const match = file.filename.match(/-(\d+)$/);
            if (!match) continue;

            const slot = parseInt(match[1], 10);
            const image = {
                url: file.path,
                public_id: file.filename,
            };

            if (slot === 1) {
                // Replace primary image
                if (pet.images.primary?.public_id) {
                    await cloudinary.uploader.destroy(pet.images.primary.public_id);
                }
                pet.images.primary = image;
            } else if ([2, 3].includes(slot)) {
                const existingIndex = pet.images.secondary.findIndex(img => img.public_id.endsWith(`-${slot}`));

                if (existingIndex !== -1) {
                    // Replace existing secondary image
                    await cloudinary.uploader.destroy(pet.images.secondary[existingIndex].public_id);
                    pet.images.secondary[existingIndex] = image;
                } else {
                    if (pet.images.secondary.length >= 2) {
                        return res.status(400).json({ error: "Only 2 secondary images allowed." });
                    }
                    pet.images.secondary.push(image);
                }
            }
        }

        await pet.save();
        res.status(200).json(pet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const patchPet = async (req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;
        const pet = await petModel.findById(id);

        if (!pet) {
            return res.status(404).json({ error: "Pet not found" });
        }

        if (pet.kennel.toString() !== req.user.userId) {
            return res.status(403).json({ error: "Unauthorized access to pet" });
        }

        delete newData._id;
        delete newData.kennel;
        delete newData.images;

        const updatedPet = await petModel.findByIdAndUpdate(id, newData, {
            new: true,
            runValidators: true,
        });

        res.status(200).json(updatedPet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePet = async (req, res) => {
    try {
        const id = req.params.id;
        const record = await petModel.findById(id);
        if (!record) {
            return res.status(404).json({ error: "Pet not found" });
        }

        if (record.kennel.toString() !== req.user.userId) {
            return res.status(403).json({ error: "Unauthorized access to pet" });
        }

        if (record.images && record.images.length > 0) {
            for (const img of record.images) {
                await cloudinary.uploader.destroy(img.public_id);
            }
        }

        const folderName = `pets/${record.name?.toLowerCase().replace(/\s+/g, '-')}-${record._id}`;
        try {
            await cloudinary.api.delete_folder(folderName);
        } catch (folderErr) {
            console.warn(`Warning: Folder '${folderName}' could not be deleted - ${folderErr.message}`);
        }

        await petModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Pet and associated images have been deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePetPhoto = async (req, res) => {
    const { id, publicId } = req.params;

    try {
        const record = await petModel.findById(id);
        if (!record) {
            return res.status(404).json({ error: "Pet not found" });
        }

        if (record.kennel.toString() !== req.user.userId) {
            return res.status(403).json({ error: "Unauthorized access to pet" });
        }

        let deleted = false;

        // Check if it's the primary image
        if (record.images.primary?.public_id === publicId) {
            await cloudinary.uploader.destroy(publicId);
            record.images.primary = undefined;
            deleted = true;
        } else {
            // Try deleting from secondary images
            const index = record.images.secondary.findIndex(img => img.public_id === publicId);
            if (index !== -1) {
                await cloudinary.uploader.destroy(publicId);
                record.images.secondary.splice(index, 1);
                deleted = true;
            }
        }

        if (!deleted) {
            return res.status(404).json({ error: "Photo not found in pet record" });
        }

        await record.save();
        res.status(200).json({ message: "Photo deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { createPet, listPet, listMyPets, readMyPet, patchPetImages, patchPet, deletePet, deletePetPhoto }