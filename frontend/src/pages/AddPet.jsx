import React, { useState } from "react";
import axios from "axios";

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
    const [message, setMessage] = useState("");

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

        try {
            // 1. Create pet (no images yet)
            const res = await fetch("http://localhost:3000/api/pets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                credentials: "include", // Include credentials (cookies, etc.)
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error("Failed to create pet");
            const pet = await res.json();

            // 2. Upload images if any
            const formData = new FormData();
            if (primaryImage) formData.append("images", primaryImage);
            secondaryImages.forEach((img) => {
                if (img) formData.append("images", img);
            });

            if (formData.has("images")) {
                const imgRes = await fetch(`http://localhost:3000/api/pets/mine/${pet._id}/images`, {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    credentials: "include", // Important if using cookie-based auth
                    body: formData,
                });

                if (!imgRes.ok) throw new Error("Image upload failed");
            }

            setMessage("Pet added successfully!");
        } catch (err) {
            console.error(err);
            setMessage("Error adding pet.");
        }
    };



    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold">Add New Pet</h2>

            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="input" />
            <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} required className="input" />
            <input name="arrivalDate" type="date" value={form.arrivalDate} onChange={handleChange} required className="input" />
            <input name="breed" placeholder="Breed" value={form.breed} onChange={handleChange} required className="input" />

            <select name="species" value={form.species} onChange={handleChange} className="input">
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="bird">Bird</option>
            </select>

            <select name="gender" value={form.gender} onChange={handleChange} className="input">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="undetermined">Undetermined</option>
            </select>

            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="input" required />

            <input name="adoptionFee" type="number" placeholder="Adoption Fee" value={form.adoptionFee} onChange={handleChange} className="input" required />

            <label className="block">
                <input type="checkbox" name="specialAssistance" checked={form.specialAssistance} onChange={handleChange} />
                Special Assistance
            </label>

            <fieldset className="border p-3">
                <legend className="text-sm font-medium">Medical Info</legend>
                <label><input type="checkbox" name="medical.vaccinated" checked={form.medical.vaccinated} onChange={handleChange} /> Vaccinated</label><br />
                <label><input type="checkbox" name="medical.parasiteControl.tickAndFlea" checked={form.medical.parasiteControl.tickAndFlea} onChange={handleChange} /> Tick & Flea</label><br />
                <label><input type="checkbox" name="medical.parasiteControl.heartworm" checked={form.medical.parasiteControl.heartworm} onChange={handleChange} /> Heartworm</label><br />
                <label><input type="checkbox" name="medical.parasiteControl.neutered" checked={form.medical.parasiteControl.neutered} onChange={handleChange} /> Neutered</label>
            </fieldset>

            <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((slot) => (
                    <label
                        key={slot}
                        className="border h-32 flex items-center justify-center bg-gray-100 cursor-pointer relative overflow-hidden"
                    >
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0"
                            onChange={(e) => handleImageChange(e, slot)}
                        />
                        {slot === 0 ? (
                            primaryImage ? <img src={URL.createObjectURL(primaryImage)} alt="Primary" className="h-full w-full object-cover" /> : "Primary Image"
                        ) : (
                            secondaryImages[slot - 1] ? (
                                <img src={URL.createObjectURL(secondaryImages[slot - 1])} alt={`Secondary ${slot}`} className="h-full w-full object-cover" />
                            ) : `Secondary ${slot}`
                        )}
                    </label>
                ))}
            </div>

            <button type="submit" className="btn">Add Pet</button>
            {message && <p className="text-center text-sm mt-2">{message}</p>}
        </form>
    );
}
