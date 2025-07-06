import { OpenAI } from "openai";
import Pet from "../models/petSchema.js";
import dotenv from "dotenv"

dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const recommendPet = async (req, res) => {
    const { message } = req.body;

    try{
        //ai query
        const aiResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: `Help me extract filters from this message for pet matching: "${message}". Output JSON format like: {species: "dog", age: 3, breed: "Labrador", location: "Laguna"}`
            }]
        });

        const filters = JSON.parse(aiResponse.data.choices[0].message.content);

        //mongo query
        const query = {};
        if(filters.species) query.species = new RegExp(filters.species, "i");
        if(filters.age) query.age = filters.age;
        if(filters.breed) query.breed = new RegExp(filters.breed, "i");
        if(filters.location) query["location.citySort"] = new RegExp(filters.location, "i");

        const matchedPets = await Pet.find(query).limit(5);
        res.json({ filters, pets: matchedPets });
    }catch(err){
        res.status(500).json({ error: "Chatbot failed", details: err.message });
    }
};

export default recommendPet;