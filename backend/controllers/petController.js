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
    if (!pet) return res.status(404).json({ error: "Pet not found" });

    if (pet.kennel.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const primary = req.files?.primary?.[0];
    const secondary = req.files?.secondary?.[0];
    const tertiary = req.files?.tertiary?.[0];

    if (primary) {
      if (pet.images.primary?.public_id) {
        await cloudinary.uploader.destroy(pet.images.primary.public_id);
      }
      pet.images.primary = { url: primary.path, public_id: primary.filename };
    }

    if (secondary) {
      if (pet.images.secondary?.public_id) {
        await cloudinary.uploader.destroy(pet.images.secondary.public_id);
      }
      pet.images.secondary = { url: secondary.path, public_id: secondary.filename };
    }

    if (tertiary) {
      if (pet.images.tertiary?.public_id) {
        await cloudinary.uploader.destroy(pet.images.tertiary.public_id);
      }
      pet.images.tertiary = { url: tertiary.path, public_id: tertiary.filename };
    }

    await pet.save();
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

        // Delete all Cloudinary images
        const imagesToDelete = [
            record.images?.primary?.public_id,
            record.images?.secondary?.public_id,
            record.images?.tertiary?.public_id
        ].filter(Boolean);

        for (const publicId of imagesToDelete) {
            await cloudinary.uploader.destroy(publicId);
        }

        // Try to delete the folder (it must be empty)
        const folderName = `pets/${record.name?.toLowerCase().replace(/\s+/g, '-')}-${record._id}`;
        try {
            await cloudinary.api.delete_folder(folderName);
        } catch (folderErr) {
            console.warn(`Warning: Folder '${folderName}' could not be deleted - ${folderErr.message}`);
        }

        // Delete pet from DB
        await petModel.findByIdAndDelete(id);

        res.status(200).json({ message: "Pet and images deleted successfully" });
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

        for (const key of ["primary", "secondary", "tertiary"]) {
            if (record.images[key]?.public_id === publicId) {
                await cloudinary.uploader.destroy(publicId);
                record.images[key] = undefined;
                deleted = true;
                break;
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