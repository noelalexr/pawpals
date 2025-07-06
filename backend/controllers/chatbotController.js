import fetch from "node-fetch";
import Pet from "../models/petSchema.js";
import dotenv from "dotenv";

dotenv.config()

const url = "https://api.groq.com/openai/v1/chat/completions";
const apiKey = process.env.GROQ_API_KEY;

const aiContext = {
    role: "system",
    content: "You are an AI assistant for a pet adoption app, helping users find their ideal pet based on preferences."
};

let conversations = [];

const getAvailableData = async () => {
    const breeds = await Pet.distinct("breed");
    const locations = await Pet.distinct("kennel.location.citySort");
    const species = ["dog", "cat", "bird"];
    return { breeds, locations, species };
};

const getAvailableCustomAttributes = async () => {
    const customAttributes = await Pet.distinct("description");
    return customAttributes;
};

const parseAIResponse = async (aiResponse) => {
    const filters = {};

    //dynamic values
    const { breeds, locations, species } = await getAvailableData();
    const dynamicCustomAttribute = await getAvailableCustomAttributes();

    //lowercase AI response
    const responseLowercase = aiResponse.toLowerCase();

    //check if match sa database
    breeds.forEach((breed) => {
        if(responseLowercase.includes(breed.toLowerCase())) {
            filters.breed = breed;
        }
    });

    locations.forEach((location) => {
        if(responseLowercase.includes(location.toLowerCase())) {
            filters["kennel.location.citySort"] = location;
        }
    });

    species.forEach((speciesType) => {
        if(responseLowercase.includes(speciesType.toLowerCase())) {
            filters.species = speciesType;
        }
    });

    const ageMatch = responseLowercase.match(/\d+\s?years?/);
    if(ageMatch) {
        filters.age = parseInt(ageMatch[0]);
    }

    dynamicCustomAttribute.forEach((attribute) => {
        if(responseLowercase.includes(attribute.toLowerCase())) {
            filters[attribute.replace(/\s/g, "")] = true;
        }
    });

    return filters;
};

const handleChat = async (req, res) => {
    const { userMessage } = req.body;

    try{
        const sendData = {
            model: "llama-3.3-70b-versatile",
            messages: [aiContext, ...conversations, { role: "user", content: userMessage }]
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Buffer.from(apiKey, "base64").toString("utf-8")}`
            },
            body: JSON.stringify(sendData)
        };

        const response = await fetch(url, options);
        const data = await response.json();
        const aiReply = data.choices[0].message;

        //save convo
        conversations.push(aiReply);

        //parse to extract filters
        const filters = await parseAIResponse(aiReply.content);

        //db query limiting to 5
        const matchedPets = await Pet.find(filters).limit(5);

        // return response
        res.json({
            aiResponse: aiReply.content,
            pets: matchedPets
        });
    }catch(err){
        console.error("Error with Groq API:", err);
        res.status(500).json({ error: "Failed to process AI request" });
    }
};

export default handleChat;