import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";

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
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pets/mine/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ isAdopted: newStatus }),
            });

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
<<<<<<< HEAD
        <div className="bg-gradient-to-b from-[#c1d4e9] to-[#4B7FBB] min-h-screen md:p-10 flex justify-center">
            <div className="bg-white px-5 py-5 md:p-10 min-w-screen md:min-w-[0] md:max-w-[70%] md:rounded-sm">
                <div className="relative flex flex-col justify-center items-center mb-8 gap-5">
                    <div onClick={() => navigate(-1)} className="absolute top-1/2 transform -translate-y-1/2 left-0 rounded-full text-[#4B7FBB] p-3 hover:bg-gray-300 active:bg-gray-300 ease-in-out duration-300 cursor-pointer">
=======
        <div className="bg-gradient-to-b from-[#c1d4e9] to-[#4B7FBB] min-h-screen p-10 flex justify-center">
            <div className="bg-white p-10 max-w-[70%] rounded-sm">
                <div className="relative flex flex-col justify-center items-center mb-5 gap-5">
                    <div onClick={() => navigate("/private-dashboard")} className="absolute top-0 left-0 rounded-full text-[#4B7FBB] p-3 hover:bg-gray-300 active:bg-gray-300 ease-in-out duration-300 cursor-pointer">
>>>>>>> c6d0c6fadd578c968b1dc6d96234ed20bdf811c8
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </div>
<<<<<<< HEAD

                    <div>
                        <button
                            onClick={handleAdoptedButton}
                            className="bg-gray-200 px-5 py-3 rounded-full text-lg cursor-pointer transition-colors duration-300 hover:bg-gray-300"
=======
                    <button onClick={() => navigate(`/pets/mine/${id}/edit`)} className="bg-[#4B7FBB] hover:bg-[#406c9e] text-white px-5 py-3 rounded-md text-sm cursor-pointer transition-colors duration-300">Edit pet details</button>
                    <div>
                        <button
                            onClick={handleAdoptedButton}
                            className="bg-gray-100 px-5 py-3 rounded-full text-lg cursor-pointer transition-colors duration-300 hover:bg-gray-200"
>>>>>>> c6d0c6fadd578c968b1dc6d96234ed20bdf811c8
                        >Mark as <span className={`${myPetDetails.isAdopted ? "text-green-600" : "text-red-600"}`}>{myPetDetails.isAdopted ? "Available" : "Adopted"}</span>
                        </button>
                    </div>
                </div>
                <div className="border-1 border-[#406c9e] p-5 rounded-lg">

                    <p className="text-center text-[#406c9e] font-bold pb-3 text-lg">Images</p>
<<<<<<< HEAD
                    <div className="md:flex justify-center gap-8">
                        <div className="pb-5">
                            <p className="text-center text-gray-400 pb-2">Primary Image</p>
                            <img src={myPetDetails.images[0].url} alt={myPetDetails.name} className="w-60 h-60 mx-auto object-cover" />
                        </div>
                        <div className="pb-5">
=======
                    <div className="flex justify-center gap-8">
                        <div>
                            <p className="text-center text-gray-400 pb-2">Primary Image</p>
                            <img src={myPetDetails.images[0].url} alt={myPetDetails.name} className="w-60 h-60 object-cover" />
                        </div>
                        <div>
>>>>>>> c6d0c6fadd578c968b1dc6d96234ed20bdf811c8
                            <p className="text-center text-gray-400 pb-2">Secondary Images</p>
                            <div className="flex justify-center items-center">
                                {myPetDetails.images.length > 1 ? (
                                    <div className="flex gap-4">
                                        {myPetDetails.images[1]?.url && (
                                            <img
                                                src={myPetDetails.images[1].url}
                                                alt={myPetDetails.name}
<<<<<<< HEAD
                                                className="w-30 h-30 md:w-50 md:h-50 object-cover"
=======
                                                className="w-50 h-50 object-cover"
>>>>>>> c6d0c6fadd578c968b1dc6d96234ed20bdf811c8
                                            />
                                        )}
                                        {myPetDetails.images[2]?.url && (
                                            <img
                                                src={myPetDetails.images[2].url}
                                                alt={myPetDetails.name}
<<<<<<< HEAD
                                                className="w-30 h-30 md:w-50 md:h-50 object-cover"
=======
                                                className="w-50 h-50 object-cover"
>>>>>>> c6d0c6fadd578c968b1dc6d96234ed20bdf811c8
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <p className="">No secondary images uploaded.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-5 px-5 text-center">
                    <p><b className="text-[#406c9e]">Name: </b>{myPetDetails.name}</p>
                    <p><b className="text-[#406c9e]">Status: </b>{myPetDetails.isAdopted ? "Adopted" : "Available"}</p>
                    <p><b className="text-[#406c9e]">Age: </b>{myPetDetails.age}</p>
                    <p><b className="text-[#406c9e]">Breed: </b>{myPetDetails.breed}</p>
                    <p><b className="text-[#406c9e]">Species: </b>{myPetDetails.species}</p>
                    <p><b className="text-[#406c9e]">Gender: </b>{myPetDetails.gender}</p>
                    <p><b className="text-[#406c9e]">Description: </b>{myPetDetails.description}</p>
                    <p><b className="text-[#406c9e]">Adoption Fee: </b>{myPetDetails.adoptionFee}</p>
                    <p className="text-lg font-bold pt-5">Medical Details</p>
                    <p><b className="text-[#406c9e]">Vaccinated: </b> {myPetDetails.medical.vaccinated ? "Yes" : "No"}</p>
                    <p className="text-lg font-bold pt-5">Parasite Control</p>
                    <p><b className="text-[#406c9e]">Tick and Flea: </b> {myPetDetails.medical.parasiteControl.tickAndFlea ? "Yes" : "No"}</p>
                    <p><b className="text-[#406c9e]">Neutered: </b> {myPetDetails.medical.parasiteControl.neutered ? "Yes" : "No"}</p>
                    <p><b className="text-[#406c9e]">Heartworm: </b> {myPetDetails.medical.parasiteControl.heartworm ? "Yes" : "No"}</p>
                </div>
<<<<<<< HEAD
                <button onClick={() => navigate(`/pets/mine/${id}/edit`)} className="bg-[#4B7FBB] hover:bg-[#406c9e] text-white py-3 rounded-full w-[100%] mt-5 text-\lg cursor-pointer transition-colors duration-300">Edit pet details</button>
=======
>>>>>>> c6d0c6fadd578c968b1dc6d96234ed20bdf811c8
            </div>
        </div>
    )
}

export default PetDetails
