import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddPet() {
    const navigate = useNavigate();
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

    const [primaryImage, setPrimaryImage] = useState(null);
    const [secondaryImage, setSecondaryImage] = useState(null);
    const [tertiaryImage, setTertiaryImage] = useState(null);

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
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            alert("Image must be less than or equal to 10MB.");
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

            toast.success("Pet added successfully!");
            navigate("/private-dashboard");
        } catch (err) {
            console.error(err);
            toast.error("Error adding pet.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div><label>Name: </label><input name="name" value={form.name} onChange={handleFormChange} required /></div>
            <div><label>Age: </label><input type="number" name="age" value={form.age} onChange={handleFormChange} required /></div>
            <div><label>Arrival Date: </label><input type="date" name="arrivalDate" value={form.arrivalDate} onChange={handleFormChange} required /></div>
            <div><label>Breed: </label><input name="breed" value={form.breed} onChange={handleFormChange} required /></div>
            <div>
                <label>Species: </label>
                <select name="species" value={form.species} onChange={handleFormChange}>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                </select>
            </div>
            <div>
                <label>Gender: </label>
                <select name="gender" value={form.gender} onChange={handleFormChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="undetermined">Undetermined</option>
                </select>
            </div>
            <div><label>Description: </label><textarea name="description" value={form.description} onChange={handleFormChange} required /></div>
            <div><label>Adoption Fee: </label><input name="adoptionFee" type="number" value={form.adoptionFee} onChange={handleFormChange} required /></div>

            <div><label>Vaccinated: </label><input type="checkbox" name="medical.vaccinated" checked={form.medical.vaccinated} onChange={handleFormChange} /></div>
            <div><label>Tick & Flea Control: </label><input type="checkbox" name="medical.parasiteControl.tickAndFlea" checked={form.medical.parasiteControl.tickAndFlea} onChange={handleFormChange} /></div>
            <div><label>Heartworm: </label><input type="checkbox" name="medical.parasiteControl.heartworm" checked={form.medical.parasiteControl.heartworm} onChange={handleFormChange} /></div>
            <div><label>Neutered: </label><input type="checkbox" name="medical.parasiteControl.neutered" checked={form.medical.parasiteControl.neutered} onChange={handleFormChange} /></div>
            <div><label>Special Assistance: </label><input type="checkbox" name="specialAssistance" checked={form.specialAssistance} onChange={handleFormChange} /></div>

            {/* Primary */}
            <div>
                <label>Primary Image:</label>
                <div onClick={() => document.getElementById("primary-upload").click()} style={{ border: "1px solid black", padding: "10px", cursor: "pointer" }}>
                    {primaryImage ? (
                        <>
                            <img src={URL.createObjectURL(primaryImage)} alt="Primary" width="100" />
                            <button type="button" onClick={(e) => { e.stopPropagation(); handleDeleteImage("primary"); }}>🗑️</button>
                        </>
                    ) : (
                        <span>Click to upload primary image</span>
                    )}
                </div>
                <input id="primary-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageChange(e, "primary")} />
            </div>

            {/* Secondary */}
            <div>
                <label>Secondary Image:</label>
                <div onClick={() => document.getElementById("secondary-upload").click()} style={{ border: "1px solid gray", padding: "10px", cursor: "pointer" }}>
                    {secondaryImage ? (
                        <>
                            <img src={URL.createObjectURL(secondaryImage)} alt="Secondary" width="100" />
                            <button type="button" onClick={(e) => { e.stopPropagation(); handleDeleteImage("secondary"); }}>🗑️</button>
                        </>
                    ) : (
                        <span>Click to upload secondary image</span>
                    )}
                </div>
                <input id="secondary-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageChange(e, "secondary")} />
            </div>

            {/* Tertiary */}
            <div>
                <label>Tertiary Image:</label>
                <div onClick={() => document.getElementById("tertiary-upload").click()} style={{ border: "1px solid gray", padding: "10px", cursor: "pointer" }}>
                    {tertiaryImage ? (
                        <>
                            <img src={URL.createObjectURL(tertiaryImage)} alt="Tertiary" width="100" />
                            <button type="button" onClick={(e) => { e.stopPropagation(); handleDeleteImage("tertiary"); }}>🗑️</button>
                        </>
                    ) : (
                        <span>Click to upload tertiary image</span>
                    )}
                </div>
                <input id="tertiary-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageChange(e, "tertiary")} />
            </div>

            <button type="submit">Add Pet</button>
        </form>
    );
}