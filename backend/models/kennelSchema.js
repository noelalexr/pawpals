import mongoose from "mongoose";

const kennelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { 
        fullAddress: { type: String, required: true },
        citySort: { type: String, required: true }
     },
    contact: { type: String, required: true },
    website: { type: String, required: true },
    socialLinks: {
        facebook: { type: String },
        instagram: { type: String },
        tiktok: { type: String }
    },
    documents: [
        { 
            type: String, 
            required: true 
        }
    ],
    isApproved: { type: Boolean, default: false },
    createdAt: { type: Date, required: true, default: Date.now }
});

const kennelModel = mongoose.model("Kennel", kennelSchema);

export default kennelModel;