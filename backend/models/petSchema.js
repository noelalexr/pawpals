import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    arrivalDate: { type: Date, required: true },
    breed: { type: String, required: true },
    species: { type: String, required: true },
    gender: { type: String, required: true },
    description: { type: String, required: true },
    images: [
        {
            url: String,
            public_id: { type: String, required: true }
        }
    ],
    isAdopted: { type: Boolean, required: true, default: false },
    adoptionFee: { type: Number, required: true },
    medical: {
        vaccinated: { type: Boolean, required: true, default: false },
        parasiteControl: {
            tickAndFlea: { type: Boolean, required: true, default: false },
            heartworm: { type: Boolean, required: true, default: false },
            neutered: { type: Boolean, required: true, default: false }
        }
    },
    specialAssistance: { type: Boolean, required: true, default: false },
    views: { type: Number, required: true, default: 0 },
    isDeleted: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, required: true, default: Date.now },
    kennel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Kennel",
        required: true
    }
});

const petModel = mongoose.model("Pet", petSchema);

export default petModel;