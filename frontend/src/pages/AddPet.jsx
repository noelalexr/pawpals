import { useState } from "react";

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
    });

    const [primaryImage, setPrimaryImage] = useState(null);
    const [secondaryImages, setSecondaryImages] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePrimaryImage = (e) => {
        setPrimaryImage(e.target.files[0]);
    };

    const handleSecondaryImages = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + secondaryImages.length > 2) {
            alert("Only 2 secondary images allowed.");
            return;
        }
        setSecondaryImages([...secondaryImages, ...files]);
    };

    const removeSecondaryImage = (index) => {
        const updated = [...secondaryImages];
        updated.splice(index, 1);
        setSecondaryImages(updated);
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (!primaryImage) {
            alert("Please upload a primary image.");
            return;
        }


        const formData = new FormData();
        const {
            vaccinated = false,
            tickAndFlea = false,
            heartworm = false,
            neutered = false,
            specialAssistance = false,
            ...basicFields
        } = form;

        for (const key in basicFields) {
            formData.append(key, basicFields[key]);
        }

        formData.append("medical[vaccinated]", vaccinated);
        formData.append("medical[parasiteControl][tickAndFlea]", tickAndFlea);
        formData.append("medical[parasiteControl][heartworm]", heartworm);
        formData.append("medical[parasiteControl][neutered]", neutered);

        formData.append("specialAssistance", specialAssistance);

        formData.append("images", primaryImage);


        secondaryImages.forEach((file) => {
            formData.append("images", file);
        });

        console.log("Form state:", form);
        console.log("Primary Image:", primaryImage);
        console.log("Secondary Images:", secondaryImages);


        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`${key}: [File] ${value.name}`);
            } else {
                console.log(`${key}: ${value}`);
            }
        }

        try {
            setUploading(true);

            const res = await fetch(`${import.meta.env.VITE_PETS_API}`, {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to upload.");
            }

            alert("Pet added successfully!");
        } catch (err) {
            console.error(err);
            alert(err.message || "Upload failed.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Add Pet</h2>
            <form onSubmit={submitForm} className="space-y-4">
                <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full border p-2" required />
                <input type="number" name="age" placeholder="Age" onChange={handleChange} className="w-full border p-2" required />
                <input type="date" name="arrivalDate" onChange={handleChange} className="w-full border p-2" required />
                <input type="text" name="breed" placeholder="Breed" onChange={handleChange} className="w-full border p-2" required />
                <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full border p-2" required></textarea>
                <input type="number" name="adoptionFee" placeholder="Adoption Fee" onChange={handleChange} className="w-full border p-2" required />

                <select name="species" onChange={handleChange} className="w-full border p-2" required>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                </select>

                <select name="gender" onChange={handleChange} className="w-full border p-2" required>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="undetermined">Undetermined</option>
                </select>

                {/* Image Upload */}
                <div>
                    <label className="block font-semibold mb-1">Primary Image</label>
                    <input type="file" accept="image/*" onChange={handlePrimaryImage} />
                    {primaryImage && (
                        <div className="mt-2">
                            <img src={URL.createObjectURL(primaryImage)} alt="Primary" className="h-32 rounded border" />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block font-semibold mb-1">Secondary Images (max 2)</label>
                    <input type="file" accept="image/*" multiple onChange={handleSecondaryImages} />
                    <div className="flex gap-2 mt-2">
                        {secondaryImages.map((img, idx) => (
                            <div key={idx} className="relative">
                                <img src={URL.createObjectURL(img)} alt={`Secondary ${idx + 1}`} className="h-24 rounded border" />
                                <button
                                    type="button"
                                    onClick={() => removeSecondaryImage(idx)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold">Medical Info</h3>

                    <label className="block mt-2">
                        <input
                            type="checkbox"
                            name="vaccinated"
                            onChange={(e) => setForm({ ...form, vaccinated: e.target.checked })}
                        />{" "}
                        Vaccinated
                    </label>

                    <label className="block">
                        <input
                            type="checkbox"
                            name="tickAndFlea"
                            onChange={(e) => setForm({ ...form, tickAndFlea: e.target.checked })}
                        />{" "}
                        Tick & Flea Control
                    </label>

                    <label className="block">
                        <input
                            type="checkbox"
                            name="heartworm"
                            onChange={(e) => setForm({ ...form, heartworm: e.target.checked })}
                        />{" "}
                        Heartworm Prevention
                    </label>

                    <label className="block">
                        <input
                            type="checkbox"
                            name="neutered"
                            onChange={(e) => setForm({ ...form, neutered: e.target.checked })}
                        />{" "}
                        Neutered
                    </label>
                </div>

                <div className="mt-4">
                    <label className="block font-semibold mb-1">
                        <input
                            type="checkbox"
                            name="specialAssistance"
                            onChange={(e) => setForm({ ...form, specialAssistance: e.target.checked })}
                        />{" "}
                        Needs Special Assistance
                    </label>
                </div>


                <button
                    type="submit"
                    disabled={uploading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                >
                    {uploading ? "Uploading..." : "Add Pet"}
                </button>
            </form>
        </div>
    );
}
