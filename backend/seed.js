import dotenv from "dotenv";
import bcrypt from "bcrypt";
import connectDB from "./configs/db.js";

import Developer from "./models/developerSchema.js";
import Kennel from "./models/kennelSchema.js";
import Pet from "./models/petSchema.js";

connectDB();
dotenv.config();

const seed = async () => {
    await Kennel.deleteMany();
    await Pet.deleteMany();
    await Developer.deleteMany();

    try {
        const hashedPassword = await bcrypt.hash("password123", 10);

        //dev from seed
        const existingDev = await Developer.findOne({ email: "dev@pawpals.com" });

        if (!existingDev) {
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
                documents: ["business-permit.pdf", "dti-registration.pdf"],
                role: "kennel",
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
                documents: ["veterinary-health-certificate.pdf", "business-permit.pdf"],
                role: "kennel",
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
                documents: ["pound-registration-certificate.pdf", "veterinary-health-certificate.pdf"],
                role: "kennel",
                isApproved: true
            },
            {
                name: "Animal Kingdom Foundation (AKF)",
                email: "contact@akf.com",
                password: hashedPassword,
                location: {
                    fullAddress: "No. 8 Purante St., Brgy. Cub‑cub, Capas, Tarlac",
                    citySort: "Capas, Tarlac"
                },
                contact: "0987-6543-210",
                website: "https://www.akfrescues.org/",
                socialLinks: {
                    facebook: "https://www.facebook.com/AKFanimalrescue/",
                    instagram: "https://www.instagram.com/akfanimalrescue/"
                },
                documents: ["business-permit.pdf", "pound-registration-certificate.pdf", "veterinary-health-certificate.pdf", "dti.pdf"],
                role: "kennel",
                isApproved: true
            },
            {
                name: "Pawssion Project Foundation Inc.",
                email: "contact@pawssion.com",
                password: hashedPassword,
                location: {
                    fullAddress: "1429 Paradise 1, Purok 7 Tungkong Mangga, San Jose del Monte, Bulacan",
                    citySort: "San Jose del Monte, Bulacan"
                },
                contact: "0987-6543-210",
                website: "https://pawssionproject.org.ph/",
                socialLinks: {
                    facebook: "https://www.facebook.com/PAWSsionProject",
                    tiktok: "https://www.tiktok.com/@pawssionproject"
                },
                documents: ["veterinary-health-certificate.pdf", "dti.pdf"],
                role: "kennel",
                isApproved: true
            },
            {
                name: "Animal Kingdom Foundation (AKF)",
                email: "contact@akf.com",
                password: hashedPassword,
                location: {
                    fullAddress: "No. 8 Purante St., Brgy. Cub‑cub, Capas, Tarlac",
                    citySort: "Capas, Tarlac"
                },
                contact: "0987-6543-210",
                website: "https://www.akfrescues.org/",
                socialLinks: {
                    facebook: "https://www.facebook.com/AKFanimalrescue/",
                    instagram: "https://www.instagram.com/akfanimalrescue/"
                },
                documents: ["business-permit.pdf", "pound-registration-certificate.pdf", "veterinary-health-certificate.pdf", "dti.pdf"],
                role: "kennel",
                isApproved: true
            },
            {
                name: "Pawssion Project Foundation Inc.",
                email: "contact@pawssion.com",
                password: hashedPassword,
                location: {
                    fullAddress: "1429 Paradise 1, Purok 7 Tungkong Mangga, San Jose del Monte, Bulacan",
                    citySort: "San Jose del Monte, Bulacan"
                },
                contact: "0987-6543-210",
                website: "https://pawssionproject.org.ph/",
                socialLinks: {
                    facebook: "https://www.facebook.com/PAWSsionProject",
                    tiktok: "https://www.tiktok.com/@pawssionproject"
                },
                documents: ["veterinary-health-certificate.pdf", "dti.pdf"],
                role: "kennel",
                isApproved: true
            }
        ];

        const unapprovedKennels = [
            {
                name: "Antipolo Pound (Antipolo City Hall)",
                email: "contact@antipolopound.com",
                password: hashedPassword,
                location: {
                    fullAddress: "4th floor, Antipolo City Hall, Antipolo, Rizal",
                    citySort: "Antipolo, Rizal"
                },
                contact: "0987-6543-210",
                website: "https://doggoipsum.com/",
                socialLinks: {
                    facebook: "https://www.facebook.com/",
                    instagram: "https://www.instagram.com/"
                },
                documents: ["business-permit.pdf, pound-registration-certificate.pdf", "veterinary-health-certificate.pdf"],
                role: "kennel",
                isApproved: false
            },
            {
                name: "Paw‑Gi Kennel Pom",
                email: "contact@pawgikennel.com",
                password: hashedPassword,
                location: {
                    fullAddress: "Plaza Real West Riverside SFDM, Quezon City, Metro Manila",
                    citySort: "Quezon City, Metro Manila"
                },
                contact: "0987-6543-210",
                website: "https://www.thedodo.com/dogs",
                socialLinks: {
                    facebook: "https://www.facebook.com/",
                    tiktok: "https://www.tiktok.com/"
                },
                documents: ["business-permit.pdf, animal-welfare-act-compliance-certificate.pdf", "veterinary-health-certificate.pdf"],
                role: "kennel",
                isApproved: false
            }
        ];

        for (const kennelData of [...mockApprovedKennelsData, ...unapprovedKennels]) {

            const exists = await Kennel.findOne({ email: kennelData.email });

            if (!exists) {
                await Kennel.create(kennelData);
            }
        }

        //pets posted by mock kennels
        const kennels = await Kennel.find({ isApproved: true });

        const mockPetsData = [
            {
                name: "Buddy",
                age: 3,
                arrivalDate: new Date("2025-06-30"),
                breed: "Labrador",
                species: "dog",
                gender: "male",
                description: "Friendly Labrador",
                images: {
                    primary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751287094/buddy-123235-1.jpg",
                        public_id: "buddy-123235-1"
                    },
                    secondary: null,
                    tertiary: null
                },
                isAdopted: false,
                adoptionFee: 500,
                medical: {
                    vaccinated: true,
                    parasiteControl: {
                        tickAndFlea: true,
                        heartworm: true,
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
                images: {
                    primary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751287090/bantay-1234123-1.avif",
                        public_id: "bantay-1234123-1"
                    },
                    secondary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751287219/bantay-1234123-2.png",
                        public_id: "bantay-1234123-2"
                    },
                    tertiary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751513943/bantay-1234123-3.png",
                        public_id: "bantay-1234123-3"
                    }
                },
                isAdopted: false,
                adoptionFee: 400,
                medical: {
                    vaccinated: true,
                    parasiteControl: {
                        tickAndFlea: true,
                        heartworm: true,
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
                images: {
                    primary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751287091/llao-1676890101262-1.avif",
                        public_id: "llao-1676890101262-1"
                    },
                    secondary: null,
                    tertiary: null
                },
                isAdopted: false,
                adoptionFee: 450,
                medical: {
                    vaccinated: false,
                    parasiteControl: {
                        tickAndFlea: true,
                        heartworm: true,
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
                images: {
                    primary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751287092/coco-1644767-1.png",
                        public_id: "coco-1644767-1"
                    },
                    secondary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751287091/coco-1644767-2.png",
                        public_id: "coco-1644767-2"
                    },
                    tertiary: null
                },
                isAdopted: false,
                adoptionFee: 500,
                medical: {
                    vaccinated: true,
                    parasiteControl: {
                        tickAndFlea: false,
                        heartworm: false,
                        neutered: false
                    }
                },
                specialAssistance: false,
                kennel: kennels[1]?._id
            },
            {
                name: "Dyagwar",
                age: 3,
                arrivalDate: new Date("2025-05-15"),
                breed: "Bulldog",
                species: "dog",
                gender: "male",
                description: "Gigachad Bulldog",
                images: {
                    primary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751287104/dyagwar-203424-1.png",
                        public_id: "dyagwar-203424-1"
                    },
                    secondary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751287104/dyagwar-203424-2.png",
                        public_id: "dyagwar-203424-2"
                    },
                    tertiary: null
                },
                isAdopted: false,
                adoptionFee: 300,
                medical: {
                    vaccinated: true,
                    parasiteControl: {
                        tickAndFlea: false,
                        heartworm: false,
                        neutered: true
                    }
                },
                specialAssistance: false,
                kennel: kennels[0]?._id
            },
            {
                name: "Dobby",
                age: 3,
                arrivalDate: new Date("2025-07-03"),
                breed: "Doberman",
                species: "dog",
                gender: "male",
                description: "Very Intelligent Doberman",
                images: {
                    primary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751594431/dobby-29452-1.png",
                        public_id: "dobby-29452-1"
                    },
                    secondary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751594438/dobby-29452-2.png",
                        public_id: "dobby-29452-2"
                    },
                    tertiary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751594544/dobby-29452-3.png",
                        public_id: "dobby-29452-3"
                    }
                },
                isAdopted: false,
                adoptionFee: 200,
                medical: {
                    vaccinated: true,
                    parasiteControl: {
                        tickAndFlea: false,
                        heartworm: false,
                        neutered: true
                    }
                },
                specialAssistance: false,
                kennel: kennels[2]?._id
            },
            {
                name: "ChiChi",
                age: 5,
                arrivalDate: new Date("2025-04-05"),
                breed: "Shih Tzu",
                species: "dog",
                gender: "male",
                description: "Happy and Sociable Shih Tzu",
                images: {
                    primary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751594564/chichi-123987-1.png",
                        public_id: "chichi-123987-1"
                    },
                    secondary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751594569/chichi-123987-2.png",
                        public_id: "chichi-123987-2"
                    },
                    tertiary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751594602/chichi-123987-3.png",
                        public_id: "chichi-123987-3"
                    }
                },
                isAdopted: false,
                adoptionFee: 350,
                medical: {
                    vaccinated: true,
                    parasiteControl: {
                        tickAndFlea: true,
                        heartworm: true,
                        neutered: false
                    }
                },
                specialAssistance: false,
                kennel: kennels[3]?._id
            },
            {
                name: "Benjie",
                age: 5,
                arrivalDate: new Date("2025-04-25"),
                breed: "Bengal",
                species: "cat",
                gender: "male",
                description: "Extremely Intelligent Bengal",
                images: {
                    primary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751594608/benjie-9138094-1.png",
                        public_id: "benjie-9138094-1"
                    },
                    secondary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751594613/benjie-9138094-2.png",
                        public_id: "benjie-9138094-2"
                    },
                    tertiary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751594634/benjie-9138094-3.png",
                        public_id: "benjie-9138094-3"
                    }
                },
                isAdopted: false,
                adoptionFee: 550,
                medical: {
                    vaccinated: true,
                    parasiteControl: {
                        tickAndFlea: false,
                        heartworm: false,
                        neutered: false
                    }
                },
                specialAssistance: false,
                kennel: kennels[3]?._id
            },
            {
                name: "Mr Smee",
                age: 2,
                arrivalDate: new Date("2025-04-20"),
                breed: "Sphynx",
                species: "cat",
                gender: "male",
                description: "Affectionate and Highly Intelligent Sphynx",
                images: {
                    primary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751594641/mr.-smee-123982-1.png",
                        public_id: "mr.-smee-123982-1"
                    },
                    secondary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751594644/mr.-smee-123982-2.png",
                        public_id: "mr.-smee-123982-2"
                    },
                    tertiary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751594664/mr.-smee-123982-3.png",
                        public_id: "mr.-smee-123982-3"
                    }
                },
                isAdopted: false,
                adoptionFee: 450,
                medical: {
                    vaccinated: true,
                    parasiteControl: {
                        tickAndFlea: false,
                        heartworm: false,
                        neutered: false
                    }
                },
                specialAssistance: false,
                kennel: kennels[3]?._id
            },
            {
                name: "Raggy",
                age: 1,
                arrivalDate: new Date("2025-07-03"),
                breed: "Ragdoll",
                species: "cat",
                gender: "male",
                description: "Affectionate Ragdoll",
                images: {
                    primary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751594669/raggy-9817231-1.png",
                        public_id: "raggy-9817231-1"
                    },
                    secondary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751594694/raggy-9817231-2.png",
                        public_id: "raggy-9817231-2"
                    },
                    tertiary: {
                        url: "https://res.cloudinary.com/dwspjzkcz/image/upload/v1751594717/raggy-9817231-3.png",
                        public_id: "raggy-9817231-3"
                    }
                },
                isAdopted: false,
                adoptionFee: 500,
                medical: {
                    vaccinated: true,
                    parasiteControl: {
                        tickAndFlea: true,
                        heartworm: true,
                        neutered: false
                    }
                },
                specialAssistance: false,
                kennel: kennels[3]?._id
            }

        ];


        for (const petData of mockPetsData) {
            const exists = await Pet.findOne({ name: petData.name });

            if (!exists) {
                await Pet.create(petData);
            }
        }

        console.log("Seeding completed (no existing data affected)")
        process.exit();
    } catch (err) {
        console.log("Seeding failed", err.message);
        process.exit(1);
    }
};

seed();