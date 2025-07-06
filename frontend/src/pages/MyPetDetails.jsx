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
import webBlueIcon from "../assets/images/icons/website-blue.png"//ICONS
import pawIcon from "../assets/images/icons/paw.png";

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
        <div className="bg-gradient-to-b from-[#c1d4e9] to-[#4B7FBB] min-h-screen md:p-5 flex justify-center text-sm">
            <div className="relative bg-white px-5 py-5 md:p-10 min-w-screen md:min-w-[0] md:max-w-[70%] md:rounded-sm">
                <div className='absolute flex gap-1 md:right-5 md:top-4 right-3 top-2'>
                    <h1 className='outfit md:text-sm text-xs font-bold my-auto'><span className='text-[#3B6FA1]'>Paw</span><span className='text-gray-700'>Pals</span></h1>
                    <img src={pawIcon} alt="paw" className='md:w-4 md:h-4 w-3 h-3 m-auto' />
                </div>
                <div className="relative flex flex-col justify-center items-center mb-8">
                    <div onClick={() => navigate(-1)} className="absolute top-1/2 transform -translate-y-1/2 left-0 rounded-full text-[#4B7FBB] p-3 hover:bg-gray-300 active:bg-gray-300 ease-in-out duration-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </div>

                    <div>
                        <button
                            onClick={handleAdoptedButton}
                            className="bg-gray-200 px-5 py-3 rounded-full md:text-lg cursor-pointer transition-colors duration-300 hover:bg-gray-300"
                        >Mark as <span className={`${myPetDetails.isAdopted ? "text-green-600" : "text-red-600"}`}>{myPetDetails.isAdopted ? "Available" : "Adopted"}</span>
                        </button>
                    </div>
                </div>
                <div className="border-3 border-[#4B7FBB5d] pb-8 pt-5 px-8 rounded-xl">

                    <p className="text-md font-semibold pb-1 text-center">Images</p>
                    <div className="md:flex flex-wrap justify-center gap-10">
                        <div className="pb-5 md:pb-0">
                            <p className="text-center text-[#4B7FBB] pb-2">Primary Image</p>
                            <img src={myPetDetails.images.primary.url} alt={myPetDetails.name} className="w-60 h-60 mx-auto object-cover rounded-lg border-2 border-gray-300" />
                        </div>
                        <div className="bg-gray-100 pb-4 pt-2 px-4 rounded-lg my-auto">
                            <p className="text-center text-[#4B7FBB] pb-2">Secondary Image</p>
                            <div className="flex justify-center items-center">
                                {myPetDetails.images?.secondary?.url ? (
                                    <img
                                        src={myPetDetails.images.secondary.url}
                                        alt={myPetDetails.name}
                                        className="w-30 h-30 md:w-45 md:h-45 object-cover rounded-lg border-2 border-gray-300"
                                    />
                                ) : (
                                    <div className="w-30 h-30 md:w-45 md:h-45 bg-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                                        No Image
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="bg-gray-100 pb-4 pt-2 px-4 rounded-lg my-auto">
                            <p className="text-center text-[#4B7FBB] pb-2">Tertiary Image</p>
                            <div className="flex justify-center items-center">
                                {myPetDetails.images?.tertiary?.url ? (
                                    <img
                                        src={myPetDetails.images.tertiary.url}
                                        alt={myPetDetails.name}
                                        className="w-30 h-30 md:w-45 md:h-45 object-cover rounded-lg border-2 border-gray-300"
                                    />
                                ) : (
                                    <div className="w-30 h-30 md:w-45 md:h-45 bg-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                                        No Image
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:px-7 px-3 pt-12 rounded-md md:w-[80%] md:mx-auto ">
                    <p className="text-md font-semibold pb-1">Description</p>
                    <p className="px-5">{myPetDetails.description}</p>
                </div>
                <div className="bg-[#4b7fbb5c] md:w-[85%] h-[2px] rounded-full mx-auto mt-10 mb-7"></div>
                <div className=" pb-5 px-5 text-center md:flex flex-row justify-center gap-5">
                    <div className="bg-gray-100 px-7 py-5 rounded-md flex flex-col justify-center">
                        <p className="text-md font-semibold pb-1">Basic Information</p>
                        <p><span className="text-[#4B7FBB]">Name: </span>{myPetDetails.name}</p>
                        <p><span className="text-[#4B7FBB]">Status: </span>{myPetDetails.isAdopted ? "Adopted" : "Available"}</p>
                        <p>
                            <span className="text-[#4B7FBB]">Age: </span>
                            {myPetDetails.age} {myPetDetails.age === 1 ? "year" : "years"} old
                        </p>
                        <p><span className="text-[#4B7FBB]">Breed: </span>{myPetDetails.breed}</p>
                        <p><span className="text-[#4B7FBB]">Species: </span>{myPetDetails.species}</p>
                        <p><span className="text-[#4B7FBB]">Gender: </span>{myPetDetails.gender}</p>
                        <p><span className="text-[#4B7FBB]">Adoption Fee: </span>{new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", }).format(myPetDetails.adoptionFee)}</p>
                    </div>
                    <div className="md:flex flex-col justify-center items-center gap-5">
                        <div className="bg-gray-100 px-7 py-3 rounded-md flex flex-col justify-center mt-5 md:mt-0 w-[100%]">
                            <p className="text-md font-semibold pb-1">Special Assistance</p>
                            <p><span className="text-[#4B7FBB]">Needed: </span> {myPetDetails.specialAssistance ? "Yes" : "No"}</p>
                        </div>
                        <div className="bg-gray-100 px-7 py-3 rounded-md flex flex-col justify-center mt-5 md:mt-0 w-[100%]">
                            <p className="text-md font-semibold pb-1">Medical Details</p>
                            <p><span className="text-[#4B7FBB]">Vaccinated: </span> {myPetDetails.medical.vaccinated ? "Yes" : "No"}</p>
                        </div>
                        <div className="bg-gray-100 px-7 py-3 rounded-md flex flex-col justify-center mt-5 md:mt-0 w-[100%]">
                            <p className="text-md font-semibold pb-1">Parasite Control</p>

                            <p><span className="text-[#4B7FBB]">Tick and Flea: </span> {myPetDetails.medical.parasiteControl.tickAndFlea ? "Yes" : "No"}</p>
                            <p><span className="text-[#4B7FBB]">Neutered: </span> {myPetDetails.medical.parasiteControl.neutered ? "Yes" : "No"}</p>
                            <p><span className="text-[#4B7FBB]">Heartworm: </span> {myPetDetails.medical.parasiteControl.heartworm ? "Yes" : "No"}</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => navigate(`/private-dashboard/pets/mine/${id}/edit`)} className="bg-[#4B7FBB] hover:bg-[#406c9e] text-white py-3 mt-10 rounded-lg w-[100%] block mx-auto cursor-pointer transition-colors duration-300 text-lg">Edit pet details</button>
            </div>
        </div>
    )
}

export default PetDetails
