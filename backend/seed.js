import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs"

import Developer from "./models/developerSchema.js";
import Kennel from "./models/kennelSchema.js";
import Pet from "./models/petSchema.js";

dotenv.config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected");
    }catch(err){
        console.log("MongoDB connection failed", err.message);
        process.exit(1);
    }
};

const seed = async () => {
    await connectDB();

    try{
        const hashedPassword = await bcrypt.hash("password123", 10);

        //dev from seed
        const existingDev = await Developer.findOne({ email: "dev@pawpals.com" });

        if(!existingDev) {
            await Developer.create({ 
                name: "Test Developer",
                email: "dev@pawpals.com",
                password: hashedPassword,
                role: "developer"
            });
        }

        //mock approved kennels
        const mockApprovedKennelsData = [
            {
                name: "Philippine Animal Welfare Society (PAWS)",
                email: "contact@paws.com",
                password: hashedPassword,
                location: {
                    fullAddress: "Aurora Blvd, Quezon City, 1108 Metro Manila",
                    citySort: "Quezon City, Metro Manila"
                },
                contact: "0987-6543-210",
                website: "http://www.paws.org.ph/",
                socialLinks: {
                    facebook: "https://www.facebook.com/pawsphilippines",
                },
                documents: [ "business-permit.pdf", "dti-registration.pdf" ],
                isApproved: true
            },
            {
                name: "Philippine Animal Rescue Team (PART)",
                email: "contact@part.com",
                password: hashedPassword,
                location: {
                    fullAddress: "Purok 3, Bgy. Maulawin Sta. Elena Camarines Norte, Maulawin, Pagsanjan, Laguna",
                    citySort: "Pagsanjan, Laguna"
                },
                contact: "0987-6543-210",
                website: "https://phanimalrescueteam.info/",
                socialLinks: {
                    facebook: "https://www.facebook.com/PhilAnimalRescueTeam/",
                },
                documents: [ "veterinary-health-certificate.pdf", "business-permit.pdf" ],
                isApproved: true
            },
            {
                name: "CARA Welfare Philippines",
                email: "contact@cara.com",
                password: hashedPassword,
                location: {
                    fullAddress: "175 Lopez-Rizal corner Samat, 175 Lopez-Rizal, Mandaluyong City, 1550 Kalakhang Maynila",
                    citySort: "Mandaluyong City, Metro Manila"
                },
                contact: "0987-6543-210",
                website: "http://www.caraphil.org/",
                socialLinks: {
                    facebook: "https://www.facebook.com/CARAwelfareph",
                },
                documents: [ "pound-registration-certificate.pdf", "veterinary-health-certificate.pdf" ],
                isApproved: true
            }
        ];

        for(const kennelData of mockApprovedKennelsData){
            const exists = await Kennel.findOne({ email: kennelData.email });

            if(!exists){
                await Kennel.create(kennelData);
            }
        }

        //pets posted by mock kennels
        const kennels = await Kennel.finc({ isApproved: true });

        const mockPetsData = [
            {
                name: "Buddy",
                age: 3,
                arrivalDate: new Date("2025-06-30"),
                breed: "Labrador",
                species: "dog",
                gender: "male",
                description: "Friendly Labrador",
                images: [{
                    url: "buddy-labrador.jpg",
                    public_id: "buddy123"
                }],
                isAdopted: false,
                adoptionFee: 500,
                medical: {
                    vaccinated: true,
                    parasiteControl: {
                        tickAndFlea: true,
                        heartworn: true,
                        neutered: true
                    }
                },
                specialAssistance: false,
                kennel: kennels[0]?._id
            },
            {
                name: "Bantay",
                age: 4,
                arrivalDate: new Date("2025-06-20"),
                breed: "Persian",
                species: "cat",
                gender: "male",
                description: "Fluffy Persian Cat",
                images: [{
                    url: "bantay-persian-cat.jpg",
                    public_id: "bantay123"
                }],
                isAdopted: false,
                adoptionFee: 400,
                medical: {
                    vaccinated: true,
                    parasiteControl: {
                        tickAndFlea: true,
                        heartworn: true,
                        neutered: false
                    }
                },
                specialAssistance: false,
                kennel: kennels[1]?._id
            },
            {
                name: "Llao",
                age: 2,
                arrivalDate: new Date("2025-06-25"),
                breed: "Aspin",
                species: "dog",
                gender: "female",
                description: "Alpha male Aspin",
                images: [{
                    url: "llao-aspin-dog.jpg",
                    public_id: "llao123"
                }],
                isAdopted: false,
                adoptionFee: 450,
                medical: {
                    vaccinated: false,
                    parasiteControl: {
                        tickAndFlea: true,
                        heartworn: true,
                        neutered: false
                    }
                },
                specialAssistance: false,
                kennel: kennels[1]?._id
            },
            {
                name: "Coco",
                age: 5,
                arrivalDate: new Date("2025-05-25"),
                breed: "Siamese",
                species: "cat",
                gender: "female",
                description: "Cuddly Siamese Cat",
                images: [{
                    url: "coco-siamese-cat.jpg",
                    public_id: "coco123"
                }],
                isAdopted: false,
                adoptionFee: 500,
                medical: {
                    vaccinated: true,
                    parasiteControl: {
                        tickAndFlea: false,
                        heartworn: false,
                        neutered: false
                    }
                },
                specialAssistance: false,
                kennel: kennels[2]?._id
            },
            {
                name: "Dyagwar",
                age: 3,
                arrivalDate: new Date("2025-05-15"),
                breed: "Bulldog",
                species: "dog",
                gender: "male",
                description: "Gigachad Bulldog",
                images: [{
                    url: "dyagwar-bulldog.jpg",
                    public_id: "dyagwar123"
                }],
                isAdopted: false,
                adoptionFee: 300,
                medical: {
                    vaccinated: true,
                    parasiteControl: {
                        tickAndFlea: false,
                        heartworn: false,
                        neutered: true
                    }
                },
                specialAssistance: false,
                kennel: kennels[2]?._id
            }
        ];

        for(const petData of mockPetsData){
            const exists = await Pet.findOne({ name: petData.name });

            if(!exists){
                await Pet.create(petData);
            }
        }

        console.log("Seeding completed (no existing data affected)")
        process.exit();
    }catch(err){
        console.log("Seeding failed", err.message);
        process.exit(1);
    }
};

export default seed;