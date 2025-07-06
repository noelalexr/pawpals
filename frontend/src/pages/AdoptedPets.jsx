import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { toast } from "react-toastify";

//ICONS
import pawIcon from "../assets/images/icons/paw.png";
import dogsIcon from "../assets/images/icons/dog.png"
import catsIcon from "../assets/images/icons/cat.png"
import birdsIcon from "../assets/images/icons/bird.png"
import maleIcon from "../assets/images/icons/male.png"
import femaleIcon from "../assets/images/icons/female.png"
import aboutUsIcon from "../assets/images/icons/about-us.png"

//PAGES
import LoaderPage from "./LoaderPage.jsx";

//LOADERS
import { fetchMyPets } from "../loaders/dataLoader.js"
import { fetchLoggedinKennel } from "../loaders/dataLoader";


const AdoptedPets = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [selectedSpecies, setSelectedSpecies] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedAgeRange, setSelectedAgeRange] = useState("");
    const [filteredMyPets, setFilteredMyPets] = useState([]);
    const [myPets, setMyPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [kennelName, setKennelName] = useState("");
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const loadMyPets = async () => {
            try {
                const data = await fetchMyPets();
                const availablePets = data
                    .filter(pet => pet.isAdopted === true)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setMyPets(availablePets);
            } catch (err) {
                console.error("Failed to load my pets:", err);
            } finally {
                setLoading(false);
            }
        };
        loadMyPets();
    }, []);

    useEffect(() => {
        const getKennelName = async () => {
            const user = await fetchLoggedinKennel();
            if (user) setKennelName(user.name);
        };
        getKennelName();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const ageRanges = [
        { label: "All Ages", value: "" },
        { label: "Puppy (0-2 years old)", value: "0-2" },
        { label: "Young adult (3-5 years old)", value: "3-5" },
        { label: "Adult (6-10 years old)", value: "6-10" },
        { label: "Senior (11+ years old)", value: "11+" },
    ];

    const handleSpeciesClick = (species) => {
        setSelectedSpecies(prev => prev === species ? "" : species);
    };

    const handleGenderClick = (gender) => {
        setSelectedGender(prev => prev === gender ? "" : gender);
    };

    const applyFilters = (searchText, species, gender, ageRange, city) => {
        let filteredData = [...myPets];

        if (species) {
            filteredData = filteredData.filter(
                (pet) => pet.species.toLowerCase() === species.toLowerCase()
            );
        }

        if (gender) {
            filteredData = filteredData.filter(
                (pet) => pet.gender.toLowerCase() === gender.toLowerCase()
            );
        }

        if (searchText.trim() !== "") {
            filteredData = filteredData.filter((pet) =>
                pet.name.toLowerCase().includes(searchText.toLowerCase()) ||
                pet.breed.toLowerCase().includes(searchText)
            );
        }

        if (ageRange) {
            filteredData = filteredData.filter((pet) => {
                const age = pet.age;
                if (ageRange === "0-2") return age <= 2;
                if (ageRange === "3-5") return age >= 3 && age <= 5;
                if (ageRange === "6-10") return age >= 6 && age <= 10;
                if (ageRange === "11+") return age >= 11;
                return true;
            });
        }

        setFilteredMyPets(filteredData);
    };

    useEffect(() => {
        applyFilters(search, selectedSpecies, selectedGender, selectedAgeRange);
    }, [search, selectedSpecies, selectedGender, selectedAgeRange, myPets]);

    const handleRemoveFilter = () => {
        setSearch("");
        setFilteredMyPets(myPets);
    };

    const handleLogout = async () => {
        try {
            await fetch(`${import.meta.env.VITE_LOGOUT_API}`, {
                method: "POST",
                credentials: "include",
            });

            toast.success("Logged out Succesfully!");
            navigate("/");

        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    if (loading) {
        return <LoaderPage />;
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 bg-fixed'>
            <div className='flex justify-between py-3 md:px-[15%] px-2 bg-white border-1 border-b-[#4b7fbb42]'>
                <div className='flex gap-1'>
                    <h1 className='outfit text-lg font-bold my-auto'><span className='text-[#3B6FA1]'>Paw</span><span className='text-gray-700'>Pals</span></h1>
                    <img src={pawIcon} alt="paw" className='w-5 h-5 m-auto' />
                </div>
                <button onClick={handleLogout} className='py-2 px-3 text-xs rounded-sm rounded-l-full text-white font-semibold bg-gray-400 hover:bg-gray-500 active:bg-gray-500 transition-colors ease-in-out duration-300 cursor-pointer'>Logout</button>
            </div>
            <div className="bg-[#4B7FBB] py-1 text-center text-white px-5"><span className="text-xs my-auto">Logged in as </span><b className="truncate overflow-hidden whitespace-nowrap max-w-[100%] inline-block align-middle text-sm">{`${kennelName}`}</b></div>
            <div className="flex justify-end md:px-[15%] pt-3 pb-1 text-[#4B7FBB] text-sm">
                <button onClick={() => navigate("/private-dashboard")} className=" hover:underline cursor-pointer hover:text-green-700 active:text-green-700 md:text-md text-sm mx-2">
                    <span>Go back to <b>Availabe Pets Page </b></span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 inline my-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </button>
            </div>
            <div className="relative flex gap-5 justify-center items-center md:w-[65%] md:mx-auto bg-white rounded-lg py-2 px-3 mb-3 mt-2 mx-5 border-2 border-white focus-within:border-[#4B7FBB] focus-within:bg-white transition-colors duration-300 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search for pets... (by name or breed etc.)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="block w-[100%] outline-none placeholder-gray-400"
                />
                <button
                    onClick={handleRemoveFilter}
                    className={`absolute right-0 top-0 text-white rounded-r-md p-[10px] bg-[#4B7FBB] cursor-pointer hover:scale-110 ease-in-out duration-300
                            ${search ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="py-2 md:px-[12vw] mb-3 text-center">
                <div className="flex justify-center">
                    <div className="flex relative overflow-hidden md:mx-2 my-auto ">
                        <div className="flex flex-col gap-1 md:mx-2 mx-[5px] my-2">
                            <button
                                onClick={() => handleSpeciesClick("Dog")}
                                className={`flex-none rounded-xl md:w-17 md:h-17 w-15 h-15 cursor-pointer duration-300 ease-in-out
                                    ${selectedSpecies === "Dog" ? "bg-[#4B7FBB]" : "bg-[#d7e3f4] hover:bg-[#4B7FBB] active:bg-[#4B7FBB]"}`}
                            >
                                <img
                                    src={dogsIcon}
                                    className="md:w-[35px] w-[30px] mx-auto"
                                />
                            </button>
                            <p className="text-xs text-gray-600">Dogs</p>
                        </div>
                        <div className="flex flex-col gap-1 mx-[5px] my-2">
                            <button
                                onClick={() => handleSpeciesClick("Cat")}
                                className={`flex-none rounded-xl md:w-17 md:h-17 w-15 h-15 cursor-pointer duration-300 ease-in-out
                                    ${selectedSpecies === "Cat" ? "bg-[#4B7FBB]" : "bg-[#d7e3f4] hover:bg-[#4B7FBB] active:bg-[#4B7FBB]"}`}
                            >
                                <img
                                    src={catsIcon}
                                    className="md:w-[35px] w-[30px] mx-auto"
                                />
                            </button>
                            <p className="text-xs text-gray-600">Cats</p>
                        </div>
                        <div className="flex flex-col gap-1 mx-[5px] my-2">
                            <button
                                onClick={() => handleSpeciesClick("Bird")}
                                className={`flex-none rounded-xl md:w-17 md:h-17 w-15 h-15 cursor-pointer duration-300 ease-in-out
                                    ${selectedSpecies === "Bird" ? "bg-[#4B7FBB]" : "bg-[#d7e3f4] hover:bg-[#4B7FBB] active:bg-[#4B7FBB]"}`}
                            >
                                <img
                                    src={birdsIcon}
                                    className="md:w-[35px] w-[30px] mx-auto"
                                />
                            </button>
                            <p className="text-xs text-gray-600">Birds</p>
                        </div>
                    </div>

                    <div className="w-[3px] h-23 my-auto bg-gray-300 rounded-full mx-2"></div>

                    <div className="flex flex-col justify-center gap-2 items-center py-2 md:mx-3 mx-[5px]">
                        <button
                            onClick={() => handleGenderClick("Male")}
                            className={`flex justify-center gap-3 py-[3px] px-[4px] text-xs w-25 rounded-md cursor-pointer transition-colors duration-300
                            ${selectedGender === "Male" ? "bg-[#4B7FBB] text-white" : "bg-[#d7e3f4] hover:bg-[#4B7FBB] text-gray-600 hover:text-white active:bg-[#4B7FBB] active:text-white"}`}
                        >
                            <p className="my-auto pl-1">Male</p>
                            <img src={maleIcon} alt="male" className="w-5" />
                        </button>
                        <button
                            onClick={() => handleGenderClick("Female")}
                            className={`flex justify-center gap-3 py-[3px] px-[4px] text-xs w-25 rounded-md cursor-pointer transition-colors duration-300
                            ${selectedGender === "Female" ? "bg-[#4B7FBB] text-white" : "bg-[#d7e3f4] hover:bg-[#4B7FBB] text-gray-600 hover:text-white active:bg-[#4B7FBB] active:text-white"}`}
                        >
                            <p className="my-auto pl-1">Female</p>
                            <img src={femaleIcon} alt="female" className="w-5" />
                        </button>
                        <button
                            onClick={() => handleGenderClick("Unknown")}
                            className={`flex justify-center gap-3 py-[5px] px-[4px] text-xs w-25 rounded-md cursor-pointer transition-colors duration-300
                            ${selectedGender === "Unknown" ? "bg-[#4B7FBB] text-white" : "bg-[#d7e3f4] hover:bg-[#4B7FBB] text-gray-600 hover:text-white active:bg-[#4B7FBB] active:text-white"}`}
                        >
                            <p className="my-auto">Unknown Sex</p>
                        </button>
                    </div>
                </div>

                <div className="flex gap-2 justify-center mt-3">
                    <p className="text-sm text-[#4B7FBB] my-auto">Filter by Age:</p>
                    <select
                        className="px-3 py-2 rounded-lg appearance-none focus:outline-none my-auto text-gray-600 text-sm focus:bg-[#4B7FBB] hover:bg-[#4B7FBB] hover:text-white active:bg-[#4B7FBB] active:text-white focus:text-white cursor-pointer transition-colors duration-300 text-center bg-[#d7e3f4]"
                        value={selectedAgeRange}
                        onChange={(e) => setSelectedAgeRange(e.target.value)}
                    >
                        {ageRanges.map((range) => (
                            <option key={range.value} value={range.value}>
                                {range.label}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
            <div className="flex justify-center md:gap-3 gap-2 mb-3 mt-7 mx-2">
                <div className="bg-red-600 md:w-[25%] w-[25%] h-[2px] rounded-full my-auto"></div>
                <p className="md:text-2xl text-red-700 text-center">Adopted Pets</p>
                <div className="bg-red-600 md:w-[25%] w-[25%] h-[2px] rounded-full my-auto"></div>
            </div>

            {filteredMyPets.length === 0 ? (
                <p className="text-center text-gray-400 mt-20">No pet available</p>
            ) : (

                <div className="flex flex-wrap justify-center md:px-[15%]">
                    {filteredMyPets.map((pet) => (
                        <Link
                            to={`/private-dashboard/pets/mine/${pet._id}`}
                            key={pet._id}
                            className="md:m-5 m-3"
                        >
                            <div className="group">
                                <div className="overflow-hidden rounded-t-lg bg-black">
                                    <img
                                        src={pet.images?.primary?.url}
                                        className="md:w-[300px] md:h-[300px] w-[150px] h-[150px] object-cover rounded-t-lg group-hover:scale-106 group-active:scale-106 ease-in-out duration-500"
                                    />
                                </div>
                                <div className="bg-white p-2 md:px-5 rounded-b-lg z-1 group-hover:bg-[#4B7FBB] group-active:bg-[#4B7FBB] transition-colors duration-300 flex justify-between">
                                    <div>
                                        <p className="font-semibold group-active:text-white group-hover:text-white transition-colors duration-300">{pet.name}</p>
                                        <p className="md:text-sm text-xs group-active:text-white group-hover:text-white transition-colors duration-300 text-gray-400">{pet.breed}</p>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        {pet.gender.toLowerCase() === "male" ? (
                                            <img src={maleIcon} alt="male" className="w-6 h-6" />
                                        ) : pet.gender.toLowerCase() === "female" ? (
                                            <img src={femaleIcon} alt="female" className="w-6 h-6" />
                                        ) : (
                                            <span className="text-xs text-red-400 text-center font-semibold group-hover:text-white transition-colors duration-300">Unknown<br />Gender</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            <div className={`fixed right-0 md:right-5 transition-all duration-300 z-50 ${showScrollTop ? "bottom-18" : "bottom-5"}`}>
                <button
                    onClick={() => navigate("/about-us")}
                    className="group flex flex-row bg-[#4B7FBB] text-white p-3 md:rounded-full rounded-l-full shadow-lg hover:bg-[#406b9c] active:bg-[#406b9c] transition-all ease-in-out duration-300 cursor-pointer"
                >
                    <p className="text-xs opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[80px] group-hover:px-2 transition-all duration-450 ease-in-out whitespace-nowrap my-auto">About us</p>
                    <img src={aboutUsIcon} alt="about us icon" className="w-6" />
                </button>
            </div>

            {showScrollTop && (
                <div className="fixed bottom-5 right-0 md:right-5 z-40">
                    <button
                        onClick={scrollToTop}
                        className="bg-[#4B7FBB] text-white p-3 md:rounded-full rounded-l-full shadow-lg hover:bg-[#406b9c] active:bg-[#406b9c] transition-all ease-in-out duration-300 cursor-pointer"
                        title="Back to top"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                        </svg>
                    </button>
                </div>
            )}
        </div>

    )
}

export default AdoptedPets
