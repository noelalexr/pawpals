export const fetchPets = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pets`, {
            method: "GET",
            credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch pets");
        return await response.json();
    } catch (error) {
        console.error("Error loading pets:", error);
        throw error;
    }
};

export const fetchMyPets = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pets/mine`, {
            method: "GET",
            credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch my pets");
        return await response.json();
    } catch (error) {
        console.error("Error loading my pets:", error);
        throw error;
    }
};

export const fetchMyPetDetails = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pets/mine/${id}`, {
            method: "GET",
            credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch my pet details");
        return await response.json();
    } catch (error) {
        console.error("Error loading my pet details:", error);
        throw error;
    }
};

<<<<<<< HEAD
export const fetchLoggedInKennel = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/kennels/validate`, {
            method: "GET",
            credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch kennel info");
        return await response.json();
    } catch (err) {
        console.error("Error fetching kennel info:", err);
        throw err;
    }
=======
export const fetchPendingKennels = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/dev/kennels/pending`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch pending kennels");
    return await res.json();
  } catch (error) {
    console.error("Error fetching pending kennels:", error);
    throw error;
  }
>>>>>>> c6d0c6fadd578c968b1dc6d96234ed20bdf811c8
};