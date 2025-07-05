import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  const [secondaryImage, setsecondaryImage] = useState(null);
  const [tertiaryImage, setTertiaryImage] = useState(null);
  const [existingPrimary, setExistingPrimary] = useState(null);
  const [existingSecondary, setExistingSecondary] = useState([]);
  const [existingTertiary, setExistingTertiary] = useState(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_MY_PETS_API}/${id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch pet");
        const data = await res.json();

        setForm({
          ...data,
          age: data.age || "",
          arrivalDate: data.arrivalDate?.slice(0, 10),
          adoptionFee: data.adoptionFee || "",
          medical: {
            vaccinated: data.medical?.vaccinated || false,
            parasiteControl: {
              tickAndFlea: data.medical?.parasiteControl?.tickAndFlea || false,
              heartworm: data.medical?.parasiteControl?.heartworm || false,
              neutered: data.medical?.parasiteControl?.neutered || false,
            },
          },
          specialAssistance: data.specialAssistance || false,
        });

        setExistingPrimary(data.images?.primary || null);
        setExistingSecondary(data.images?.secondary ? [data.images.secondary] : []);
        setExistingTertiary(data.images?.tertiary || null);
      } catch (err) {
        toast.error("Could not load pet data");
        console.error(err);
      }
    })();
  }, [id]);

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

  const handleImageChange = (e, index = null, type = "secondary") => {
    const file = e.target.files[0];
    if (!file || file.size > MAX_FILE_SIZE) {
      alert("Image must be 10MB or less");
      return;
    }

    if (type === "primary") setPrimaryImage(file);
    else if (type === "tertiary") setTertiaryImage(file);
    else {
      setsecondaryImage((prev) => {
        const updated = [...prev];
        updated[index] = file;
        return updated;
      });
    }
  };

  const handleDeleteSecondary = async (publicId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_MY_PETS_API}/${id}/photos/${publicId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");
      setExistingSecondary((prev) => prev.filter((img) => img.public_id !== publicId));
    } catch (err) {
      toast.error("Failed to delete image");
    }
  };

  const handleDeleteTertiary = async (publicId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_MY_PETS_API}/${id}/photos/${publicId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");
      setExistingTertiary(null);
    } catch (err) {
      toast.error("Failed to delete image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_MY_PETS_API}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update pet");

      const formData = new FormData();
      if (primaryImage) formData.append("primary", primaryImage);
      if (secondaryImage) formData.append("secondary", secondaryImage);
      if (tertiaryImage) formData.append("tertiary", tertiaryImage);

      if (formData.has("primary") || formData.has("secondary") || formData.has("tertiary")) {
        const imgRes = await fetch(`${import.meta.env.VITE_MY_PETS_API}/${id}/images`, {
          method: "PATCH",
          credentials: "include",
          body: formData,
        });
        if (!imgRes.ok) throw new Error("Image upload failed");
      }

      toast.success("Pet updated!");
      navigate("/private-dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Error updating pet");
    }
  };

  const handleDeletePet = async () => {
    if (!confirm("Are you sure you want to delete this pet?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_MY_PETS_API}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Pet deleted");
      navigate("/private-dashboard");
    } catch (err) {
      toast.error("Failed to delete pet");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div><label>Name: </label><input name="name" value={form.name} onChange={handleFormChange} required /></div>
      <div><label>Age: </label><input type="number" name="age" value={form.age} onChange={handleFormChange} required /></div>
      <div><label>Arrival Date: </label><input type="date" name="arrivalDate" value={form.arrivalDate} onChange={handleFormChange} required /></div>
      <div><label>Breed: </label><input name="breed" value={form.breed} onChange={handleFormChange} required /></div>
      <div><label>Species: </label><select name="species" value={form.species} onChange={handleFormChange}><option value="dog">Dog</option><option value="cat">Cat</option><option value="bird">Bird</option></select></div>
      <div><label>Gender: </label><select name="gender" value={form.gender} onChange={handleFormChange}><option value="male">Male</option><option value="female">Female</option><option value="undetermined">Undetermined</option></select></div>
      <div><label>Description: </label><textarea name="description" value={form.description} onChange={handleFormChange} required /></div>
      <div><label>Adoption Fee: </label><input name="adoptionFee" type="number" value={form.adoptionFee} onChange={handleFormChange} required /></div>
      <div><label>Vaccinated: </label><input type="checkbox" name="medical.vaccinated" checked={form.medical.vaccinated} onChange={handleFormChange} /></div>
      <div><label>Tick & Flea Control: </label><input type="checkbox" name="medical.parasiteControl.tickAndFlea" checked={form.medical.parasiteControl.tickAndFlea} onChange={handleFormChange} /></div>
      <div><label>Heartworm: </label><input type="checkbox" name="medical.parasiteControl.heartworm" checked={form.medical.parasiteControl.heartworm} onChange={handleFormChange} /></div>
      <div><label>Neutered: </label><input type="checkbox" name="medical.parasiteControl.neutered" checked={form.medical.parasiteControl.neutered} onChange={handleFormChange} /></div>
      <div><label>Special Assistance: </label><input type="checkbox" name="specialAssistance" checked={form.specialAssistance} onChange={handleFormChange} /></div>

      <div>
        <label>Primary Image:</label>
        <div onClick={() => document.getElementById("edit-primary-upload").click()} style={{ border: "1px solid black", padding: "10px", cursor: "pointer" }}>
          {primaryImage ? <img src={URL.createObjectURL(primaryImage)} width="100" /> : existingPrimary ? <img src={existingPrimary.url} width="100" /> : <span>Click to upload primary image</span>}
        </div>
        <input id="edit-primary-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageChange(e, null, "primary")} />
      </div>

      <div>
        <label>Secondary Image:</label>
        <div onClick={() => document.getElementById("edit-secondary-upload").click()} style={{ border: "1px solid black", padding: "10px", cursor: "pointer" }} >
            {secondaryImage ? ( <img src={URL.createObjectURL(secondaryImage)} width="100" /> ) : existingSecondary[0] ? ( <><img src={existingSecondary[0].url} width="100" /><button type="button" onClick={(e) => {e.stopPropagation(); handleDeleteSecondary(existingSecondary[0].public_id);}}>🗑️</button></>) : (<span>Click to upload secondary image</span>)}
        </div>
        <input id="edit-secondary-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => setsecondaryImage(e.target.files[0])} />
      </div>

      <div>
        <label>Tertiary Image:</label>
        <div onClick={() => document.getElementById("edit-tertiary-upload").click()} style={{ border: "1px solid black", padding: "10px", cursor: "pointer" }}>
          {tertiaryImage ? <img src={URL.createObjectURL(tertiaryImage)} width="100" /> : existingTertiary ? <><img src={existingTertiary.url} width="100" /><button type="button" onClick={(e) => { e.stopPropagation(); handleDeleteTertiary(existingTertiary.public_id); }}>🗑️</button></> : <span>Click to upload tertiary image</span>}
        </div>
        <input id="edit-tertiary-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageChange(e, null, "tertiary")} />
      </div>

      <button type="submit">Update Pet</button>
      <button type="button" onClick={handleDeletePet} style={{ marginLeft: "10px", background: "red", color: "white" }}>Delete Pet</button>
    </form>
  );
}