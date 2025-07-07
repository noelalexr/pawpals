import fetch from "node-fetch";
import Pet from "../models/petSchema.js";
import dotenv from "dotenv";

dotenv.config();

const url = "https://api.groq.com/openai/v1/chat/completions";
const apiKey = process.env.GROQ_API_KEY;

// 🔧 Updated system prompt for both trait + filter queries
const aiContext = {
  role: "system",
  content: `
You are a helpful assistant for a pet adoption app.

Your two main responsibilities are:
1. If the user is asking for a pet (e.g., "I want a playful dog in Cebu"):
   - Extract search filters such as breed, species, age, city (location), or traits like "playful", "calm", "good with kids".
   - DO NOT describe any specific pet. The system will search the database and generate responses based on real pets.

2. If the user is asking a general question about pet traits (e.g., "Are Ragdolls high in energy?"):
   - Answer briefly using typical characteristics based on pet descriptions in the database.
   - If no clear pattern is found, respond with a neutral summary.

Always be concise, friendly, and helpful.
Never invent or assume specific pets, names, or locations.
`
};

// 🧠 Pull filter values from the DB
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

// 🧠 Analyze pet descriptions to summarize breed trait
const getBreedSummary = async (breed) => {
  const pets = await Pet.find({ breed }).limit(10);
  if (!pets.length) return null;

  const descriptions = pets.map((p) => p.description.toLowerCase()).join(" ");

  const highEnergyWords = ["active", "playful", "energetic", "hyper"];
  const lowEnergyWords = ["calm", "gentle", "quiet", "laid-back", "lazy"];

  const highCount = highEnergyWords.filter(w => descriptions.includes(w)).length;
  const lowCount = lowEnergyWords.filter(w => descriptions.includes(w)).length;

  let energyLevel = "moderate";
  if (highCount > lowCount) energyLevel = "high";
  else if (lowCount > highCount) energyLevel = "low";

  return `Based on pets in our care, ${breed}s tend to have a ${energyLevel} energy level. Would you like to see some available for adoption?`;
};

// 🕵️ Extract search filters from AI's structured message
const parseAIResponse = async (aiResponse) => {
  const filters = {};
  const { breeds, locations, species } = await getAvailableData();
  const customAttributes = await getAvailableCustomAttributes();
  const responseLowercase = aiResponse.toLowerCase();

  breeds.forEach((breed) => {
    if (responseLowercase.includes(breed.toLowerCase())) {
      filters.breed = breed;
    }
  });

  locations.forEach((location) => {
    if (responseLowercase.includes(location.toLowerCase())) {
      filters["kennel.location.citySort"] = location;
    }
  });

  species.forEach((speciesType) => {
    if (responseLowercase.includes(speciesType.toLowerCase())) {
      filters.species = speciesType;
    }
  });

  const ageMatch = responseLowercase.match(/\d+\s?years?/);
  if (ageMatch) {
    filters.age = parseInt(ageMatch[0]);
  }

  customAttributes.forEach((attr) => {
    if (responseLowercase.includes(attr.toLowerCase())) {
      filters[attr.replace(/\s/g, "")] = true;
    }
  });

  // Extra: neutered
  if (responseLowercase.includes("neutered")) {
    filters["medical.parasiteControl.neutered"] = true;
  }

  // Extra: hypoallergenic
  if (responseLowercase.includes("hypoallergenic")) {
    filters.breed = { $in: ["Sphynx", "Russian Blue", "Balinese", "Bengal"] }; // example safe filter
  }

  return filters;
};

// 📦 Format pets for user-friendly output
const generatePetReply = (pets) => {
  if (!pets.length) {
    return "Sorry, we couldn't find any pets that match your preferences.";
  }

  const lines = pets.map((pet) => {
    const location = pet.kennel?.location?.citySort || "an unknown location";
    return `• ${pet.name}, a ${pet.age}-year-old ${pet.breed} (${pet.species}) in ${location}`;
  });

  return `Here are some pets that match your preferences:\n${lines.join("\n")}`;
};

// 🎯 Main controller
const handleChat = async (req, res) => {
  const { userMessage } = req.body;

  try {
    // 🧠 Check if this is a trait-related question before anything else
    const lowerMsg = userMessage.toLowerCase();
    const allBreeds = await Pet.distinct("breed");
    const mentionedBreed = allBreeds.find(b => lowerMsg.includes(b.toLowerCase()));
    const isTraitQuestion = /energy|temperament|active|lazy|calm|hyper|playful|cuddly|hypoallergenic/.test(lowerMsg);

    if (mentionedBreed && isTraitQuestion) {
      const summary = await getBreedSummary(mentionedBreed);
      if (summary) {
        return res.json({ aiResponse: summary, pets: [] });
      }
    }

    // 🗨️ Send message to LLM (stateless)
    const sendData = {
      model: "llama-3.3-70b-versatile",
      messages: [aiContext, { role: "user", content: userMessage }]
    };

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
    const aiReplyRaw = data.choices[0].message;

    // 🕵️ Parse filters
    const filters = await parseAIResponse(aiReplyRaw.content);

    // 🐾 Find pets
    const matchedPets = await Pet.find(filters).limit(5).populate("kennel", "location");

    // 📝 Build reply
    const aiResponse = generatePetReply(matchedPets);

    res.json({
      aiResponse,
      pets: matchedPets
    });
  } catch (err) {
    console.error("Error with Groq API:", err);
    res.status(500).json({ error: "Failed to process AI request" });
  }
};

export default handleChat;