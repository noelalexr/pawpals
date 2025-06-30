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
