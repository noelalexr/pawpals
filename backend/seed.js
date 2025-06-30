<<<<<<< HEAD
// seed.js
import mongoose from 'mongoose';
import petModel from './models/petSchema.js';
import kennelModel from './models/kennelSchema.js';

const mongoURI = 'mongodb://localhost:27017/PawPals'; // Replace with your DB name

await mongoose.connect(mongoURI);
console.log("✅ Connected to MongoDB");

const kennelData = [
    {
        _id: new mongoose.Types.ObjectId("665f1c1f1f1f1f1f1f1f1f01"),
        name: "Happy Paws Shelter",
        email: "contact@happypaws.com",
        password: "hashed_password_1",
        location: {
            fullAddress: "123 Paw Street, Barksville, PH",
            citySort: "Barksville"
        },
        contact: "09981234567",
        website: "https://happypaws.com",
        socialLinks: {
            facebook: "https://facebook.com/happypaws",
            instagram: "https://instagram.com/happypaws",
        },
        documents: ["https://example.com/documents/happypaws-registration.pdf"],
        isApproved: true
    },
    {
        _id: new mongoose.Types.ObjectId("665f1c1f1f1f1f1f1f1f1f02"),
        name: "Whisker Haven",
        email: "hello@whiskerhaven.org",
        password: "hashed_password_2",
        location: {
            fullAddress: "456 Meow Avenue, Catstown, PH",
            citySort: "Catstown"
        },
        contact: "09989876543",
        website: "https://whiskerhaven.org",
        socialLinks: {
            facebook: "https://facebook.com/whiskerhaven"
        },
        documents: ["https://example.com/documents/whiskerhaven-license.pdf"],
        isApproved: true
    },
    {
        _id: new mongoose.Types.ObjectId("665f1c1f1f1f1f1f1f1f1f03"),
        name: "Forever Home PH",
        email: "admin@foreverhome.ph",
        password: "hashed_password_3",
        location: {
            fullAddress: "789 Rescue Lane, Petville, PH",
            citySort: "Petville"
        },
        contact: "09987776655",
        website: "https://foreverhome.ph",
        socialLinks: {
            instagram: "https://instagram.com/foreverhomeph"
        },
        documents: ["https://example.com/documents/foreverhome-cert.pdf"],
        isApproved: true
    }
];

