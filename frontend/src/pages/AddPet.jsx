import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//ICONS
import pawIcon from "../assets/images/icons/paw.png";

//PAGES
import LoaderPage from "./LoaderPage";

export default function AddPet() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [primaryImage, setPrimaryImage] = useState(null);
    const [secondaryImage, setSecondaryImage] = useState(null);
    const [tertiaryImage, setTertiaryImage] = useState(null);
    const [form, setForm] = useState({
        name: "",
        age: "",
        arrivalDate: "",
        breed: "",
        species: "dog",
        gender: "male",
        description: "",
        adoptionFee: "",
        medical: {
            vaccinated: false,
            parasiteControl: {
                tickAndFlea: false,
                heartworm: false,
                neutered: false,
            },
        },
        specialAssistance: false,
    });

    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.includes("medical.parasiteControl")) {
            const key = name.split(".")[2];
            setForm((prev) => ({
                ...prev,
                medical: {
                    ...prev.medical,
                    parasiteControl: {
                        ...prev.medical.parasiteControl,
                        [key]: checked,
                    },
                },
            }));
        } else if (name.includes("medical")) {
            const key = name.split(".")[1];
            setForm((prev) => ({
                ...prev,
                medical: {
                    ...prev.medical,
                    [key]: checked,
                },
            }));
        } else if (type === "checkbox") {
            setForm((prev) => ({ ...prev, [name]: checked }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (e, type) => {
        const file = e.target.files[0];

        e.target.value = null;

        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            toast.warning("Image must be 10MB or less");
            return;
        }

        if (type === "primary") setPrimaryImage(file);
        if (type === "secondary") setSecondaryImage(file);
        if (type === "tertiary") setTertiaryImage(file);
    };

    const handleDeleteImage = (type) => {
        if (type === "primary") setPrimaryImage(null);
        if (type === "secondary") setSecondaryImage(null);
        if (type === "tertiary") setTertiaryImage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!primaryImage) {
            toast.warn("Primary image is required!");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_PETS_API}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error("Failed to create pet");
            const pet = await res.json();

            const formData = new FormData();
            if (primaryImage) formData.append("primary", primaryImage);
            if (secondaryImage) formData.append("secondary", secondaryImage);
            if (tertiaryImage) formData.append("tertiary", tertiaryImage);

            const imgRes = await fetch(`${import.meta.env.VITE_MY_PETS_API}/${pet._id}/images`, {
                method: "PATCH",
                credentials: "include",
                body: formData,
            });

            if (!imgRes.ok) throw new Error("Image upload failed");

            toast.success("Pet posted successfully!");
            navigate("/private-dashboard");
        } catch (err) {
            console.error(err);
            toast.error("Error posting pet");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoaderPage />;
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-[#5895da] to-[#426fa3] md:p-10 bg-fixed flex justify-center text-sm">
            <form onSubmit={handleSubmit} className="relative bg-white px-5 py-5 md:p-10 md:min-w-[0] w-[100vw] md:w-170 md:rounded-sm">
                <div className='absolute flex gap-1 md:right-5 md:top-4 right-3 top-2'>
                    <p className='outfit md:text-sm text-xs font-bold my-auto'><span className='text-[#3B6FA1]'>Paw</span><span className='text-gray-700'>Pals</span></p>
                    <img src={pawIcon} alt="paw" className='md:w-4 md:h-4 w-3 h-3 m-auto' />
                </div>
                <div className="relative">
                    <div onClick={() => navigate("/private-dashboard")} className="absolute top-1/2 transform -translate-y-1/2 left-0 rounded-full text-[#4B7FBB] p-3 hover:bg-gray-200 active:bg-gray-200 ease-in-out duration-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </div>
                    <p className="text-center font-semibold text-2xl mb-8">Post a Pet</p>
                </div>
                <div className="flex justify-center md:gap-10 gap-5">
                    <div className="flex flex-col">
                        <p className="text-[#4B7FBB] text-xs font-semibold pb-1">Name</p>
                        <input name="name" value={form.name} onChange={handleFormChange} required className="outline-none border-2 border-gray-200 focus:border-[#4B7FBB] px-3 py-1 rounded-sm transition-colors duration-300 w-[100%] mb-2" />
                        <p className="text-[#4B7FBB] text-xs font-semibold pb-1">Age</p>
                        <input type="number" name="age" value={form.age} onChange={handleFormChange} required className="outline-none border-2 border-gray-200 focus:border-[#4B7FBB] px-3 py-1 rounded-sm transition-colors duration-300 w-[100%] mb-2" />
                        <p className="text-[#4B7FBB] text-xs font-semibold pb-1">Breed</p>
                        <input name="breed" value={form.breed} onChange={handleFormChange} required className="outline-none border-2 border-gray-200 focus:border-[#4B7FBB] px-3 py-1 rounded-sm transition-colors duration-300 w-[100%] mb-2" />
                        <p className="text-[#4B7FBB] text-xs font-semibold pb-1">Adoption Fee</p>
                        <input name="adoptionFee" type="number" value={form.adoptionFee} onChange={handleFormChange} required className="outline-none border-2 border-gray-200 focus:border-[#4B7FBB] px-3 py-1 rounded-sm transition-colors duration-300 w-[100%] mb-2" />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[#4B7FBB] text-xs font-semibold pb-1">Arrival Date</p>
                        <input type="date" name="arrivalDate" value={form.arrivalDate} onChange={handleFormChange} required className="bg-gray-100 px-3 py-1 mb-3 hover:bg-gray-200 active:bg-gray-200 transition-colors duration-300 cursor-pointer rounded-sm" />
                        <p className="text-[#4B7FBB] text-xs font-semibold pb-1">Species</p>
                        <select name="species" value={form.species} onChange={handleFormChange} className="bg-gray-100 px-3 py-1 mb-3 hover:bg-gray-200 active:bg-gray-200 transition-colors duration-300 cursor-pointer rounded-sm">
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="bird">Bird</option>
                        </select>
                        <p className="text-[#4B7FBB] text-xs font-semibold pb-1">Gender</p>
                        <select name="gender" value={form.gender} onChange={handleFormChange} className="bg-gray-100 px-3 py-1 mb-3 hover:bg-gray-200 active:bg-gray-200 transition-colors duration-300 cursor-pointer rounded-sm">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="undetermined">Undetermined</option>
                        </select>
                    </div>
                </div>
                <p className="text-[#4B7FBB] text-xs font-semibold pt-2 pb-1 text-center">Description</p>
                <textarea name="description" value={form.description} onChange={handleFormChange} required className="w-[80%] outline-none border-2 border-gray-200 focus:border-[#4B7FBB] px-3 py-1 rounded-sm transition-colors duration-300 block mx-auto min-h-30" />
                <div className="flex md:flex-row flex-col md:gap-10 gap-5 items-center justify-center py-7">
                    <div>
                        <p className="text-[#4B7FBB] text-xs font-semibold pb-1">Special Assistance</p>
                        <label className="cursor-pointer"><input type="checkbox" name="specialAssistance" checked={form.specialAssistance} onChange={handleFormChange} className="cursor-pointer" /> Needed</label>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[#4B7FBB] text-xs font-semibold pb-1">Medical Details</p>
                        <label className="cursor-pointer"><input type="checkbox" name="medical.vaccinated" checked={form.medical.vaccinated} onChange={handleFormChange} className="cursor-pointer" /> Vaccinated</label>
                        <label className="cursor-pointer"><input type="checkbox" name="medical.parasiteControl.neutered" checked={form.medical.parasiteControl.neutered} onChange={handleFormChange} className="cursor-pointer" /> Neutered</label>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[#4B7FBB] text-xs font-semibold pb-1">Parasite Control</p>
                        <label className="cursor-pointer"><input type="checkbox" name="medical.parasiteControl.tickAndFlea" checked={form.medical.parasiteControl.tickAndFlea} onChange={handleFormChange} className="cursor-pointer" /> Tick & Flea</label>
                        <label className="cursor-pointer"><input type="checkbox" name="medical.parasiteControl.heartworm" checked={form.medical.parasiteControl.heartworm} onChange={handleFormChange} className="cursor-pointer" /> Heartworm</label>
                    </div>
                </div>

                {/* Primary */}
                <div className="border-3 border-[#406c9e5d] pb-5 pt-3 px-5 rounded-lg">
                    <p className="text-lg font-semibold pb-3 text-center">Images</p>
                    <p className="text-gray-300 text-xs text-center pb-4 font-bold">Click image container below to add or replace existing images</p>
                    <div className="flex flex-col md:flex-wrap gap-5 justify-center">
                        <div>
                            <p className="text-[#4B7FBB] text-xs font-semibold text-center pb-3">Primary Image</p>
                            <div onClick={() => document.getElementById("primary-upload").click()} className="relative rounded-lg md:h-72 md:w-72 h-62 w-62 bg-gray-100 hover:bg-gray-200 active:bg-gray-200 transition-colors duration-300 overflow-hidden flex items-center justify-center p-1 mb-2 m-auto cursor-pointer">
                                {primaryImage ? (
                                    <>
                                        <img src={URL.createObjectURL(primaryImage)} alt="Primary" className="md:h-70 md:w-70 h-60 w-60 object-cover rounded-sm" />
                                    </>
                                ) : (
                                    <div className="text-gray-300 text-xs text-center font-bold">
                                        <p>Upload here</p>
                                        <p>(Required)</p>
                                    </div>
                                )}
                            </div>
                            <input id="primary-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, "primary")} />
                        </div>
                        <div>
                            <p className="text-[#4B7FBB] text-xs font-semibold text-center pb-3">Secondary Images</p>
                            <div className="flex flex-row gap-5 justify-center">
                                {/* Secondary */}
                                <div>
                                    <div onClick={() => document.getElementById("secondary-upload").click()} className="relative rounded-lg md:h-52 md:w-52 h-27 w-27 bg-gray-100 hover:bg-gray-200 active:bg-gray-200 transition-colors duration-300 overflow-hidden flex items-center justify-center p-1 mb-2 mx-auto cursor-pointer" >
                                        {secondaryImage ? (
                                            <div className="relative">
                                                <img src={URL.createObjectURL(secondaryImage)} alt="Secondary" className="md:h-50 md:w-50 h-25 w-25 object-cover rounded-sm" />
                                                <button type="button" onClick={(e) => { e.stopPropagation(); handleDeleteImage("secondary"); }} className="absolute -top-0 -right-0 bg-red-600 text-white text-xs w-7 h-7 rounded-full hover:bg-red-700 active:bg-red-700 transition-colors duration-300 ease-in-out z-30 cursor-pointer">✕</button>
                                            </div>
                                        ) : (
                                            <div className="text-gray-300 text-xs text-center font-bold">
                                                <p>Upload here</p>
                                                <p>(Optional)</p>
                                            </div>
                                        )}
                                    </div>
                                    <input id="secondary-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, "secondary")} />
                                </div>
                                {/* Tertiary */}
                                <div>
                                    <div onClick={() => document.getElementById("tertiary-upload").click()} className="relative rounded-lg md:h-52 md:w-52 h-27 w-27 bg-gray-100 hover:bg-gray-200 active:bg-gray-200 transition-colors duration-300 overflow-hidden flex items-center justify-center p-1 mb-2 mx-auto cursor-pointer">
                                        {tertiaryImage ? (
                                            <div className="relative">
                                                <img src={URL.createObjectURL(tertiaryImage)} alt="Tertiary" className="md:h-50 md:w-50 h-25 w-25 object-cover rounded-sm" />
                                                <button type="button" onClick={(e) => { e.stopPropagation(); handleDeleteImage("tertiary"); }} className="absolute -top-0 -right-0 bg-red-600 text-white text-xs w-7 h-7 rounded-full hover:bg-red-700 active:bg-red-700 transition-colors duration-300 ease-in-out z-30 cursor-pointer">✕</button>
                                            </div>
                                        ) : (
                                            <div className="text-gray-300 text-xs text-center font-bold">
                                                <p>Upload here</p>
                                                <p>(Optional)</p>
                                            </div>
                                        )}
                                    </div>
                                    <input id="tertiary-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, "tertiary")} />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="bg-[#4B7FBB] hover:bg-[#406c9e] active:bg-[#406c9e] text-white py-3 rounded-lg cursor-pointer transition-colors duration-300 text-lg mt-10 w-[100%]">Post Pet</button>
            </form>
        </div>
    );
}