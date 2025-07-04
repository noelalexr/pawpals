import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

//PAGES
import LoaderPage from "./LoaderPage";

//ICONS
import pawIcon from "../assets/images/icons/paw.png";

export default function AddPet() {
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
                neutered: false
            }
        },
        specialAssistance: false
    });

    const [primaryImage, setPrimaryImage] = useState(null);
    const [secondaryImages, setSecondaryImages] = useState([null, null]);
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.includes("medical.parasiteControl.")) {
            const key = name.split(".")[2];
            setForm((prev) => ({
                ...prev,
                medical: {
                    ...prev.medical,
                    parasiteControl: {
                        ...prev.medical.parasiteControl,
                        [key]: checked,
                    }
                }
            }));
        } else if (name.includes("medical.")) {
            const key = name.split(".")[1];
            setForm((prev) => ({
                ...prev,
                medical: {
                    ...prev.medical,
                    [key]: checked,
                }
            }));
        } else if (type === "checkbox") {
            setForm((prev) => ({ ...prev, [name]: checked }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        const maxSize = 10 * 1024 * 1024; // 10MB

        if (file.size > maxSize) {
            toast.warn("Image must be 10MB or less.");
            return;
        }

        if (index === 0) {
            setPrimaryImage(file);
        } else {
            setSecondaryImages((prev) => {
                const updated = [...prev];
                updated[index - 1] = file;
                return updated;
            });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!primaryImage) {
            toast.warn("Primary image is required!");
            return;
        }

        setLoading(true); // Start loading

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
            formData.append("images", primaryImage);
            secondaryImages.forEach((img) => {
                if (img) formData.append("images", img);
            });

            const imgRes = await fetch(`${import.meta.env.VITE_MY_PETS_API}/${pet._id}/images`, {
                method: "PATCH",
                credentials: "include",
                body: formData,
            });

            if (!imgRes.ok) throw new Error("Image upload failed");

            toast.success("Pet added successfully!");
            navigate("/private-dashboard")
        } catch (err) {
            console.error(err);
            toast.error("Error adding pet.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    if (loading) {
        return <LoaderPage />;
    }



    return (
        <div className="min-h-screen bg-gradient-to-b from-[#c1d4e9] to-[#4B7FBB] md:p-15 bg-fixed flex justify-center text-sm">

            <form onSubmit={handleSubmit} className="relative bg-white px-5 py-5 md:p-10 min-w-screen md:min-w-[0] md:max-w-[70%] md:rounded-sm">
                <div className='absolute flex gap-1 md:right-5 md:top-4 right-3 top-2'>
                    <h1 className='outfit md:text-sm text-xs font-bold my-auto'><span className='text-[#3B6FA1]'>Paw</span><span className='text-gray-700'>Pals</span></h1>
                    <img src={pawIcon} alt="paw" className='md:w-4 md:h-4 w-3 h-3 m-auto' />
                </div>
                <div className="relative">
                    <div onClick={() => navigate("/private-dashboard")} className="absolute top-1/2 transform -translate-y-1/2 left-0 rounded-full text-[#4B7FBB] p-3 hover:bg-gray-300 active:bg-gray-300 ease-in-out duration-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </div>
                    <p className="text-center font-semibold text-2xl mb-8">Add New Pet</p>
                </div>
                <div className="flex justify-center md:gap-10 gap-5">
                    <div className="flex flex-col">
                        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="outline-none border-2 border-gray-200 focus:border-[#4B7FBB] px-3 py-1 rounded-sm transition-colors duration-300 w-[100%] my-1" />
                        <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} required className="outline-none border-2 border-gray-200 focus:border-[#4B7FBB] px-3 py-1 rounded-sm transition-colors duration-300 w-[100%] my-1" />
                        <input name="breed" placeholder="Breed" value={form.breed} onChange={handleChange} required className="outline-none border-2 border-gray-200 focus:border-[#4B7FBB] px-3 py-1 rounded-sm transition-colors duration-300 w-[100%] my-1" />
                        <input name="adoptionFee" type="number" placeholder="Adoption Fee" value={form.adoptionFee} onChange={handleChange} className="outline-none border-2 border-gray-200 focus:border-[#4B7FBB] px-3 py-1 rounded-sm transition-colors duration-300 w-[100%] my-1" required />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[#4B7FBB] text-xs font-semibold">Arrival Date</p>
                        <input name="arrivalDate" type="date" value={form.arrivalDate} onChange={handleChange} required className="bg-gray-100 px-3 py-1 mb-2 hover:bg-gray-200 transition-colors duration-300 cursor-pointer rounded-sm" />
                        <p className="text-[#4B7FBB] text-xs font-semibold">Species</p>
                        <select name="species" value={form.species} onChange={handleChange} className="bg-gray-100 px-3 py-1 mb-2 hover:bg-gray-200 transition-colors duration-300 cursor-pointer rounded-sm">
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="bird">Bird</option>
                        </select>
                        <p className="text-[#4B7FBB] text-xs font-semibold">Gender</p>
                        <select name="gender" value={form.gender} onChange={handleChange} className="bg-gray-100 px-3 py-1 mb-2 hover:bg-gray-200 transition-colors duration-300 cursor-pointer rounded-sm">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="undetermined">Undetermined</option>
                        </select>
                    </div>
                </div>
                <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-[80%] outline-none border-2 border-gray-200 focus:border-[#4B7FBB] px-3 py-1 rounded-sm transition-colors duration-300 my-3 block mx-auto min-h-30" required />

                <div className="flex flex-row gap-10 justify-center py-5">
                    <div>
                        <p className="text-[#4B7FBB] text-xs font-semibold pb-1">Special Assistance</p>
                        <label className="block"><input type="checkbox" name="specialAssistance" checked={form.specialAssistance} onChange={handleChange} /> Needed</label>
                        <p className="text-[#4B7FBB] text-xs font-semibold pb-1 pt-2">Medical Details</p>
                        <label><input type="checkbox" name="medical.vaccinated" checked={form.medical.vaccinated} onChange={handleChange} /> Vaccinated</label><br />
                    </div>
                    <div>
                        <p className="text-[#4B7FBB] text-xs font-semibold pb-1">Parasite Control</p>
                        <label><input type="checkbox" name="medical.parasiteControl.tickAndFlea" checked={form.medical.parasiteControl.tickAndFlea} onChange={handleChange} /> Tick & Flea</label><br />
                        <label><input type="checkbox" name="medical.parasiteControl.heartworm" checked={form.medical.parasiteControl.heartworm} onChange={handleChange} /> Heartworm</label><br />
                        <label><input type="checkbox" name="medical.parasiteControl.neutered" checked={form.medical.parasiteControl.neutered} onChange={handleChange} /> Neutered</label>
                    </div>

                </div>


                <div className="border-3 border-[#406c9e5d] pb-5 pt-3 px-5 rounded-lg">
                    <p className="text-lg font-semibold pb-3 text-center">Images</p>
                    <div className="flex md:flex-row md:flex-wrap flex-col gap-5 justify-center">
                        {[0, 1, 2].map((slot) => {
                            const isPrimary = slot === 0;
                            const image = isPrimary ? primaryImage : secondaryImages[slot - 1];

                            return (
                                <div key={slot} className="relative">
                                    {/* X Button outside for secondary images only */}
                                    {!isPrimary && image && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSecondaryImages((prev) => {
                                                    const updated = [...prev];
                                                    updated[slot - 1] = null;
                                                    return updated;
                                                });
                                            }}
                                            className="absolute -top-4 -right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-full hover:bg-red-500 z-30"
                                        >
                                            ✕
                                        </button>
                                    )}

                                    <div className="relative rounded-lg h-50 w-50 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 overflow-hidden flex items-center justify-center p-1 mb-2 mx-auto">
                                        <input
                                            type="file"
                                            id={`image-input-${slot}`}
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => handleImageChange(e, slot)}
                                        />
                                        <label htmlFor={`image-input-${slot}`} className="absolute inset-0 cursor-pointer z-10" />

                                        {image ? (
                                            <img src={URL.createObjectURL(image)} alt={`Upload ${slot}`} className="h-full w-full object-cover z-0 rounded-sm" />
                                        ) : (
                                            <span className="text-xs text-gray-400 z-0 text-center p-5">
                                                Click to upload image
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[#4B7FBB] text-xs font-semibold pb-1 text-center">
                                        {isPrimary ? (
                                            <div>
                                                Primary Image
                                                <br />
                                                (Required)
                                            </div>
                                        ) : (
                                            <div className="text-gray-400">
                                                Secondary Image {slot}
                                                <br />
                                                (Oprional)
                                            </div>
                                        )}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <button type="submit" className="bg-[#4B7FBB] hover:bg-[#406c9e] text-white py-3 rounded-lg cursor-pointer transition-colors duration-300 text-lg mt-10 w-[100%]">Add Pet</button>

            </form>
        </div>
    );
}