// Paste the `pets` array from earlier here
const petData = [
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Buddy",
        gender: "Male",
        age: 3,
        arrivalDate: new Date("2024-12-01"),
        breed: "Golden Retriever",
        species: "Dog",
        description: "A friendly and energetic dog who loves playing fetch.",
        images: [
            {
                url: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHBldHxlbnwwfHwwfHx8MA%3D%3D",
                public_id: "pet_buddy"
            },
            {
                url: "https://images.unsplash.com/photo-1595088716394-74b9cc33f18d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z29sZGVuJTIwcmV0cml2ZXJ8ZW58MHx8MHx8fDA%3D",
                public_id: "pet_buddy2"
            },
            {
                url: "https://images.unsplash.com/photo-1609075797584-c766367e5fc0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z29sZGVuJTIwcmV0cml2ZXJ8ZW58MHx8MHx8fDA%3D",
                public_id: "pet_buddy3"
            },

        ],
        isAdopted: false,
        adoptionFee: 1500,
        medical: {
            vaccinated: true,
            parasiteControl: {
                tickAndFlea: true,
                heartworm: false,
                neutered: true
            }
        },
        specialAssistance: false,
        kennel: "665f1c1f1f1f1f1f1f1f1f01"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Luna",
        gender: "Female",
        age: 2,
        arrivalDate: new Date("2025-01-20"),
        breed: "Siamese",
        species: "Cat",
        description: "Elegant and vocal, loves attention and sunny spots.",
        images: [
            {
                url: "https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2lhbWVzZXxlbnwwfHwwfHx8MA%3D%3D",
                public_id: "pet_luna"
            }
        ],
        isAdopted: false,
        adoptionFee: 1200,
        medical: {
            vaccinated: true,
            parasiteControl: {
                tickAndFlea: true,
                heartworm: false,
                neutered: true
            }
        },
        specialAssistance: false,
        kennel: "665f1c1f1f1f1f1f1f1f1f02"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Max",
        gender: "Male",
        age: 5,
        arrivalDate: new Date("2023-10-10"),
        breed: "Beagle",
        species: "Dog",
        description: "Loves sniffing around, good with kids.",
        images: [
            {
                url: "https://plus.unsplash.com/premium_photo-1663127048434-84db6f90f08d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmVhZ2xlfGVufDB8fDB8fHww",
                public_id: "pet_max"
            }
        ],
        isAdopted: false,
        adoptionFee: 1000,
        medical: {
            vaccinated: true,
            parasiteControl: {
                tickAndFlea: true,
                heartworm: true,
                neutered: false
            }
        },
        specialAssistance: false,
        kennel: "665f1c1f1f1f1f1f1f1f1f01"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Mochi",
        gender: "Female",
        age: 1,
        arrivalDate: new Date("2025-05-01"),
        breed: "Scottish Fold",
        species: "Cat",
        description: "Quiet and cuddly, prefers calm environments.",
        images: [
            {
                url: "https://images.unsplash.com/photo-1632823468192-3d764845d037?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2NvdHRpc2glMjBmb2xkfGVufDB8fDB8fHww",
                public_id: "pet_mochi"
            }
        ],
        isAdopted: false,
        adoptionFee: 1300,
        medical: {
            vaccinated: true,
            parasiteControl: {
                tickAndFlea: false,
                heartworm: false,
                neutered: true
            }
        },
        specialAssistance: true,
        kennel: "665f1c1f1f1f1f1f1f1f1f02"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Shadow",
        gender: "Male",
        age: 4,
        arrivalDate: new Date("2024-07-15"),
        breed: "Black Labrador",
        species: "Dog",
        description: "Strong and loyal, needs space to run.",
        images: [
            {
                url: "https://images.unsplash.com/photo-1630053905273-2dd2f41f0127?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBsYWJyYWRvcnxlbnwwfHwwfHx8MA%3D%3D",
                public_id: "pet_shadow"
            }
        ],
        isAdopted: false,
        adoptionFee: 1100,
        medical: {
            vaccinated: true,
            parasiteControl: {
                tickAndFlea: true,
                heartworm: true,
                neutered: true
            }
        },
        specialAssistance: false,
        kennel: "665f1c1f1f1f1f1f1f1f1f03"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Snow",
        gender: "Female",
        age: 2,
        arrivalDate: new Date("2025-03-18"),
        breed: "Persian",
        species: "Cat",
        description: "Long-haired white beauty, very docile.",
        images: [
            {
                url: "https://images.unsplash.com/photo-1622584985171-35cd07f0253e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBlcnNpYW4lMjBjYXR8ZW58MHx8MHx8fDA%3D",
                public_id: "pet_snow"
            }
        ],
        isAdopted: false,
        adoptionFee: 1400,
        medical: {
            vaccinated: true,
            parasiteControl: {
                tickAndFlea: true,
                heartworm: false,
                neutered: true
            }
        },
        specialAssistance: false,
        kennel: "665f1c1f1f1f1f1f1f1f1f02"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Rusty",
        gender: "Male",
        age: 6,
        arrivalDate: new Date("2024-11-30"),
        breed: "Mixed",
        species: "Dog",
        description: "Older but very gentle, great for seniors.",
        images: [
            {
                url: "https://images.unsplash.com/photo-1617036877455-5fdd96bd5953?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1peGVkJTIwYnJlZWQlMjBkb2d8ZW58MHx8MHx8fDA%3D",
                public_id: "pet_rusty"
            }
        ],
        isAdopted: false,
        adoptionFee: 900,
        medical: {
            vaccinated: true,
            parasiteControl: {
                tickAndFlea: true,
                heartworm: true,
                neutered: false
            }
        },
        specialAssistance: true,
        kennel: "665f1c1f1f1f1f1f1f1f1f01"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Chibi",
        gender: "Female",
        age: 1,
        arrivalDate: new Date("2025-04-04"),
        breed: "Shih Tzu",
        species: "Dog",
        description: "Tiny, playful, and great for apartments.",
        images: [
            {
                url: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hpaCUyMHR6dXxlbnwwfHwwfHx8MA%3D%3D",
                public_id: "pet_chibi"
            }
        ],
        isAdopted: false,
        adoptionFee: 1500,
        medical: {
            vaccinated: true,
            parasiteControl: {
                tickAndFlea: true,
                heartworm: false,
                neutered: false
            }
        },
        specialAssistance: false,
        kennel: "665f1c1f1f1f1f1f1f1f1f03"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Zelda",
        gender: "Female",
        age: 3,
        arrivalDate: new Date("2025-01-12"),
        breed: "Bengal",
        species: "Cat",
        description: "Energetic and talkative, loves to climb.",
        images: [
            {
                url: "https://images.unsplash.com/photo-1717768555818-5f057723d678?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlbmdhbCUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D",
                public_id: "pet_zelda"
            }
        ],
        isAdopted: false,
        adoptionFee: 1700,
        medical: {
            vaccinated: true,
            parasiteControl: {
                tickAndFlea: true,
                heartworm: false,
                neutered: true
            }
        },
        specialAssistance: false,
        kennel: "665f1c1f1f1f1f1f1f1f1f02"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Coco",
        gender: "Female",
        age: 4,
        arrivalDate: new Date("2024-06-10"),
        breed: "Poodle",
        species: "Dog",
        description: "Smart and hypoallergenic, needs mental stimulation.",
        images: [
            {
                url: "https://images.unsplash.com/photo-1724989755339-6d76cbbe93db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBvb2RsZSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D",
                public_id: "pet_coco"
            }
        ],
        isAdopted: false,
        adoptionFee: 1600,
        medical: {
            vaccinated: true,
            parasiteControl: {
                tickAndFlea: true,
                heartworm: true,
                neutered: true
            }
        },
        specialAssistance: false,
        kennel: "665f1c1f1f1f1f1f1f1f1f01"
    }
];



async function seedDatabase() {
    try {
        await kennelModel.deleteMany();
        await petModel.deleteMany();

        await kennelModel.insertMany(kennelData);
        console.log("✅ Kennel data inserted");

        await petModel.insertMany(petData);
        console.log("✅ Pet data inserted");

        await mongoose.disconnect();
        console.log("🚪 Disconnected from MongoDB");
    } catch (err) {
        console.error("❌ Error seeding data:", err);
    }
}

await seedDatabase();
=======
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
>>>>>>> 93a2dd085ef8afe96970fd3d3a95e2db8f6290fc
