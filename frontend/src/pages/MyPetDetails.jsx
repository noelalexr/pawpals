import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";

//ICONS
import facebookIcon from "../assets/images/icons/facebook.png";
import instagramIcon from "../assets/images/icons/instagram.png";
import tiktokIcon from "../assets/images/icons/tiktok.png";
import pinBlueIcon from "../assets/images/icons/pin-blue.png"
import pinGrayIcon from "../assets/images/icons/pin-gray.png"
import emailBlueIcon from "../assets/images/icons/email-blue.png"
import webBlueIcon from "../assets/images/icons/website-blue.png"

//PAGES
import LoaderPage from "./LoaderPage";

//CONTEXTS
import { PublicPetContext } from "../contexts/PublicPetContext";

//LOADERS
import { fetchMyPetDetails } from "../loaders/dataLoader.js"


const PetDetails = () => {
    const navigate = useNavigate();
    const [myPetDetails, setMyPetDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();



    // const { pets } = useContext(PublicPetContext);

    // const petDetails = pets.find((pet) => String(pet._id) === id);
    // if (!petDetails) return <p className="text-center text-red-600">Pet not found.</p>;



    useEffect(() => {
        loadMyPetDetails();
    }, [id]);

    const loadMyPetDetails = async () => {
        try {
            const data = await fetchMyPetDetails(id);
            setMyPetDetails(data);
        } catch (err) {
            console.error("Failed to load my pet details:", err);
        } finally {
            setLoading(false);
        }
    };


    const handleAdoptedButton = async () => {
        const newStatus = !myPetDetails.isAdopted;

        try {
            const res = await fetch(`${import.meta.env.VITE_MY_PETS_API}/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ isAdopted: newStatus }),
            });
            toast.success(
                myPetDetails.isAdopted
                    ? "Marked as Available!"
                    : "Marked as Adopted!"
            );
            if (!res.ok) throw new Error("Failed to update adoption status");
            await loadMyPetDetails();
        } catch (err) {
            console.error("Error updating adoption status:", err);
        }
    };

    console.log(myPetDetails)

    if (loading) {
        return <LoaderPage />;
    }


    return (
        <div className="bg-gradient-to-b from-[#c1d4e9] to-[#4B7FBB] min-h-screen md:p-5 flex justify-center">
            <div className="bg-white px-5 py-5 md:p-10 min-w-screen md:min-w-[0] md:max-w-[70%] md:rounded-sm">
                <div className="relative flex flex-col justify-center items-center mb-8 gap-5">
                    <div onClick={() => navigate(-1)} className="absolute top-1/2 transform -translate-y-1/2 left-0 rounded-full text-[#4B7FBB] p-3 hover:bg-gray-300 active:bg-gray-300 ease-in-out duration-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </div>

                    <div>
                        <button
                            onClick={handleAdoptedButton}
                            className="bg-gray-200 px-5 py-3 rounded-full text-lg cursor-pointer transition-colors duration-300 hover:bg-gray-300"
                        >Mark as <span className={`${myPetDetails.isAdopted ? "text-green-600" : "text-red-600"}`}>{myPetDetails.isAdopted ? "Available" : "Adopted"}</span>
                        </button>
                    </div>
                </div>
                <div className="border-1 border-[#406c9e] pb-5 pt-3 px-5 rounded-lg">

                    <p className="text-lg font-semibold pb-1 text-center">Images</p>
                    <div className="md:flex flex-wrap justify-center gap-8">
                        <div className="pb-5 md:pb-0">
                            <p className="text-center text-[#406c9e] pb-2">Primary Image</p>
                            <img src={myPetDetails.images[0].url} alt={myPetDetails.name} className="w-60 h-60 mx-auto object-cover rounded-lg" />
                        </div>
                        <div className="bg-gray-200 py-3 px-4 rounded-lg my-auto">
                            <p className="text-center text-[#406c9e] pb-2">Secondary Images</p>

                            <div className="flex flex-row justify-center items-center gap-4">
                                {myPetDetails.images[1]?.url ? (
                                    <img
                                        src={myPetDetails.images[1].url}
                                        alt={myPetDetails.name}
                                        className="w-30 h-30 md:w-45 md:h-45 object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="w-30 h-30 md:w-45 md:h-45 bg-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                                        No Image
                                    </div>
                                )}
                                {myPetDetails.images[2]?.url ? (
                                    <img
                                        src={myPetDetails.images[2].url}
                                        alt={myPetDetails.name}
                                        className="w-30 h-30 md:w-45 md:h-45 object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="w-30 h-30 md:w-45 md:h-45 bg-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                                        No Image
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
                <div className="py-10 px-5 text-center md:flex flex-row justify-center gap-10">
                    <div className="bg-gray-100 px-7 py-3 rounded-md flex flex-col justify-center">
                        <p className="text-lg font-semibold pb-1">Basic Information</p>
                        <p><span className="text-[#406c9e]">Name: </span>{myPetDetails.name}</p>
                        <p><span className="text-[#406c9e]">Status: </span>{myPetDetails.isAdopted ? "Adopted" : "Available"}</p>
                        <p><span className="text-[#406c9e]">Age: </span>{myPetDetails.age}</p>
                        <p><span className="text-[#406c9e]">Breed: </span>{myPetDetails.breed}</p>
                        <p><span className="text-[#406c9e]">Species: </span>{myPetDetails.species}</p>
                        <p><span className="text-[#406c9e]">Gender: </span>{myPetDetails.gender}</p>
                        <p><span className="text-[#406c9e]">Description: </span>{myPetDetails.description}</p>
                        <p><span className="text-[#406c9e]">Adoption Fee: </span>{myPetDetails.adoptionFee}</p>
                    </div>
                    <div className="md:flex flex-col justify-center items-center gap-10">
                        <div className="bg-gray-100 px-7 py-3 rounded-md flex flex-col justify-center mt-5 md:mt-0">
                            <p className="text-lg font-semibold pb-1">Medical Details</p>
                            <p><span className="text-[#406c9e]">Vaccinated: </span> {myPetDetails.medical.vaccinated ? "Yes" : "No"}</p>
                        </div>
                        <div className="bg-gray-100 px-7 py-3 rounded-md flex flex-col justify-center mt-5 md:mt-0">
                            <p className="text-lg font-semibold pb-1">Parasite Control</p>

                            <p><span className="text-[#406c9e]">Tick and Flea: </span> {myPetDetails.medical.parasiteControl.tickAndFlea ? "Yes" : "No"}</p>
                            <p><span className="text-[#406c9e]">Neutered: </span> {myPetDetails.medical.parasiteControl.neutered ? "Yes" : "No"}</p>
                            <p><span className="text-[#406c9e]">Heartworm: </span> {myPetDetails.medical.parasiteControl.heartworm ? "Yes" : "No"}</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => navigate(`/private-dashboard/pets/mine/${id}/edit`)} className="bg-[#4B7FBB] hover:bg-[#406c9e] text-white py-3 rounded-full w-[80%] block mx-auto cursor-pointer transition-colors duration-300">Edit pet details</button>
            </div>
        </div>
    )
}

export default PetDetails
