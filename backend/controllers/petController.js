import petModel from "../models/petSchema.js"
import cloudinary from "../configs/cloudinary.js";

const createPet = async (req, res) => {
    try {
        const newData = req.body;
        newData.kennel = req.user.userId;

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

        if (req.files && req.files.length > 0) {
            const totalImages = pet.images.length + req.files.length;
            if (totalImages > 3) {
                return res.status(400).json({ error: "Cannot exceed 3 images." });
            }

            const newImages = req.files.map(file => ({
                url: file.path,
                public_id: file.filename,
            }));

            pet.images.push(...newImages);
            await pet.save();
        }

        res.status(200).json(pet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const patchPet = async (req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;
        const record = await petModel.findById(id);

        if (!record) {
            return res.status(404).json({ error: "Pet not found" });
        }

        if (record.kennel.toString() !== req.user.userId) {
            return res.status(403).json({ error: "Unauthorized access to pet" });
        }

        if (req.files && req.files.length > 0) {
            if (req.files.length > 3) {
                return res.status(400).json({ error: "Maximum of 3 images allowed." });
            }
            if ((record.images.length + req.files.length) > 3) {
                return res.status(400).json({ error: "Cannot have more than 3 images." });
            }

            const newImages = req.files.map((file) => ({
                url: file.path,
                public_id: file.filename,
            }));

            record.images.push(...newImages);
        }

        Object.assign(record, newData);
        await record.save();

        res.status(200).json(record);
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
        if (!record) return res.status(404).json({ error: "Pet not found" });

        if (record.kennel.toString() !== req.user.userId) {
            return res.status(403).json({ error: "Unauthorized access to pet" });
        }

        await cloudinary.uploader.destroy(publicId);

        record.images = record.images.filter(img => img.public_id !== publicId);
        await record.save();

        res.status(200).json({ message: "Photo deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { createPet, listPet, listMyPets, readMyPet, patchPetImages, patchPet, deletePet, deletePetPhoto }