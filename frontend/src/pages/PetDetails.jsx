import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";

//ICONS
import facebookIcon from "../assets/images/icons/facebook.png";
import instagramIcon from "../assets/images/icons/instagram.png";
import tiktokIcon from "../assets/images/icons/tiktok.png";

//CONTEXTS
import { PublicPetContext } from "../contexts/PublicPetContext";


const PetDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { pets } = useContext(PublicPetContext);

    const petDetails = pets.find((pet) => String(pet._id) === id);
    if (!petDetails) return <p className="text-center text-red-600">Pet not found.</p>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#c1d4e9] to-[#4B7FBB] p-15 bg-fixed">

            <div className="flex justify-center gap-2">
                <img src={petDetails.images[0].url} alt={petDetails.name} className="rotate-4 rounded-2xl w-130 h-130 object-cover shadow-gray-700 shadow-lg z-1 hover:scale-105 hover:rotate-0 transition-all duration-300" />
                <div className="flex flex-col gap-5 justify-center items-center my-auto">
                    <div className="flex justify-center gap-3">
                        {petDetails.images[1]?.url && (
                            <img src={petDetails.images[1].url} alt={petDetails.name} className="-rotate-5 mt-8 rounded-2xl w-50 h-50 object-cover shadow-gray-700 shadow-lg hover:scale-120 hover:rotate-0 transition-all duration-300 hover:z-1" />
                        )}
                        {petDetails.images[2]?.url && (
                            <img src={petDetails.images[2].url} alt={petDetails.name} className="rotate-8 mb-3 rounded-2xl w-50 h-50 object-cover shadow-gray-700 shadow-lg hover:scale-120 hover:rotate-0 transition-all duration-300 hover:z-1" />
                        )}
                    </div>
                    <div className="bg-white w-110 my-auto px-10 py-7 rounded-4xl -rotate-2 shadow-gray-700 shadow-xs">
                        <div className="flex justify-between">
                            <div>
                                <p className="text-3xl">{petDetails.name}</p>
                                <p className="text-gray-400">{petDetails.breed}</p>
                            </div>
                            <div className="flex my-auto text-[#4B7FBB]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                <p className="">{petDetails.kennel.location.citySort}</p>
                            </div>
                        </div>
                        <div className="bg-gray-300 w-[100%] h-[1px] rounded-full my-5"></div>
                        <div className="flex justify-center gap-8">
                            <div className="flex flex-col justify-center items-center bg-gray-300 h-17 w-25 rounded-xl">
                                <p className="text-sm text-gray-500">Age</p>
                                <p className="text-black">
                                    {petDetails.age} {petDetails.age > 1 ? "Years" : "Year"}
                                </p>
                            </div>

                            <div className="flex flex-col justify-center items-center bg-gray-300 h-17 w-25 rounded-xl">
                                <p className="text-sm text-gray-500">Sex</p>
                                <p className="text-black">{petDetails.gender}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="py-8 px-10 bg-white mt-5 rounded-sm max-w-230 mx-auto">
                <div>
                    <p className="text-[#4B7FBB] text-sm">Description</p>
                    <p className="py-2 px-5 text-sm">{petDetails.description}</p>
                </div>
                <div className="bg-gray-300 w-[100%] h-[1px] rounded-full my-5"></div>
                <div className="text-center">
                    <p className="text-[#4B7FBB] text-2xl pb-3">Kennel Infromation</p>
                    <p className="text-xl font-semibold">{petDetails.kennel.name}</p>
                    <p className="text-gray-400 text-sm">{petDetails.kennel.location.fullAddress}</p>
                    <div className="bg-gray-100 py-3 px-5 max-w-120 mx-auto my-5 rounded-xl text-sm">
                        <p className="text-gray-500 pb-2 text-lg">Contact Details</p>
                        <p>
                            <span className="text-[#4B7FBB]">Email: </span>
                            <a href={`mailto:${petDetails.kennel.email}`} className="hover:underline">{petDetails.kennel.email}</a>
                        </p>
                        <p>
                            <span className="text-[#4B7FBB]">Website: </span>
                            <a href={petDetails.kennel.website} target="_blank" rel="noopener noreferrer" className="hover:underline">{petDetails.kennel.website}</a>
                        </p>
                        <div className="flex gap-2 justify-center py-3">
                            {petDetails.kennel.socialLinks?.facebook && (
                                <a
                                    href={petDetails.kennel.socialLinks.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="my-auto hover:scale-108 transition-all duration-300"
                                >
                                    <img src={facebookIcon} alt="facebook" className="w-10" />
                                </a>
                            )}
                            {petDetails.kennel.socialLinks?.instagram && (
                                <a
                                    href={petDetails.kennel.socialLinks.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="my-auto hover:scale-108 transition-all duration-300"
                                >
                                    <img src={instagramIcon} alt="instagram" className="w-[45px]" />
                                </a>
                            )}
                            {petDetails.kennel.socialLinks?.tiktok && (
                                <a
                                    href={petDetails.kennel.socialLinks.tiktok}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="my-auto hover:scale-108 transition-all duration-300"
                                >
                                    <img src={tiktokIcon} alt="tiktok" className="w-[47px]" />
                                </a>
                            )}
                        </div>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PetDetails
