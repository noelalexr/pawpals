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

//CONTEXTS
import { PublicPetContext } from "../contexts/PublicPetContext";


const PetDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { pets } = useContext(PublicPetContext);

    const petDetails = pets.find((pet) => String(pet._id) === id);
    if (!petDetails) return <p className="text-center text-red-600">Pet not found.</p>;

    const createdAt = new Date(petDetails.createdAt);
<<<<<<< HEAD
=======

    const photoStyleDate = createdAt.getFullYear()
        + '.' + String(createdAt.getMonth() + 1).padStart(2, '0')
        + '.' + String(createdAt.getDate()).padStart(2, '0')
        + ' ' + String(createdAt.getHours()).padStart(2, '0')
        + ':' + String(createdAt.getMinutes()).padStart(2, '0');



    return (
        <div className="min-h-screen bg-gradient-to-b from-[#c1d4e9] to-[#4B7FBB] p-15 bg-fixed">
>>>>>>> c6d0c6fadd578c968b1dc6d96234ed20bdf811c8

    const photoStyleDate = createdAt.getFullYear()
        + '.' + String(createdAt.getMonth() + 1).padStart(2, '0')
        + '.' + String(createdAt.getDate()).padStart(2, '0')
        + ' ' + String(createdAt.getHours()).padStart(2, '0')
        + ':' + String(createdAt.getMinutes()).padStart(2, '0');



    return (
        <div className="min-h-screen bg-gradient-to-b from-[#c1d4e9] to-[#4B7FBB] md:p-15 bg-fixed">

            <div className="flex flex-col md:flex-row justify-center -space-y-10 md:gap-2">
                <img src={petDetails.images[0].url} alt={petDetails.name} className="md:rotate-4 md:rounded-2xl w-[100%] h-75 md:w-130 md:h-130 object-cover md:z-1 md:shadow-gray-700 shadow-lg md:hover:scale-105 md:hover:rotate-0 transition-all duration-300" />
                <div onClick={() => navigate("/public-dashboard")} className="absolute md:top-10 md:left-10 top-2 left-2 rounded-full text-white bg-[#4B7FBB] p-3 hover:bg-[#3d699b] active:bg-[#3d699b] ease-in-out duration-300 cursor-pointer z-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </div>
                <div className="flex flex-col md:gap-5 justify-center items-center my-auto">
                    <div className="flex md:justify-center justify-around md:gap-3 w-[100%]">
                        {petDetails.images[1]?.url && (
                            <div className="bg-gray-100 p-4 pb-3 -rotate-5 mt-8 shadow-gray-700 shadow-lg hover:scale-125 hover:rotate-0 transition-all duration-300 hover:z-1">
<<<<<<< HEAD
                                <img src={petDetails.images[1].url} alt={petDetails.name} className="md:w-50 md:h-50 w-30 h-30 object-cover border-1 border-gray-400" />
=======
                                <img src={petDetails.images[1].url} alt={petDetails.name} className="w-50 h-50 object-cover border-1 border-gray-400" />
>>>>>>> c6d0c6fadd578c968b1dc6d96234ed20bdf811c8
                                <p className="pt-3 text-[9px] text-gray-400 text-right">posted: {photoStyleDate}</p>
                            </div>
                        )}
                        {petDetails.images[2]?.url && (
                            <div className="bg-gray-100 p-4 pb-3 rotate-8 mb-auto shadow-gray-700 shadow-lg hover:scale-125 hover:rotate-0 transition-all duration-300 hover:z-1">
<<<<<<< HEAD
                                <img src={petDetails.images[2].url} alt={petDetails.name} className="md:w-50 md:h-50 w-30 h-30 object-cover border-1 border-gray-400" />
=======
                                <img src={petDetails.images[2].url} alt={petDetails.name} className="w-50 h-50 object-cover border-1 border-gray-400" />
>>>>>>> c6d0c6fadd578c968b1dc6d96234ed20bdf811c8
                                <p className="pt-3 text-[9px] text-gray-400 text-right">posted: {photoStyleDate}</p>
                            </div>
                        )}
                    </div>
<<<<<<< HEAD

                    <div className="bg-white md:w-110 w-[100%] my-auto md:px-10 md:py-7 p-6 rounded-t-2xl md:rounded-3xl md:-rotate-2 md:shadow-gray-700 md:shadow-xs mx-auto">
=======
                    <div className="bg-white w-110 my-auto px-10 py-7 rounded-4xl -rotate-2 shadow-gray-700 shadow-xs mx-auto">
>>>>>>> c6d0c6fadd578c968b1dc6d96234ed20bdf811c8
                        <div className="flex gap-5 justify-between">
                            <div>
                                <p className="md:text-3xl text-2xl">{petDetails.name}</p>
                                <p className="text-gray-400">{petDetails.breed}</p>
                            </div>
                            <div className="flex justify-center my-auto text-[#4B7FBB] ">
                                <p className="text-right">
                                    <img src={pinBlueIcon} alt="Pin Icon" className="w-5 inline-block mx-1 my-auto" />
                                    {petDetails.kennel.location.citySort}
                                </p>
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
            <div className="py-8 md:px-10 px-5 bg-white -mt-3 md:mt-5 md:rounded-sm max-w-230 mx-auto">
                <div>
                    <p className="text-[#4B7FBB] text-sm">Description</p>
                    <p className="py-2 px-5 text-sm">{petDetails.description}</p>
                </div>
                <div className="bg-gray-300 w-[100%] h-[1px] rounded-full my-5"></div>
                <div className="text-center">
                    <p className="text-[#4B7FBB] text-2xl pb-3">Kennel Infromation</p>
                    <p className="text-xl font-semibold pt-3">{petDetails.kennel.name}</p>
                    <p className="text-gray-400 text-sm my-auto pb-3">
                        <img src={pinGrayIcon} alt="Pin Icon" className="w-5 inline-block mx-1 my-auto" />
                        {petDetails.kennel.location.fullAddress}
                    </p>
                    <div className="bg-gray-100 p-5 max-w-120 mx-auto my-5 rounded-xl text-sm">
                        <p className="text-gray-500 pb-3 text-lg">Email and Website</p>
                        <p className="pb-2">
                            <a href={`mailto:${petDetails.kennel.email}`} className="hover:underline text-[#4B7FBB]">
                                <img src={emailBlueIcon} alt="Email Icon" className="w-5 inline-block mx-1 my-auto mr-1" />
                                {petDetails.kennel.email}
                            </a>
                        </p>
                        <p>
                            <a href={petDetails.kennel.website} target="_blank" rel="noopener noreferrer" className="hover:underline text-[#4B7FBB]">
                                <img src={webBlueIcon} alt="Website Icon" className="w-5 inline-block mx-1 my-auto mr-1" />
                                {petDetails.kennel.website}
                            </a>
                        </p>
                        <p className="text-gray-500 pb-3 text-lg pt-7">Connect to them via:</p>
                        <div className="flex gap-2 justify-center">
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
