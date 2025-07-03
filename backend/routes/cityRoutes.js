import express from "express";
import Kennel from "../models/kennelSchema.js";

const router = express.Router();

router.get("/cities", async (req, res) => {
    try{
        const cities = await Kennel.distinct("location.citySort");
        res.json(cities);
    }catch(err){
        res.status(500).json({ message: "Error fetching cities", error: err.message });
    }
});

export default router;