import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router";

//ICONS
import pawIcon from "../assets/images/icons/paw.png";
import dogsIcon from "../assets/images/icons/dog.png"
import catsIcon from "../assets/images/icons/cat.png"
import birdsIcon from "../assets/images/icons/bird.png"
import maleIcon from "../assets/images/icons/male.png"
import femaleIcon from "../assets/images/icons/female.png"
import downArrowIcon from "../assets/images/icons/down-arrow.png"
import aboutUsIcon from "../assets/images/icons/about-us.png"

//CONTEXTS
import { PublicPetContext } from "../contexts/PublicPetContext.jsx";

//PAGES
import LoaderPage from "./LoaderPage.jsx";

//LOADERS
import { fetchLoggedinKennel } from "../loaders/dataLoader";


const PublicDashboard = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [selectedSpecies, setSelectedSpecies] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedAgeRange, setSelectedAgeRange] = useState("");
    const [selectedCity, setSelectedCity] = useState("")
    const [filteredPets, setFilteredPets] = useState([]);
    const { pets, loading, error } = useContext(PublicPetContext);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [kennel, setKennel] = useState("");

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

    useEffect(() => {
        const getKennelName = async () => {
            const user = await fetchLoggedinKennel();
            if (user) setKennel(user);
        };
        getKennelName();
    }, []);

    const handleKennelLoginClick = () => {
        if (kennel) {
            navigate("/private-dashboard");
        } else {
            navigate("/login");
        }
    };


    const ageRanges = [
        { label: "All Ages", value: "" },
        { label: "Puppy (0-2 years old)", value: "0-2" },
        { label: "Young adult (3-5 years old)", value: "3-5" },
        { label: "Adult (6-10 years old)", value: "6-10" },
        { label: "Senior (11+ years old)", value: "11+" },
    ];

    const uniqueCities = [
        ...new Set(pets.map(pet => pet.kennel.location.citySort).filter(Boolean))
    ];

    const handleSpeciesClick = (species) => {
        setSelectedSpecies(prev => prev === species ? "" : species);
    };

    const handleGenderClick = (gender) => {
        setSelectedGender(prev => prev === gender ? "" : gender);
    };

    const applyFilters = (searchText, species, gender, ageRange, city) => {
        let filteredData = [...pets];

        filteredData = filteredData.filter(pet => pet.isAdopted === false);

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

        if (city) {
            filteredData = filteredData.filter(
                pet => pet.kennel.location.citySort.toLowerCase() === city.toLowerCase()
            );
        }

        const shuffledPets = filteredData.sort(() => Math.random() - 0.5);
        setFilteredPets(shuffledPets);
    };

    useEffect(() => {
        applyFilters(search, selectedSpecies, selectedGender, selectedAgeRange, selectedCity);
    }, [search, selectedSpecies, selectedGender, selectedAgeRange, selectedCity, pets]);

    const handleRemoveFilter = () => {
        setSearch("");
        setFilteredPets(pets);
    };

    if (loading) {
        return <LoaderPage />;
    }

    return (
        <div className='relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 bg-fixed'>
            <div className='flex justify-between py-3 md:px-[15%] px-2 bg-white border-1 border-b-[#4b7fbb53]'>
                <div className='flex gap-1'>
                    <h1 className='outfit text-lg font-bold my-auto'><span className='text-[#3B6FA1]'>Paw</span><span className='text-gray-700'>Pals</span></h1>
                    <img src={pawIcon} alt="paw" className='w-5 h-5 m-auto' />
                </div>
                <button onClick={handleKennelLoginClick} className='py-2 px-3 text-xs rounded-sm rounded-l-full text-white font-semibold bg-[#4B7FBB] hover:bg-[#416da0] active:bg-[#416da0] transition-colors ease-in-out duration-300 cursor-pointer'>Kennel Login</button>
            </div>
            <div className="flex flex-col md:mx-[18%] mx-5 mt-3">
                <div className="flex gap-2">
                    <p className="text-sm text-[#4B7FBB] text-center">Location</p>
                    <img src={downArrowIcon} alt="arrow-down" className="w-3 my-auto" />
                </div>
                <select
                    className="px-5 py-1 mb-2 rounded-full appearance-none focus:outline-none focus:bg-gray-300 bg-gray-200 hover:bg-gray-300 active:bg-gray-300 cursor-pointer transition-colors duration-300 text-xl"
                    value={selectedCity}
                    onChange={(e) => {
                        const value = e.target.value;
                        setSelectedCity(value);
                    }}
                >
                    <option value="" className="appearance-none text-sm rounded-2xl">All Cities</option>
                    {uniqueCities.map((city, idx) => (
                        <option key={idx} value={city} className="text-sm">
                            {city}
                        </option>
                    ))}
                </select>
            </div>
            <div className="relative flex gap-5 justify-center items-center md:w-[65%] md:mx-auto bg-white rounded-lg py-2 px-3 mb-3 mt-2 mx-5 border-2 border-white focus-within:border-[#4B7FBB] focus-within:bg-white transition-colors duration-300 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search for pets... (by breed or pet name only)"
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
                            ${selectedGender === "Male" ? "bg-[#4B7FBB] text-white" : "bg-[#d7e3f4] hover:bg-[#4B7FBB] hover:text-white active:bg-[#4B7FBB] active:text-white"}`}
                        >
                            <p className="my-auto pl-1">Male</p>
                            <img src={maleIcon} alt="male" className="w-5" />
                        </button>
                        <button
                            onClick={() => handleGenderClick("Female")}
                            className={`flex justify-center gap-3 py-[3px] px-[4px] text-xs w-25 rounded-md cursor-pointer transition-colors duration-300
                            ${selectedGender === "Female" ? "bg-[#4B7FBB] text-white" : "bg-[#d7e3f4] hover:bg-[#4B7FBB] hover:text-white active:bg-[#4B7FBB] active:text-white"}`}
                        >
                            <p className="my-auto pl-1">Female</p>
                            <img src={femaleIcon} alt="female" className="w-5" />
                        </button>
                        <button
                            onClick={() => handleGenderClick("Undetermined")}
                            className={`flex justify-center gap-3 py-[5px] px-[4px] text-xs w-25 rounded-md cursor-pointer transition-colors duration-300
                            ${selectedGender === "Undetermined" ? "bg-[#4B7FBB] text-white" : "bg-[#d7e3f4] hover:bg-[#4B7FBB] hover:text-white active:bg-[#4B7FBB] active:text-white"}`}
                        >
                            <p className="my-auto">Unknown Sex</p>
                        </button>
                    </div>
                </div>
                <div className="flex gap-2 justify-center mt-3">
                    <p className="text-sm text-[#4B7FBB] my-auto">Filter by Age:</p>
                    <select
                        className="p-2 rounded-lg appearance-none focus:outline-none my-auto text-gray-600 text-sm focus:bg-[#4B7FBB] hover:bg-[#4B7FBB] active:bg-[#4B7FBB] hover:text-white active:text-white focus:text-white cursor-pointer transition-colors duration-300 text-center bg-[#d7e3f4]"
                        value={selectedAgeRange}
                        onChange={(e) => setSelectedAgeRange(e.target.value)}
                    >
                        {ageRanges.map((range) => (
                            <option key={range.value} value={range.value} className="text-xs">
                                {range.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {filteredPets.length === 0 ? (
                <p className="text-center text-gray-400 mt-20">No pet available</p>
            ) : (

                <div className="flex flex-wrap justify-center md:px-[15%]">
                    {filteredPets.map((pet) => (
                        <Link
                            to={`/pets/${pet._id}`}
                            key={pet._id}
                            className="md:m-5 m-3"
                        >
                            <div className="group">
                                <div className="overflow-hidden rounded-t-lg bg-black">
                                    <img
                                        src={pet.images.primary.url}
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

export default PublicDashboard
