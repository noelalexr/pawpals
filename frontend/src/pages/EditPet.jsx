import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPet() {
    const { id } = useParams();
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
        vaccinated: false,
        tickAndFlea: false,
        heartworm: false,
        neutered: false,
        specialAssistance: false,
    });

    const [existingImages, setExistingImages] = useState([]); // from DB
    const [newPrimaryImage, setNewPrimaryImage] = useState(null);
    const [newSecondaryImages, setNewSecondaryImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [imagesToDelete, setImagesToDelete] = useState([]);

    useEffect(() => {
        const fetchPet = async () => {
            const res = await fetch(`${import.meta.env.VITE_PETS_API}/mine/${id}`, { credentials: "include" });
            const data = await res.json();
            if (res.ok) {
                setForm({
                    ...form,
                    ...data,
                    vaccinated: data.medical?.vaccinated || false,
                    tickAndFlea: data.medical?.parasiteControl?.tickAndFlea || false,
                    heartworm: data.medical?.parasiteControl?.heartworm || false,
                    neutered: data.medical?.parasiteControl?.neutered || false,
                    specialAssistance: data.specialAssistance || false,
                });
                setExistingImages(data.images || []);
            } else {
                alert(data.error || "Failed to load pet");
                navigate(`/private-dashboard/pets/mine/${id}`);
            }
        };
        fetchPet();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handlePrimaryImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (existingPrimaryImage() || newPrimaryImage) {
            const confirmReplace = confirm("Are you sure you want to overwrite the current primary image?");
            if (!confirmReplace) return;
        }

        setNewPrimaryImage(file);
    };


    const handleSecondaryImagesChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + newSecondaryImages.length + existingSecondaryImages().length > 2) {
            alert("You can only have 2 secondary images total.");
            return;
        }
        setNewSecondaryImages([...newSecondaryImages, ...files]);
    };

    const removeNewSecondaryImage = (index) => {
        const updated = [...newSecondaryImages];
        updated.splice(index, 1);
        setNewSecondaryImages(updated);
    };

    const markImageForDeletion = (publicId) => {
        setImagesToDelete(prev => [...prev, publicId]);
        setExistingImages(prev => prev.filter(img => img.public_id !== publicId));
    };

    const existingPrimaryImage = () => existingImages[0];
    const existingSecondaryImages = () => existingImages.slice(1);

    const submitForm = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        const {
            vaccinated, tickAndFlea, heartworm, neutered, specialAssistance,
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
        formData.append("imagesToDelete", JSON.stringify(imagesToDelete));


        if (newPrimaryImage) formData.append("images", newPrimaryImage);
        newSecondaryImages.forEach(file => formData.append("images", file));

        try {
            setUploading(true);
            const res = await fetch(`${import.meta.env.VITE_PETS_API}/mine/${id}`, {
                method: "PATCH",
                body: formData,
                credentials: "include",
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            alert("Pet updated!");
            navigate(`/private-dashboard/pets/mine/${id}`);
        } catch (err) {
            alert(err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDeletePet = async () => {
        if (!confirm("Are you sure you want to delete this pet?")) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_PETS_API}/mine/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            alert("Pet deleted.");
            navigate(`/private-dashboard/`);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Pet</h2>
            <form onSubmit={submitForm} className="space-y-4">
                {/* --- Basic Info --- */}
                <input name="name" value={form.name} onChange={handleChange} className="w-full border p-2" required />
                <input type="number" name="age" value={form.age} onChange={handleChange} className="w-full border p-2" required />
                <input type="date" name="arrivalDate" value={form.arrivalDate?.split("T")[0]} onChange={handleChange} className="w-full border p-2" required />
                <input name="breed" value={form.breed} onChange={handleChange} className="w-full border p-2" required />
                <textarea name="description" value={form.description} onChange={handleChange} className="w-full border p-2" required></textarea>
                <input type="number" name="adoptionFee" value={form.adoptionFee} onChange={handleChange} className="w-full border p-2" required />

                <select name="species" value={form.species} onChange={handleChange} className="w-full border p-2">
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                </select>

                <select name="gender" value={form.gender} onChange={handleChange} className="w-full border p-2">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="undetermined">Undetermined</option>
                </select>

                {/* --- Images --- */}
                <div>
                    <label className="block font-semibold mb-1">Primary Image</label>
                    {existingPrimaryImage() && !newPrimaryImage && (
                        <div className="mb-2">
                            <img src={existingPrimaryImage().url} alt="Primary" className="h-32 rounded border" />
                        </div>
                    )}
                    {newPrimaryImage && (
                        <div className="mt-2">
                            <img src={URL.createObjectURL(newPrimaryImage)} alt="New Primary" className="h-32 rounded border" />
                        </div>
                    )}
                    <input type="file" accept="image/*" onChange={handlePrimaryImageChange} />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Secondary Images (max 2)</label>
                    <div className="flex gap-2 flex-wrap">
                        {existingSecondaryImages().map((img, idx) => (
                            <div key={idx} className="relative">
                                <img src={img.url} alt="" className="h-24 rounded border" />
                                <button
                                    type="button"
                                    onClick={() => markImageForDeletion(img.public_id)}
                                    className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 rounded-full"
                                >X</button>
                            </div>
                        ))}
                    </div>
                    <input type="file" multiple accept="image/*" onChange={handleSecondaryImagesChange} />
                    <div className="flex gap-2 mt-2">
                        {newSecondaryImages.map((img, idx) => (
                            <div key={idx} className="relative">
                                <img src={URL.createObjectURL(img)} className="h-24 rounded border" />
                                <button
                                    type="button"
                                    onClick={() => removeNewSecondaryImage(idx)}
                                    className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full"
                                >X</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Medical --- */}
                <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold">Medical Info</h3>
                    {["vaccinated", "tickAndFlea", "heartworm", "neutered"].map(key => (
                        <label key={key} className="block">
                            <input type="checkbox" name={key} checked={form[key]} onChange={handleChange} />{" "}
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                    ))}
                </div>

                <label className="block font-semibold mt-4">
                    <input type="checkbox" name="specialAssistance" checked={form.specialAssistance} onChange={handleChange} />{" "}
                    Needs Special Assistance
                </label>

                {/* --- Actions --- */}
                <button type="submit" disabled={uploading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
                    {uploading ? "Updating..." : "Save Changes"}
                </button>
                <button type="button" onClick={handleDeletePet} className="ml-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded">
                    Delete Pet
                </button>
            </form>
        </div>
    );
}
